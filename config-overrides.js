const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function overrider(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions({
      javascriptEnabled: true,
      modifyVars: { "@primary-color": "#1DA57A" },
      modifyVars: { "@btn-danger-bg": "#FFF" },
  })(config, env);
  return config;
};

