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
//prueba
// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng,
// } from "use-places-autocomplete";
import Comparador from './FuelComponents/18-Comparador';
import DiseñoMágico from './FuelComponents/40-DiseñoMágico';

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
    const [newTool, setNewTool] = useState(true)
    const [fuels, setFuels] = useState()

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
            <Box position='fixed' left={1000} top={100} h='50%' w='46%'>
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
                    {/* <Marker position={center} /> */}
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
            </Box>
            <Box
                position="fixed"
                left={1000}
                top={580}
                border={"3px solid orangered"}
                p={4}
                borderRadius='lg'
                m={4}
                bgColor='#252C38;'
                color='wheat'
                shadow='base'
                minW='container.md'
                zIndex='1'
                marginTop='160px'
            >{/*PARA MODIFICAR EL ANCHO DEL BOX DE CALCULOS, VER WIDTH -> */}
                <HStack spacing={2} justifyContent='space-between' width="1000px" >
                    <Box flexGrow={1}>
                        <Autocomplete>
                            <Input width="100%"  type='text' placeholder='Origin' ref={originRef} />
                        </Autocomplete>
                    </Box>
                    <Box flexGrow={1}>
                        <Autocomplete>
                            <Input color="red"
                                type='text' width='100%'
                                placeholder='Destination'
                                ref={destiantionRef}
                            />
                        </Autocomplete>
                    </Box>

                    <ButtonGroup>
                        <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
                            Calcule su ruta
                        </Button>
                        <IconButton
                            aria-label='center back'
                            icon={<FaTimes />}
                            onClick={clearRoute}
                        />
                    </ButtonGroup>
                </HStack>
                <HStack spacing={4} mt={4} justifyContent='space-between'>
                    <div><Text>Distancia: {distance} </Text></div>
                    <div><Text>Duración: {duration} </Text></div>
                    <IconButton
                        aria-label='center back'
                        icon={<FaLocationArrow />}
                        isRound
                        onClick={() => {
                            map.panTo(center)
                            map.setZoom(15)
                        }}
                    />
                </HStack> {
                // newTool ?
            <div style={{'backgroundColor':'#252C38', 'color':'wheat'}}>
                {/* <Comparador distance={distance} setPrice={setPrice} setFuels={setFuels}/> */}
            </div>
            }{
            // :
            <div>
                <DiseñoMágico distance={distance} setPrice={setPrice} />
            </div>
            }
            </Box>
        </Flex>
        {/* <button onClick={()=>newTool? setNewTool(false): setNewTool(true)}
        style={{"marginRight": "500px"}}>
            Change tool
        </button> */}
        </div>
    )
}