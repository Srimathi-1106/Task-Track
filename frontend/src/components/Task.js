import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { API } from '../global';

export default function Task({ tasks, getTasks }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteTask = (id) => {
    fetch(`${API}/delete/${id}`, {
      method: "DELETE"
    })
      .then(() => getTasks())
      .then(() => alert("This task has been deleted!"));
  };

  return (
    <div>
      <Card className='task-container'>
        <CardContent className='card'>
          <div className='task-spec'>
            <h2 className='task-name'>{tasks.title}</h2>
            <IconButton color="error" aria-label="Task-info" onClick={handleClickOpen}>
              <InfoIcon fontSize="small" />
            </IconButton>
          </div>
          <div className='task-summary'>
            <p>{tasks.description}</p>
          </div>
        </CardContent>
        <CardActions className="card-actions">
          <div ><span className='due-date'>Due: </span>{tasks.due}</div>
          <div className="icon-buttons">
            <IconButton aria-label="editTask" onClick={() => navigate(`/edittask/${tasks._id}`)}>
              <EditIcon color="error" />
            </IconButton>
            <IconButton aria-label="deleteTask" onClick={() => deleteTask(tasks._id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </div>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{tasks.title}</DialogTitle>
        <DialogContent dividers>
          <p><strong>Description:</strong> {tasks.description}</p>
          <p><strong>Due:</strong> {tasks.due}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Close
          </Button>
          <Button onClick={() => navigate(`/edittask/${tasks._id}`)} color="error">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}






