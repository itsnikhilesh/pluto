const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File to store users
const USERS_FILE = 'users.json';

// Load users from file or initialize empty array
let users = [];
try {
    if (fs.existsSync(USERS_FILE)) {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        users = JSON.parse(data);
    }
} catch (error) {
    console.error('Error loading users:', error);
}

// Function to save users to file
function saveUsers() {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error saving users:', error);
    }
}

// Serve static files
app.use(express.static(__dirname));

// Basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Register route
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

// Handle registration
app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    
    console.log('Registration attempt:', { email, name });
    
    // Validate required fields
    if (!email || !password || !name) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        console.log('Registration failed: User exists:', email);
        return res.status(400).json({ error: 'User already exists with this email' });
    }
    
    // Store new user
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password
    };
    users.push(newUser);
    
    // Save to file
    saveUsers();
    
    console.log('User registered successfully:', email);
    console.log('Current users:', users.map(u => ({ email: u.email, name: u.name })));
    
    // Return success without password
    const { password: _, ...userWithoutPassword } = newUser;
    res.json({
        token: 'dummy-token',
        user: userWithoutPassword
    });
});

// Handle login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    console.log('Login attempt:', email);
    
    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find user and validate credentials
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        console.log('Login failed:', email);
        return res.status(401).json({ error: 'Invalid email or password. Please register if you haven\'t already.' });
    }
    
    console.log('Login successful:', email);
    
    // Return success without password
    const { password: _, ...userWithoutPassword } = user;
    res.json({
        token: 'dummy-token',
        user: userWithoutPassword
    });
});

// Start server
const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Total registered users: ${users.length}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please try a different port or stop the existing server.`);
        process.exit(1);
    } else {
        console.error('Server error:', err);
    }
}); 