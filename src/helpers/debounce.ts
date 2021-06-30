let timeOutId: NodeJS.Timeout;

export const debounce = (func: Function, delay: number) => {
  return (...args: Array<any>) => {
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
