export const generateUniqueID = () => {
  const CONVERSION_BASE = 36;
  const BLOCK_LENGTH = 7;
  const genUniqueIDBlock = () => Date.now().toString(CONVERSION_BASE);
  const genRandomStringBlock = () => Math.random().toString(CONVERSION_BASE).substring(BLOCK_LENGTH);

  return `${genUniqueIDBlock()}${genRandomStringBlock()}`;
};
