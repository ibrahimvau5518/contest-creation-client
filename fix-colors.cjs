const fs = require('fs');
const path = require('path');

function replaceColorsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // We are trying to replace `bg-[#1f2340]` with `bg-white dark:bg-[#1f2340]`
  // And `text-white` with `text-gray-900 dark:text-gray-100` but ONLY when next to it or on standard wrappers, not indiscriminately.
  // Actually, standard tailwind v4 handles `bg-base-100` and `text-base-content` via daisyUI automatically to flip from white to dark!
  // So replacing `bg-[#1f2340]` -> `bg-base-100 dark:bg-[#1f2340]` overrides base-100 in dark mode to the custom color.
  
  content = content.replace(/bg-\[\#1f2340\]/g, 'bg-base-100 dark:bg-[#1f2340]');
  
  // We can't globally replace text-white because badges, buttons, headers might be white text. 
  // Let's replace cases where text-white is co-located with our target background.
  // Example: `bg-base-100 dark:bg-[#1f2340] text-white` -> `bg-base-100 dark:bg-[#1f2340] text-base-content dark:text-white`
  // That regex is complex. Let's do it manually on specific components.

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
