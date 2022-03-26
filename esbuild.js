const esbuild = require('esbuild');
const path = require('path');

// node_modules auto-exclude
const { nodeExternalsPlugin } = require('esbuild-node-externals');

const sourceDirectory = path.resolve(__dirname, 'src');
const buildDirectory = path.resolve(__dirname, 'build');

const buildConfig = {
  entryPoints: [path.resolve(sourceDirectory, 'index.ts')],
  outfile: path.resolve(buildDirectory, 'bundle.js'),
  bundle: true,
  minify: true,
  platform: 'node',
  sourcemap: true,
  target: 'node14',
  plugins: [nodeExternalsPlugin()]
};

esbuild.build(buildConfig).catch((error) => {
  console.error('Exiting with error: ', error);
  process.exit(1);
});
