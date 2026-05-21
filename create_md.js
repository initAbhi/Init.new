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

let mdContent = '# Init.new Core Essential Code\n\n';
mdContent += 'This document contains the essential key code for the Init.new application, suitable for copying and pasting into your blackbook docx.\n\n';

for (const file of files) {
  try {
    const code = fs.readFileSync(file, 'utf-8');
    mdContent += `### \`${file}\`\n`;
    mdContent += `\`\`\`javascript\n${code}\n\`\`\`\n\n`;
  } catch (err) {
    mdContent += `### \`${file}\`\n`;
    mdContent += `*Error reading file: ${err.message}*\n\n`;
  }
}

fs.writeFileSync('/home/abhi-singh/Downloads/init_new_key_code.md', mdContent);
console.log('Markdown file created successfully.');
