import { Router, Response, Request } from "express";
import { PostRepository } from "../database/repositories/PostRepository";
export class PostController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getAllPosts = async (req: Request, res: Response) => {
        PostRepository.find().then(posts => {
            res.send(posts);
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public getPostById = async (req: Request, res: Response) => {
        PostRepository.findOneBy({ id: Number(req.params.id) }).then(post => {
            if (!post) throw new Error("Post not found");
            res.send(post);
        }).catch(error => {
            res.status(500).json(error.message);
        });
    }

    public createPost = async (req: Request, res: Response) => {
        console.log(req.body);
        const newPost = await PostRepository.create(req.body)
        PostRepository.save(newPost).then(results => {
            res.send(results);
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public updatePost = async (req: Request, res: Response) => {
        const post = await PostRepository.findOneBy({ id: Number(req.params.id) });
        if (!post) {
            res.status(404).send("Post not found");
            return;
        }
        PostRepository.merge(post, req.body);
        PostRepository.save(post).then(results => {
            res.send(results);
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public deletePost(req: Request, res: Response) {
        PostRepository.delete(req.params.id).then(results => {
            res.send(results);
        }).catch(error => {
            res.status(500).send(error);
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