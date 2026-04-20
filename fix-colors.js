const fs = require('fs');
const path = require('path');

function replaceColorsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Pattern 1: replace bg-[#1f2340] text-white with simple responsive tailwind
  // For wrappers:
  content = content.replace(/bg-\[\#1f2340\]/g, 'bg-white dark:bg-[#1f2340]');
  content = content.replace(/text-white/g, 'text-gray-900 dark:text-gray-100');
  
  // Specific fixes where text-white was needed maybe in buttons:
  // (We'll just broadly replace text-white but wait, if it's on a button, text-gray-900 might look bad in light mode)
  // Let's refine:
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
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

processDirectory('./src');
console.log('Done');
