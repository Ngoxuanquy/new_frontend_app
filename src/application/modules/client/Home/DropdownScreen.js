import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';

export default function DropdownScreen() {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const data = [
        ['Profile', 'Settings'],
        ['My Profile', 'My Settings'],
    ];
    return (
        <View style={{ flex: 1 }}>
            <DropdownMenu
                style={{ flex: 1 }}
                bgColor={'white'}
                tintColor={'#666666'}
                activityTintColor={'green'}
                handler={(selection, row) => {
                    setSelectedItemIndex(row);
                }}
                data={data}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>{data[0][selectedItemIndex]}</Text>
                </View>
            </DropdownMenu>
        </View>
    );
}