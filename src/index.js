const path = require('path');
const fs = require('fs')
const getLines = require('./wrapText.js')
const dateformat = require('dateformat');

const { createCanvas, Image, registerFont } = require('canvas')


module.exports = async ({ markdownNode }, options) => {
  // defaults
  const {
    fonts = [],
    fields,
    imgWidth = 1200,
    imgHeight = 630,
    x = 139,
    y = 231,
    outputImg = 'social-banner-img.png',
    baseImg,
  } = options;

  const centerX = imgWidth / 2;
  const centerY = imgHeight / 2;

  if (!baseImg) {
    throw new Error('gatsby-plugin-social-banners: Please provide a template image in `baseImg`')
  };

  const { frontmatter, fields: markdownFields } = markdownNode;
  if (markdownFields.posttype === 'case-studies') return;

  const output = path.join('public', markdownFields.slug, outputImg);
  const folder = path.join('./public', markdownFields.slug);
  if (!fs.existsSync(folder)) {
    console.log(markdownFields.slug)
    fs.mkdir(folder, function(err) {
      if (err) throw err;
       console.log('CREATEDDDDDD')
    });
  }

  fonts.forEach(font => {
    registerFont(font.src, { family: font.name });
  });

  const canvas = createCanvas(imgWidth, imgHeight)
  const ctx = canvas.getContext('2d')

  // draw
  const img = new Image()
  img.onload = () => ctx.drawImage(img, 0, 0)
  img.onerror = err => { throw err }
  img.src = baseImg;

  if (fields.title) {
    let { x, y, font, color, fontSize, lineHeight, textAlign } = fields.title;

    ctx.textBaseline = 'middle';
    ctx.textAlign = textAlign || 'center';
    ctx.save();
    ctx.fillStyle = color || 'black';
    ctx.translate(x || centerX, y || centerY - 50)
    ctx.font = font;

    let lines = getLines(ctx, frontmatter.title, fontSize, 1000);
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i].text, 0, (fontSize + lineHeight) * i);
    }
    ctx.restore();
  }

  if (fields.subtext) {
    let { x, y, font, color, author } = fields.subtext;

    ctx.translate(x || centerX, y || centerY);
    let secondaryText = `${dateformat(frontmatter.date, 'mmmm d, yyyy')}  |  ${author}`;
    ctx.font = font;;
    ctx.fillStyle = color || 'black';
    ctx.fillText(secondaryText, 0, 0);
  }

  const out = fs.createWriteStream(output);
  canvas
    .createPNGStream()
    .pipe(out)
  out.on('finish', () => console.log('The PNG file was created.'))







  // const [image, montserrat, karla] = await Promise.all([
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