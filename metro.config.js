const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

module.exports = (async () => {
  const {
    resolver: { assetExts },
  } = await getDefaultConfig(__dirname);

  const config = {
    resolver: {
      assetExts: [...assetExts, 'lottie'],
    },
  };

  return mergeConfig(getDefaultConfig(__dirname), config);
})();
