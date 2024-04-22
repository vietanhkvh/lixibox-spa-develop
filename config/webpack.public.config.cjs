// NOTE:
// Configuration presumes that `webpack`, `webpack-cli` and `dotenv` modules
// are installed in the system

const webpack = require("webpack");
const dotenv = require("dotenv").config({ path: `.env.${process.env.REACT_APP_ENV}` });
const envVars = Object.assign({}, dotenv.parsed, process.env);

module.exports = {
  mode: ['development', 'production'].includes(process.env.REACT_APP_ENV) ? process.env.REACT_APP_ENV : 'production',
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(envVars),
    }),
  ],
};
