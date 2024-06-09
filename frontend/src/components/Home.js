import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate= useNavigate();
  return (
    <div className="home-container">
        <div>
            <div className="row">
                <div className="col1">
                    <div><span className="home-text">Organize your Tasks</span></div>
                    <div><span className="home-text">using Task Manager!</span></div>
                    <Button variant="contained" className="button home-button" onClick={()=>navigate("/tasklist")}>Start Now!</Button>
                </div>
                <div className="col2">
                    <img src="https://webstockreview.net/images/clipart-writing-jot.png" alt="Task Manager Image"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
