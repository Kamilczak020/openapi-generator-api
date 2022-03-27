import {getMilliseconds, getMinutes, getSeconds} from 'date-fns';
import { nodeExternalsPlugin } from 'esbuild-node-externals';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { watch } from 'chokidar';
import { build } from 'esbuild';
import liveServer from 'live-server';
import chalk from 'chalk';

const __dirname = dirname(fileURLToPath(import.meta.url));

const sourceDirectory = resolve(__dirname, 'src');
const buildDirectory = resolve(__dirname, 'build');

const args = process.argv.splice(2);
const isWatchMode = args.includes('--watch');
const isLiveServer = args.includes('--serve');

const buildConfig = {
  entryPoints: [resolve(sourceDirectory, 'index.ts')],
  outfile: resolve(buildDirectory, 'bundle.js'),
  bundle: true,
  minify: true,
  platform: 'node',
  sourcemap: true,
  target: 'node14',
  plugins: [nodeExternalsPlugin()]
};

const buildBundle = async () => {
  try {
    const buildStartTimestamp = Date.now();

    const builder = await build(buildConfig);
    const buildFinishTimestamp = Date.now();

    const timeTakenMs = buildFinishTimestamp - buildStartTimestamp;
    const minutes = chalk.magenta(`${getMinutes(timeTakenMs)}m`);
    const seconds = chalk.magenta(`${getSeconds(timeTakenMs)}s`);
    const milliseconds = chalk.magenta(`${getMilliseconds(timeTakenMs)}ms`);

    const successMessage = `[${chalk.green('SUCCESS')}]`;
    const timeMessage  = `Build took: ${minutes} ${seconds} ${milliseconds}`;
    console.info(`${successMessage} ${timeMessage}`);
    return builder;
  } catch (error) {
    const failureMessage = `[${chalk.red('FAILURE')}]`;
    console.error(`${failureMessage} Build failed: ${error}`);
    process.exit(1);
  }
}

const startWatch = () => {
  const watcher = watch('src/**/*.ts', {
    interval: 0,
    ignoreInitial: true,
  });

  watcher.on('all', async () => {
    await buildBundle();
  });
}

if (isWatchMode) {
  await buildBundle();
  startWatch();
} else {
  await buildBundle();
}

if (isLiveServer) {
  liveServer.start({
    root: buildDirectory,
    file: 'bundle.js',
    open: false,
    port: 5000,
  });
}
