# webpack-template

How to use this template:

1. Create a repository using this template.
2. Clone the repository locally.
3. Inside the local root folder, run `npm init -y`
4. Inside `package.json`, set the `scripts` key to the following:

```js

"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack --config webpack.prod.js",
  "dev": "webpack serve --config webpack.dev.js",
  "deploy": "git subtree push --prefix dist origin gh-pages",
  "setup": "npm install --save-dev webpack webpack-cli && npm install --save-dev html-webpack-plugin && npm install --save-dev style-loader css-loader && npm install --save-dev html-loader && npm install --save-dev webpack-dev-server && npm install css-minimizer-webpack-plugin --save-dev && npm install --save-dev mini-css-extract-plugin"
},

```

5. Inside the local root folder, run `npm run setup` to install all the dependencies.

**Note:** The three webpack files (`webpack.common.js`, `webpack.dev.js`, `webpack.prod.js`) determine the modules that will be used in the project and that therefore need to be installed. Feel free to edit these files (and the `"setup"` script) to suit your needs.
