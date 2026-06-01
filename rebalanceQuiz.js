// rebalanceQuiz.js

const fs = require('fs');

// Load your original questions
const allQuestions = require('./quizData'); // Replace with actual path if needed

// Step 1: Extract all unique values
const allValues = {};
allQuestions.forEach(q => {
  q.options.forEach(opt => {
    allValues[opt.value] = opt.text;
  });
});

const uniqueValues = Object.entries(allValues); // [ [value, text], ... ]
const totalSlots = allQuestions.length * 4;
const idealCount = Math.floor(totalSlots / uniqueValues.length);

console.log(`Target per value: ${idealCount} or ${idealCount + 1}`);

// Step 2: Build a pool of evenly distributed values
let valuePool = [];
uniqueValues.forEach(([value, text]) => {
  const count = valuePool.length < totalSlots % uniqueValues.length ? idealCount + 1 : idealCount;
  for (let i = 0; i < count; i++) {
    valuePool.push({ value, text });
  }
});

// Step 3: Shuffle the pool
for (let i = valuePool.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [valuePool[i], valuePool[j]] = [valuePool[j], valuePool[i]];
}

// Step 4: Reassign options to each question
const rebalancedQuestions = allQuestions.map(q => {
  const newOptions = valuePool.splice(0, 4);
  return {
    ...q,
    options: newOptions
  };
});

// Step 5: Output result
fs.writeFileSync('rebalancedQuiz.json', JSON.stringify(rebalancedQuestions, null, 2));
console.log("✅ Rebalanced quiz saved to rebalancedQuiz.json");