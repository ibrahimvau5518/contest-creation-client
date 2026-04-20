const fs = require('fs');
const path = require('path');

function replaceColorsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Swap out explicit bg-[#1f2340] with a responsive string
  // If it's already there, replace it.
  content = content.replace(/bg-\[\#1f2340\] text-white/g, 'bg-base-100 text-base-content dark:bg-[#1f2340] dark:text-white');
  content = content.replace(/bg-\[\#1f2340\]  text-white/g, 'bg-base-100 text-base-content dark:bg-[#1f2340] dark:text-white');
  content = content.replace(/bg-\[\#1f2340\]/g, 'bg-base-100 dark:bg-[#1f2340]');
  
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

processDirectory('./src/components');
processDirectory('./src/ShareComponents');
processDirectory('./src/MainLayout');
processDirectory('./src/pages');
processDirectory('./src/Dashboard');
processDirectory('./src/UserDashboard');
processDirectory('./src/AdminPage');

console.log('Finished updating colors');
