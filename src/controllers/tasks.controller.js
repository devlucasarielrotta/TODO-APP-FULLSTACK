import { db } from "../db/config.js"

const getAllTasks = async ( req,res) => {
 try {
    const result = await db.query('SELECT * FROM task ORDER BY ID')
    res.status(200).json({
        msg:'Listado de tareas',
        Total: result.rowCount,
        Tasks: result.rows,
    })
 }catch(error){
    console.log(error);
    res.status(500).json({
        Error: error.message
    })
 }
 
}

const getTask = async ( req,res) => {
    const {id} = req.params;
    try {
        const result = await db.query('SELECT * FROM task WHERE id = $1',[id])
        res.status(200).json({
            msg:'Listado de tareas',
            Total: result.rowCount,
            Tasks: result.rows,
        })
     }catch(error){
        console.log(error);
        res.status(500).json({
            Error: error.message
        })
     }
}

const postTask = async ( req,res) => {
    const task = req.body;
    const {title,description} = task;

    try {
        const result = await db.query(
            "INSERT INTO task (title,description) VALUES ($1,$2) RETURNING *",
            [title,description]
        )

        res.status(200).json({
            msg:'Tarea insertada correctamente',
            Task: result.rows[0] 
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            Error: error.message
        })
    }
}

const deleteTask = async ( req,res) => {
    const {id} = req.params;
    

    try {
        const result = await db.query(
            "DELETE FROM task WHERE ID = $1",
            [id]
        )

        res.status(200).json({
            msg:'Tarea Eliminada correctamente',
            Task: result.rows[0] 
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            Error: error.message
        })
    }
}

const putTask = async ( req,res) => {
    const {id} = req.params;
    const {title, description} = req.body;

    try {
        const result = await db.query(
            "UPDATE  task SET title = $1, description=$2 WHERE id = $3",
            [title,description,id]
        )

        res.status(200).json({
            msg:'Tarea Modificada correctamente',
            Task: result
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            Error: error.message
        })
    }
}

export {
    deleteTask,
    getAllTasks,
    getTask,
    postTask,
    putTask
}