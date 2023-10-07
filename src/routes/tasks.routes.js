import {Router} from 'express';
import { getAllTasks,getTask,postTask,putTask,deleteTask } from '../controllers/index.controller.js';

const router = Router();

router.get('/',getAllTasks);

router.get('/:id',getTask);

router.post('/',postTask);

router.put('/:id',putTask);

router.delete('/:id',deleteTask);


export default router;