const fs = require('fs');
const path = require('path');

function replaceColorsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Exterminatus duplicates
  content = content.replace(/bg-base-100 dark:bg-base-100 dark:bg-\[\#1f2340\]/g, 'bg-base-100 dark:bg-[#1f2340]');
  content = content.replace(/bg-base-100 dark:bg-base-100/g, 'bg-base-100');
  content = content.replace(/dark:bg-base-100/g, '');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      replaceColorsInFile(fullPath);
    }
  }
}

processDirectory('./src/components');
processDirectory('./src/pages');
