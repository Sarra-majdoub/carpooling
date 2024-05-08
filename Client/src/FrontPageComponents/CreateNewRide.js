import React, { useState } from 'react';
import axios from "axios";
import './CreateNewRide.css';
import img from './cross.png';
import { closeModal } from '../reducers/showModalReducer';
import { useDispatch, useSelector } from 'react-redux';
import {UserReducer} from "../reducers/UserReducer";

const CreateNewRide = (props) => {
    const dispatch = useDispatch();
   // const user = useSelector((state) => state.UserReducer.user);
    const user = localStorage.getItem("userId");
    console.log("user",user);
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');
    const [time, setTime] = useState('');
    const [seats, setSeats] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!fromCity || !toCity || !date || !time || !price || !seats) {
            alert('All fields must be filled out');
            return;
        }
        const data = new FormData();
        data.append("action", "createRide");
        data.append("departure", fromCity);
        data.append("id" , user);
        data.append("arrival", toCity);
        data.append("date", date);
        data.append("time", time);
        data.append("seats", seats);
        data.append("price", price);
        data.append("description", "");
        try {
            console.log(data);
            const response = await axios.post(
                "http://localhost/Server/api.php",
                data
            );
            console.log(response);
            if (response.status === 200) {
                console.log("New ride registered successfully");
                handleCloseModal();
                props.onNewRideCreated();
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again later.");
            return;
        }
    };
    const handleCloseModal = () => {
        dispatch(closeModal());
    }
    return (
        <div className="modal-overlay">
            <div className="new-ride-form">
                <div className="row">
                <h2>Create New Ride</h2>
                    <img onClick={() => handleCloseModal()}  src={img} alt="cross" className="cross" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="h_line"></div>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="fromCity">From</label>
                                <input
                                    type="text"
                                    id="fromCity"
                                    value={fromCity}
                                    onChange={(e) => setFromCity(e.target.value)}
                                    placeholder="Enter starting city"
                                />
                        </div>
                        <div className="column-right">
                            <label htmlFor="toCity">To</label>
                            <input
                                type="text"
                                id="toCity"
                                value={toCity}
                                onChange={(e) => setToCity(e.target.value)}
                                placeholder="Enter destination city"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="date">On</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="column">
                            <label htmlFor="time">At</label>
                            <input
                                type="time"
                                id="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
                        <div className="column-right">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="seats">Seats</label>
                        <input
                            type="number"
                            id="seats"
                            className="seats"
                            value={seats}
                            onChange={(e) => setSeats(e.target.value)}
                        />
                    <button type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNewRide;