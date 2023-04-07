import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ButtonGroup } from '@rneui/themed'

import Header from '../../../Components/Header/Header'
import { ScrollView } from 'react-native'

const Active_Order = ({ navigation }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const buttons = ['Đơn chờ thực hiện', 'Đơn đang thực hiện', 'Đơn đã hoàn thành', 'Đơn thu nợ'];

    return (
        <ScrollView>
            {/* <Header /> */}
            <View>
                <ButtonGroup
                    buttons={buttons}
                    selectedIndex={selectedIndex}
                    onPress={(value) => {
                        setSelectedIndex(value)

                        // navigation.replace(buttons[value])

                    }}
                    containerStyle={{ marginBottom: 20, height: 50 }}
                    textStyle={{ fontSize: 13, textAlign: 'center' }}
                />

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: "95%",
                    }}>
                        <TouchableOpacity style={{
                            width: '50%',
                            backgroundColor: 'green',
                            opacity: 0.6,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40,
                            borderRadius: 5

                        }}>
                            <Text style={{
                                fontSize: 16,
                                textAlign: 'center',
                                color: 'white'
                            }}>
                                +Tạo Đơn Thêm
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: '50%',
                            backgroundColor: 'blue',
                            opacity: 0.6,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40,
                            borderRadius: 5

                        }}>
                            <Text style={{
                                fontSize: 16,
                                textAlign: 'center',
                                color: 'white'

                            }}>
                                +QR code
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        width: '95%',
                        backgroundColor: 'white',
                        marginBottom: 30,
                        marginTop: 10
                    }}>
                        <Text style={{
                            padding: 10
                        }}>
                            Đơn Đang Thực Hiện
                        </Text>

                        <View style={{
                            backgroundColor: '#088db5',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 10
                        }}>
                            <View style={{
                                width: '80%',
                                backgroundColor: 'green',
                                padding: 10
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 16,
                                    marginBottom: 6
                                }}>

                                    MKH19771 -

                                    Chị Lan - Ngõ 27 Lê Văn Lương, quận Thanh Xuân, Hà Nội
                                </Text>

                                <View style={{
                                    width: '100%'
                                }}>
                                    <TouchableOpacity style={{
                                        width: '100%',
                                        backgroundColor: 'red',
                                        padding: 10,
                                        borderRadius: 7

                                    }}>
                                        <Text style={{
                                            textAlign: 'center',
                                            color: 'white'
                                        }}>
                                            Tính Tiền
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '100%',
                                        backgroundColor: 'blue',
                                        padding: 10,
                                        borderRadius: 7
                                    }}>
                                        <Text style={{
                                            textAlign: 'center',
                                            color: 'white'
                                        }}>
                                            Up Ảnh
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '100%',
                                        backgroundColor: 'yellow',
                                        padding: 10,
                                        borderRadius: 7

                                    }}>
                                        <Text style={{
                                            textAlign: 'center',
                                            color: 'black'
                                        }}>
                                            Xem
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            textAlign: 'center',
                                            marginTop: 20,
                                            color: 'white'
                                        }}>
                                            Hết Giờ
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View>
                                <TouchableOpacity>
                                    <Text>
                                        Phiếu Mượn Hàng
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>



            </View>
        </ScrollView>
    )
}

export default Active_Order