"use strict";

const path = require('path');

const jimp = require('jimp');

const dateformat = require('dateformat');

module.exports = async ({
  markdownNode
}, options) => {
  // defaults
  const {
    subText = {
      author: 'Anurag hazra'
    },
    imgWidth = 1200,
    imgHeight = 630,
    x = 139,
    y = 231,
    outputImg = 'social-banner-img.jpg',
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
  const output = path.join('./public', fields.slug, outputImg);
  const [image, montserrat, karla] = await Promise.all([jimp.read(baseImg), jimp.loadFont(path.join(__dirname, './src/fonts/montserrat.fnt')), jimp.loadFont(path.join(__dirname, './src/fonts/karla-26-regular.fnt'))]); // 139, 231

  image.resize(imgWidth, imgHeight).print(montserrat, x, y, {
    text: frontmatter.title,
    alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
  }, 921, 179).print(karla, 0, 434, {
    text: `${dateformat(frontmatter.date, 'mmmm d, yyyy')}  |  ${subText.author}`,
    alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
  }, 1200, 44).write(output);
};