import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { ButtonGroup } from '@rneui/themed'
import Header from '../../../Components/Header/Header'


const Order_Done = ({ navigation }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);


    const buttons = ['Đơn chờ thực hiện', 'Đơn đang thực hiện', 'Đơn đã hoàn thành', 'Đơn thu nợ'];

    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            {/* <Header /> */}
            <View>
                <ButtonGroup
                    buttons={buttons}
                    selectedIndex={selectedIndex}
                    onPress={(value, items) => {
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
                        width: '95%',
                        backgroundColor: 'white',
                        marginBottom: 30,
                        marginTop: 10
                    }}>
                        <Text style={{
                            padding: 10
                        }}>
                            Đơn Đã Xong
                        </Text>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Order_Done