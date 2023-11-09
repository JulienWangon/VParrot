import React from 'react';

import DetailsList from '../DetailsList/DetailsList';
import Button from '../../../common/Buttons/Button/Button';

import './carsCard.css';

const CarsCard = ({ car }) => {
  return (
    <div className="carCards">

        <div className="carImgContainer">
            <img className="carImg" src={car.file_path} alt={`${car.brand} ${car.model}`}/>
        </div>

        <div className="carNameContainer">
            <span className="carName">{car.brand} {car.model}</span>
            <span className="tradeName">{car.trade_name}</span>
        </div>

        <DetailsList features={{
            years: car.years,
            fuel: car.fuel,
            power: car.power,
            kilometer: car.kilometer,
            transmission: car.transmission,
            body: car.body
        }}/>

        <div className="priceContainer">
            {car.price}
        </div>

        <div className="carDetailsBtn">
            <Button className="openCarModal" colorStyle="redBtn">Détails</Button>
        </div>

    </div>
  );
};

export default CarsCard;