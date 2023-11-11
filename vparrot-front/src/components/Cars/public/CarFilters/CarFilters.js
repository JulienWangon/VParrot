import React, { useState } from 'react';
import useFetchCarFilterData from '../../hooks/useFetchCarFilterData';

import TextInput from '../../../common/Input/TextInput/TextInput';
import SelectInput from '../../../common/Input/SelectInput/SelectInput';
import Button from '../../../common/Buttons/Button/Button';

import './carFilters.css';
import H2Title from '../../../common/H2Title/H2Title';

const CarFilters = ({ onApplyFilter, onResetFilter}) => {

    const { filterData, loading, error } = useFetchCarFilterData();
    const [filters, setFilters] = useState({
        brand: '',
        model: '',
        fuel: '',
        transmission: '',
        yearMin: '',
        kmMax: ''
    });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value});
    }

    const handleSubmit = () => {
        onApplyFilter(filters);
    }

    const handleReset = () => {
        setFilters({
          brand: '',
          model: '',
          fuel: '',
          transmission: '',
          yearMin: '',
          kmMax: ''
        });

        onResetFilter();
    }

    return (
        <section className="filtersSection">
        
            <H2Title className="filtersTitle" h2Text="Filtres de recherche"/>

            {loading && <p>Chargement des filtres...</p>}
            {error && <p>Erreur de chargement: {error}</p>}

            <div className="filtersList">
                <SelectInput
                    inputClassName="inputFilter"
                    label="Marque"
                    name="brand"
                    value={filters.brand}
                    onChange={handleChange}
                    options={[{ id: '', value: '', label: 'Choisir une marque' }, ...filterData.brands.map(brandObj => ({ id: brandObj.brand, value: brandObj.brand, label: brandObj.brand }))]}
                />

                <SelectInput
                    inputClassName="inputFilter"
                    label="Modèle"
                    name="model"
                    value={filters.model}
                    onChange={handleChange}
                    options={[{ id: '', value: '', label: 'Choisir un modèle' }, ...filterData.models.map(modelObj => ({ id: modelObj.model, value: modelObj.model, label: modelObj.model }))]}
                />

                <SelectInput
                    inputClassName="inputFilter"
                    label="Carburant"
                    name="fuel"
                    value={filters.fuel}
                    onChange={handleChange}
                    options={[{ id: '', value: '', label: 'Choisir un carburant' }, ...filterData.fuelTypes.map(fuelObj => ({ id: fuelObj.fuel, value: fuelObj.fuel, label: fuelObj.fuel }))]}         
                />

                <SelectInput
                    inputClassName="inputFilter"
                    label="Transmission"
                    name="transmission"
                    value={filters.transmission}
                    onChange={handleChange}
                    options={[{ id: '', value: '', label: 'Choisir une transmission' }, ...filterData.transmissionTypes.map(transmissionObj => ({ id:transmissionObj.transmission, value: transmissionObj.transmission, label: transmissionObj.transmission }))]}    
                />

                <TextInput
                    inputClassName="inputFilter"
                    label="Année Min"
                    name="yearMin"
                    type="number"
                    value={filters.yearMin}
                    onChange={handleChange}          
                />

                <TextInput
                    inputClassName="inputFilter"
                    label="Kilométrage Max"
                    name="kmMax"
                    type="number"
                    value={filters.kmMax}
                    onChange={handleChange}          
                />
            </div>

            <div className="filterActions">
                    <Button onClick={handleSubmit} className="applyFilterBtn" colorStyle='redBtn'>Appliquer</Button>
                    <Button onClick={handleReset} className="resetFilterBtn" colorStyle='whiteBtn'>Réinitialiser</Button>
            </div>

        </section>
    );
};

export default CarFilters;