import { Card, CardContent, Typography, Button, TextField, Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [foundTasksCount, setFoundTasksCount] = useState(0); 

  const loadTasks = async () => {
    const response = await fetch("http://localhost:8000/tasks");
    const {  Tasks } = await response.json();
    setTasks(Tasks);
  };

  const filteredTasks = tasks.filter((task) =>
    task.id.toString().toLowerCase().includes(searchId.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/tasks/${id}`, {
        method: 'DELETE',
      });

      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    // Actualiza el contador de tareas encontradas según la longitud de filteredTasks
    setFoundTasksCount(filteredTasks.length);
  }, [searchId, tasks]);

  return (
    <>
      <h1>Task List</h1>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h6">Search Task by ID</Typography>
        </Grid>
        <Grid item xs={3.5}>
          <TextField
            label="ID"
            variant="outlined"
            fullWidth
            size="small" // Puedes ajustar el tamaño aquí (small, medium, large)
            onChange={(e) => setSearchId(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
      <h2>Total de tareas: {foundTasksCount}</h2>
      {filteredTasks.map((task) => (
        <Card
          key={task.id}
          style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ color: "white" }}>
              <Typography>{task.title}</Typography>
              <Typography>{task.description}</Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => {navigate(`/tasks/${task.id}/edit`)}}
              >
                Edit
              </Button>
              <Button
                style={{ marginLeft: "0.5rem" }}
                variant="contained"
                color="warning"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
