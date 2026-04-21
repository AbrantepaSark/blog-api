import { pool } from "../db";

//creare a post
export const createPost = async (
  title: string,
  content: string,
  authorId: string,
  category: string,
) => {
  const result = await pool.query(
    "INSERT INTO posts (title, content, authorid, category) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, content, authorId, category],
  );
  return result.rows[0];
};

//get a post by id
export const getPostById = async (id: string) => {
  const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
  return result.rows[0];
};

//get all posts
export const getAllPosts = async () => {
  const result = await pool.query("SELECT * FROM posts");
  return result.rows;
};

//update a post
export const updatePost = async (
  id: string,
  title: string,
  content: string,
  category: string,
) => {
  const result = await pool.query(
    "UPDATE posts SET title = $1, content = $2, category = $3 WHERE id = $4 RETURNING *",
    [title, content, category, id],
  );
  return result.rows[0];
};

//delete a post
export const deletePost = async (id: string) => {
  const result = await pool.query(
    "DELETE FROM posts WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
};
