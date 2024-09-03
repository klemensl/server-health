const lastSeenMap: { [key: string]: number } = {};

export const add = (name: string) => {
  lastSeenMap[name] = Date.now();
}

export const get = () => {
  return lastSeenMap;
}