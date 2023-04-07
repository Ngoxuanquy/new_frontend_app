import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer'
import IoIcon from 'react-native-vector-icons/Ionicons'

import { ROUTES } from '../modules/client/constants'
import Notification from '../modules/client/Home/Notification'
import BottomTabNavigator from './BottomTabNavigator'
import { toggleDrawer } from './config'
import { Animated } from 'react-native'
import Pending_orders from '../modules/client/order/pending_orders'

import CustomDrawerContent from './CustomDrawerContent'
import Active_Order from './../modules/client/order/Active_Order';
import Order_Done from './../modules/client/order/Order_Done';
import Debt_Collection_Orders from '../modules/client/order/Debt_Collection_Orders'
import Error_Order from '../modules/client/order/Error_Orders'
import Cance_Order from '../modules/client/order/Cance_Order'
import Direct from '../modules/client/order/Direct'
import Listed_POS from '../modules/client/Payment_Orders/Listed_POS'
import Offer_To_Correct_The_Invoice from '../modules/client/Payment_Orders/Offer_To_Correct_The_Invoice'
// import Confirmed_Slips from '../modules/client/Sales_Manager/Confirmed_Slips'
import Orders_Owed from '../modules/client/Sales_Manager/Orders_Owed'
import Payment_Confirmation from '../modules/client/Sales_Manager/Payment_Confirmation'
import Personal_Inventory from '../modules/client/Sales_Manager/Personal_Inventory'
import QR_Code from '../modules/client/Sales_Manager/QR_Code'
import Unpaid_Orders from './../modules/client/Sales_Manager/Unpaid_Orders';
import Penalty_Slips from '../modules/client/Employee_Management/Penalty_Slips'
import Daily_Bonus from '../modules/client/Salary/Daily_Bonus'
import Payroll_Confirmation from '../modules/client/Salary/Payroll_Confirmation'
import Browse from '../modules/client/Expense_Management/Browse'
import Update_Profile from '../modules/client/Update_Profile/Update_Profile'
import Confirmed_Votes from '../modules/client/Sales_Manager/Confirmed_Votes'
import OnLeave from '../modules/client/procedure/OnLeave'
import SignupParttime from '../modules/client/procedure/SignupParttime'
import Individual from './../modules/client/user/Individual';
import DailyReport from '../modules/client/user/DailyReport'
import ProposalPaper from './../modules/client/procedure/ProposalPaper';

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
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
            <Drawer.Navigator
                useLegacyImplementation
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Drawer.Screen name={ROUTES.HOME_DRAWER} component={BottomTabNavigator} />
                <Drawer.Screen name={ROUTES.NOTIFICATION_DRAWER} component={Notification} />
                <Drawer.Screen name={ROUTES.PENDING_ORDERS} component={Pending_orders} />
                <Drawer.Screen name={ROUTES.ACTIVE_ORDER} component={Active_Order} />
                <Drawer.Screen name={ROUTES.ORDER_DONE} component={Order_Done} />
                <Drawer.Screen name={ROUTES.DEBT_Collection_Orders} component={Debt_Collection_Orders} />
                <Drawer.Screen name={ROUTES.ERROR_ORĐER} component={Error_Order} />
                <Drawer.Screen name={ROUTES.CANCE_ORDER} component={Cance_Order} />
                <Drawer.Screen name={ROUTES.DIRECT} component={Direct} />
                <Drawer.Screen name={ROUTES.LISTED_POS} component={Listed_POS} />
                <Drawer.Screen name={ROUTES.Offer_To_Correct_The_Invoice} component={Offer_To_Correct_The_Invoice} />
                <Drawer.Screen name={ROUTES.Confirmed_Votes} component={Confirmed_Votes} />
                <Drawer.Screen name={ROUTES.Orders_Owed} component={Orders_Owed} />
                <Drawer.Screen name={ROUTES.Payment_Confirmation} component={Payment_Confirmation} />
                <Drawer.Screen name={ROUTES.Personal_Inventory} component={Personal_Inventory} />
                <Drawer.Screen name={ROUTES.QR_Code} component={QR_Code} />
                <Drawer.Screen name={ROUTES.Unpaid_Orders} component={Unpaid_Orders} />
                <Drawer.Screen name={ROUTES.Penalty_slips} component={Penalty_Slips} />
                <Drawer.Screen name={ROUTES.Daily_Bonus} component={Daily_Bonus} />
                <Drawer.Screen name={ROUTES.Payroll_Confirmation} component={Payroll_Confirmation} />
                <Drawer.Screen name={ROUTES.Browse} component={Browse} />
                <Drawer.Screen name={ROUTES.Update_Profile} component={Update_Profile} />
                <Drawer.Screen name={ROUTES.ONLEAVE} component={OnLeave} />
                <Drawer.Screen name={ROUTES.SIGNUPPARTTIME} component={SignupParttime} />
                <Drawer.Screen name={ROUTES.INDIVIDUAL} component={Individual} />
                <Drawer.Screen name={ROUTES.DAILY_REPORT} component={DailyReport} />
                <Drawer.Screen name={ROUTES.PROPOSALPAPER} component={ProposalPaper} />



            </Drawer.Navigator>
        </>
    )
}

export default DrawerNavigator