
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import { useField } from '../../../hooks/useInputField';
import InputField from '../../Sections/InputField/InputField';
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from '@react-google-maps/api'
import { useEffect, useRef, useState } from 'react'
import Comparador from '../../Map/FuelComponents/18-Comparador'
import styles from './mapCalculator.module.css'
import PublicTrip from './PublicTrip'
import NavBarDrivers from '../../NavBar/navbarDrivers'
import DiseñoMágico from '../../Map/FuelComponents/40-DiseñoMágico';
//prueba
// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng,
// } from "use-places-autocomplete";
// import Comparador from './FuelComponents/18-Comparador';

const {GOOGLE_MAPS_API_KEY} = process.env
const center = { lat: -34.60376, lng: -58.38162 }

export default function MapCalculator() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey:"AIzaSyDDKqN7npMAhG-jYGX7TOz4waQth923OXc",// GOOGLE_MAPS_API_KEY,//
        libraries: ['places'],
    })

    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [errors, setErrors] = useState({
        origin: 'Lugar de origen requerido.',
        destination: 'Lugar de destino requerido.',
        startDate: '',
        capacity: '',
        price: 'Calcule el precio.',
        car: 'Seleccione un auto.',
    })
    const [disabled, setDisabled] = useState('')
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [price, setPrice] = useState('')
    

    if(!distance && price) {
        setErrors('Calcule el precio.')
        setPrice(0)
        setDisabled(false)
    }

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()
    
    if (!isLoaded) {
        return <SkeletonText />
    }
    
    // console.log(originRef.current && originRef.current.value)
    // console.log(destiantionRef.current && destiantionRef.current.value)

    async function calculateRoute() {
        if (originRef.current.value === '' || destiantionRef.current.value === '') {
            return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destiantionRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
        setDisabled(true)
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        setDisabled(false)
        originRef.current.value = ''
        destiantionRef.current.value = ''
    }

    console.log(duration, typeof duration)

    return (
        <div>
            <NavBarDrivers publish={false} create={false} passenger={false} />
            <Flex
                position='relative'
                flexDirection='column'
                alignItems='center'
                height='150vh'
                w='100vw'
            >
                <Box position='relative' left={10} top={10} h='40%' w='90%'>
                    {/* Google Map Box */}
                    <GoogleMap
                        center={center}
                        zoom={14}
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        options={{
                            zoomControl: true,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                        }}
                        onLoad={map => setMap(map)}
                    >
                        <Marker position={center} />
                        {directionsResponse && (
                            <DirectionsRenderer directions={directionsResponse} />
                        )}
                    </GoogleMap>
                </Box>
                <Box
                    position="relative"
                    left={10}
                    top={10}
                    width='90%'
                    border={"3px solid wheat"}
                    p={4}
                    borderRadius='lg'
                    m={4}
                    bgColor='#252C38;'
                    color='wheat'
                    shadow='base'
                    minW='container.md'
                    zIndex='1'
                >
                    {/* <Comparador distance={distance} price='' setPrice={setPrice} /> */}
                    <div style={{border: '1px solid white'}}>
                        <DiseñoMágico distance={typeof distance=== "string" && distance} price='' setPrice={setPrice}/>
                        {/* price='' setPrice={setPrice} */}
                    </div>
                    {/*PARA MODIFICAR EL ANCHO DEL BOX DE CALCULOS, VER WIDTH -> */}
                    <br></br>
                    <h1>Publicar viaje</h1>
                    <HStack spacing={4} mt={4} justifyContent='space-between'>
                        <div><Text style={{ 'fontSize': '21px' }} color={distance ? "yellowgreen" : 'rgb(165,165,165)'}>Distancia: {distance} </Text></div>
                        <div><Text style={{ 'fontSize': '21px' }} color={duration ? "yellowgreen" : 'rgb(165,165,165)'}>Duración: {duration} </Text></div>
                        <IconButton
                            aria-label='center back'
                            icon={<FaLocationArrow />}
                            isRound
                            onClick={() => {
                                map.panTo(center)
                                map.setZoom(15)
                            }}
                        />
                    </HStack>
                    <div style={{ 'backgroundColor': '#252C38', 'color': 'wheat' }}>
                    </div>
                    <HStack spacing={2} justifyContent='space-between' width="90%">
                        <Box flexGrow={1}>
                            <label style={{ 'color': 'rgb(165,165,165)', 'fontSize': '22px' }}>Origen</label>
                            <Autocomplete>
                                <Input
                                    style={{'height':'48px', 'borderRadius': '7px', 'color': 'rgb:(40,40,40,)', 'backgroundColor': 'rgb(230,230,230)'}}
                                    type='text'
                                    readOnly={disabled}
                                    placeholder='Ingresa una ubicación' 
                                    ref={originRef}
                                    className={styles.InputField}
                                    onChange={() => {
                                        if(!originRef.current.value) setErrors({...errors, origin: 'Lugar de destino requerido'})
                                        else setErrors({...errors, origin: ''})
                                    }}
                                />
                            </Autocomplete>
                            {errors.origin ? <span className={styles.ErrorInputField}>{errors.origin}</span> : null}
                        </Box>
                        <Box flexGrow={1}>
                            <label style={{ 'color': 'rgb(165,165,165)', 'fontSize': '22px' }}>Destino</label>
                            <Autocomplete>
                                <Input 
                                    type='text' 
                                    placeholder='Ingresa una ubicación'
                                    readOnly={disabled}
                                    ref={destiantionRef}
                                    className={styles.InputField}
                                    onChange={() => {
                                        if(!destiantionRef.current.value) setErrors({...errors, destination: 'Lugar de destino requerido'})
                                        else setErrors({...errors, destination: ''})
                                    }}
                                />
                            </Autocomplete>
                            {errors.destination ? <span className={styles.ErrorInputField}>{errors.destination}</span> : null}
                        </Box>

                        <ButtonGroup>
                            <Button colorScheme='pink' type='submit' onClick={calculateRoute}
                                margin='16px -2px auto -1px' borderRadius='6px' color="rgb(40,40,40)"
                                backgroundColor="rgb(230,230,230)">
                                Calcular ruta
                            </Button>
                            <IconButton
                            aria-label='center back'
                            icon={<FaTimes />}
                            onClick={clearRoute}
                            />
                        </ButtonGroup>
                    </HStack>
                    <div>
                        <PublicTrip origin={originRef && originRef}
                            destination={destiantionRef && destiantionRef}
                            errors={errors}
                            setErrors={setErrors}
                            price={price && price}
                            distance={typeof distance==="string" && distance}
                            duration={duration && duration}
                        />
                    </div>
                </Box>
            </Flex>
        </div>
    )
}