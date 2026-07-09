import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import AsyncStorage from "@react-native-async-storage/async-storage";


const STORAGE_KEY = "@checkinku_pro";


export default function App() {


  const [started, setStarted] = useState(false);

  const [foto, setFoto] = useState(null);

  const [lokasi, setLokasi] = useState(null);

  const [alamat, setAlamat] = useState("");

  const [cuaca, setCuaca] = useState("");

  const [loading, setLoading] = useState(false);



  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {

    loadData();

  }, []);



  async function loadData(){

    try{

      const data =
      await AsyncStorage.getItem(STORAGE_KEY);


      if(data){

        const json =
        JSON.parse(data);


        setFoto(json.foto);

        setLokasi(json.lokasi);

        setAlamat(json.alamat);

        setCuaca(json.cuaca);

      }

    }

    catch(error){

      console.log(error);

    }

  }



  // =========================
  // SAVE DATA
  // =========================

  async function simpanData(){


    const data={

      foto,

      lokasi,

      alamat,

      cuaca,

      waktu:
      new Date().toLocaleString()

    };


    await AsyncStorage.setItem(

      STORAGE_KEY,

      JSON.stringify(data)

    );


    Alert.alert(
      "Berhasil",
      "Data check-in berhasil disimpan"
    );


  }





  // =========================
  // PILIH FOTO
  // =========================

  function pilihFoto(){


    Alert.alert(

      "Tambah Foto",

      "Pilih sumber foto",

      [

        {
          text:"📸 Kamera",
          onPress:
          ambilKamera
        },


        {
          text:"🖼 Galeri",
          onPress:
          ambilGaleri
        },


        {
          text:"Batal",
          style:"cancel"
        }

      ]

    );

  }





  // =========================
  // CAMERA
  // =========================

  async function ambilKamera(){


    const izin =
    await ImagePicker
    .requestCameraPermissionsAsync();



    if(
      izin.status !== "granted"
    ){

      Alert.alert(

        "Izin Kamera Ditolak",

        "Aktifkan izin kamera untuk mengambil foto.",

        [

          {
            text:"Pengaturan",
            onPress:
            ()=>Linking.openSettings()
          },


          {
            text:"OK"
          }

        ]

      );


      return;

    }




    const hasil =
    await ImagePicker
    .launchCameraAsync({

      allowsEditing:true,

      aspect:[1,1],

      quality:0.8

    });



    if(!hasil.canceled){

      setFoto(
        hasil.assets[0].uri
      );

    }


  }






  // =========================
  // GALERI
  // =========================

  async function ambilGaleri(){


    const izin =
    await ImagePicker
    .requestMediaLibraryPermissionsAsync();



    if(
      izin.status !== "granted"
    ){

      Alert.alert(

        "Izin Galeri Ditolak",

        "Aktifkan izin galeri untuk memilih foto."

      );


      return;

    }





    const hasil =
    await ImagePicker
    .launchImageLibraryAsync({

      allowsEditing:true,

      aspect:[1,1],

      quality:0.8

    });



    if(!hasil.canceled){


      setFoto(

        hasil.assets[0].uri

      );


    }


  }






  // =========================
  // GPS
  // =========================

  async function ambilLokasi(){


    try{


      setLoading(true);



      const izin =
      await Location
      .requestForegroundPermissionsAsync();



      if(
        izin.status !== "granted"
      ){


        Alert.alert(

          "Izin Lokasi Ditolak",

          "Aktifkan lokasi agar check-in dapat menyimpan posisi.",

          [

            {

              text:"Pengaturan",

              onPress:
              ()=>Linking.openSettings()

            }

          ]

        );


        setLoading(false);

        return;

      }




      const posisi =
      await Location
      .getCurrentPositionAsync({

        accuracy:
        Location.Accuracy.High

      });



      const dataLokasi={

        latitude:
        posisi.coords.latitude,


        longitude:
        posisi.coords.longitude

      };



      setLokasi(dataLokasi);





      // Reverse Geocode

      const hasilAlamat =
      await Location
      .reverseGeocodeAsync(
        dataLokasi
      );



      if(hasilAlamat.length){


        const tempat =
        hasilAlamat[0];


        setAlamat(

          `${tempat.city || ""}, ${tempat.country || ""}`

        );


      }




      ambilCuaca(

        dataLokasi.latitude,

        dataLokasi.longitude

      );


    }


    catch(error){

      Alert.alert(
        "Error",
        "Gagal mengambil lokasi"
      );

    }


    finally{

      setLoading(false);

    }


  }






  // =========================
  // WEATHER API
  // =========================

  async function ambilCuaca(
    lat,
    lon
  ){


    try{


      const response =
      await fetch(

`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`

      );



      const json =
      await response.json();




      if(json.current_weather){


        setCuaca(

`${json.current_weather.temperature} °C`

        );


      }


    }


    catch(error){

      console.log(error);

    }


  }





  // =========================
  // GOOGLE MAP
  // =========================

  function bukaMaps(){


    if(!lokasi){

      Alert.alert(
        "Lokasi belum tersedia"
      );

      return;

    }


    const url =

`https://maps.google.com/?q=${lokasi.latitude},${lokasi.longitude}`;



    Linking.openURL(url);


  }





  // =========================
  // DELETE FOTO
  // =========================

  function hapusFoto(){

    setFoto(null);

  }
  // =========================
  // PRIMING SCREEN
  // =========================

  if(!started){

    return(

      <View style={styles.welcomeContainer}>


        <View style={styles.logoCircle}>

          <Text style={styles.logoText}>
            📍
          </Text>

        </View>


        <Text style={styles.welcomeTitle}>
          CheckInKu Pro
        </Text>


        <Text style={styles.welcomeSubtitle}>
          Native Power App
        </Text>



        <View style={styles.infoCard}>


          <Text style={styles.infoTitle}>
            Aplikasi membutuhkan akses:
          </Text>


          <Text style={styles.infoText}>
            📸 Kamera untuk foto check-in{"\n"}
            🖼 Galeri untuk memilih foto{"\n"}
            📍 GPS untuk lokasi{"\n"}
            🌤 Cuaca berdasarkan lokasi
          </Text>


        </View>





        <TouchableOpacity

        style={styles.primaryButton}

        onPress={()=>setStarted(true)}

        >


          <Text style={styles.buttonText}>
            Mulai Check-In
          </Text>


        </TouchableOpacity>


      </View>

    );

  }






  // =========================
  // MAIN APP UI
  // =========================


  return(

    <ScrollView

    contentContainerStyle={styles.container}

    showsVerticalScrollIndicator={false}

    >



      <Text style={styles.header}>
        📍 CheckInKu Pro
      </Text>


      <Text style={styles.subHeader}>
        Selfie • Location • Weather
      </Text>





      <View style={styles.card}>




        {
          foto ?


          <Image

          source={{
            uri:foto
          }}

          style={styles.profileImage}

          />


          :


          <View style={styles.emptyImage}>

            <Text style={styles.emptyText}>
              Belum ada foto
            </Text>


          </View>

        }






        <TouchableOpacity

        style={styles.blueButton}

        onPress={pilihFoto}

        >

          <Text style={styles.buttonText}>
            📸 Tambah Foto
          </Text>


        </TouchableOpacity>






        <TouchableOpacity

        style={styles.greenButton}

        onPress={ambilLokasi}

        >


          {
            loading ?

            <ActivityIndicator color="#fff"/>

            :

            <Text style={styles.buttonText}>
              📍 Ambil Lokasi
            </Text>

          }


        </TouchableOpacity>





        {

        lokasi &&


        <View style={styles.locationBox}>


          <Text style={styles.locationTitle}>
            📍 Informasi Lokasi
          </Text>


          <Text style={styles.locationText}>
            Latitude : {lokasi.latitude.toFixed(5)}
          </Text>


          <Text style={styles.locationText}>
            Longitude : {lokasi.longitude.toFixed(5)}
          </Text>


          <Text style={styles.locationText}>
            Tempat : {alamat}
          </Text>


          <Text style={styles.locationText}>
            Cuaca : {cuaca}
          </Text>


        </View>


        }




        <TouchableOpacity

        style={styles.purpleButton}

        onPress={simpanData}

        >

          <Text style={styles.buttonText}>
            💾 Simpan Check-In
          </Text>


        </TouchableOpacity>






        <TouchableOpacity

        style={styles.orangeButton}

        onPress={bukaMaps}

        >


          <Text style={styles.buttonText}>
            🗺 Buka Google Maps
          </Text>


        </TouchableOpacity>







        {

        foto &&


        <TouchableOpacity

        style={styles.redButton}

        onPress={hapusFoto}

        >

          <Text style={styles.buttonText}>
            🗑 Hapus Foto
          </Text>


        </TouchableOpacity>


        }





      </View>




    </ScrollView>


  );

}







