import React, { useState } from 'react';
import axios from "axios";
import { API_URL } from '../../../config/enviroment';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import styles from './AddCar.module.css';


function ControlFeedback(input) {
    const marcas = ['Toyota', 'Honda', 'Chevrolet', 'Ford', 'Nissan', 'Hyundai', 'Kia', 'Mazda', 'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 'Renault', 'Peugeot', 'Citroen', 'Seat', 'Opel', 'Suzuki', 'Mitsubishi', 'Daihatsu', 'Fiat', 'Volvo', 'Jeep', 'Land Rover', 'Dodge', 'Lexus', 'Subaru', 'Maserati', 'Porsche', 'Jaguar', 'Jeep', 'Land Rover', 'Dodge', 'Lexus', 'Subaru', 'Maserati', 'Porsche', 'Jaguar', 'Jeep', 'Land Rover', 'Dodge', 'Lexus', 'Subaru', 'Maserati', 'Porsche', 'Jaguar', 'Jeep', 'Land Rover', 'Dodge', 'Lexus', 'Subaru', 'Maserati', 'Porsche', 'Jaguar', 'Jeep', 'Land Rover', 'Dodge', 'Lexus', 'Subaru', 'Maserati', 'Porsche', 'Jaguar', 'Jeep', 'Land Rover', 'Dodge', 'Lexus', 'Subaru', 'Maserati', 'Porsche', 'Jaguar', 'Jeep', 'Land Rover', 'Dodge', 'Lexus', 'Subaru', 'Maserati', 'Porsche', 'Jaguar', 'Jeep', 'Land Rover', 'Dodge', 'Lexus', 'Subaru', 'Maserati', 'Porsche', 'Jaguar', 'Jeep', 'Land Rover', 'Dodge', 'Lexus', 'Subaru', 'Maserati', 'Porsche', 'Jaguar', 'Jeep', 'Land Rover', 'Dodge', 'Lexus', 'Subaru', 'Maserati', 'Porsche', 'Jaguar', 'Jeep', 'Land Rover', 'Dodge', 'Lexus', 'Subaru', 'Maserati', 'Porsche', 'Jaguar', 'Jeep', 'Land Rover', 'Dodge', 'Lexus', 'Subaru', 'Maserati', 'Porsche']
    const reg = new RegExp('^[A-Z]{3}-[0-9]{3}$');
    const regYear = new RegExp('^(20|[1-2][0-9]){2}$');
    let errors = {};
    if(!reg.test(input.license_plate)) errors.license_plate = 'Debe ingresar una placa valida';
    if(!regYear.test(input.year)) errors.year = 'Debe ingresar un año valido';
    if(!marcas.includes(input.brand)) errors.brand = 'Debe ingresar un marca válido';
    if(!input.brand) errors.brand = 'Debe ingresar una marca';
    if(!input.model) errors.model = 'Debe ingresar un modelo';
    if(!input.year) errors.year = 'Debe ingresar un año';
    if(!input.license_plate) errors.license_plate = 'Debe ingresar una placa';
    if(!input.color) errors.color = 'Debe ingresar un color';
    if(!input.fuel) errors.fuel = 'Debe ingresar un tipo de combustible';
    if(!input.type) errors.type = 'Debe ingresar un tipo de vehiculo';
    
    return errors;
}


function AddCar() {
    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState(false);
    const [car, setCar] = useState({
        model: "",
        type: "",
        year: "",
        color: "",
        license_plate: "",
        fuel: "",
        img: "",
        brand: "",
    });

    const handleChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
        setErrors(ControlFeedback({
            ...car,
            [event.target.name]: event.target.value
        }));
    }
    
    const handleSubmit = async(event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        console.log(car.img)
        event.preventDefault();
        await axios.post(`${API_URL}/cars`, {car}, {headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }})

        setValidated(true);
    };
    return (
        <div className={styles.formulario}>
            <Card>
            <Card.Body>
                <Card.Title>Formulario para registrar vehículo</Card.Title>
                <br/>
                <Card.Text>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" onChange={(e) => handleChange(e)}>
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control
                        required
                        name='model'
                        type="text"
                        placeholder="308"
                        defaultValue=""
                    />
                    <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                    {errors.model && <Form.Text className='text-danger'>{errors.model}</Form.Text>}
                    </Form.Group>
                    <Form.Group as={Col} md="4" onChange={(e) => handleChange(e)}>
                    <Form.Label>Marca</Form.Label>
                    <Form.Control
                        required
                        name='brand'
                        type="text"
                        placeholder="Peugeot"
                        defaultValue=""
                    />
                    <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid" tooltip>
                    </Form.Control.Feedback>
                        {errors.brand && <Form.Text className="text-danger">{errors.brand}</Form.Text>}
                    </Form.Group>
                    <Form.Group as={Col} md="4" onChange={(e) => handleChange(e)}>
                    <Form.Label>Tipo de coche</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                        type="text"
                        name='type'
                        placeholder="Compacto"
                        aria-describedby="inputGroupPrepend"
                        required
                        />
                    </InputGroup>
                        {errors.type && <Form.Text className="text-danger">{errors.type}</Form.Text>}
                    </Form.Group>
                    <br/><br/><br/><br/>
                {/* </Row>
                <Row className="mb-3"> */}
                    <Form.Group as={Col} md="4" onChange={(e) => handleChange(e)}>
                    <Form.Label>Año</Form.Label>
                    <Form.Control type="text" placeholder="2019" required name='year'/>
                    <Form.Control.Feedback type="invalid">
                        Este campo no puede ester vacío.
                    </Form.Control.Feedback>
                    {errors.year && <Form.Text className="text-danger">{errors.year}</Form.Text>}
                    </Form.Group>
                    <Form.Group as={Col} md="4" onChange={(e) => handleChange(e)}>
                    <Form.Label>Color</Form.Label>
                    <Form.Control type="text" placeholder="Gris" name='color' required />
                    {errors.color && <Form.Text className="text-danger">{errors.color}</Form.Text>}
                    </Form.Group>
                    <Form.Group as={Col} md="4" onChange={(e) => handleChange(e)}>
                    <Form.Label>Combustible</Form.Label>
                    <Form.Control type="text" placeholder="Gasoil" name='fuel' required />
                    {errors.fuel && <Form.Text className="text-danger">{errors.fuel}</Form.Text>}
                    </Form.Group>
                    <Form.Group as={Col} md="6" onChange={(e) => handleChange(e)}>
                    <Form.Label>Matrícula</Form.Label>
                    <Form.Control type="text" placeholder="AAA-000" name='license_plate' required />
                    <Form.Control.Feedback type="invalid">
                        Este campo no puede ester vacío.
                    </Form.Control.Feedback>
                    {errors.license_plate && <Form.Text className="text-danger">{errors.license_plate}</Form.Text>}
                    </Form.Group>
                </Row>
                <Form.Group controlId="formFile" className="mb-3" onChange={(e) => handleChange(e)}>
                    <Form.Label>Agregué una foto del coche</Form.Label>
                    <Form.Control type="file" name='img' accept="image/x-png,image/gif,image/jpeg" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check
                    required
                    label="Aceptar los términos y condiciones"
                    feedback="Debes aceptar antes de registrar tu coche"
                    feedbackType="invalid"
                    />
                    <a href="/terms&condicions">Ver términos y condiciones</a>
                </Form.Group>
                <Button required variant="primary" type="submit">Registrar</Button>
                </Form>
                </Card.Text>
            </Card.Body>
            </Card>
        </div>
    );
}


export default AddCar;