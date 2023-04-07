import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import IoIcon from 'react-native-vector-icons/Ionicons'

const Header = () => {
    return (
        <>
            <View
                style={{
                    backgroundColor: '#367fa9',
                    height: 90,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 500,
                        color: 'white',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                    }}
                >
                    lọc nước 365
                </Text>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#3c8dbc',
                    height: 60,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#367fa9',
                        height: '100%',
                    }}
                >
                    <TouchableOpacity onPress={() => toggleDrawer()}>
                        <IoIcon name="menu-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }} />
                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                        style={{
                            color: 'white',
                            textTransform: 'uppercase',
                        }}
                    >
                        gọi
                    </Text>
                    <Text
                        style={{
                            color: 'white',
                            textTransform: 'uppercase',
                        }}
                    >
                        android
                    </Text>
                    <Text
                        style={{
                            color: 'white',
                            textTransform: 'uppercase',
                        }}
                    >
                        ios
                    </Text>
                </View>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>T1</Text>
                </View>
            </View>
        </>
    )
}

export default Header