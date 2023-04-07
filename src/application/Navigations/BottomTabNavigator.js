import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ROUTES } from '..//modules/client/constants'
import { Home, Notification } from '../modules/client/Home'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName={ROUTES.HOME_TAB}>
            <Tab.Screen name={ROUTES.HOME_TAB} component={Home} options={{
                headerShown: false
            }} />
            <Tab.Screen name={ROUTES.NOTIFICATION} component={Notification} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator
