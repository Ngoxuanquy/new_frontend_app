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

    const URL = 'http://192.168.11.232:3000/v1/api';


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


    //khai báo chám công
    const [sangvao, setSangVao] = useState()
    const [sangra, setSangRa] = useState()
    const [chieuvao, setChieuvao] = useState()
    const [chieura, setChieuRa] = useState()
    const [chamCong, setChamCong] = useState([]);
    const [create, setCreate] = useState('')

    const getApisChamCong = async (id1) => {


        const accessToken = await getToken()
        const id = await getID()

        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
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

                console.log(data)
                setDate(data.metadata)

                data.metadata.map(re => {

                    const date = new Date(re.created_at);
                    const year = date.getFullYear().toString().slice(0);
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const day = date.getDate().toString().padStart(2, '0');
                    const formattedDate = `${year}/${month}/${day}`;
                    setSangVao(re.vao_sang)
                    setSangRa(re.ra_sang)
                    setChieuvao(re.vao_chieu)
                    setChieuRa(re.ra_chieu)
                    setCreate(re.created_at)
                    setCheck(formattedDate)
                })
            })
    }

    useEffect(() => {
        getApisChamCong()
    }, [sangra])

    //Lấy Api của chỉ số cá nhân

    const [SoCong, setSoCong] = useState([])

    const GetApiChamCong = async () => {

        const accessToken = await getToken()
        const id = await getID()
        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                "authorization": cleanedJwtString,
                "x-client-id": id
            }
        };


        // Lấy dữ liệu của khách hàng
        fetch(URL + '/daily_results/get/' + id, requestOptions)
            .then((data) => {
                return data.json()
            })
            .then(data => {
                setSoCong(data.metadata[0].so_cong)

            })
    }

    useEffect(() => {
        GetApiChamCong()
    }, [])

    const updateChamCong = async () => {

        const accessToken = await getToken()
        const id = await getID()
        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },
            body: JSON.stringify({
                id: id,
                SoCong: SoCong,
            })
        };

        fetch(URL + '/daily_results/update/chamcong', requestOptions)
    }

    const handleBarCodeScanned = async ({ type, data }) => {
        setScannes(true);
        setText(data);

        const accessToken = await getToken();
        const id = await getID();

        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();

        const time = hour + "/" + minute + "/" + second

        if (check === "") {
            console.log('Chấm công vào buổi sáng');
            await createSangVao(time, cleanedJwtString, id);

        } else if (check != "" && sangvao != null && sangra == null && chieuvao == null && chieura == null) {

            console.log('Chấm công ra buổi sáng');
            await createSangRa(time, cleanedJwtString, id);

        } else if (check != "" && sangvao != null && sangra != null && chieuvao == null && chieura == null) {
            console.log('Chấm công vào buổi chiều');
            await createChieuVao(time, cleanedJwtString, id);

        } else if (check != "" && sangvao != null && sangra != null && chieuvao != null && chieura == null) {
            console.log('Chấm công ra buổi chiều');
            await createChieuRa(time, cleanedJwtString, id);
        }
        else if (check != "" && sangvao != null && sangra != null && chieuvao != null && chieura != null) {
            alert('Sao thế!! Hôm Nay đi làm chưa đủ ư ')
            navigation.navigate('Home')

        }

        // Các hàm để thực hiện chấm công
        async function createSangVao(time, accessToken, id) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                    "authorization": accessToken,
                    "x-client-id": id
                },
                body: JSON.stringify({
                    id: id,
                    vao_sang: time,
                    business_id: 1
                })
            };

            fetch(URL + '/chamcong/create/sangvao', requestOptions)
                .then(data => data.json())
                .then(data => {
                    // updateChamCong()
                    navigation.navigate('Home')
                    alert('Chấm công vào buổi sáng thành công');

                })
                .catch(error => {
                    console.log(error);
                    alert('Đã xảy ra lỗi khi chấm công vào buổi sáng');
                });
        }

        async function createSangRa(time, accessToken, id) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                    "authorization": accessToken,
                    "x-client-id": id
                },
                body: JSON.stringify({
                    id: id,
                    ra_sang: time,
                    business_id: 1,
                    create: create
                })
            };

            fetch(URL + '/chamcong/create/sangra', requestOptions)
                .then(data => data.json())
                .then(data => {
                    updateChamCong()

                    navigation.navigate('Home')

                    alert('Chấm công ra buổi sáng thành công');
                })
                .catch(error => {
                    console.log(error);
                    alert('Đã xảy ra lỗi khi chấm công ra buổi sáng');
                });
        }
        // ... Đoạn mã trước đó ...

        async function createChieuVao(time, accessToken, id) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                    "authorization": accessToken,
                    "x-client-id": id
                },
                body: JSON.stringify({
                    id: id,
                    vao_chieu: time,
                    business_id: 1,
                    create: create

                })
            };

            fetch(URL + '/chamcong/create/chieuvao', requestOptions)
                .then(data => data.json())
                .then(data => {
                    // updateChamCong()

                    navigation.navigate('Home')

                    alert('Chấm công vào buổi chiều thành công');
                })
                .catch(error => {
                    console.log(error);
                    alert('Đã xảy ra lỗi khi chấm công vào buổi chiều');
                });
        }

        async function createChieuRa(time, accessToken, id) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                    "authorization": accessToken,
                    "x-client-id": id
                },
                body: JSON.stringify({
                    id: id,
                    ra_chieu: time,
                    business_id: 1,
                    create: create

                })
            };

            fetch(URL + '/chamcong/create/chieura', requestOptions)
                .then(data => data.json())
                .then(data => {
                    updateChamCong()
                    navigation.navigate('Home')
                    alert('Chấm công ra buổi chiều thành công');
                })
                .catch(error => {
                    console.log(error);
                    alert('Đã xảy ra lỗi khi chấm công ra buổi chiều');
                });
        }
    }


    useEffect(() => {
        console.log(chamCong);
    }, [chamCong]);


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