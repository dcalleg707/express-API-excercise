import { Router, Response, Request } from "express";
import { PostRepository } from "../database/repositories/PostRepository";
export class PostController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getAllPosts = async (req: Request, res: Response, next: Function) => {
        PostRepository.find().then(posts => {
            res.send(posts);
        }).catch(error => {
            next(error);
        });
    }

    public getPostById = async (req: Request, res: Response, next: Function) => {
        PostRepository.findOneBy({ id: Number(req.params.id) }).then(post => {
            if (!post) throw new Error("Post not found");
            res.send(post);
        }).catch(error => {
            next(error);
        });
    }

    public createPost = async (req: Request, res: Response, next: Function) => {
        const newPost = PostRepository.create(req.body)
        PostRepository.save(newPost).then(results => {
            res.status(201).send(results);
        }).catch(error => {
            next(error);
        });
    }

    public updatePost = async (req: Request, res: Response, next: Function) => {
        PostRepository.findOneBy({ id: Number(req.params.id) }).then(post => {
            if (!post) throw new Error("Post not found");
            PostRepository.merge(post, req.body);
            return PostRepository.save(post)
        }).then(results => {
            res.send(results);
        }).catch(error => {
            next(error);
        });
    }

    public deletePost = async (req: Request, res: Response, next: Function) => {
        PostRepository.delete(req.params.id).then(results => {
            if (results.affected === 0) throw new Error("Post not found");
            res.send(results);
        }).catch(error => {
            next(error);
        });
    }

    public routes() {
        this.router.get("/", this.getAllPosts);
        this.router.get("/:id", this.getPostById);
        this.router.post("/", this.createPost);
        this.router.put("/:id", this.updatePost);
        this.router.delete("/:id", this.deletePost);
    }
}