import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import CallPostApi from '../../../Models/CallPostApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Update_Profile = () => {

    const URL = 'http://192.168.11.232:3000/v1/api';

    const [password, setPassword] = useState('');
    const [re_password, setRePassword] = useState('');
    const [name, setName] = useState('');
    const [birthdday, setBirthdday] = useState('');
    const [hometown, setHometown] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('')


    //lấy accseToken 
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


    //xử lý cập nhật

    const handerSubmit = async () => {

        const accessToken = await getToken()

        console.log(accessToken)

        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "34530394b706b10ec27e62f657a6698140b3b3dd51aac7321bad503a50f32c3616554ab9b12176a8498a9cbfa9299e7406c7c2fe8598c860e8a8d6d465ef6715",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },
            body: JSON.stringify({
                password: password,
                surname: name,
                date_of_birth: birthdday,
                address: address,
                number: number,
                id: id
            })
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/user/update/' + id, requestOptions)
            .then(() => {
                alert('Cập nhật thành công')
            })

    }


    return (
        <ScrollView>
            <View style={{
                padding: 10
            }}>
                <Text style={{
                    fontSize: 20,
                    marginBottom: 10
                }}>
                    Chỉnh Sửa Người Dùng
                </Text>
                <View style={{
                    backgroundColor: 'white'
                }}>
                    <View style={{
                        padding: 10,
                        width: '95%'
                    }}>
                        <Text style={{
                            fontSize: 17,
                            marginBottom: 7,
                            marginTop: 10
                        }}>
                            Mật Khẩu
                        </Text>
                        <TextInput
                            style={{
                                width: '100%',
                                height: 40,
                                borderColor: 'black',
                                borderWidth: 0.5,
                                padding: 10,
                                marginBottom: 5

                            }}
                            placeholder='Mật Khẩu...'
                            placeholderTextColor='black'
                            onChangeText={(e) => setPassword(e)}
                        />
                        <Text>
                            Để trống trường mật khẩu nểu bạn không muốn cập nhật mật khẩu
                        </Text>
                    </View>

                    <View style={{
                        padding: 10,
                        width: '95%'

                    }}>
                        <Text style={{
                            fontSize: 17,
                            marginBottom: 7,
                            // marginTop: 10
                        }}>
                            Xác Nhận Mật Khẩu
                        </Text>
                        <TextInput
                            style={{
                                width: '100%',
                                height: 40,
                                borderColor: 'black',
                                borderWidth: 0.5,
                                // marginBottom: 20,
                                padding: 10
                            }}
                            placeholder='Xác Nhận Mật Khẩu...'
                            placeholderTextColor='black'
                            onChangeText={(e) => setRePassword(e)}

                        />
                    </View>

                    <View style={{
                        padding: 10,
                        width: '95%'

                    }}>
                        <Text style={{
                            fontSize: 17,
                            marginBottom: 7,
                            // marginTop: 10
                        }}>
                            Họ và tên
                        </Text>
                        <TextInput
                            style={{
                                width: '100%',
                                height: 40,
                                borderColor: 'black',
                                borderWidth: 0.5,
                                // marginBottom: 20,
                                padding: 10
                            }}
                            placeholder='Xác Nhận Mật Khẩu...'
                            placeholderTextColor='black'
                            onChangeText={(e) => setName(e)}

                        />
                        <Text>
                            Để trống trường họ tên nểu bạn không muốn cập nhật mật khẩu
                        </Text>
                    </View>

                    <View style={{
                        padding: 10,
                        width: '95%'

                    }}>
                        <Text style={{
                            fontSize: 17,
                            marginBottom: 7,
                            // marginTop: 10
                        }}>
                            Ngày Sinh
                        </Text>
                        <TextInput
                            style={{
                                width: '100%',
                                height: 40,
                                borderColor: 'black',
                                borderWidth: 0.5,
                                // marginBottom: 20,
                                padding: 10
                            }}
                            placeholder='Xác Nhận Mật Khẩu...'
                            placeholderTextColor='black'
                            onChangeText={(e) => setBirthdday(e)}

                        />
                        <Text>
                            Để trống trường ngày sinh nểu bạn không muốn cập nhật mật khẩu
                        </Text>
                    </View>

                    <View style={{
                        padding: 10,
                        width: '95%'

                    }}>
                        <Text style={{
                            fontSize: 17,
                            marginBottom: 7,
                            // marginTop: 10
                        }}>
                            Quê Quán
                        </Text>
                        <TextInput
                            style={{
                                width: '100%',
                                height: 40,
                                borderColor: 'black',
                                borderWidth: 0.5,
                                // marginBottom: 20,
                                padding: 10
                            }}
                            placeholder='Xác Nhận Mật Khẩu...'
                            placeholderTextColor='black'
                            onChangeText={(e) => setHometown(e)}

                        />
                        <Text>
                            Để trống trường quê quán nểu bạn không muốn cập nhật mật khẩu
                        </Text>
                    </View>


                    <View style={{
                        padding: 10,
                        width: '95%'

                    }}>
                        <Text style={{
                            fontSize: 17,
                            marginBottom: 7,
                            // marginTop: 10
                        }}>
                            Số điện thoại
                        </Text>
                        <TextInput
                            style={{
                                width: '100%',
                                height: 40,
                                borderColor: 'black',
                                borderWidth: 0.5,
                                // marginBottom: 20,
                                padding: 10
                            }}
                            placeholder='Xác Nhận Mật Khẩu...'
                            placeholderTextColor='black'
                            onChangeText={(e) => setNumber(e)}

                        />
                        <Text>
                            Để trống trường số điện thoại nểu bạn không muốn cập nhật mật khẩu
                        </Text>
                    </View>

                    <View style={{
                        padding: 10,
                        width: '95%'

                    }}>
                        <Text style={{
                            fontSize: 17,
                            marginBottom: 7,
                            // marginTop: 10
                        }}>
                            Địa chỉ hiện tại
                        </Text>
                        <TextInput
                            style={{
                                width: '100%',
                                height: 40,
                                borderColor: 'black',
                                borderWidth: 0.5,
                                // marginBottom: 20,
                                padding: 10
                            }}
                            placeholder='Xác Nhận Mật Khẩu...'
                            placeholderTextColor='black'
                            onChangeText={(e) => setAddress(e)}

                        />
                        <Text>
                            Để trống trường địa chỉ hiện tại nểu bạn không muốn cập nhật địa chỉ hiện tại
                        </Text>
                    </View>
                </View>
                <View style={{
                    marginLeft: Dimensions.get('window').width - 100,
                    marginTop: 20

                }}>
                    <TouchableOpacity style={{
                        width: 80,
                        height: 40,
                        backgroundColor: '#3c8dbc',
                        padding: 10,
                        borderRadius: 8
                    }}
                        onPress={() => handerSubmit()}
                    >
                        <Text style={{
                            textAlign: 'center',
                            color: 'white'
                        }}>
                            Cập nhật
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default Update_Profile