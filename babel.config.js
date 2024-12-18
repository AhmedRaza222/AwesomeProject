export const presets = ['module:metro-react-native-babel-preset'];
export const plugins = [
  [
    'module-resolver',
    {
      root: ['./src'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
  ],
];
