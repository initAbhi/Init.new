const fs = require('fs');

const files = [
  'app/layout.js',
  'app/page.js',
  'app/provider.jsx',
  'app/(main)/workspace/[id]/page.jsx',
  'app/api/ai/generate-code/route.js',
  'components/ChatView.jsx',
  'components/CodeView.jsx',
  'components/Header.jsx',
  'components/Hero.jsx',
  'config/AiModel.js',
  'context/ModelContext.js',
  'convex/schema.js',
  'convex/workspace.js'
];

let content = '';

for (const file of files) {
  content += `\n\n=========================================================================\n`;
  content += `File: ${file}\n`;
  content += `=========================================================================\n\n`;
  try {
    content += fs.readFileSync(file, 'utf-8');
  } catch (err) {
    content += `Error reading file: ${err.message}`;
  }
}

fs.writeFileSync('essential_code.txt', content);
console.log('Total lines:', content.split('\n').length);
