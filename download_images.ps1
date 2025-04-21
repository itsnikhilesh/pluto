# Create a WebClient object
$webClient = New-Object System.Net.WebClient

# Define the image URLs and their corresponding filenames
$images = @{
    "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&q=80" = "chocolate-brownie.jpg"
    "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80" = "tiramisu.jpg"
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80" = "red-velvet-cake.jpg"
    "https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?w=800&q=80" = "cheesecake.jpg"
    "https://images.unsplash.com/photo-1562007908-859b4ba9a1a2?w=800&q=80" = "chocolate-mousse.jpg"
    "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&q=80" = "ice-cream-sundae.jpg"
}

# Download each image
foreach ($image in $images.GetEnumerator()) {
    $url = $image.Key
    $filename = $image.Value
    $outputPath = "images/desserts/$filename"
    
    Write-Host "Downloading $filename..."
    $webClient.DownloadFile($url, $outputPath)
    Write-Host "Downloaded $filename successfully!"
}

Write-Host "All images downloaded successfully!" 