import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForm() {
  const navigate = useNavigate();
  const params = useParams();
  const[task,setTask] = useState({
    title:'',
    task:''
  });
  const [loading,setLoading] = useState(false);
  const [editing,setEditing] = useState(false);

  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    
  
    if(editing){
      await fetch(`http://localhost:8000/tasks/${params.id}`,{
      method:'PUT',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(task),
    });
    } else {
        await fetch('http://localhost:8000/tasks',{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify(task),
      });

    }
  
   
    setLoading(false);

    navigate('/')
  }
  
  const handleChange = e => {
    setTask({...task,[e.target.name]:e.target.value})
  }

  const loadTask = async(id) => {
    const res = await fetch(`http://localhost:8000/tasks/${Number(id)}`)
    const {Tasks} = await res.json()
   
    const {title,description} = Tasks[0];
    
    setTask({title,description})
    setEditing(true)
 
  
  }

  useEffect(() => {
    if(params.id){
      loadTask(params.id);
    }
  },[params.id])

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={3}> {/* Ajusta el ancho del Card aquí */}
        <Card sx={{ mt: 5}} style={{
          backgroundColor:"#1e272e",
          padding:"1rem",
        }}>
          <Typography variant="5" textAlign='center' color='white'>
           {editing ? "Edit Task":"Create Task"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField 
                variant="filled" 
                label="write your title" 
                sx={{
                  display: 'block', 
                  margin:'.5rem 0'
                }}
                value={task.title}
                name='title'
                onChange={handleChange}
                inputProps={{style:{color:"white"}}}
                InputLabelProps={{style:{color:"white"}}}
                
              />
              <TextField 
                variant="filled" 
                label="write your description"
                multiline
                rows={4}
                value={task.description}
                sx={{
                  display: 'block', 
                  margin:'.5rem 0'
                }}
                name="description"
                onChange={handleChange}
                inputProps={{style:{color:"white"}}}
                InputLabelProps={{style:{color:"white"}}}
              />
              <Button 
              
                variant='contained' 
                color='primary' 
                type='submit'
                disabled={!task.title || !task.description}
              >
                {loading ? <CircularProgress
                    color='inherit'
                    size={24}
                />:"SAVE"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
