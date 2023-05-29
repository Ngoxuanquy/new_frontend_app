import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { firebase } from '../.././config/config'
import AsyncStorage from '@react-native-async-storage/async-storage';


// laays duwx ảnh từ bộ sưu tập

export default function ChupAnh({ route }) {

    const URL = 'http://192.168.1.101:3000/v1/api';

    const { ordersId } = route.params;

    console.log(ordersId)

    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();
    const [type, setType] = useState(CameraType.back);

    const [permission, requestPermission] = Camera.useCameraPermissions();


    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }

    //lấy id từ AsyncStorage
    const getID = async () => {
        try {
            const id = await AsyncStorage.getItem('id');
            console.log('Token đã được lấy thành công');
            return id;
        } catch (error) {
            console.log('Lỗi khi lấy token: ', error);
        }
    };

    //lấy token từ AsyncStorage
    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            console.log('Token đã được lấy thành công');
            return token;
        } catch (error) {
            console.log('Lỗi khi lấy token: ', error);
        }
    };

    const createImages = async (url) => {


        const accessToken = await getToken()
        const id = await getID()

        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "d420e946ae282dfadafede6b060ae66e3ffd2a9cddfe3dc9b4cd070f98ad4985aeab65e2751677f21f91f34c2a22a1f95bf0b330fd2eb0dfb2c1fb53a7c8d97a",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },
            body: JSON.stringify({
                name: "quy",
                contact_id: ordersId.toString(),
                order_id: ordersId,
                img: url,
            })

        };

        // Viết mã kiểm tra token đã hết hạn
        fetch(URL + '/orderimages/create', requestOptions)

    }


    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };

    const uploadImage = async () => {
        // setUploading(true)
        const response = await fetch(photo.uri)
        const blob = await response.blob()
        const filename = photo.uri.substring(photo.uri.lastIndexOf('/') + 1)
        let refs = firebase.storage().ref().child(`photo/${filename}`).put(blob)

        refs.then((a) => a.ref.getDownloadURL().then((url) => {
            console.log(url)
            createImages(url)
        }))

        try {
            await refs
        } catch (error) {
            console.log(error)
        }
        // setUploading(false)
        // Alert.alert('Photo uploaded')
        setPhoto(null)
    }


    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
        // console.log('a')
    }
    if (photo) {
        let sharePic = () => {
            shareAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };

        let savePhoto = () => {
            uploadImage();

            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };

        return (
            <SafeAreaView style={styles.container}>
                {/* <Text>1</Text> */}
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                <Button title="Share" onPress={sharePic} />
                {hasMediaLibraryPermission ? <Button title="Lưu Vào Ảnh" onPress={savePhoto} /> : undefined}
                <Button title="Hủy" onPress={() => setPhoto(undefined)} />
                {/* <Button onPress={requestPermission} title="grant permission" /> */}

            </SafeAreaView>
        );
    }



    return (

        <Camera style={styles.container} ref={cameraRef} type={type}>

            <StatusBar style="auto" />
            <View style={styles.buttonContainer}>
                {/* <View style={styles.buttonContainer}> */}
                {/* <Button title="Take Pic" /> */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={takePic}
                >
                    <Ionicons name='camera-outline' style={{
                        fontSize: 50,
                        color: 'white'

                    }}
                    />
                </TouchableOpacity>
                {/* </View> */}
                <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                    <Ionicons name='sync-outline' style={{
                        fontSize: 50,
                        color: 'white'

                    }} />
                </TouchableOpacity>
            </View>
        </Camera>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: '#fff',
        alignSelf: 'flex-end'
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        zIndex: 1
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        zIndex: 1
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
});