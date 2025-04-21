# Create a WebClient object
$webClient = New-Object System.Net.WebClient

# Define the image URLs and their corresponding filenames
$images = @{
    # Pizza Images
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80" = "pizza/margherita.jpg"
    "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80" = "pizza/pepperoni.jpg"
    "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=800&q=80" = "pizza/veggie.jpg"
    
    # Burger Images
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80" = "burgers/classic.jpg"
    "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&q=80" = "burgers/spicy.jpg"
    "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80" = "burgers/veggie.jpg"
    
    # Pasta Images
    "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&q=80" = "pasta/alfredo.jpg"
    "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80" = "pasta/bolognese.jpg"
    "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=800&q=80" = "pasta/arrabiata.jpg"
    
    # Salad Images
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80" = "salads/caesar.jpg"
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80" = "salads/greek.jpg"
    
    # Dessert Images
    "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&q=80" = "desserts/brownie.jpg"
    "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80" = "desserts/tiramisu.jpg"
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80" = "desserts/red-velvet.jpg"
    "https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?w=800&q=80" = "desserts/cheesecake.jpg"
    "https://images.unsplash.com/photo-1562007908-859b4ba9a1a2?w=800&q=80" = "desserts/mousse.jpg"
    "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&q=80" = "desserts/sundae.jpg"
    
    # Drink Images
    "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=80" = "drinks/soft-drinks.jpg"
    "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=800&q=80" = "drinks/fresh-juice.jpg"
}

# Download each image
foreach ($image in $images.GetEnumerator()) {
    $url = $image.Key
    $filename = $image.Value
    $outputPath = "images/$filename"
    
    Write-Host "Downloading $filename..."
    $webClient.DownloadFile($url, $outputPath)
    Write-Host "Downloaded $filename successfully!"
}

Write-Host "All images downloaded successfully!" 