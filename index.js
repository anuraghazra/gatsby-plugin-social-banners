"use strict";

const path = require('path');

const fs = require('fs');

const getLines = require('./wrapText.js');

const dateformat = require('dateformat');

const {
  createCanvas,
  Image,
  registerFont
} = require('canvas');

module.exports = async ({
  markdownNode
}, options) => {
  // defaults
  const {
    font = {
      name: 'Arial',
      size: '12px'
    },
    subText = {
      author: 'Anurag hazra'
    },
    imgWidth = 1200,
    imgHeight = 630,
    x = 139,
    y = 231,
    outputImg = 'social-banner-img.png',
    baseImg
  } = options;

  if (!baseImg) {
    throw new Error('gatsby-plugin-social-banners: Please provide a template image in `baseImg`');
  }

  ;
  const {
    frontmatter,
    fields
  } = markdownNode;
  if (fields.posttype === 'case-studies') return;
  const output = path.join('public', fields.slug, outputImg);
  const folder = path.join('public', fields.slug);

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  if (font.src) {
    registerFont(font.src, {
      family: font.name
    });
  }

  const canvas = createCanvas(imgWidth, imgHeight);
  const ctx = canvas.getContext('2d'); // draw

  const img = new Image();

  img.onload = () => ctx.drawImage(img, 0, 0);

  img.onerror = err => {
    throw err;
  };

  img.src = baseImg;
  ctx.textBaseline = 'middle';
  ctx.textAlign = "center";
  ctx.save();
  ctx.fillStyle = font.color;
  ctx.translate(imgWidth / 2, imgHeight / 2 - 50);
  ctx.font = `${font.weight} ${font.size}px "${font.name}"`;
  let lines = getLines(ctx, frontmatter.title, font.size, 1000);

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i].text, 0, font.size * i);
  }

  ctx.restore();
  let secondaryText = `${dateformat(frontmatter.date, 'mmmm d, yyyy')}  |  ${subText.author}`;
  ctx.font = `normal 24px "${font.name}"`;
  ctx.fillStyle = font.secondaryColor;
  ctx.fillText(secondaryText, imgWidth / 2, imgHeight - 200);
  const out = fs.createWriteStream(output);
  canvas.createPNGStream().pipe(out);
  out.on('finish', () => console.log('The PNG file was created.')); // const [image, montserrat, karla] = await Promise.all([
  //   jimp.read(baseImg),
  //   jimp.loadFont(path.join(__dirname, './src/fonts/montserrat.fnt')),
  //   jimp.loadFont(path.join(__dirname, './src/fonts/karla-26-regular.fnt'))
  // ]);
  // // 139, 231
  // image.resize(imgWidth, imgHeight)
  //   .print(montserrat, x, y, {
  //     text: frontmatter.title,
  //     alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
  //     alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
  //   }, 921, 179)
  //   .print(karla, 0, 434, {
  //     text: `${dateformat(frontmatter.date, 'mmmm d, yyyy')}  |  ${subText.author}`,
  //     alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
  //     alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
  //   }, 1200, 44)
  //   .write(output);
};