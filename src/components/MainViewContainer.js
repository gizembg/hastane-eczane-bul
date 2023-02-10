import React from 'react'
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

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const buttonClicked = {
        "& .MuiButton-root": {
            backgroundColor: '#FF6464'
        }
    };

    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
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


    const CustomButton = styled(Button)({
        "&.Mui-selected, &.Mui-selected:hover": {
            color: "white",
            backgroundColor: '#FF6464',
        },
        "&.MuiButtonBase-root": {
            textTransform: 'none'
        }
    });
    return (

        <Paper id='fullheight' sx={{ bgcolor: '#182151', height: '100%', padding: '30px 200 100 200' }} variant="outlined" >
            <Grid sx={{ bgcolor: '#182151', width: '43%', marginLeft: '-51px' }} container>
                <Grid sx={{ display: 'flex', padding: '0 0 0 0' }} item xs={3}>
                    <LogoIcon size={'100%'} color="purple" />
                </Grid>
                <Grid sx={{ display: 'flex', padding: '21px 255px 0 0' }} item xs={9}>
                    <Typography sx={{ color: 'white', fontSize: '25', fontFamily: 'sans-serif' }} mt={2}>
                        Hastaneler ve Eczaneler
                    </Typography>
                </Grid>
            </Grid >

            <Grid container sx={{ margin: '0 0 0 0', width: '28%' }}>
                <Typography sx={{ color: 'white', fontSize: '25', fontFamily: 'sans-serif' }} mt={2}>
                    Bölgelerde Bulunan <span style={{ color: 'red' }}>Eczaneler </span>
                    ve <span style={{ color: 'red' }}>Hastaneler</span> Haritası
                </Typography>

            </Grid>



            <Grid container sx={{ margin: '90 0 40 0' }}>
                <Grid sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                }} item xs={6}>

                    <ToggleButtonGroup
                    textTransform= {'none'}
                    sx={{backgroundColor: 'white',
                        padding:'1',

                    }}
                        color="secondary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <CustomToggleButton value="web">Haritada Gör</CustomToggleButton>
                        <CustomToggleButton value="android">Listede Gör</CustomToggleButton>
                    </ToggleButtonGroup>

                </Grid>

                <Grid sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    color: 'white'
                }} item xs={6}>

                    <Stack sx={{
                        border: 'solid 0.1px',
                        padding: '7px',
                        borderRadius: '8px',
                        color: 'white',
                    }} direction="row-reverse" spacing={2} divider={<Divider sx={{ backgroundColor: 'white' }} orientation="vertical" flexItem />}
                    >
                        <CustomButton variant="text">Eczane</CustomButton>
                        <Button sx={{
                            textTransform: 'unset'
                        }} variant="text">Hastane</Button>
                        <Button sx={{
                            textTransform: 'unset'
                        }} variant="text">Hepsi</Button>
                        <FilterIcon></FilterIcon>

                    </Stack>
                </Grid>
                <Grid item xs={6}></Grid>


            </Grid>


            <Box sx={{
                width: '100%',
                display: 'flex',
                height: '500px',
                borderRadius: '17px',
                position: 'relative'
            }}>
                <MapContainer
                    className="hazir-map" //class adı kendinize göre ayarlayabilirsiniz isterseniz
                    center={[37.683664, 38.322966]} //CENTER BILGINIZ NEREDE İSE ORAYA KOYUNUZ
                    zoom={7} //ZOOM NE KADAR YAKINDA OLMASINI
                    maxZoom={17}
                //maxZoomu kendinize göre ayarlayın
                >

                    <Box
                        sx={{
                            position: "absolute",
                            marginTop: "5px",
                            top: 0,
                            right: 20,
                            zIndex: 1000,
                            gap: "2px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* {centers.map((data) => {
                        return (
                            <CityComponent {...data} />
                        );
                    })} */}
                    </Box>


                    <TileLayer //Bu kısımda değişikliğe gerek yok
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />

                    <MarkerClusterGroup>
                        {eczanedb
                            //Bu kısmı değiştirin kendi datanıza göre stations.map kısmını kendi datanıza göre mydata.map gibi
                            .map((station) => {
                                return (
                                    <Marker
                                        key={station.id} //key kısmını da kendi datanıza göre ayarlayın mydaya.id gibi
                                        position={[station.latitude, station.longitude]} //Kendi pozisyonunuzu ekleyin buraya stationı değiştirin mydata.adress.latitude mydata.adress.longitude gibi
                                    >
                                        <Popup>
                                            {
                                                // Markerın üzerine tıklandığında açılacak olan kutu burası
                                            }
                                        </Popup>
                                    </Marker>
                                );
                            })}
                    </MarkerClusterGroup>
                </MapContainer>
            </Box>


            <Box sx={{ flexGrow: 1, marginTop: '30px', height: '500px', overflow: 'auto', textAlign: 'center' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {Array.from(Array(24)).map((_, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Button variant="outlined">Kayseri</Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Paper >

        //   <div>
        //     <div>
        //       <button
        //         aria-label="Increment value"
        //         onClick={() => dispatch(increment())}
        //       >
        //         +
        //       </button>
        //       <span>{count}</span>
        //       <button
        //         aria-label="Decrement value"
        //         onClick={() => dispatch(decrement())}
        //       >
        //         -
        //       </button>
        //     </div>
        //     {/* omit additional rendering output here */}
        //   </div>
    )
}

export default MainViewContaier