import React from "react";
import car from "./car.png";
import "./RegisterHeader.css";

function RegisterHeader() {
    return (
        <div className="RegisterHeader">
            <div className="underline-wrapper">
                <h1 className="text">FTHNITY</h1>
                <img src={car} alt="car" className="carImage"/>
            </div>
        </div>
    );
}

export default RegisterHeader;