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

        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "364785a87eeab143ff29a2cc2a61146c2e17a20b084d87ed4fc4152b7a2432dc2d9fe9aea84f83daf474e657b563749ef1b17b34547f88185779729cd4087330",
                "authorization": cleanedJwtString,
                "x-client-id": id
            }
        };

        // Viết mã kiểm tra token đã hết hạn
        fetch('http://192.168.1.135:3000/v1/api/keyUers/' + id, requestOptions)
            .then((data) => {
                return data.json()
            })
            .then(data => {
                setResfreshToken(data.metadata[0].refeshToken)


                if (data.status === 200) {
                    console.log(data)
                    return;
                };
            })

    }


    const [apis, setApi] = useState([])


    // Hàm kiểm tra token đã hết hạn
    function isTokenExpired() {

        const cleanedJwtString = token && token.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "364785a87eeab143ff29a2cc2a61146c2e17a20b084d87ed4fc4152b7a2432dc2d9fe9aea84f83daf474e657b563749ef1b17b34547f88185779729cd4087330",
                "authorization": cleanedJwtString,
                "x-client-id": id
            }
        };

        // Viết mã kiểm tra token đã hết hạn
        fetch('http://192.168.1.135:3000/v1/api/product/get', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then(data => {
                setApi(data)
                console.log(data)

                if (data.status === 200) {
                    console.log(data)
                    return;
                };
            })
    }


    // Hàm lấy token mới
    async function getNewToken() {
        getrefeshToken();

        const cleanedJwtString = resfreshToken && resfreshToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "364785a87eeab143ff29a2cc2a61146c2e17a20b084d87ed4fc4152b7a2432dc2d9fe9aea84f83daf474e657b563749ef1b17b34547f88185779729cd4087330",
                "refeshToken": cleanedJwtString,
                "x-client-id": id
            }
        };

        console.log(requestOptions)

        // Viết mã gọi lại token mới từ máy chủ
        await fetch('http://192.168.1.135:3000/v1/api/handlerRefreshToken', requestOptions)
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

        if (timeexp < timeNow) {
            console.log('hết hạn')
            getNewToken();

        }
        else {
            console.log('còn hạn')
            isTokenExpired()
            console.log({ token })
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