# gatsby-plugin-social-banners

Gatsby plugin to automatically generate social card images.

### Inspiration

This plugin is highly inspired by [Ryan Yurkanin's](twitter.com/YurkaninRyan) blog post on [How to Automate Social Cards for your Gatsby Blog](https://tkplaceholder.io/how-to-automate-social-cards-for-your-gatsby-blog/)

## How to install

Please include installation instructions here.

## Available options

```js
{
  resolve: `gatsby-plugin-social-banners`,
  options: {
    // optional & defaults
    subText: { author: 'Anurag hazra' },
    imgWidth: 1200,
    imgHeight: 630,
    x:139,
    y:231,
    outputImg: 'social-banner-img.jpg',
    // required (have to be specified)
    baseImg: path.resolve('./src/static/social-banner-template.jpg')
  }
}
```

## When do I use this plugin?

This plugin is mainly for my personal portfolio site but i will update it so everyone can use it on their own site.

## Examples of usage

```js
// gatsby-config.js
{
  resolve: `gatsby-plugin-social-banners`,
  options: {
    // required
    baseImg: path.resolve('./src/static/social-banner-template.jpg')
  }
}
```

---

Made with :heart: and js for gatsby.
