const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Slider dimensions (adjust these if needed)
const SLIDER_WIDTH = 1920;  // Full HD width
const SLIDER_HEIGHT = 500;  // Height from your slider CSS

const inputDir = path.join(__dirname, '../public/slider');
const outputDir = path.join(__dirname, '../public/slider/resized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function resizeImages() {
  try {
    const files = fs.readdirSync(inputDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to resize...`);

    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);

      // Skip if it's a directory
      if (fs.statSync(inputPath).isDirectory()) continue;

      console.log(`Resizing ${file}...`);

      await sharp(inputPath)
        .resize(SLIDER_WIDTH, SLIDER_HEIGHT, {
          fit: 'cover',          // Crop to fill exactly
          position: 'center',    // Center the crop (can use 'top' to keep faces)
        })
        .jpeg({ quality: 85 })   // Good quality, smaller file size
        .toFile(outputPath);

      console.log(`✓ ${file} resized`);
    }

    console.log(`\n✅ Done! Resized images are in: ${outputDir}`);
    console.log(`\nTo use them, either:`);
    console.log(`1. Copy them back: cp public/slider/resized/* public/slider/`);
    console.log(`2. Or update your code to use /slider/resized/ folder`);

  } catch (error) {
    console.error('Error resizing images:', error);
  }
}

resizeImages();