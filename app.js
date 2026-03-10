const fs = require('fs');
const chalk = require('chalk');

function readFileContent() {
    const data = fs.readFileSync('declaration.txt', 'utf8');
    return data;
}

function getWordCounts(content) {
    const wordCount = {};
    const words = content.split(/\W+/).filter(Boolean);

    for (let i = 0; i < words.length; i++) {
        const word = words[i].toLowerCase();
        if (wordCount[word]) {
            wordCount[word] = wordCount[word] + 1;
        } else {
            wordCount[word] = 1;
        }
    }

    return wordCount;
}

function colorWord(word, count) {
    if (count === 1) {
        return chalk.blue(word);
    } else if (count >= 2 && count <= 5) {
        return chalk.green(word);
    } else {
        return chalk.red(word);
    }
}

function printColoredLines(content, wordCount) {
    const lines = content.split('\n').slice(0, 15);

    for (const line of lines) {
        const coloredLine = line.split(/\W+/).map(word => {
            if (word === '') {
                return word;
            }
            const count = wordCount[word.toLowerCase()];
            return colorWord(word, count);
        }).join(' ');

        console.log(coloredLine);
    }
}

function processFile() {
    const content = readFileContent();
    const wordCount = getWordCounts(content);
    printColoredLines(content, wordCount);
}

if (require.main === module) {
    processFile();
}

module.exports = { readFileContent, getWordCounts, colorWord, printColoredLines };
