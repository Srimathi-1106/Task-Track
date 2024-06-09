import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { API } from '../global';

function AddTask() {

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
            title:"",
            description:"",
            due:"",
        },

        validationSchema : taskValidationSchema,

        onSubmit:(values) => {
            addTask(values);
        }
    })

    const navigate = useNavigate();

    const addTask = (values) =>{
        fetch(`${API}/post`,{
            method:"POST",
            body:JSON.stringify(values),
            headers:{"Content-Type":"application/json"},
        }).then(()=>navigate("/tasklist"))
    }

    
  return (
    <div>
      <form className='form' onSubmit={formik.handleSubmit}>
        <h1>Add Task</h1>
        <TextField 
        id="outlined-basic" 
        label="Title" 
        variant="outlined" 
        values={formik.values.title} 
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
          values={formik.values.description} 
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
        values={formik.values.due} 
        onChange={formik.handleChange} 
        name="due"
        onBlur={formik.handleBlur}
        error={formik.touched.due && formik.errors.due}
        helperText={formik.touched.due && formik.errors.due ? formik.errors.due : null}
        />

        <Button 
        className="button"
        variant="outlined" 
        type="submit">Add Task</Button>

      </form>
    </div>
  )
}

export default AddTask
