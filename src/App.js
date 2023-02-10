import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
//import MarkerClusterGroup from "react-leaflet-markercluster";
import "./App.css";
import Box from "@mui/material/Box";
import useFetch from "./components/useFetch";
// import eczanedb from "./components/denemedb";
// import centers from "./components/cityCenters";
import MainViewContaier from "./components/MainViewContainer";

//function CityComponent(props) {
//   const map = useMap();

//   return (
//     <Box
//       sx={{
//         cursor: "pointer",
//         backgroundColor: "white",
//         borderRadius: "5px",
//         textAlign: "center",
//       }}
//       onClick={() => {
//         map.flyTo([props.lat, props.long], 12);
//       }}
//     >
//       {props.city}
//     </Box>
//   );
// }

export default function App() {
  const {data, loading, error } = useFetch("https://apieczane.afetharita.com/api/cityWithDistricts ");
  if (loading) return <h1>Yükleniyor</h1>;
  if (error) console.log(error);

  return (
    <MainViewContaier></MainViewContaier>
    // <Box>
    //   {
    //     //Eğer mapin üzerine bir şey eklemek isterseniz buraya ekleyin alttaki kutu bir örnektir uncomment edip bakabilirsiniz
    //   }

    //   {/*<Box>
    //     Bu bir örnek
    // </Box>*/}

    //   <MapContainer
    //     className="hazir-map" //class adı kendinize göre ayarlayabilirsiniz isterseniz
    //     center={[37.683664, 38.322966]} //CENTER BILGINIZ NEREDE İSE ORAYA KOYUNUZ
    //     zoom={7} //ZOOM NE KADAR YAKINDA OLMASINI
    //     maxZoom={17}
    //     //maxZoomu kendinize göre ayarlayın
    //   >
        
    //     <Box
    //       sx={{
    //         position: "absolute",
    //         marginTop: "5px",
    //         top: 0,
    //         right: 20,
    //         zIndex: 1000,
    //         gap: "2px",
    //         display: "flex",
    //         flexDirection: "column",
    //       }}
    //     >
    //       {centers.map((data) => {
    //         return (
    //           <CityComponent {...data} />
    //         );
    //       })}
    //     </Box>


    //     <TileLayer //Bu kısımda değişikliğe gerek yok
    //       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //       attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //     />

    //     <MarkerClusterGroup>
    //       {eczanedb
    //         //Bu kısmı değiştirin kendi datanıza göre stations.map kısmını kendi datanıza göre mydata.map gibi
    //         .map((station) => {
    //           return (
    //             <Marker
    //               key={station.id} //key kısmını da kendi datanıza göre ayarlayın mydaya.id gibi
    //               position={[station.latitude, station.longitude]} //Kendi pozisyonunuzu ekleyin buraya stationı değiştirin mydata.adress.latitude mydata.adress.longitude gibi
    //             >
    //               <Popup>
    //                 {
    //                 // Markerın üzerine tıklandığında açılacak olan kutu burası
    //                 }
    //               </Popup>
    //             </Marker>
    //           );
    //         })}
    //     </MarkerClusterGroup>
    //   </MapContainer>
    // </Box>
  );
}
