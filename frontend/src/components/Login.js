import React from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

export default function Login() {
    const loginSchema=yup.object({
        email:yup.string().email().required(),
        password:yup.string().required().min(8),
    })
    const formik=useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema:loginSchema,
        
        onSubmit:(values)=>{
            console.log(values);
        }
    })
  return (
    <form className='form' onSubmit={formik.handleSubmit}>
        <h1>Login</h1>
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
        type="password"
        variant="outlined" 
        values={formik.values.password} 
        onChange={formik.handleChange} 
        name="password"
        onBlur={formik.handleBlur}
        error={formik.touched.password && formik.errors.password}
        helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
        />
        <Button 
        className='button'
        variant="outlined" 
        type="submit">Login</Button>
        <h5>Don't have an account? Click here to <Link style={{textDecoration:'none' , color:'brown'}}to='/register'> register</Link></h5>
    </form>
  )
}
