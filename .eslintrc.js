const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
   parser: 'typescript-eslint-parser',
   plugins: [
    'typescript'
   ],
  globals: {
    page: true,
  },
};
