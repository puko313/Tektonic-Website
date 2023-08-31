export const getItemFromLocalStorage = (
  key: string,
  isJson: boolean = false
): JSON | string => {
  const storageItem: string | null = localStorage.getItem(key);
  if (storageItem === null) return "";
  return isJson ? JSON.parse(storageItem) : storageItem;
};

export const setItemInLocalStorage = (
  key: string,
  item: any,
  isStringify: boolean = false
): void => {
  const entry = isStringify ? JSON.stringify(item) : item;
  localStorage.setItem(key, entry);
};

export const removeItemFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = (): void => {
  localStorage.clear();
};
