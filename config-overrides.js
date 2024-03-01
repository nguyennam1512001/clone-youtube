const { override, addWebpackModuleRule, useBabelRc } = require('customize-cra');

module.exports = override(
    addWebpackModuleRule({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
    }),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc(),
);
