import { View, Text } from 'react-native'
import React, { useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { DrawerItem } from '@react-navigation/drawer'
import IoIcon from 'react-native-vector-icons/Ionicons'
import { Animated } from 'react-native'

const Dropdown = (props) => {
    const [display, setDisplay] = useState(true)

    const { height, title, content, icon } = props.items

    const heightValue = useRef(new Animated.Value(0)).current

    const handleAnimated = () => {
        Animated.timing(heightValue, {
            toValue: display ? height : 0,
            duration: 200,
            useNativeDriver: false,
        }).start()

        setDisplay(!display)
    }

    return (
        <View>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 0.4,
                    width: '95%',
                    paddingBottom: 8,
                }}
                onPress={handleAnimated}
            >
                <IoIcon name={icon} style={{ fontSize: 20, marginRight: 8 }} />
                <Text style={{ fontSize: 18 }}>{title}</Text>
                <IoIcon
                    name="chevron-down-outline"
                    style={{
                        marginRight: 20,
                        transform: [{ rotate: '0deg' }],
                        position: 'absolute',
                        right: 0,
                    }}
                />
            </TouchableOpacity>
            <Animated.View
                style={{
                    height: heightValue,
                }}
            >
                {content.map((item, i) => (
                    <View
                        key={i}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 12,
                        }}
                    >

                        <IoIcon name="star" style={{ fontSize: 18, opacity: 0.4 }} />
                        <DrawerItem
                            key={i}
                            label={item.label}
                            style={{
                                borderRadius: 8,
                                width: '100%',
                            }}
                            labelStyle={{
                                position: 'absolute',
                                fontSize: 16,
                                transform: [{ translateY: -8 }],
                                opacity: 0.7
                            }}
                            onPress={() => props.navigation.navigate(item.route)}
                        />
                    </View>
                ))}
            </Animated.View>
        </View>
    )
}

export default Dropdown