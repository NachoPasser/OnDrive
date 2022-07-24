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

function AddCar() {
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
    }
    
    const handleSubmit = async(event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        console.log(car)
        event.preventDefault();
        await axios.post(`${API_URL}/cars/car/${window.localStorage.getItem('token')}`, {car})

        setValidated(true);
    };
    return (
        <div className={styles.formulario}>
            <Card>
      {/* <Card.Header as="h5">Featured</Card.Header> */}
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
                        placeholder="AA-000"
                        defaultValue=""
                    />
                    <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Este campo no puede ester vacío.
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" onChange={(e) => handleChange(e)}>
                    <Form.Label>Marca</Form.Label>
                    <Form.Control
                        required
                        name='brand'
                        type="text"
                        placeholder="Toyota..."
                        defaultValue=""
                    />
                    <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Este campo no puede ester vacío.
                    </Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">
                        Este campo no puede ester vacío.
                        </Form.Control.Feedback>
                    </InputGroup>
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
                    </Form.Group>
                    <Form.Group as={Col} md="4" onChange={(e) => handleChange(e)}>
                    <Form.Label>Color</Form.Label>
                    <Form.Control type="text" placeholder="Rojo" name='color' required />
                    <Form.Control.Feedback type="invalid">
                        Este campo no puede ester vacío.
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" onChange={(e) => handleChange(e)}>
                    <Form.Label>Fuel</Form.Label>
                    <Form.Control type="text" placeholder="Gas" name='fuel' required />
                    <Form.Control.Feedback type="invalid">
                        Este campo no puede ester vacío.
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" onChange={(e) => handleChange(e)}>
                    <Form.Label>Matrícula</Form.Label>
                    <Form.Control type="text" placeholder="Gas" name='license_plate' required />
                    <Form.Control.Feedback type="invalid">
                        Este campo no puede ester vacío.
                    </Form.Control.Feedback>
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