import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ROUTES } from '../modules/client/constants'
import Login from '../modules/client/Login/Login'
import DrawerNavigator from './DrawerNavigator'
import ForgotPassword from '../modules/client/Login/ForgotPassword'
import Active_Order from '../modules/client/order/Active_Order'
import Order_Done from '../modules/client/order/Order_Done'
import Debt_Collection_Orders from '../modules/client/order/Debt_Collection_Orders'
import ChupAnh from '../Components/Chup/Chup'
import ThanhToan from '../modules/client/order/ThanhToan'

const Stack = createStackNavigator()

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.LOGIN} component={Login} />
            <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
            <Stack.Screen name={ROUTES.HOME} component={DrawerNavigator} />
            <Stack.Screen name={ROUTES.ACTIVE_ORDER} component={Active_Order} />
            <Stack.Screen name={ROUTES.ORDER_DONE} component={Order_Done} />
            <Stack.Screen name={ROUTES.DEBT_Collection_Orders} component={Debt_Collection_Orders} />
            <Stack.Screen name={ROUTES.ChupAnh} component={ChupAnh} />
            {/* <Stack.Screen name={ROUTES.ThanhToan} component={ThanhToan} /> */}



        </Stack.Navigator>
    )
}

export default AuthNavigator
