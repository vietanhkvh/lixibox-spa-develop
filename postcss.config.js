module.exports = ({ env }) => ({
  plugins: {
    autoprefixer: {},
    cssnano: ['production', 'staging'].includes(env) ? {} : false,
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true
      }
    }
  }
});