// =========================
// STYLE
// =========================


const styles = StyleSheet.create({



welcomeContainer:{

flex:1,

backgroundColor:"#eef7ff",

alignItems:"center",

justifyContent:"center",

padding:30

},



logoCircle:{

width:90,

height:90,

borderRadius:45,

backgroundColor:"#0984e3",

alignItems:"center",

justifyContent:"center",

marginBottom:20

},



logoText:{

fontSize:45

},



welcomeTitle:{

fontSize:32,

fontWeight:"bold",

color:"#023047"

},



welcomeSubtitle:{

fontSize:18,

color:"#457b9d",

marginBottom:25

},



infoCard:{

backgroundColor:"#fff",

padding:20,

borderRadius:20,

width:"100%",

shadowColor:"#000",

shadowOpacity:0.1,

shadowRadius:10,

elevation:5

},



infoTitle:{

fontWeight:"bold",

fontSize:17,

marginBottom:10

},



infoText:{

fontSize:15,

lineHeight:25

},



container:{

backgroundColor:"#eef7ff",

alignItems:"center",

padding:20,

paddingBottom:50

},



header:{

fontSize:30,

fontWeight:"bold",

color:"#023047",

marginTop:20

},



subHeader:{

fontSize:15,

color:"#457b9d",

marginBottom:20

},



card:{

backgroundColor:"#fff",

width:"100%",

borderRadius:25,

padding:20,

alignItems:"center",

shadowColor:"#000",

shadowOpacity:0.12,

shadowRadius:10,

elevation:6

},



profileImage:{

width:190,

height:190,

borderRadius:95,

marginBottom:20

},



emptyImage:{

width:190,

height:190,

borderRadius:95,

backgroundColor:"#dfe6e9",

alignItems:"center",

justifyContent:"center",

marginBottom:20

},



emptyText:{

color:"#636e72"

},




primaryButton:{

backgroundColor:"#0984e3",

padding:16,

borderRadius:15,

width:"90%"

},



blueButton:{

backgroundColor:"#0984e3",

padding:15,

borderRadius:15,

width:"90%",

marginTop:15

},



greenButton:{

backgroundColor:"#00b894",

padding:15,

borderRadius:15,

width:"90%",

marginTop:15

},



purpleButton:{

backgroundColor:"#6c5ce7",

padding:15,

borderRadius:15,

width:"90%",

marginTop:15

},



orangeButton:{

backgroundColor:"#e17055",

padding:15,

borderRadius:15,

width:"90%",

marginTop:15

},



redButton:{

backgroundColor:"#d63031",

padding:15,

borderRadius:15,

width:"90%",

marginTop:15

},



buttonText:{

color:"#fff",

fontWeight:"bold",

textAlign:"center",

fontSize:16

},



locationBox:{

backgroundColor:"#e8f8f5",

width:"100%",

borderRadius:15,

padding:15,

marginTop:20

},



locationTitle:{

fontWeight:"bold",

fontSize:17,

color:"#00695c",

marginBottom:10

},



locationText:{

fontSize:14,

marginBottom:5

}


});