const fs = require('fs');
const path = require('path');

const photosDir = path.join(__dirname, 'public', 'photos');

// Read all files in the photos directory
fs.readdir(photosDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter only image files
  const imageFiles = files.filter(file => 
    file.endsWith('.png') || 
    file.endsWith('.jpg') || 
    file.endsWith('.jpeg')
  );

  console.log(`Found ${imageFiles.length} photos`);

  // Rename each file
  imageFiles.forEach((file, index) => {
    const oldPath = path.join(photosDir, file);
    const extension = path.extname(file);
    const newPath = path.join(photosDir, `photo${index + 1}${extension}`);

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error(`Error renaming ${file}:`, err);
      } else {
        console.log(`Renamed: ${file} → photo${index + 1}${extension}`);
      }
    });
  });

  console.log('Renaming complete!');
});