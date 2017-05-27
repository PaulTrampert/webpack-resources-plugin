# webpack-resources-plugin
Webpack plugin that outputs a json map of webpack output files to their public paths and chunk hash values.

## Usage
In your `webpack.config.js`:
```js
let WebpackResourcesPlugin = require('webpack-resources-plugin');

module.exports = {
  // The rest of your webpack config...
  plugins: [
    // Any other plugins you might be using
    new WebpackResourcesPlugin({
      fileName: '/path/to/output.js'
    })
  ]
};
```

## Options
* `fileName`: The name of the json file to generate the map in. **Default Value**: `WebpackResources.json`
