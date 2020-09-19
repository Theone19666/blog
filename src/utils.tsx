export const checkIsImage = (imageName: string): boolean => {
  if (!imageName) return false;
  return (
    imageName.includes(".png") ||
    imageName.includes(".jpg") ||
    imageName.includes(".jpeg") ||
    imageName.includes(".gif")
  );
};
