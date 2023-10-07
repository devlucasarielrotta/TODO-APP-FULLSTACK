import express from 'express'
import morgan from  'morgan';
import cors from    'cors';
import { loginRoutes,tasksRoutes } from '../routes/index.routes.js';
import { dbConnection }            from '../db/config.js';

class Server {
    constructor(){

        this.app  = express();
        this.port = process.env.SERVER_PORT ?? 3001;

        this.paths = {
            tasks:     '/tasks',
            login:     '/login'
        }

        this.conectarDB();
        this.middlewares();
        this.routes();

    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){

        this.app.use(cors());

        this.app.use(express.json());
        
        this.app.use(morgan('dev'));

        this.app.use('/',express.static('public'));
    }

    routes(){
        this.app.use(this.paths.tasks, tasksRoutes)
        this.app.use(this.paths.login, loginRoutes)
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor activado en http://localhost:'+this.port);
        })
       
    }
}

export {
    Server
}