import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import * as postController from "../controllers/post.controller";

const router = Router();

router.post("/", authMiddleware, postController.createPost);
router.get("/:id", authMiddleware, postController.getPostById);
router.get("/", authMiddleware, postController.getAllPosts);
router.put("/:id", authMiddleware, postController.updatePost);
router.delete("/:id", authMiddleware, postController.deletePost);

export default router;
