

import React, { useEffect, useState } from 'react'
import { View, Text, Alert, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { getStorage, ref, listAll } from 'firebase/storage'

import * as ImagePicker from 'expo-image-picker'

import { firebase } from '../../config/config'

function Upload() {


    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [url, setUrl] = useState('')

    const pickerImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        })

        const source = { uri: result.assets[0].uri }

        setImage(source)
    }

    const uploadImage = async () => {
        setUploading(true)
        const response = await fetch(image.uri)
        const blob = await response.blob()
        const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1)
        let refs = firebase.storage().ref().child(`images/${filename}`).put(blob)

        refs.then((a) => a.ref.getDownloadURL().then((url) => console.log(url)))

        try {
            await refs
        } catch (error) {
            console.log(error)
        }
        setUploading(false)
        Alert.alert('Photo uploaded')
        setImage(null)
    }

    useEffect(() => {
        firebase
            .storage()
            .ref()
            .child('images')
            .list()
            .then((result) => {
                // Loop over each item
                result.items.forEach((pics) => {
                    firebase
                        .storage()
                        .ref()
                        .child(pics.fullPath)
                        .getDownloadURL()
                        .then((url) => {
                            console.log(url)
                            //these url will be used to display images
                        })
                })
            })
    }, [])

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={pickerImage}>
                <Text>Pick image</Text>
            </TouchableOpacity>
            <View>
                {image && <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />}
                <TouchableOpacity onPress={uploadImage}>
                    <Text>Upload image</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Upload
