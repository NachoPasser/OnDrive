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

import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'
import style from './map.module.css'
import sent from '../../assets/Home/sent.png'
import origin from '../../assets/Home/ubicacion.png'
import destination from '../../assets/Home/destino.png'
//prueba
// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng,
// } from "use-places-autocomplete";
import Comparador from './FuelComponents/18-Comparador';

const {GOOGLE_MAPS_API_KEY} = process.env
// console.log(GOOGLE_MAPS_API_KEY)
const center = { lat: -34.60376, lng: -58.38162 }

export default function Map() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyDDKqN7npMAhG-jYGX7TOz4waQth923OXc',// GOOGLE_MAPS_API_KEY, // 
        libraries: ['places'],
    })

    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [price, setPrice] = useState()


    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()


    if (!isLoaded) {
        return <SkeletonText />
    }


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

    }


    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destiantionRef.current.value = ''
    }

    return (
        <div>
        <Flex
            position='relative'
            flexDirection='column'
            alignItems='center'
            h='85vh'
            w='100vw'
        >
            <div className={style.map}>
                {/* Google Map Box */}
                <GoogleMap
                    center={center}
                    zoom={14}
                    mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '20px'}}
                    options={{
                        zoomControl: true,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                        
                    }}
                    onLoad={map => setMap(map)}
                >
                    {/* <Marker position={center} /> */}
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
                <div id={style.distanceDuration}>
                <HStack spacing={40} mt={4} justifyContent='space-around'>
                    <div><Text color="black">Distancia: {distance} </Text></div>
                    <div><Text color="black" >Duración: {duration} </Text></div>
                    {/* <IconButton
                        aria-label='center back'
                        icon={<FaLocationArrow />}
                        isRound
                        onClick={() => {
                            map.panTo(center)
                            map.setZoom(15)
                        }}
                    /> */}
                </HStack>
                </div>
            </div>
            <div id={style.originDestination}>
                <HStack justifyContent='center' width="609px">
                    <img id={style.originImg} src={origin} alt="" />
                    <div className={style.containerInput}>
                        <Autocomplete>
                            <input id={style.inputOrigin} type='text' placeholder='Origen' ref={originRef} />
                        </Autocomplete>
                    </div>
                    <img id={style.destinationImg} src={destination} alt="" />
                    <div className={style.containerInput}>
                        <Autocomplete>
                            <input id={style.inputDestination} type='text' placeholder='Destino' ref={destiantionRef} />
                        </Autocomplete>
                    </div>

                    <ButtonGroup position="absolute" right={-60}>
                        <Button backgroundColor='#FED428' borderRadius="10px" border={'none'}width={'50px'} height={'46px'} paddingRight={2} type='submit' onClick={calculateRoute}>
                            <img src={sent} alt="" width={33} height={35} />
                        </Button>
                        {/* <IconButton
                            aria-label='center back'
                            icon={<FaTimes />}
                            onClick={clearRoute}
                        /> */}
                    </ButtonGroup>
                </HStack>
            </div>
            
            <div className={style.calculator}>
                <Comparador style={style} distance={distance} setPrice={setPrice}/>
            </div>
        </Flex>
        </div>
    )
}