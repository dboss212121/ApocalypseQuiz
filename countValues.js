// countValues.js

const fs = require('fs');
const path = require('path');

// Load App.js content
const appPath = path.join(__dirname, 'App.js');
const appContent = fs.readFileSync(appPath, 'utf8');

// Try to extract allQuestions array
const match = appContent.match(/const\s+allQuestions\s*=\s*(\[[\s\S]*?\]);/);

if (!match) {
  console.error("❌ Couldn't find allQuestions array in App.js");
  process.exit(1);
}

let allQuestions;
try {
  allQuestions = eval(match[1]); // ⚠️ Safe only if you're in control of App.js
} catch (err) {
  console.error("❌ Failed to parse allQuestions:", err);
  process.exit(1);
}

// Count values
const valueCounts = {};

allQuestions.forEach(q => {
  if (q.options && Array.isArray(q.options)) {
    q.options.forEach(opt => {
      valueCounts[opt.value] = (valueCounts[opt.value] || 0) + 1;
    });
  }
});

console.log("📊 Value usage counts:");
console.table(valueCounts);