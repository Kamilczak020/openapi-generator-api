import { LoggerLevel } from '../constants';
import chalk from 'chalk';

export const getLogLevelName = (level: LoggerLevel) => {
  return Object.keys(LoggerLevel).find((key) => {
    const value = LoggerLevel[key];
    return value === level;
  });
};

export const getColoredLogText = (level: LoggerLevel, text: string) => {
  switch (level) {
    case LoggerLevel.Critical:
      return chalk.underline.bold.red(text);
    case LoggerLevel.Error:
      return chalk.red(text);
    case LoggerLevel.Warn:
      return chalk.yellow(text);
    case LoggerLevel.Info:
      return chalk.blue(text);
    case LoggerLevel.Debug:
      return chalk.magenta(text);
  }
};
