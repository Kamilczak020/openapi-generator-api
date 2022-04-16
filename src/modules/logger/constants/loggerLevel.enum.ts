export enum LoggerLevel {
  Critical = 'crit',
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
}

export const loggerLevelColors = {
  levels: {
    [LoggerLevel.Critical]: 0,
    [LoggerLevel.Error]: 1,
    [LoggerLevel.Warn]: 2,
    [LoggerLevel.Info]: 3,
    [LoggerLevel.Debug]: 4,
  },
  colors: {
    [LoggerLevel.Critical]: 'red',
    [LoggerLevel.Error]: 'red',
    [LoggerLevel.Warn]: 'yellow',
    [LoggerLevel.Info]: 'green',
    [LoggerLevel.Debug]: 'blue',
  },
};
