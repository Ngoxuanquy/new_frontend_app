import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { ButtonGroup } from '@rneui/themed'


const Pending_orders = ({ navigation }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    console.log(selectedIndex)
    const buttons = ['Đơn chờ thực hiện', 'Đơn đang thực hiện', 'Đơn đã hoàn thành', 'Đơn thu nợ'];

    return (
        <SafeAreaView>
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
                            Đơn Chờ Thực Hiện
                        </Text>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Pending_orders