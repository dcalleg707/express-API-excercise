export class PostService {

    constructor() { }

    public async index() {
        return "index from service";
    }

    public async create() {
        return "Create from service";
    }

    public async update() {
        return "Update from service";
    }

    public async delete() {
        return "Delete from service";
    }
}