import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, TextInput, } from 'react-native'
import React, { useState } from 'react'
import { ButtonGroup } from '@rneui/themed'
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import Calendars from '../../../Components/calendar/Calendars';
import DatePicker from 'react-native-modern-datepicker'
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetAsyncStorage from '../../../Models/GetAsyncStorage';
import CallPostApi from '../../../Models/CallPostApi';
import { useEffect, useRef } from 'react'
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import Axios from 'axios';


const Pending_orders = ({ navigation }) => {

    const URL = 'http://192.168.1.101:3000/v1/api';

    const [selectedIndex, setSelectedIndex] = useState(0);

    const [isLoading, setIsLoading] = useState(true)

    //khai báo dữ liệu của lịch
    const [fromDate, setFromDate] = useState('')
    const [isFromDate, setIsFromDate] = useState(true)
    const [endDate, setEndDate] = useState('')
    const [isEndDate, setIsEndDate] = useState('')

    //khai báo dữ liệu của lịch
    const [fromDate2, setFromDate2] = useState('')
    const [isFromDate2, setIsFromDate2] = useState(true)
    const [endDate2, setEndDate2] = useState('')
    const [isEndDate2, setIsEndDate2] = useState('')

    //khai báo thông tin đơn thêm
    const [ten_kh, setTenKH] = useState('')
    const [sdt, setSdt] = useState('');
    const [address, setAddress] = useState('')
    const [loaimay, setLoaiMay] = useState('')
    const [notes, setNote] = useState('')

    const buttons = ['Đơn chờ thực hiện', 'Đơn đang thực hiện', 'Đơn đã hoàn thành', 'Đơn thu nợ'];


    //Khai báo Api của khách hàng
    const [orders, setOrders] = useState([])

    //bật tắt model
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    //bật tắt model lịch
    const [isModalVisible1, setModalVisible1] = useState(false);
    const toggleModal1 = () => {
        setModalVisible1(!isModalVisible1);
    };

    //bật tắt model lịch
    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };

    // Khai báo hỗ trợ đơn hàng
    const countries = ["Máy Kangaroo", "Máy Karofi", "Máy Korihome", "Máy Nano", "Máy RO", "Máy MIDEA", "Không xác định"]
    const [selectedOption, setSelectedOption] = useState(null);


    //Khai báo check box trong chương trình đã tư vấn
    // const [isChecked, setChecked] = useState(false);

    const options = [
        { id: 1, value: 'Khách có nhu cầu thay lõi', isChecked: true },
        { id: 2, value: 'VSBD90k ko tặng', isChecked: false },
        { id: 3, value: 'Lắp máy mới', isChecked: false },
        { id: 4, value: 'TLCB Kang', isChecked: false },
        { id: 5, value: 'Tháo, di chuyển, lắp lại máy cũ', isChecked: false },
        { id: 6, value: 'TL-VS-BD Karofi', isChecked: false },
        { id: 7, value: 'Sửa máy', isChecked: false },
        { id: 8, value: ' VSBD90k tặng lõi 1 AQUA', isChecked: false },
        { id: 9, value: 'Lắp lại máy', isChecked: false },
        { id: 10, value: 'TLCB Karofi', isChecked: false },
        { id: 11, value: 'TL-VS-BD Kang', isChecked: false },
        { id: 12, value: 'TL-VS-BD RO', isChecked: false },
        { id: 13, value: 'Sửa máy 200k', isChecked: false },
    ]

    const [checkedItems, setCheckedItems] = useState([]);

    // Hàm xử lý sự kiện khi người dùng thay đổi trạng thái của ô kiểm
    const handleCheckBoxChange = (item) => {
        // Kiểm tra xem item có trong mảng checkedItems chưa
        const isChecked = checkedItems.includes(item);
        if (isChecked) {
            // Nếu có, loại bỏ item khỏi mảng checkedItems
            setCheckedItems(checkedItems.filter(i => i !== item));
        } else {
            // Nếu không, thêm item vào mảng checkedItems
            setCheckedItems([...checkedItems, item]);
        }
    };

    //thông báo khi có đơn hàng
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    const getNotification = async () => {

        const { status } = await Notifications.getPermissionsAsync()
        if (status !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync()
            if (status !== 'granted') {
                alert('Looix')
                return;
            }
        }

        const tokenData = await Notifications.getExpoPushTokenAsync()
        const token = await tokenData.data
        const message = {
            to: token,
            title: "Bạn có 1 đơn hàng mới !!!",
            body: 'Nhấn Vào Để Xem Chi Tiết!!'
        }

        await Axios.post('https://api.expo.dev/v2/push/send', message)
            .catch(err => console.log(err))

    }

    // Lấy token và id của user 
    const [id, setId] = useState()
    const [token, setToken] = useState()
    const [timeexp, setTimeExp] = useState()


    useEffect(() => {
        const getUserData = async () => {
            try {
                const id = await AsyncStorage.getItem('id');
                const accessToken = await AsyncStorage.getItem('accessToken');
                const timeExp = await AsyncStorage.getItem('timeeexp');

                // Cập nhật giá trị vào state
                setId(id);
                setToken(accessToken);
                setTimeExp(timeExp);
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error('Lỗi khi lấy dữ liệu từ AsyncStorage: ', error);
            }
        }

        // Gọi hàm lấy dữ liệu từ AsyncStorage
        getUserData();
    });


    //lấy token từ AsyncStorage
    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            console.log('Token đã được lấy thành công');
            return token;
        } catch (error) {
            console.log('Lỗi khi lấy token: ', error);
        }
    };


    //lấy id từ AsyncStorage
    const getID = async () => {
        try {
            const id = await AsyncStorage.getItem('id');
            console.log('Token đã được lấy thành công');
            return id;
        } catch (error) {
            console.log('Lỗi khi lấy token: ', error);
        }
    };

    //lấy thông tin khách hàng
    const [contacts, setContacts] = useState([])

    const GetApiorders = async () => {

        const accessToken = await getToken()
        const id = await getID()

        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "39081e3d21dc8f2c3fddaff1ae20142b0ae3a0c1849da2a3bd753ddf8db599d983b28c681972c5ecc8990f164527f5d4a0a1820240de22e80b0f61dfbdedde7d",
                "authorization": cleanedJwtString,
                "x-client-id": id
            }
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/orders/getpending/' + id, requestOptions)
            .then((data) => {

                console.log(requestOptions)
                return data.json()
            })
            .then(data => {

                console.log(data.metadata)
                // if (data.metadata && Array.isArray(data.metadata)) {
                // getNotification()
                setOrders(data.metadata);
                const metadata = data.metadata;
                const contacts = metadata.map((item) => item.contacts);
                setContacts(contacts);
                // console.log({ contacts })
                setIsLoading(false);
                // } else {
                //     console.error('Invalid API response:', data);
                // }
            })

    }

    // console.log(contacts.flat())

    useEffect(() => {
        GetApiorders()
    }, [])



    //xử lý khi đặt đơn
    const handerSubmit = async (id1) => {

        const accessToken = await getToken()
        const id = await getID()

        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "39081e3d21dc8f2c3fddaff1ae20142b0ae3a0c1849da2a3bd753ddf8db599d983b28c681972c5ecc8990f164527f5d4a0a1820240de22e80b0f61dfbdedde7d",
                "authorization": cleanedJwtString,
                "x-client-id": id
            }
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/orders/update/' + id1, requestOptions)
            .then(() => {
                GetApiorders()
            })
    }

    // console.log({ orders })

    return (
        <SafeAreaView>

            {/* model */}
            <Modal isVisible={isModalVisible} style={{ marginBottom: 50, marginTop: 20 }} >
                <ScrollView style={{
                    backgroundColor: 'white',
                    flex: 1,
                    marginTop: 20
                }}>
                    <View >
                        <View>
                            <View>
                                <View>
                                    <TouchableOpacity onPress={toggleModal} style={{
                                        marginLeft: Dimensions.get('window').width - 80,
                                        marginTop: 20
                                    }}>
                                        <AntDesign name="close" size={24} color="black" style={{
                                            opacity: 0.3
                                        }} />
                                    </TouchableOpacity>
                                    <Text style={{
                                        paddingHorizontal: 10,
                                        fontSize: 22,
                                        marginTop: -20,
                                        fontWeight: 400
                                    }}>
                                        Tạo mới đơn thêm
                                    </Text>
                                    <View style={{
                                        width: "100%",
                                        height: 1,
                                        backgroundColor: 'black',
                                        marginVertical: 14,
                                        opacity: 0.1
                                    }}>

                                    </View>
                                </View>

                                {/* THông tin khách hàng */}
                                <View>
                                    <View>
                                        <Text style={{
                                            paddingHorizontal: 10,
                                            fontSize: 18,
                                            fontWeight: 500
                                        }}>
                                            Tên khách hàng:
                                        </Text>
                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 7
                                        }}>
                                            <TextInput
                                                style={{
                                                    width: '90%',
                                                    height: 40,
                                                    borderColor: 'black',
                                                    borderWidth: 0.4,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    paddingHorizontal: 10
                                                }}
                                                placeholderTextColor='gray'
                                                placeholder='Tên khách hàng...'
                                                onChangeText={(e) => setTenKH(e)}
                                            />
                                        </View>
                                    </View>

                                    <View style={{
                                        marginTop: 17
                                    }}>
                                        <Text style={{
                                            paddingHorizontal: 10,
                                            fontSize: 18,
                                            fontWeight: 500
                                        }}>
                                            Số điện thoại:
                                        </Text>
                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 7
                                        }}>
                                            <TextInput
                                                style={{
                                                    width: '90%',
                                                    height: 40,
                                                    borderColor: 'black',
                                                    borderWidth: 0.4,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    paddingHorizontal: 10
                                                }}
                                                placeholderTextColor='gray'
                                                placeholder='Số điện thoại...'
                                                onChangeText={(e) => setSdt(e)}
                                            />
                                        </View>
                                    </View>

                                    <View style={{
                                        marginTop: 17
                                    }}>
                                        <Text style={{
                                            paddingHorizontal: 10,
                                            fontSize: 18,
                                            fontWeight: 500
                                        }}>
                                            Địa chỉ chi tiết:
                                        </Text>
                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 7
                                        }}>
                                            <TextInput
                                                style={{
                                                    width: '90%',
                                                    height: 40,
                                                    borderColor: 'black',
                                                    borderWidth: 0.4,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    paddingHorizontal: 10
                                                }}
                                                placeholderTextColor='gray'
                                                placeholder='Địa chỉ chi tiết...'
                                                onChangeText={(e) => setAddress(e)}
                                            />
                                        </View>
                                    </View>

                                    <View style={{
                                        marginTop: 17
                                    }}>
                                        <Text style={{
                                            paddingHorizontal: 10,
                                            fontSize: 18,
                                            fontWeight: 500
                                        }}>
                                            Loại máy:
                                        </Text>
                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 7
                                        }}>
                                            <SelectDropdown
                                                data={countries}
                                                onSelect={(selectedItem, index) => {
                                                    console.log(selectedItem, index)
                                                }}
                                                defaultButtonText="--Chọn--"
                                                buttonText={selectedOption ? selectedOption : '--Chọn--'}
                                                buttonTextAfterSelection={(selectedItem, index) => {
                                                    // text represented after item is selected
                                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                                    return selectedItem
                                                }}
                                                rowTextForSelection={(item, index) => {
                                                    // text represented for each item in dropdown
                                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                                    return item
                                                }}
                                                buttonStyle={{
                                                    width: '90%',
                                                    backgroundColor: 'white',
                                                    borderColor: 'black',
                                                    borderWidth: 0.5,
                                                    height: 37,
                                                    marginTop: 1,
                                                    opacity: 0.4
                                                }}
                                            />
                                        </View>
                                    </View>

                                    <View style={{
                                        marginTop: 17
                                    }}>
                                        <Text style={{
                                            paddingHorizontal: 10,
                                            fontSize: 18,
                                            fontWeight: 500
                                        }}>
                                            Mô tả/ ghi chú khách:
                                        </Text>
                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 7
                                        }}>
                                            <TextInput
                                                style={{
                                                    width: '90%',
                                                    height: 100,
                                                    borderColor: 'black',
                                                    borderWidth: 0.4,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    paddingHorizontal: 10
                                                }}
                                                placeholderTextColor='gray'
                                                placeholder='Mô tả/ ghi chú khách...'
                                                onChangeText={(e) => setNote(e)}
                                            />
                                        </View>
                                    </View>

                                    <Modal isVisible={isModalVisible1} style={{ marginBottom: 50, marginTop: 20 }} >
                                        <View >
                                            {/* {isFromDate && ( */}
                                            <DatePicker
                                                options={{
                                                    backgroundColor: '#090C08',
                                                    textHeaderColor: '#FFA25B',
                                                    textDefaultColor: '#F6E7C1',
                                                    selectedTextColor: '#fff',
                                                    mainColor: '#F4722B',
                                                    textSecondaryColor: '#D6C7A1',
                                                    borderColor: 'rgba(122, 146, 165, 0.1)',
                                                }}
                                                mode="calendar"
                                                minuteInterval={30}
                                                style={{ borderRadius: 10 }}
                                                onSelectedChange={(date) => {
                                                    setFromDate(date)
                                                    // setIsFromDate(false)
                                                    setModalVisible1(false);
                                                }}
                                            />
                                            {/* )} */}

                                        </View>
                                    </Modal>

                                    <Modal isVisible={isModalVisible2} style={{ marginBottom: 50, marginTop: 20 }} >
                                        <View >
                                            {/* {isFromDate && ( */}
                                            <DatePicker
                                                options={{
                                                    backgroundColor: '#090C08',
                                                    textHeaderColor: '#FFA25B',
                                                    textDefaultColor: '#F6E7C1',
                                                    selectedTextColor: '#fff',
                                                    mainColor: '#F4722B',
                                                    textSecondaryColor: '#D6C7A1',
                                                    borderColor: 'rgba(122, 146, 165, 0.1)',
                                                }}
                                                mode="calendar"
                                                minuteInterval={30}
                                                style={{ borderRadius: 10 }}
                                                onSelectedChange={(date) => {
                                                    setFromDate2(date)
                                                    // setIsFromDate(false)
                                                    // setModalVisible2(false);
                                                }}
                                            />
                                            {/* )} */}

                                        </View>
                                    </Modal>

                                    <View style={{
                                        marginTop: 17
                                    }}>
                                        <Text style={{
                                            paddingHorizontal: 10,
                                            fontSize: 18,
                                            fontWeight: 500
                                        }}>
                                            Giờ hẹn tới nhà khách:
                                        </Text>
                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 7,
                                            flexDirection: 'row'
                                        }}>
                                            <TouchableOpacity
                                                style={{
                                                    width: '45%',
                                                    height: 40,
                                                    borderColor: 'black',
                                                    borderWidth: 0.4,
                                                    padding: 10,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-around'
                                                }}
                                                onPress={toggleModal1}
                                            >
                                                <Text>
                                                    {fromDate}
                                                </Text>
                                                <AntDesign name="calendar" size={20} color="black" />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{
                                                    width: '45%',
                                                    height: 40,
                                                    borderColor: 'black',
                                                    borderWidth: 0.4,
                                                    padding: 10,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-around'
                                                }}
                                                onPress={toggleModal2}
                                            >
                                                <Text>
                                                    {fromDate2}
                                                </Text>
                                                <AntDesign name="calendar" size={20} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View>
                                        <Text style={{
                                            fontSize: 20,
                                            padding: 10,
                                            fontWeight: 400
                                        }}>
                                            Giói dịch vụ
                                        </Text>
                                        {options && options.map(option => (
                                            <View
                                                key={option.id}
                                                style={{
                                                    flexDirection: 'row',

                                                }}>
                                                <CheckBox
                                                    title={option.label}
                                                    checked={checkedItems.includes(option.value)}
                                                    onPress={() => handleCheckBoxChange(option.value)}
                                                />
                                                <TouchableOpacity onPress={() => handleCheckBoxChange(option.value)}>
                                                    <Text style={{
                                                        marginLeft: 20,
                                                        fontSize: 17,
                                                        lineHeight: 30,
                                                        marginTop: 10
                                                    }}>
                                                        {option.value}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>

                                </View>

                                {/* Đặt đơn */}
                                <View style={{
                                    marginBottom: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 20
                                }}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#3c8dbc',
                                            width: '90%'
                                        }}
                                    // onPress={() => handerSubmit()}
                                    >
                                        <Text style={{
                                            textAlign: 'center',
                                            padding: 10,
                                            color: 'white'
                                        }}>
                                            Đặt đơn
                                        </Text>
                                    </TouchableOpacity>
                                </View>


                            </View>
                        </View >
                    </View >
                </ScrollView >
            </Modal >
            <View  >
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

                        }}
                            onPress={toggleModal}

                        >
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
                    <Spinner
                        visible={isLoading}
                        textContent={'Loading...'}
                        textStyle={{ color: '#FFF' }}
                    />
                </View>
            </View>
            <View>
                <View >
                    {contacts && contacts.map(order => (
                        <View key={order.id}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <View style={{
                                width: '90%'

                            }}>
                                <View>
                                    <View
                                        style={{
                                            backgroundColor: '#088db5',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: 10
                                        }}>
                                        <View style={{
                                            width: '80%',
                                            backgroundColor: 'green',
                                            padding: 10,
                                            height: 150
                                        }}>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: 16,
                                                marginBottom: 6
                                            }}>

                                                MKH {order.id} -

                                                {order.name} - {order.formatted_address}
                                            </Text>

                                            <View style={{
                                                width: '100%',
                                                marginTop: 30
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-around',
                                                }}>
                                                    <TouchableOpacity
                                                        onPress={() => handerCance()}
                                                        style={{
                                                            backgroundColor: 'coral',
                                                            padding: 10
                                                        }}
                                                    >
                                                        <Text style={{
                                                            color: 'white'
                                                        }}>
                                                            Hủy
                                                            {order.ordersId}
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => handerSubmit(order.id)}
                                                        style={{
                                                            backgroundColor: 'coral',
                                                            padding: 10
                                                        }}
                                                    >
                                                        <Text style={{
                                                            color: 'white'
                                                        }}>
                                                            Xác Nhận
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>

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
                    ))}
                </View>
            </View >
        </SafeAreaView >
    )
}

export default Pending_orders