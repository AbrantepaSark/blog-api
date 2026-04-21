import * as postQuery from "../queries/post.query";

export const postBlog = async (
  title: string,
  content: string,
  authorId: string,
  category: string,
) => {
  const post = await postQuery.createPost(title, content, authorId, category);
  return post;
};

export const getBlogById = async (id: string) => {
  const post = await postQuery.getPostById(id);
  return post;
};

export const getAllBlogs = async () => {
  const posts = await postQuery.getAllPosts();
  return posts;
};

export const updateBlog = async (
  id: string,
  title: string,
  content: string,
  category: string,
) => {
  const post = await postQuery.updatePost(id, title, content, category);
  return post;
};

export const deleteBlog = async (id: string) => {
  const post = await postQuery.deletePost(id);
  return post;
};
