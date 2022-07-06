import React from 'react'
import Header from '../../Components/Header/Header';
import Register from '../Register/Register';
import './home.css';
const Home = () => {
  return (
    <div className='home'>
        <Header addEmp={true} list={true}/>
    </div>
  )
}

export default Home