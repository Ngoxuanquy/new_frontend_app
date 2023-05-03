import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import { View, Text, Button, TouchableOpacity, Dimensions } from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import Phone from '../../../Components/Phone/Phone';

import CallApi from '../../../Models/CallPostApi';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {

    const [tuans, setTuan] = useState([])

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

        console.log({ accessToken })

        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "2a5f256a441f0203c12901b2d94f84b21d79447d9d5463c9c790aa534ba747259d77b2506e92615f78e2dc052f7828b3ba98454dc438fa327e4f794297373181",
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
                "x-api-key": "2a5f256a441f0203c12901b2d94f84b21d79447d9d5463c9c790aa534ba747259d77b2506e92615f78e2dc052f7828b3ba98454dc438fa327e4f794297373181",
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
                "x-api-key": "2a5f256a441f0203c12901b2d94f84b21d79447d9d5463c9c790aa534ba747259d77b2506e92615f78e2dc052f7828b3ba98454dc438fa327e4f794297373181",
                "refeshToken": cleanedJwtString,
                "x-client-id": id
            }
        };

        console.log(requestOptions)

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



    return (
        <ScrollView style={{ paddingHorizontal: 12 }}>
            <View>
                <Text style={{ fontSize: 18, paddingVertical: 8 }}>Chấm công hôm nay</Text>
                <View>
                    <Text style={{ paddingVertical: 12, borderWidth: 0.4, paddingLeft: 8 }}>
                        Sáng vào:
                    </Text>
                    <Text style={{ paddingVertical: 12, borderWidth: 0.4, paddingLeft: 8 }}>
                        Sáng ra:
                    </Text>
                    <Text style={{ paddingVertical: 12, borderWidth: 0.4, paddingLeft: 8 }}>
                        Chiều vào:
                    </Text>
                    <Text style={{ paddingVertical: 12, borderWidth: 0.4, paddingLeft: 8 }}>
                        Chiều ra:
                    </Text>
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 18, textAlign: 'center' }}>Biểu đồ số đơn hằng ngày</Text>
                <BarChart
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
                />
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