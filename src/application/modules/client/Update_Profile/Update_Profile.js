import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'

const Update_Profile = () => {
    return (
        <View>
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
                                marginBottom: 20,
                                padding: 10
                            }}
                            placeholder='Xác Nhận Mật Khẩu...'
                            placeholderTextColor='black'
                        />
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
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            color: 'white'
                        }}>
                            Cập nhật
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Update_Profile