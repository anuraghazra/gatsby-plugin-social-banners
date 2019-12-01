"use strict";

module.exports = function getLines(ctx, text, fontSize, maxWidth) {
  let words = text.split(" ");
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    let word = words[i];
    let width = ctx.measureText(currentLine + " " + word).width;

    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push({
        text: currentLine
      });
      currentLine = word;
    }
  }

  lines.push({
    text: currentLine
  });
  return lines;
};