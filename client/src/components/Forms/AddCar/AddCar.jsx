import React from "react";
import axios from "axios";
import { API_URL } from '../../../config/enviroment';

class AddCar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            car: {
                model: "",
                type: "",
                year: "",
                color: "",
                license_plate: "",
                fuel: "",
                img: "",
                brand: "",
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => ({
            car: {
                ...prevState.car,
                [name]: value
            }
        }));
    }
    async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.car);
        await axios.post(`${API_URL}/cars/car/${window.localStorage.getItem('token')}`, {car: this.state.car})
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Modelo:
                        <input type="text" name="model" value={this.state.car.model} onChange={this.handleChange} placeholder='Modelo' />
                    </label>
                    <label>
                        Tipo:
                        <input type="text" name="type" value={this.state.car.type} onChange={this.handleChange} placeholder='Tipo' />
                    </label>
                    <label>
                        Año:
                        <input type="text" name="year" value={this.state.car.year} onChange={this.handleChange} placeholder='Año' />
                    </label>
                    <label>
                        Marca: 
                        <input type="text" name="brand" value={this.state.car.brand} onChange={this.handleChange} placeholder='Marca' />
                    </label>
                    <label>
                        Color:
                        <input type="text" name="color" value={this.state.car.color} onChange={this.handleChange} placeholder='Color' />
                    </label>
                    <label>
                        Placa:
                        <input type="text" name="license_plate" value={this.state.car.license_plate} onChange={this.handleChange} placeholder='licensia' />
                    </label>
                    <label>
                        Combustible:
                        <input type="text" name="fuel" value={this.state.car.fuel} onChange={this.handleChange} placeholder='Combustible' />
                    </label>
                    <label>
                        Imagen:
                        <input type="text" name="img" value={this.state.car.img} onChange={this.handleChange} placeholder='Imagen' />
                    </label>
                    <input type="submit" value="Submit" onSubmit={this.handleSubmit}/>
                </form>
            </div>  
        )
    }
}

export default AddCar;