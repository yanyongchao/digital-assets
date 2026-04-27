export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16,
      propList: ['*'],
      unitPrecision: 5,
      minPixelValue: 2,
      selectorBlackList: [':root', 'html']
    },
  },
}
