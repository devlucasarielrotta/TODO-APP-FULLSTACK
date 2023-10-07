import {Router} from 'express';

const router = Router();

router.get('/',(req,res) => {
    res.send(`Hello  ${id}`);
})



router.get('/:id',(req,res) => {
    res.send(`Hello  ${id}`);
})


export default router;