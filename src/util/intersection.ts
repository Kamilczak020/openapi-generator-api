export const intersection = <T>(first: Array<T>, second: Array<T>) => {
  return first.filter(item => second.includes(item));
};

export const includesAny = <T>(target: Array<T>, values: Array<T>) => {
  return intersection(target, values).length > 0;
};
