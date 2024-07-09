const fs = require('fs');
const path = require('path');

const musicDir = path.join(__dirname, 'music');
const files = fs.readdirSync(musicDir).filter(file => path.extname(file).toLowerCase() === '.mp3');

const fileListContent = `const files = ${JSON.stringify(files.map(file => `music/${file}`), null, 4)};`;

fs.writeFileSync(path.join(__dirname, 'files.js'), fileListContent);
console.log('files.js has been generated with the list of MP3 files.');
