import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'

const C_QRCode = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScannes] = useState(false)
    const [text, setText] = useState('')


    const handleBarCodeScanned = ({ type, data }) => {
        setScannes(true)
        setText(data)

    }

    useEffect(() => {
        const askForCameraPermission = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        }
        askForCameraPermission()
    }, [])

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        )
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text>No access to camera</Text>
                <Button title="Allow camera" onPress={() => handleBarCodeScanned()} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ width: '100%', height: 500 }}
                />
            </View>

            <Text>{text}</Text>

            {scanned && (
                <Button title="Chấm lại" onPress={() => setScannes(false)} color="tomato" />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 350,
        height: 350,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato',
    },
    maintext: {
        fontSize: 16,
        margin: 20,
    },
})

export default C_QRCode