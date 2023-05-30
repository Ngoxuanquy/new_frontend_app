import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import { View, Text, Button, TouchableOpacity, Dimensions } from 'react-native'
// import {
//     LineChart,
//     BarChart,
//     PieChart,
//     ProgressChart,
//     ContributionGraph,
//     StackedBarChart
// } from "react-native-chart-kit";
import Phone from '../../../Components/Phone/Phone';
import { useFocusEffect } from '@react-navigation/native';

import CallApi from '../../../Models/CallPostApi';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Spinner from 'react-native-loading-spinner-overlay';


const Home = ({ navigation }) => {

    const [tuans, setTuan] = useState([])
    const URL = 'http://192.168.11.232:3000/v1/api';

    console.log(new Date())

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    const getNotification = async () => {

        const { status } = await Notifications.getPermissionsAsync()
        if (status !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync()
            if (status !== 'granted') {
                alert('Looix')
                return;
            }
        }

        const tokenData = await Notifications.getExpoPushTokenAsync()
        const token = await tokenData.data
        console.log(token);
        const message = {
            to: token,
            title: "Bạn đã đăng nhập !!",
            body: 'Nhấn Vào Để Xem Chi Tiết!!'
        }

        await Axios.post('https://api.expo.dev/v2/push/send', message)
            .catch(err => console.log(err))

    }

    //Lấy apis chấm công
    const [chamcongs, setChamCong] = useState([])
    useFocusEffect(
        React.useCallback(() => {
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
                        setIsLoading(false)
                        setChamCong(data.metadata)
                    })
            }
            getApisChamCong();
        }, [])
    );

    useEffect(() => {
        getNotification()
        // Gui()
    }, [])

    function getFormattedDate(date) {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return day + '/' + month + '/' + year;
    }

    useEffect(() => {
        var today = new Date();

        // Tính toán ngày đầu tiên trong tuần
        var firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));

        // console.log(getFormattedDate(firstDayOfWeek))


        // Khai báo một mảng để lưu trữ các ngày trong tuần
        var daysOfWeek = [];

        // Thêm các ngày trong tuần vào mảng
        for (var i = 0; i < 6; i++) {
            var day = new Date(firstDayOfWeek);
            day.setDate(firstDayOfWeek.getDate() + i);
            daysOfWeek.push(getFormattedDate(day));
        }

        // Hiển thị các ngày trong tuần
        setTuan(daysOfWeek)
    }, [])


    const chartConfig = {
        backgroundGradientFrom: "white",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `#367fa9`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const data = {
        labels: tuans,
        datasets: [
            {
                data: [2, 4, 8, 0, 9, 3]
            }
        ]
    };

    // Lấy token và id của user 
    const [id, setId] = useState()
    const [token, setToken] = useState()
    const [timeexp, setTimeExp] = useState()

    // const [token, setToken] = useState('');

    // useEffect(() => {
    //     const getToken = async () => {
    //         try {
    //             const tokenEncrypted = await AsyncStorage.getItem('token');
    //             const bytes = CryptoJS.AES.decrypt(tokenEncrypted, 'secret-key');
    //             const originalToken = bytes.toString(CryptoJS.enc.Utf8);
    //             setToken(originalToken);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     getToken();
    // }, []);



    useEffect(() => {
        const getUserData = async () => {
            try {
                const id = await AsyncStorage.getItem('id');
                const accessToken = await AsyncStorage.getItem('accessToken');
                const timeExp = await AsyncStorage.getItem('timeeexp');

                // Cập nhật giá trị vào state
                setId(id);
                setToken(accessToken);
                setTimeExp(timeExp);
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error('Lỗi khi lấy dữ liệu từ AsyncStorage: ', error);
            }
        }

        // Gọi hàm lấy dữ liệu từ AsyncStorage
        getUserData();
    });
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

    //lấy refreshToken từ DB
    const [resfreshToken, setResfreshToken] = useState();

    const getrefeshToken = async () => {

        const accessToken = await getToken()

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

        // Viết mã kiểm tra token đã hết hạn
        fetch('http://192.168.1.101:3000/v1/api/keyUers/' + id, requestOptions)
            .then((data) => {
                return data.json()
            })
            .then(data => {
                setResfreshToken(data.metadata[0].refeshToken)

                return data.metadata[0].refeshToken
            })
            .then((re) => {
                getNewToken(re)
            })

    }


    const [apis, setApi] = useState([])

    // Hàm kiểm tra token đã hết hạn
    function isTokenExpired() {

        const cleanedJwtString = token.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                "authorization": cleanedJwtString,
                "x-client-id": id
            }
        };

        // Viết mã kiểm tra token đã hết hạn
        fetch('http://192.168.1.101:3000/v1/api/product/get', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then(data => {
                setApi(data)
                console.log(data)
            })
    }


    // Hàm lấy token mới
    async function getNewToken(resfreshToken) {

        console.log({ resfreshToken })

        const cleanedJwtString = await resfreshToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                "refeshToken": cleanedJwtString,
                "x-client-id": id
            }
        };

        // Viết mã gọi lại token mới từ máy chủ
        await fetch('http://192.168.1.101:3000/v1/api/handlerRefreshToken', requestOptions)
            .then(data => {
                return data.json()
            })
            .then(data => {
                AsyncStorage.setItem('accessToken', JSON.stringify(data.metadata.tokens.accessToken));
                AsyncStorage.setItem('timeeexp', JSON.stringify(data.metadata.tokens.timeExp));
                setTimeExp(data.metadata.tokens.timeExp)
                setToken(data.metadata.tokens.accessToken)
                return data.metadata.tokens.accessToken
            })
            .then((token) => {
                isTokenExpired()
            })
            .catch(err => {
                console.log(err)
            })

    }



    //test product vs token
    const getProduct = () => {

        //Khai báo thời gian hiện tai
        const timeNow = Math.floor(Date.now() / 1000);

        if (timeexp <= timeNow) {
            console.log('hết hạn')
            getrefeshToken();

        }
        else {
            console.log('còn hạn')
            isTokenExpired()

        }
    }

    //Lấy Api của chỉ số cá nhân

    const [acceptdailyresultdetails, setAcceptdailyresultdetails] = useState([])

    const GetApi = async () => {

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
                // console.log(data.metadata)
                if (data.metadata.length !== 0) {
                    setAcceptdailyresultdetails(data.metadata)
                }
                else {
                    Createdaily_results()
                    // console.log('tạo')
                }
            })
    }

    useEffect(() => {
        GetApi()
    }, [])


    const Createdaily_results = async () => {
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
                user_id: id,

            })
        };


        // Lấy dữ liệu của khách hàng
        fetch(URL + '/daily_results/create', requestOptions)
            .then(() => {
                // GetApi()
                return;
            })
    }

    console.log(chamcongs)

    const chuyenthanhgio = (value) => {
        const test = value && value.slice(11, 19)
        return test;
    }


    //khai báo loding
    const [isLoading, setIsLoading] = useState(true)



    return (
        <ScrollView style={{ paddingHorizontal: 12 }}>
            <View>
                <Spinner
                    visible={isLoading}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />
                <Text style={{ fontSize: 18, paddingVertical: 8 }}>Chấm công hôm nay</Text>
                {chamcongs.map(chamcong => (
                    <View key={chamcong.id}>
                        <Text style={{ paddingVertical: 12, borderWidth: 0.4, paddingLeft: 8 }}>
                            Sáng vào: {chuyenthanhgio(chamcong.vao_sang)}
                        </Text>
                        <Text style={{ paddingVertical: 12, borderWidth: 0.4, paddingLeft: 8 }}>
                            Sáng ra:{chuyenthanhgio(chamcong.ra_sang)}
                        </Text>
                        <Text style={{ paddingVertical: 12, borderWidth: 0.4, paddingLeft: 8 }}>
                            Chiều vào: {chuyenthanhgio(chamcong.vao_chieu)}
                        </Text>
                        <Text style={{ paddingVertical: 12, borderWidth: 0.4, paddingLeft: 8 }}>
                            Chiều ra: {chuyenthanhgio(chamcong.ra_chieu)}
                        </Text>
                    </View>
                ))}
            </View>

            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 18, textAlign: 'center' }}>Biểu đồ số đơn hằng ngày</Text>
                {/* <BarChart
                    style={{
                        // width: 400,
                        // height: 400
                        marginTop: 30
                    }}
                    data={data}
                    width={Dimensions.get('window').width - 20}
                    height={300}
                    yAxisLabel="Đơn"
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                /> */}
            </View>

            <View>
                <TouchableOpacity onPress={() => getProduct()}>
                    <Text>
                        Get Data
                    </Text>
                </TouchableOpacity>

                {/* {apis == undefined ? null : apis.map(api => (
                    <Text>
                        {api.name}
                    </Text>
                ))} */}
            </View>

        </ScrollView>
    )
}

export default Home