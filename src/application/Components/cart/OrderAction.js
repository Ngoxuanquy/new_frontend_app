import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderAction = ({ cart }) => {

    console.log(cart)

    const URL = 'http://192.168.1.101:3000/v1/api';

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
                "x-api-key": "d420e946ae282dfadafede6b060ae66e3ffd2a9cddfe3dc9b4cd070f98ad4985aeab65e2751677f21f91f34c2a22a1f95bf0b330fd2eb0dfb2c1fb53a7c8d97a",
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