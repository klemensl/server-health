const lastSeenMap: { [key: string]: number } = {};

export const add = (server: string) => {
  lastSeenMap[server] = Date.now();
}

export const get = (server: string): number => {
  return lastSeenMap[server];
}

export const keys = (): string[] => {
  return Object.keys(lastSeenMap);
}

export const dump = (): string => {
  return JSON.stringify(lastSeenMap);
}