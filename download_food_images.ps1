# Create directories if they don't exist
$directories = @("images/pizza", "images/burgers", "images/pasta")
foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force
    }
}

# Create WebClient object
$webClient = New-Object System.Net.WebClient

# Pizza images
$pizzaImages = @{
    "margherita.jpg" = "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&q=80"
    "pepperoni.jpg" = "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80"
    "veggie.jpg" = "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=800&q=80"
    "bbq-chicken.jpg" = "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=800&q=80"
    "mushroom.jpg" = "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=800&q=80"
    "hawaiian.jpg" = "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=800&q=80"
    "meat-lovers.jpg" = "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=800&q=80"
    "cheese-burst.jpg" = "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=800&q=80"
    "paneer.jpg" = "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=800&q=80"
    "tandoori.jpg" = "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=800&q=80"
}

# Burger images
$burgerImages = @{
    "classic.jpg" = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
    "spicy.jpg" = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
    "veggie.jpg" = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
    "chicken.jpg" = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
    "double.jpg" = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
    "bacon.jpg" = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
    "mushroom.jpg" = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
    "avocado.jpg" = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
    "bbq.jpg" = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
    "tandoori.jpg" = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
}

# Pasta images
$pastaImages = @{
    "alfredo.jpg" = "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80"
    "bolognese.jpg" = "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80"
    "arrabiata.jpg" = "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80"
    "carbonara.jpg" = "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80"
    "pesto.jpg" = "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80"
    "marinara.jpg" = "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80"
    "vegetable.jpg" = "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80"
    "chicken.jpg" = "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80"
    "seafood.jpg" = "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80"
    "mushroom.jpg" = "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80"
}

# Function to download images
function Download-Images {
    param (
        [hashtable]$images,
        [string]$category
    )
    
    foreach ($image in $images.GetEnumerator()) {
        $outputPath = "images/$category/$($image.Key)"
        Write-Host "Downloading $($image.Key) for $category..."
        try {
            $webClient.DownloadFile($image.Value, $outputPath)
            Write-Host "Successfully downloaded $($image.Key)"
        }
        catch {
            Write-Host "Error downloading $($image.Key): $_"
        }
    }
}

# Download images for each category
Write-Host "Downloading pizza images..."
Download-Images -images $pizzaImages -category "pizza"

Write-Host "Downloading burger images..."
Download-Images -images $burgerImages -category "burgers"

Write-Host "Downloading pasta images..."
Download-Images -images $pastaImages -category "pasta"

Write-Host "All images downloaded successfully!" 