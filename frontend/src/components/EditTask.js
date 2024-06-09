import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import * as yup from 'yup';
import { API } from '../global';

function EditTask() {
    const {id}=useParams();
    // console.log(id);
    const [task,setTask]=useState([]);
    const [show,setShow]=useState(false);

    useEffect(()=>{
        fetch(`${API}/getone/${id}`,{   //https://65f16b78034bdbecc762700b.mockapi.io/Movies/${id}
            method:"GET"
        })
        .then((data)=>data.json())
        .then((tsk)=>setTask(tsk))
        .then(()=>setShow(true))
    },[]);

    // console.log(movie);
  return (
    <div>
      {show ? <EditForm task={task}/>:"Loading..."}
    </div>
  )
}

export default EditTask

function EditForm({task}){

    console.log(task);

    const taskValidationSchema = yup.object({
        title: yup.string().required(),
        description: yup.string().required().min(10),
        due: yup.date()
    .transform((value, originalValue) => {
      const parts = originalValue.split('/');
      if (parts.length === 3) {
        const [dd, mm, yyyy] = parts.map(part => parseInt(part, 10));
        if (!isNaN(dd) && !isNaN(mm) && !isNaN(yyyy)) {
          // Convert to a valid date object
          const parsedDate = new Date(yyyy, mm - 1, dd);
          // Check if the parsed date is valid
          if (parsedDate && parsedDate.getFullYear() === yyyy && (parsedDate.getMonth() + 1) === mm && parsedDate.getDate() === dd) {
            return parsedDate;
          }
        }
      }
      // Return an invalid date if parsing fails
      return new Date('');
    })
    .typeError('Invalid date format. Please use dd/mm/yyyy format.')
    .required('Due date is required'),
    });
    

    const formik= useFormik({
        initialValues:{
            title:task.title,
            description:task.description,
            due:task.due,
        },

        validationSchema : taskValidationSchema,

        onSubmit:(updatedValues) => {
            editTask(updatedValues);
        }
    })

    const navigate = useNavigate();

    const editTask = (updatedValues) =>{
        fetch(`${API}/update/${task._id}`,{
            method:"PUT",
            body:JSON.stringify(updatedValues),
            headers:{"Content-Type":"application/json"},
        }).then(()=>navigate("/tasklist"))
    }

    
  return (
    <div>
      <form className='form' onSubmit={formik.handleSubmit}>
        <h1>Edit Task</h1>
        <TextField 
        id="outlined-basic" 
        label="Title" 
        variant="outlined" 
        value={formik.values.title} 
        onChange={formik.handleChange} 
        name="title"
        onBlur={formik.handleBlur}
        error={formik.touched.title && formik.errors.title}
        helperText={formik.touched.title && formik.errors.title ? formik.errors.title : null}
        />

        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          maxRows={5}
          value={formik.values.description} 
          onChange={formik.handleChange} 
          name="description"
          onBlur={formik.handleBlur}
          error={formik.touched.description && formik.errors.description}
          helperText={formik.touched.description && formik.errors.description ? formik.errors.description : null}
        />

        <TextField 
        id="outlined-basic" 
        label="Due Date" 
        variant="outlined" 
        value={formik.values.due} 
        onChange={formik.handleChange} 
        name="due"
        onBlur={formik.handleBlur}
        error={formik.touched.due && formik.errors.due}
        helperText={formik.touched.due && formik.errors.due ? formik.errors.due : null}
        />

        <Button 
        className="button"
        variant="outlined" 
        type="submit">Edit Task</Button>

      </form>
    </div>
  )
}