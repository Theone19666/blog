export function checkIsImage(imageName: string) {
  if (!imageName) return false;
  return (
    imageName.includes(".png") ||
    imageName.includes(".jpg") ||
    imageName.includes(".jpeg") ||
    imageName.includes(".gif")
  );
}

export const initialPostState = {
  author: {
    username: "",
    bio: "",
    image: "",
    following: false,
  },
  title: "",
  slug: "",
  body: "",
  createdAt: "",
  updatedAt: "",
  tagList: [],
  description: "",
  user: "",
  favorited: false,
  favoritesCount: 0,
};
