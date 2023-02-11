import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LogoIcon from './LogoIcon';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import useFetch from "./useFetch";
import eczanedb from "./denemedb";
import centers from "./cityCenters";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Divider from '@mui/material/Divider';
import FilterIcon from './FilterIcon'

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CallIcon from '@mui/icons-material/Call'
import axios from 'axios';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const MainViewContaier = () => {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    const [mapRef, setMapRef] = React.useState();


    const [alignment, setAlignment] = React.useState('harita');
    const [alignmentFilter, setAlignmentFilter] = React.useState('hepsi');
    const [center, setCenter] = React.useState([37.683664, 38.322966]);
    const [zoom, setZoom] = React.useState(7);


    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleChangeFilter = (event, newAlignment) => {
        if(newAlignment ==='eczane'){
            setActiveData(dataEczane)

        }else if(newAlignment ==='hastane'){
            setActiveData(dataHastane)

        }else if(newAlignment ==='hepsi'){
            setActiveData(allData)
        }
        setAlignmentFilter(newAlignment);
    };

    const CustomToggleButton = styled(ToggleButton)({
        "&.Mui-selected, &.Mui-selected:hover": {
            color: "white",
            backgroundColor: '#FF6464',
        },
        "&.MuiButtonBase-root": {
            textTransform: 'none'
        }
    });



    const CustomToggleButtonFilter = styled(ToggleButton)({

        "&.Mui-selected, &.Mui-selected:hover": {
            color: "white",
            backgroundColor: '#FF6464',
        },
        "&.MuiToggleButton-root": {
            textTransform: 'none',
            color: 'white !important'
        }
    });

    const [activeData, setActiveData] = React.useState(null)

    const [allData, setAllData] = React.useState(null)
    const [dataEczane, setEczane] = React.useState(null)
    const [dataHastane, setHastane] = React.useState(null)
    const [citydata, setCityData] = React.useState(null)


    useEffect(() => {
        axios.get("https://apieczane.afetharita.com/api?type=Hastane").then((response) => {
            setHastane(response.data);
            //setAllData(response.data);

        }).catch((err) => {
            //setError(err)
        })

    }, []);

    useEffect(() => {
        axios.get("https://apieczane.afetharita.com/api?type=Eczane").then((response) => {
            setEczane(response.data);
            //setAllData(response.data);

        }).catch((err) => {
            //setError(err)
        })

    }, []);

    useEffect(() => {
        axios.get("https://apieczane.afetharita.com/api").then((response) => {
            setAllData(response.data);
        }).catch((err) => {
            //setError(err)
        })

    }, []);

    useEffect(() => {
        axios.get("https://apieczane.afetharita.com/api/cityWithDistricts ").then((response) => {
            setCityData(response.data);
        }).catch((err) => {
            //setError(err)
        })

    }, []);


    function CityComponent(props) {
        //const map = useMap();

        return (
            <Box
                sx={{
                    cursor: "pointer",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    textAlign: "center",
                }}
                onClick={() => {
                    mapRef.flyTo([props.lat, props.long], 12);
                }}
            >
                {props.city}
            </Box>
        );
    }

    // useEffect(() => {
    //     console.log("data", allData)
    //     console.log("dataEczane", dataEczane)
    //     console.log("dataHastane", dataHastane)
    // }, [allData, dataEczane, dataHastane])

    const handleChangeCity = (city) => {
        const lat = centers[city]?.lat;
        const lng = centers[city]?.lng;
        mapRef.flyTo([lat, lng], 12);
    };

    return (

        <Paper id='fullheight' sx={{ bgcolor: '#182151', height: '100%', padding: '30px 200 100 200' }} variant="outlined" >
            {/* <Grid sx={{ bgcolor: '#182151', width: '43%', marginLeft: '-51px' }} container>
                <Grid sx={{ display: 'flex', padding: '0 0 0 0' }} item xs={3}>
                    <LogoIcon size={'100%'} color="purple" />
                </Grid>
                <Grid sx={{ display: 'flex', padding: '21px 255px 0 0' }} item xs={9}>
                    <Typography sx={{ color: 'white', fontSize: '25', fontFamily: 'sans-serif' }} mt={2}>
                        Hastaneler ve Eczaneler
                    </Typography>
                </Grid>
            </Grid > */}

            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <img src='/logo.png' alt='logo' style={{ aspectRatio: 'auto', width: '60px' }} />
                <Typography sx={{ color: 'white', fontSize: '25', fontFamily: 'sans-serif' }} >
                    Hastaneler ve <br />Eczaneler</Typography>
            </div>

            <Grid container sx={{ margin: '0 0 0 0' }}>
                <Typography sx={{ color: 'white', fontSize: '50', fontFamily: 'sans-serif' }} mt={10}>
                    <span style={{ color: '#F83B3B', fontWeight: '600' }}>Eczaneler </span>
                    ve <span style={{ color: '#F83B3B', fontWeight: '600' }}>Hastaneler</span> <br />Haritası
                </Typography>
            </Grid>


            <Grid container sx={{ margin: '90 0 40 0' }}>
                <Grid sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    maxWidth: 'unset'

                }} item xs={6}>

                    <ToggleButtonGroup
                        textTransform={'none'}
                        sx={{
                            backgroundColor: 'white',
                            padding: '2',

                        }}
                        color="secondary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <CustomToggleButton value="harita">Haritada Gör</CustomToggleButton>
                        <CustomToggleButton value="liste">Listede Gör</CustomToggleButton>
                    </ToggleButtonGroup>

                </Grid>

                <Grid sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    color: 'white',
                    maxWidth: 'unset'

                }} item xs={6}>

                    <Stack sx={{
                        border: 'solid 0.1px',
                        padding: '7px',
                        borderRadius: '8px',
                    }} direction="row-reverse" spacing={2} divider={<Divider sx={{ backgroundColor: 'white' }} orientation="vertical" flexItem />}
                    >
                        <ToggleButtonGroup
                            sx={{
                                padding: '1',
                            }}
                            value={alignmentFilter}
                            exclusive
                            onChange={handleChangeFilter}
                            aria-label="Platform"
                        >
                            <CustomToggleButtonFilter value="hepsi">Hepsi</CustomToggleButtonFilter>
                            <CustomToggleButtonFilter value="hastane">Hastane</CustomToggleButtonFilter>
                            <CustomToggleButtonFilter value="eczane">Eczane</CustomToggleButtonFilter>

                        </ToggleButtonGroup>

                    </Stack>
                </Grid>
                <Grid item xs={6}></Grid>


            </Grid>

            {
                alignment === 'harita' &&
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    height: '500px',
                    borderRadius: '17px',
                    position: 'relative',

                }}>


                    <MapContainer
                        whenCreated={setMapRef}
                        className="hazir-map"    //class adı kendinize göre ayarlayabilirsiniz isterseniz
                        center={center}    //CENTER BILGINIZ NEREDE İSE ORAYA KOYUNUZ
                        zoom={zoom}                 //ZOOM NE KADAR YAKINDA OLMASINI 
                        maxZoom={17}
                    //maxZoomu kendinize göre ayarlayın
                    >

                        <TileLayer    //Bu kısımda değişikliğe gerek yok
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />


                        <MarkerClusterGroup>
                            {activeData?.data.
                                //Bu kısmı değiştirin kendi datanıza göre stations.map kısmını kendi datanıza göre mydata.map gibi
                                map((station) => {

                                    var adresFormatted = station.address.split(", Türkiye")[0].split(",").pop().split(" ")
                                    var addres = adresFormatted[adresFormatted.length - 1]
                                    return (
                                        <Marker
                                            key={station.id} //key kısmını da kendi datanıza göre ayarlayın mydaya.id gibi
                                            position={[station.latitude, station.longitude]}//Kendi pozisyonunuzu ekleyin buraya stationı değiştirin mydata.adress.latitude mydata.adress.longitude gibi
                                        >

                                            <Popup>
                                                <Box>
                                                    <Stack width="400px" >
                                                        <Box>
                                                            <Stack direction="row" spacing={0} margin="0px" padding="0px 12px">
                                                                <Box padding="3px 4px 0px 0px">
                                                                    <img src="https://cdn.discordapp.com/attachments/1073402852644499537/1073699707299315803/pill.png" width="16px" height="16px" ></img>
                                                                </Box>
                                                                <Typography margin="0px" color={"#F83B3B"}>
                                                                    Eczane
                                                                </Typography>
                                                            </Stack>
                                                        </Box>
                                                        <Typography fontSize="24px" p="0px 12px">{station.name}</Typography>

                                                        <Divider style={{ width: '93.5%', margin: "7px 4px" }} />

                                                        <Stack direction="column">


                                                            <Stack direction="row" padding="3px 0px 0px 7px" justifyContent="space-evenly">
                                                                <Box sx={{ display: "flex", alignItems: 'center' }}>
                                                                    <LocationOnIcon ></LocationOnIcon>
                                                                    <Typography display="flex" padding="3px">{
                                                                        addres
                                                                    }</Typography>
                                                                </Box>

                                                                <Box sx={{ display: "flex", alignItems: 'center' }}>

                                                                    <CallIcon></CallIcon>
                                                                    <a href={'tel:' + station.phone}>{station.phone}</a>
                                                                </Box>

                                                            </Stack>
                                                            <Typography padding="0px 12px" display="absolute" color="#182151">{station.address}</Typography>

                                                        </Stack>
                                                    </Stack>
                                                </Box>
                                            </Popup>
                                        </Marker>

                                    );
                                })}
                        </MarkerClusterGroup>
                    </MapContainer>
                </Box>


            }

            <Box sx={{ flexGrow: 1, marginTop: '30px', height: '500px', overflow: 'auto', textAlign: 'center' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }}>
                    {citydata?.data.map((city, index) => (
                        <Grid item xs={2} sm={4} md={3} key={index}>
                            <Button
                                onClick={() => handleChangeCity(city.key)}
                                sx={{
                                    color: 'white',
                                    border: 'solid 0.5px',
                                    height: '50px',
                                    width: '150px'
                                }} variant="outlined"><span style={{
                                    display: 'block',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis'
                                }}>{`${city.key}`}</span></Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {
                alignment === 'liste' &&
                <Box sx={{ flexGrow: 1, marginTop: '30px', height: '500px', overflow: 'auto', textAlign: 'center' }}>
                    {/* <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}> */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '7.5px',
                        justifyContent: 'center'
                    }}>
                        {activeData?.data.map((item, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
                                <Stack sx={{ backgroundColor: "white", borderRadius: '10px', padding: '5px' }} width="320px" >
                                    <Box>
                                        <Stack direction="row" spacing={0} margin="0px" padding="0px 12px">
                                            <Box padding="3px 4px 0px 0px" >
                                                <img src="https://cdn.discordapp.com/attachments/1073402852644499537/1073699707299315803/pill.png" width="16px" height="16px" ></img>
                                            </Box>
                                            <Typography margin="0px" color={"#F83B3B"}>
                                                Eczane
                                            </Typography>
                                        </Stack>
                                    </Box>
                                    <Typography fontSize="24px" p="0px 12px">
                                        {item.name}
                                    </Typography>

                                    <Divider style={{ width: '93.5%', margin: "7px 4px" }} />

                                    <Stack direction="column">
                                        <Stack direction="row" padding="3x">
                                            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <LocationOnIcon ></LocationOnIcon>
                                                    <Typography display="flex" padding="3px">{item.city}|{item.district}</Typography>
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <CallIcon></CallIcon>
                                                    <a href={item.phone}>{item.phone}</a>
                                                </div>

                                            </div>
                                        </Stack>
                                        <Typography padding="0px 12px" display="absolute" color="#182151">{item.additionalAddressDetails}</Typography>

                                    </Stack>


                                </Stack>
                            </Grid>
                        ))}
                    </div>


                </Box>
            }

        </Paper >

    )
}

export default MainViewContaier