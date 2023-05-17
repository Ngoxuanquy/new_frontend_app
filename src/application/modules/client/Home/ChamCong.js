import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChamCong = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScannes] = useState(false)
    const [text, setText] = useState('')
    const [taikhoan, setTaiKhoan] = useState([])
    const [token, setToken] = useState([])
    const [date, setDate] = useState([])
    const [check, setCheck] = useState('')

    const URL = 'http://192.168.1.101:3000/v1/api';


    const [id, setId] = useState([]);
    const [ngaycongs, setNgayCong] = useState()


    useEffect(() => {
        const askForCameraPermission = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        }
        askForCameraPermission()
    }, [])

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

    const getApisChamCong = async (id1) => {


        const accessToken = await getToken()
        const id = await getID()

        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "39081e3d21dc8f2c3fddaff1ae20142b0ae3a0c1849da2a3bd753ddf8db599d983b28c681972c5ecc8990f164527f5d4a0a1820240de22e80b0f61dfbdedde7d",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },

        };

        // Viết mã kiểm tra token đã hết hạn
        fetch(URL + '/chamcong/get/' + id, requestOptions)
            .then((data) => {
                return data.json()
            })
            .then(data => {

                setDate(data.metadata)

                data.metadata.map(re => {

                    const date = new Date(re.created_at);
                    const year = date.getFullYear().toString().slice(0);
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const day = date.getDate().toString().padStart(2, '0');
                    const formattedDate = `${year}/${month}/${day}`;

                    setCheck(formattedDate)
                })

            })

    }

    useEffect(() => {
        getApisChamCong()
    }, [])


    const handleBarCodeScanned = async ({ type, data }) => {
        setScannes(true)
        setText(data)

        const accessToken = await getToken()
        const id = await getID()

        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');
        const a = new Date()
        var time = a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds();

        console.log(a.getFullYear())


        if (check.slice(0, 4) == a.getFullYear() && check.slice(5, 7) == (a.getMonth() + 1) && check.slice(8, 10) == a.getDate()) {
            // alert("Hôm Nay Đã Chấm Công!!!")

            console.log('a3212')
        }
        else {

            console.log('aaa')
            const requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "39081e3d21dc8f2c3fddaff1ae20142b0ae3a0c1849da2a3bd753ddf8db599d983b28c681972c5ecc8990f164527f5d4a0a1820240de22e80b0f61dfbdedde7d",
                    "authorization": cleanedJwtString,
                    "x-client-id": id
                },

                body: JSON.stringify({
                    id: id,
                    vao_sang: time,
                    business_id: 1
                })

            };

            fetch(URL + '/chamcong/create/sangvao', requestOptions)
                .then((data) => {
                    return data.json()
                })
                .then(data => {
                    alert('Chấm Công Vào Thành Công 1')

                })

        }



        const createSangRa = async () => {
            const accessToken = await getToken()
            const id = await getID()

            const cleanedJwtString = accessToken.replace(/^"|"$/g, '');
            const a = new Date()
            var time = a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds();

            const requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "39081e3d21dc8f2c3fddaff1ae20142b0ae3a0c1849da2a3bd753ddf8db599d983b28c681972c5ecc8990f164527f5d4a0a1820240de22e80b0f61dfbdedde7d",
                    "authorization": cleanedJwtString,
                    "x-client-id": id
                },

                body: JSON.stringify({
                    id: id,
                    ra_sang: time,
                    business_id: 1
                })

            };

            fetch(URL + '/chamcong/create/sangra', requestOptions)
                .then((data) => {
                    return data.json()
                })
                .then(data => {
                    alert('Chấm Công Vào Thành Công 1')

                })
        }


        date.map(da => {
            if (da.ra_sang == "" && da.vao_sang != '') {
                console.log('s')
                createSangRa()
            }
        })

        //     date.map(da => {
        //         if (da.chieu_GioRa == "" && da.chieu_GioVao != '') {
        //             fetch('http://192.168.0.113:4000' + '/api/chamcong/update/chieura/' + da.id, {
        //                 method: 'POST',
        //                 headers: { 'Content-Type': 'application/json' },
        //             })
        //                 .then(() => {

        //                     fetch('http://192.168.0.113:4000' + '/api/chisocanhan/update/ngaycong/' + taikhoan, {
        //                         method: 'POST',
        //                         headers: { 'Content-Type': 'application/json' },
        //                         body: JSON.stringify({
        //                             chamcong: ngaycongs + 0.5
        //                         })
        //                     })

        //                     alert('Chấm Công Ra Thành Công')
        //                     navigation.replace('BottomTab')

        //                 })
        //     })

    }

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

export default ChamCong