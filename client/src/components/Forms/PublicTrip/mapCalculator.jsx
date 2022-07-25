
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
import Comparador from '../../Map/FuelComponents/18-Comparador'
import PublicTrip from './PublicTrip'
//prueba
// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng,
// } from "use-places-autocomplete";
// import Comparador from './FuelComponents/18-Comparador';

const center = { lat: -34.60376, lng: -58.38162 }

export default function MapCalculator() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDDKqN7npMAhG-jYGX7TOz4waQth923OXc",
        libraries: ['places'],
    })

    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    // console.log(distance)

    const [price, setPrice] = useState()
    // if(price) console.log('price desde 46', price)

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
            <Comparador distance={distance} price='' setPrice={setPrice}/>
            {/*PARA MODIFICAR EL ANCHO DEL BOX DE CALCULOS, VER WIDTH -> */}
            <br></br>
            <h1>Publicar viaje</h1>
                <HStack spacing={4} mt={4} justifyContent='space-between'>
                    <div><Text style={{ 'fontSize': '21px'}} color={distance ? "yellowgreen": 'rgb(165,165,165)'}>Distancia: {distance} </Text></div>
                    <div><Text style={{ 'fontSize': '21px'}} color={duration ? "yellowgreen": 'rgb(165,165,165)'}>Duración: {duration} </Text></div>
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
            <div style={{'backgroundColor':'#252C38', 'color':'wheat'}}>
            </div>
                <HStack spacing={2} justifyContent='space-between' width="90%">
                    <Box flexGrow={1}>
                        <label style={{'color': 'rgb(165,165,165)', 'fontSize': '22px'}}>Origen</label>
                        <Autocomplete>
                            <Input width="100%"  borderRadius="8px"
                                height="49px" type='text' 
                                placeholder='Ingresa una ubicación' ref={originRef} 
                                backgroundColor="rgb(230,230,230)" fontSize='24px'
                                padding="3px 13px" color="rgb(40,40,40)"
                            />
                        </Autocomplete>
                    </Box>
                    <Box flexGrow={1}>
                        <label style={{'color': 'rgb(165,165,165)', 'fontSize': '22px'}}>Destino</label>
                        <Autocomplete>
                            <Input height="49px" borderRadius="8px"
                                type='text' width="100%"
                                placeholder='Ingresa una ubicación'
                                ref={destiantionRef}
                                backgroundColor="rgb(230,230,230)" fontSize='24px'
                                padding="3px 13px" color="rgb(40,40,40)"
                            />
                        </Autocomplete>
                    </Box>

                    <ButtonGroup>
                        <Button colorScheme='pink' type='submit' onClick={calculateRoute}
                            margin='16px -2px auto -1px' borderRadius='6px' color="rgb(40,40,40)"
                            backgroundColor="rgb(230,230,230)">
                            Calcular ruta
                        </Button>
                        <IconButton
                            aria-label='center back' padding='2px'
                            icon={<FaTimes />} borderRadius='6px'
                            onClick={clearRoute} backgroundColor='red'
                            height='30px' margin='16px auto auto 0px' 
                        />
                    </ButtonGroup>
                </HStack>
            <div>
                <PublicTrip origin={originRef && originRef} 
                destination={destiantionRef && destiantionRef} 
                price={price && price} 
                distance={distance && distance}
                />
            </div>
            </Box>
        </Flex>
        </div>
    )
}