import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderAction = ({ cart }) => {

    console.log(cart)

    const URL = 'http://192.168.11.232:3000/v1/api';

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



    //Lấy apis product

    const GetApiorders = async () => {

        console.log(id1)

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
                transactionId: id_
            })
        };


        // Lấy dữ liệu của khách hàng
        fetch(URL + '/transactions_sell_line/updatecong', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then(data => {
                // console.log(data.message)
                setProduct(data.metadata)


            })
    }
    return (
        <View>
            <View key={cart.id} style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'gray'
            }}>
                <Text>
                    {cart.name}
                </Text>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: 100,

                }}>
                    <TouchableOpacity style={{
                        width: 40,
                        // padding: 10,
                        backgroundColor: '#eeeeee',
                        justifyContent: "center",
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            textAlign: 'center'
                        }}>
                            -
                        </Text>
                    </TouchableOpacity>
                    <View style={{
                        justifyContent: "center",
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            textAlign: 'center'
                        }}>
                            1
                        </Text>
                    </View>
                    <TouchableOpacity style={{
                        width: 40,
                        padding: 10,
                        backgroundColor: '#eeeeee',
                        justifyContent: "center",
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            textAlign: 'center'
                        }}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text>
                    {cart.price * 1}
                </Text>
            </View>

            <View>
                <Text>
                    Tổng Tiền :  {cart.price * 1}
                </Text>

            </View>
        </View>
    )
}

export default OrderAction