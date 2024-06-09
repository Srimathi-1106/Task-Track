import './App.css';
import AddTask from './components/AddTask';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import { Routes, Route } from 'react-router-dom';
import EditTask from './components/EditTask';
import TaskList from './components/TaskList';
import Portal from './components/Portal';
import NotFound from './components/NotFound';
import Home from './components/Home';

function App() {

  const [mode,setMode]=useState("dark");

  const darkTheme = createTheme({
    palette: {
      mode:mode,
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Paper style={{minHeight:"100vh", borderRadius:"0%"}} elevation={9}>
          <Routes>
            {/* <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/> */}
            <Route path="/" element={<Portal mode={mode} setMode={setMode}/>}>
              <Route path="home" element={<Home/>}/>
              <Route path="tasklist" element={<TaskList/>}/>
              <Route path="addtask" element={<AddTask/>}/>
              <Route path="edittask/:id" element={<EditTask/>}/>
              <Route path="movielist" element={<TaskList/>}/>
            </Route>

            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Paper>
      </ThemeProvider>
      
    </div>
  );
}

export default App;
