import React  from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

export default function Register() {

    const registerationSchema=yup.object({
        username:yup.string().required(),
        email:yup.string().email().required(),
        password:yup.string().required().min(8),
    })
    const formik=useFormik({
        initialValues:{
            username:"",
            email:"",
            password:"",
        },
        validationSchema:registerationSchema,
        onSubmit:(values)=>{
            console.log(values);
        }

    })
  return (
    <form className='form' onSubmit={formik.handleSubmit}>
        <h1>Register</h1>
        <TextField 
        id="outlined-basic" 
        label="UserName" 
        variant="outlined" 
        values={formik.values.username} 
        onChange={formik.handleChange} 
        name="username"
        onBlur={formik.handleBlur}
        error={formik.touched.username && formik.errors.username}
        helperText={formik.touched.username && formik.errors.username ? formik.errors.username : null}
        />
        <TextField 
        id="outlined-basic" 
        label="Email" 
        variant="outlined" 
        values={formik.values.email} 
        onChange={formik.handleChange} 
        name="email"
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email}
        helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
        />
        <TextField 
        id="outlined-basic" 
        label="Password" 
        variant="outlined" 
        values={formik.values.password} 
        onChange={formik.handleChange} 
        name="password"
        type="password"
        onBlur={formik.handleBlur}
        error={formik.touched.password && formik.errors.password}
        helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
        />
        <Button 
        className='button'
        variant="outlined" 
        type="submit">Register</Button>
        <h5>Already have an account? Click here <Link style={{textDecoration:'none', color:'brown'}}to='/login'>login</Link></h5>
    </form>
  )
}
