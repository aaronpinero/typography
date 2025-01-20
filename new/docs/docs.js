const fs = require('fs');
const path = require('path');

// Define the path to the directory containing HTML files
const htmlDirectory = './html_files/'; 

// Read the header and footer content
const header = fs.readFileSync('header.html', 'utf8');
const footer = fs.readFileSync('footer.html', 'utf8');

// Placeholder strings for header and footer insertion
const headerPlaceholder = '';
const footerPlaceholder = '';

// Function to process an individual HTML file
function processFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${filePath}`, err);
      return;
    }

    // Replace placeholders with header and footer content
    let modifiedContent = data.replace(headerPlaceholder, header);
    modifiedContent = modifiedContent.replace(footerPlaceholder, footer);

    // Write the modified content back to the file
    fs.writeFile(filePath, modifiedContent, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file: ${filePath}`, err);
      } else {
        console.log(`Processed file: ${filePath}`);
      }
    });
  });
}

// Get all HTML files in the directory
fs.readdir(htmlDirectory, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${htmlDirectory}`, err);
    return;
  }

  files.forEach((file) => {
    if (path.extname(file) === '.html') {
      const fullFilePath = path.join(htmlDirectory, file);
      processFile(fullFilePath);
    }
  });
});