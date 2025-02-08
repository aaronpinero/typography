const fs = require('fs');
const path = require('path');

async function processCSS(inputPath, outputPath) {
  try {
    const inputCSS = fs.readFileSync(inputPath, 'utf8');
    const processedCSS = await replaceImports(inputCSS, inputPath);

    fs.writeFileSync(outputPath, processedCSS, 'utf8');
    console.log(`Processed CSS written to ${outputPath}`);
  } catch (err) {
    console.error(`Error processing CSS: ${err.message}`);
  }
}

async function replaceImports(css, currentFilePath) {
  let processedCSS = css;
  const importRegex = /@import\s+(?:url\()?['"]?([^'"\)]+)['"]?\)?(?:\s+layer\(([\w-]+)\))?(?:\s*;\s*)?/gi;
  let match;
  while ((match = importRegex.exec(css))) {
    const importPath = match[1];
    const layerName = match[2];
    const resolvedPath = path.resolve(path.dirname(currentFilePath), importPath);
    try {
      const importedCSS = fs.readFileSync(resolvedPath, 'utf8');
      let replacement = importedCSS + '\n';
      if (layerName) {
        replacement = `@layer ${layerName} {\n${importedCSS}\n}\n`;
      }
      processedCSS = processedCSS.replace(match[0], replacement);
    } catch (importErr) {
      console.warn(`Warning: Could not import ${importPath} (resolved to ${resolvedPath}): ${importErr.message}`);
      // Optionally, keep the @import statement or replace with a comment:
      // processedCSS = processedCSS.replace(match[0], `/* @import ${importPath} - NOT FOUND */`);
    }
  }
  return processedCSS;
}

processCSS('./resources/style/hslds.css', './resources/style/hslds.dist.css');