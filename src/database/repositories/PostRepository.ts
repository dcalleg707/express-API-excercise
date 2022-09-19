import AppDataSource from "../../data-source";
import { Post } from "../entities/Post";

export const PostRepository = AppDataSource.getRepository(Post);