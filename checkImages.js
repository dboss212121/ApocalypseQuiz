const fs = require('fs');
const path = require('path');
const https = require('https');

// Step 1: Read App.js
const appJsPath = path.join('C:', 'QuizApp', 'ApocalypseQuiz', 'App.js');
const fileContent = fs.readFileSync(appJsPath, 'utf8');

// Step 2: Extract image URIs
const uriRegex = /uri:\s*["'](https:\/\/.+?\.(png|jpg|jpeg|gif|webp))["']/g;
const matches = [];
let match;
while ((match = uriRegex.exec(fileContent)) !== null) {
  matches.push(match[1].replace('raw.github.com', 'raw.githubusercontent.com'));
}

// Step 3: Check each image URL
const missingImages = [];
const validImages = [];

function checkImage(url, done) {
  https.get(url, (res) => {
    if (res.statusCode === 404) {
      missingImages.push(url);
    } else {
      validImages.push(url);
    }
    done();
  }).on('error', (err) => {
    console.error(`❌ ERROR: ${url} — ${err.message}`);
    done();
  });
}

// Step 4: Run checks and sort output
let completed = 0;
matches.forEach((url) => {
  checkImage(url, () => {
    completed++;
    if (completed === matches.length) {
      console.log('\n🚨 MISSING IMAGES:\n');
      missingImages.forEach((url) => console.log(url));

      console.log('\n✅ VALID IMAGES:\n');
      validImages.forEach((url) => console.log(url));
    }
  });
});