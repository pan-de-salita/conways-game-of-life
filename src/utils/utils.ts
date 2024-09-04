export const ROWS = 30;
export const COLS = 50;

export const createEmptyGrid = () => {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
};
