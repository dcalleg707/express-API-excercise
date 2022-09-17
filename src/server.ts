import express, { Request, Response } from 'express';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.configuration();
        this.routes();
    }

    public configuration() {
        this.app.set('port', process.env.PORT || 3000);
    }

    public routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Hello World!');
        });
    }

    public start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}