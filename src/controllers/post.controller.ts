import type { Request, Response } from "express";
import * as postService from "../services/post.service";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, category } = req.body;

    const authorId = (req as any).user.userId; // Get user ID from auth middleware
    const post = await postService.postBlog(title, content, authorId, category);
    if (!post) {
      return res.status(400).json({ message: "Failed to create post" });
    }
    return res.status(201).json({ post, message: "Post created successfully" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id as string;
    const post = await postService.getBlogById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postService.getAllBlogs();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id as string;
    const { title, content, category } = req.body;
    const post = await postService.updateBlog(postId, title, content, category);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ post, message: "Post updated successfully" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id as string;
    const post = await postService.deleteBlog(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ post, message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
