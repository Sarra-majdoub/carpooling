import React, { useEffect, useState } from 'react'
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import Slider from '@mui/material/Slider';
import { openModal } from '../reducers/showModalReducer';
import { useDispatch } from 'react-redux';
import {setPlaces, setCurrency, setRating} from "../reducers/filtersReducer";
import "../App.css";
function SideBar() {
  const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const handleAddNewCarpooling = () => {
      dispatch(openModal());
    }
  return (
    <div className='flex flex-col gap-4 ml-4 side-bar'>
      <button className='add-btn' onClick={()=> handleAddNewCarpooling()}>+ Start your own car pooling</button>
        <div className='flex flex-col mr-6 gap-1'>
        <p className='pricing'>Max Pricing</p>
        <div className='flex gap-4'>
          <div className='flex flex-col gap-1'>
                <input type="text" onChange={(e) => dispatch(setCurrency(e.target.value))}
              style={{ backgroundColor: "#F3F4F6", width: "103px", height: "35px" }}
                />
            </div>
        </div>
        </div>
      <div className='flex flex-col gap-1'>
        <h2 className='places'>Places Available</h2>
        <Slider
          min={1}
          max={7}
          step={1}
          marks={true}
          valueLabelDisplay="auto"
          className="custom-slider slid" 
          style={{ width: '228px', height: '6px', maxWidth: '100%' }}
          onChange={(e) => dispatch(setPlaces(e.target.value))}
        />
    </div>
    <div className='flex flex-col'>
    <h2 className='mr-12 mb-1 review'>Review</h2>
        <div className='flex gap-1 '>
    <input type="radio" name="review" className='inp' onChange={() => dispatch(setRating(5))}/>
    <label><div className='flex star'><FaStar /> <FaStar /> <FaStar />  <FaStar />  <FaStar />  </div></label>
    </div>
        <div className='flex gap-1 '>
    <input className='inp' type="radio" name="review" onChange={()=> dispatch(setRating(4))}/>
    <label><div  className='flex star' ><FaStar /> <FaStar /> <FaStar />  <FaStar /> <CiStar /> </div></label>
    </div>
        <div className='flex gap-1'>
          <input type="radio" name="review" className='inp' onChange={()=> dispatch(setRating(3))}/>
    <label><div className='flex star'><FaStar /> <FaStar /> <FaStar /> <CiStar /> <CiStar /> </div></label>
    </div>
        <div className='flex gap-1'>
          <input type="radio" name="review" className='inp' onChange={()=> dispatch(setRating(2))}/>
    <label><div  className='flex star'><FaStar /> <FaStar /> <CiStar /> <CiStar /> <CiStar /> </div></label>
    </div>
        <div className='flex gap-1' >
          <input type="radio" name="review" className='inp' onChange={()=> dispatch(setRating(1))}/>
    <label><div  className='flex star'><FaStar />  <CiStar /> <CiStar /> <CiStar /> <CiStar /> </div></label>
    </div>
      </div>
      
    </div>

  )
}

export default SideBar
