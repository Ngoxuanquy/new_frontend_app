import { DrawerContentScrollView } from '@react-navigation/drawer'
import { Text, TouchableOpacity, View } from 'react-native'

import { ROUTES } from '../modules/client/constants'
import Dropdown from '../Drowdown/index'
import Direct from './../modules/client/order/Direct';
import IoIcon from 'react-native-vector-icons/Ionicons'
import { MENU_DRAWER } from '../modules/client/constants'




function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            {/* <DrawerItemList {...props} /> */}
            {/* {console.log(props.state)} */}

            {/* <DrawerItem label={'Home Drawer'} /> */}

            <View style={{ rowGap: 20, paddingLeft: 20 }}>
                <View>
                    <TouchableOpacity onPress={() => props.navigation.navigate(ROUTES.HOME_DRAWER)} style={{
                        flexDirection: 'row',
                        borderBottomWidth: 0.4,
                        width: '95%',
                        paddingBottom: 8,
                    }}>
                        <IoIcon name={'home'} style={{ fontSize: 20, marginRight: 8 }} />
                        <Text style={{ fontSize: 18 }}>Trang chủ</Text>
                    </TouchableOpacity>
                </View>
                <Dropdown {...props} items={MENU_DRAWER.INTERNAL_INFO} />
                <Dropdown {...props} items={MENU_DRAWER.USER} />
                <Dropdown {...props} items={MENU_DRAWER.ORDER_PROGRESS} />
                <Dropdown {...props} items={MENU_DRAWER.ADMINISTRATIVE_PROCEDURES} />
                <Dropdown {...props} items={MENU_DRAWER.ORDER_PROGRESS} />
                <Dropdown {...props} items={MENU_DRAWER.ADMINISTRATIVE_PAYMENT} />
                <Dropdown {...props} items={MENU_DRAWER.ADMINISTRATIVE_Sales} />
                <Dropdown {...props} items={MENU_DRAWER.ADMINISTRATIVE_Penalty} />
                <Dropdown {...props} items={MENU_DRAWER.ADMINISTRATIVE_Salary} />
                <Dropdown {...props} items={MENU_DRAWER.ADMINISTRATIVE_Browse} />
                <Dropdown {...props} items={MENU_DRAWER.ADMINISTRATIVE_Update_Profile} />

            </View>
        </DrawerContentScrollView>
    )
}

export default CustomDrawerContent