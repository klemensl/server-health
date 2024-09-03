const offlineMap: { [key: string]: number } = {};

export const add = (server: string, timestamp?: number): void => {
  offlineMap[server] = timestamp ?? Date.now();
}

export const remove = (server: string): void => {
  delete offlineMap[server];
}

export const get = (server: string): number => {
  return offlineMap[server];
}

export const contains = (server: string): boolean => {
  return offlineMap[server] != undefined;
}

export const dump = (): string => {
  return JSON.stringify(offlineMap);
}

export const clear = (): void => {
  Object.keys(offlineMap).forEach((key) => {
    delete offlineMap[key];
  });
}