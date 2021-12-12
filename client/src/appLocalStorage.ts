const usedDragAndDropKey = 'usedDragAndDrop';

export const getUsedDragAndDrop = () =>
  localStorage.getItem(usedDragAndDropKey);

export const setUsedDragAndDrop = (value: boolean) =>
  localStorage.setItem(usedDragAndDropKey, value.toString());
