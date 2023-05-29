import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ButtonGroup } from '@rneui/themed'
import Header from '../../../Components/Header/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons';


const Order_Done = ({ navigation }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const URL = 'http://192.168.1.101:3000/v1/api';

    const buttons = ['Đơn chờ thực hiện', 'Đơn đang thực hiện', 'Đơn đã hoàn thành', 'Đơn thu nợ'];


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

    //Lấy apis orders
    const [orders, setorder] = useState([])


    useFocusEffect(
        React.useCallback(() => {
            const GetApiorders = async (id1) => {

                const accessToken = await getToken()
                const id = await getID()


                const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": "d420e946ae282dfadafede6b060ae66e3ffd2a9cddfe3dc9b4cd070f98ad4985aeab65e2751677f21f91f34c2a22a1f95bf0b330fd2eb0dfb2c1fb53a7c8d97a",
                        "authorization": cleanedJwtString,
                        "x-client-id": id
                    }
                };


                // Lấy dữ liệu của khách hàng
                fetch(URL + '/orders/getorderdone/' + id, requestOptions)
                    .then((data) => {
                        return data.json()
                    })
                    .then(data => {
                        if (data.metadata && Array.isArray(data.metadata)) {
                            // console.log(orders);
                            setorder(data.metadata);

                        } else {
                            console.error('Invalid API response:', data);
                        }
                    })
            }
            GetApiorders()
        }, [])
    );


    const [orderbyid, setOrderById] = useState([])
    const [contacts, setContacts] = useState([])
    const [orderAcction, setOrderAction] = useState([])


    const [isModalVisible, setModalVisible] = useState(false);

    //lấy api của sản phẩm đã chọn
    const [carts, setCart] = useState([])
    const product_done = async (id1) => {

        const accessToken = await getToken()
        const id = await getID()


        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions1 = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "d420e946ae282dfadafede6b060ae66e3ffd2a9cddfe3dc9b4cd070f98ad4985aeab65e2751677f21f91f34c2a22a1f95bf0b330fd2eb0dfb2c1fb53a7c8d97a",
                "authorization": cleanedJwtString,
                "x-client-id": id
            }
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/transactions_sell_line/get/' + id1, requestOptions1)
            .then((data) => {
                return data.json()
            })
            .then(data => {

                const products = data.metadata && data.metadata.map(item => {
                    const product = item.product;
                    product.quantity = item.quantity;
                    return product;
                });

                setCart(products)

            })

    }


    const GetApiordersByid = async (id1) => {

        product_done(id1)
        const accessToken = await getToken()
        const id = await getID()


        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "d420e946ae282dfadafede6b060ae66e3ffd2a9cddfe3dc9b4cd070f98ad4985aeab65e2751677f21f91f34c2a22a1f95bf0b330fd2eb0dfb2c1fb53a7c8d97a",
                "authorization": cleanedJwtString,
                "x-client-id": id
            }
        };


        // Lấy dữ liệu của khách hàng
        fetch(URL + '/orders/getById/' + id1, requestOptions)
            .then((data) => {
                return data.json()
            })
            .then(data => {
                // console.log(data.message)
                setOrderById(data.metadata)
                // setIsLoading(false)
                if (data.metadata && Array.isArray(data.metadata)) {
                    setOrderAction(data.metadata)
                    console.log(data.metadata)

                    setContacts([data.metadata[0].contacts]);
                    // setIsLoading(false);
                }
            })
    }


    const toggleModal = (id1) => {
        setModalVisible(!isModalVisible);
        GetApiordersByid(id1)

    };





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
                <View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {
                            orders.map(order => (
                                <View
                                    key={order.id}
                                    style={{
                                        backgroundColor: '#088db5',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 10,
                                        width: '90%'
                                    }}>
                                    <View style={{
                                        width: '80%',
                                        backgroundColor: 'green',
                                        padding: 10
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
                                            width: '100%'
                                        }}>

                                            <TouchableOpacity style={{
                                                width: '100%',
                                                backgroundColor: 'yellow',
                                                padding: 10,
                                                borderRadius: 7

                                            }}
                                                onPress={() => toggleModal(order.id)}
                                            >
                                                <Text style={{
                                                    textAlign: 'center',
                                                    color: 'black'
                                                }}>
                                                    Xem
                                                </Text>
                                            </TouchableOpacity>
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
                                </View>
                            ))
                        }

                    </View>
                    {/* Modal xem đơn */}
                    <Modal isVisible={isModalVisible} style={{ marginBottom: 30 }}>
                        <ScrollView style={{

                        }}>
                            {orderbyid && orderbyid.map(orderby => (
                                <View
                                    key={orderby.id}
                                    style={{
                                        flex: 1, backgroundColor: 'white', marginTop: 20,
                                        alignContent: 'center',
                                        width: '100%',
                                    }}>
                                    <TouchableOpacity onPress={toggleModal} style={{
                                        marginLeft: Dimensions.get('window').width - 80,
                                        marginTop: 20
                                    }}>

                                        <AntDesign name="close" size={24} color="black" style={{
                                            opacity: 0.3
                                        }} />
                                    </TouchableOpacity>
                                    <View>
                                        <Text style={{
                                            fontSize: 22,
                                            padding: 10,
                                            marginTop: 0
                                        }}>
                                            Mã đơn hàng: MKH{orderby.id}
                                        </Text>
                                    </View>

                                    {/* Thông tin khách hàng */}
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                    }}>

                                        <View style={{
                                            width: '93%',
                                            backgroundColor: '#d9edf7',
                                            borderColor: '#bce8f1',
                                            borderWidth: 1
                                        }}>
                                            <View>

                                                <Text style={{
                                                    padding: 10,
                                                    fontSize: 18,
                                                    color: '#31708f',
                                                    borderColor: '#bce8f1',
                                                    borderWidth: 1
                                                }}>
                                                    Thông tin khách hàng
                                                </Text>
                                                {contacts.map(contact => (
                                                    <View key={contact.id}>

                                                        <View style={{
                                                            width: "100%",
                                                            backgroundColor: 'white',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}>
                                                            <View style={{
                                                                width: '93%',
                                                                marginTop: 10,
                                                            }}>
                                                                <View style={{
                                                                    borderColor: '#ddd',
                                                                    borderWidth: 1,
                                                                    flexDirection: 'row',
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        fontWeight: 500,
                                                                        paddingVertical: 10,
                                                                        marginLeft: 7
                                                                    }}>
                                                                        Tên Khách Hàng:
                                                                    </Text>
                                                                    <Text style={{
                                                                        paddingVertical: 10,
                                                                        fontSize: 15,
                                                                        marginTop: 2,
                                                                        marginLeft: 6
                                                                    }}>
                                                                        {contact.name}
                                                                    </Text>
                                                                </View>

                                                                <View style={{
                                                                    borderColor: '#ddd',
                                                                    borderWidth: 1,
                                                                    flexDirection: 'row',
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        fontWeight: 500,
                                                                        paddingVertical: 10,
                                                                        marginLeft: 7
                                                                    }}>
                                                                        Địa Chỉ:
                                                                    </Text>
                                                                    <Text style={{
                                                                        paddingVertical: 10,
                                                                        fontSize: 15,
                                                                        marginLeft: 6,
                                                                        marginTop: 1,
                                                                        width: '75%',
                                                                        opacity: 0.7
                                                                    }}>
                                                                        {contact.formatted_address}
                                                                    </Text>
                                                                </View>

                                                                <View style={{
                                                                    borderColor: '#ddd',
                                                                    borderWidth: 1,
                                                                    flexDirection: 'row',
                                                                    padding: 4

                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        fontWeight: 500,
                                                                        paddingVertical: 10,
                                                                        marginLeft: 7
                                                                    }}>
                                                                        Ví Trí KH:
                                                                    </Text>
                                                                    <TouchableOpacity style={{
                                                                        width: '40%',
                                                                        backgroundColor: '#337ab7',
                                                                        marginLeft: 6
                                                                    }}>
                                                                        <Text style={{
                                                                            paddingVertical: 10,
                                                                            fontSize: 17,
                                                                            marginLeft: 6,
                                                                            color: 'white',
                                                                            fontWeight: 500
                                                                        }}>
                                                                            Google Map
                                                                        </Text>
                                                                    </TouchableOpacity>

                                                                </View>


                                                                <View style={{
                                                                    borderColor: '#ddd',
                                                                    borderWidth: 1,
                                                                    flexDirection: 'row',
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        fontWeight: 500,
                                                                        paddingVertical: 10,
                                                                        marginLeft: 7
                                                                    }}>
                                                                        Loại Máy:
                                                                    </Text>
                                                                    <Text style={{
                                                                        paddingVertical: 10,
                                                                        fontSize: 15,
                                                                        marginTop: 1,
                                                                        opacity: 0.7,
                                                                        marginLeft: 6
                                                                    }}>
                                                                        Máy Kangaroo
                                                                    </Text>
                                                                </View>

                                                                <View style={{
                                                                    borderColor: '#ddd',
                                                                    borderWidth: 1,
                                                                    flexDirection: 'row',
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        fontWeight: 500,
                                                                        paddingVertical: 10,
                                                                        marginLeft: 7
                                                                    }}>
                                                                        Giờ hẹn tới nhà khách:
                                                                    </Text>
                                                                    <Text style={{
                                                                        paddingVertical: 10,
                                                                        fontSize: 15,
                                                                        marginLeft: 6,
                                                                        width: '75%',
                                                                        margin: 2
                                                                    }}>
                                                                        10:00:00
                                                                    </Text>
                                                                </View>

                                                                <View style={{
                                                                    borderColor: '#ddd',
                                                                    borderWidth: 1,
                                                                    flexDirection: 'row',
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        fontWeight: 500,
                                                                        paddingVertical: 10,
                                                                        marginLeft: 7
                                                                    }}>
                                                                        Gió dịch vụ:
                                                                    </Text>
                                                                    <Text style={{
                                                                        paddingVertical: 10,
                                                                        fontSize: 15,
                                                                        marginLeft: 6,
                                                                        marginTop: 1,
                                                                        width: '60%'
                                                                    }}>
                                                                        -Thay lõi, vệ sinh, bảo dưỡng, Kangaroo
                                                                    </Text>
                                                                </View>

                                                                <View style={{
                                                                    borderColor: '#ddd',
                                                                    borderWidth: 1,
                                                                    flexDirection: 'row',
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        fontWeight: 500,
                                                                        paddingVertical: 10,
                                                                        marginLeft: 7
                                                                    }}>
                                                                        Đồ cần mang:
                                                                    </Text>
                                                                    <Text style={{
                                                                        paddingVertical: 10,
                                                                        fontSize: 17,
                                                                        marginLeft: 6
                                                                    }}>
                                                                        Không /
                                                                    </Text>
                                                                </View>

                                                                <View style={{
                                                                    borderColor: '#ddd',
                                                                    borderWidth: 1,
                                                                    // flexDirection: 'row',
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        fontWeight: 500,
                                                                        paddingVertical: 10,
                                                                        marginLeft: 7
                                                                    }}>
                                                                        Hỗ Trợ Đơn Hàng:
                                                                    </Text>

                                                                    <TouchableOpacity style={{
                                                                        width: '50%',
                                                                        backgroundColor: '#337ab7',
                                                                        marginTop: 5,
                                                                        marginBottom: 5,
                                                                        marginLeft: 15,
                                                                        borderRadius: 7
                                                                    }}>
                                                                        <Text style={{
                                                                            paddingVertical: 10,
                                                                            fontSize: 17,
                                                                            marginLeft: 6,
                                                                            color: 'white'
                                                                        }}>
                                                                            Yêu cầu hỗ trợ
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                </View>

                                                                <View style={{
                                                                    borderColor: '#ddd',
                                                                    borderWidth: 1,
                                                                    flexDirection: 'row',
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        fontWeight: 500,
                                                                        paddingVertical: 10,
                                                                        marginLeft: 7
                                                                    }}>
                                                                        Nhân Viên KT:
                                                                    </Text>
                                                                    <Text style={{
                                                                        paddingVertical: 10,
                                                                        fontSize: 17,
                                                                        marginLeft: 6,
                                                                        opacity: 0.7
                                                                    }}>
                                                                        NVKT1812
                                                                    </Text>
                                                                </View>

                                                                <View style={{
                                                                    borderColor: '#ddd',
                                                                    borderWidth: 1,
                                                                    flexDirection: 'row',
                                                                    // marginTop: 30
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        fontWeight: 500,
                                                                        paddingVertical: 10,
                                                                        marginLeft: 7
                                                                    }}>
                                                                        Số km di chuyển:
                                                                    </Text>
                                                                    <Text style={{
                                                                        paddingVertical: 10,
                                                                        fontSize: 17,
                                                                        marginLeft: 6
                                                                    }}>
                                                                        0
                                                                    </Text>
                                                                </View>

                                                                <View style={{
                                                                    borderColor: '#ddd',
                                                                    borderWidth: 1,
                                                                    flexDirection: 'row',
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        fontWeight: 500,
                                                                        paddingVertical: 10,
                                                                        marginLeft: 7
                                                                    }}>
                                                                        Cuốc về:
                                                                    </Text>
                                                                    <Text style={{
                                                                        paddingVertical: 10,
                                                                        fontSize: 17,
                                                                        marginLeft: 6
                                                                    }}>
                                                                        0
                                                                    </Text>
                                                                </View>

                                                                <View style={{
                                                                    borderColor: '#ddd',
                                                                    borderWidth: 1,
                                                                    flexDirection: 'row',
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        fontWeight: 500,
                                                                        paddingVertical: 10,
                                                                        marginLeft: 7
                                                                    }}>
                                                                        Thời gian di chuyển:
                                                                    </Text>
                                                                    <Text style={{
                                                                        paddingVertical: 10,
                                                                        fontSize: 17,
                                                                        marginLeft: 6
                                                                    }}>
                                                                        0
                                                                    </Text>
                                                                </View>

                                                                <View style={{
                                                                    borderColor: '#ddd',
                                                                    borderWidth: 1,
                                                                    flexDirection: 'row',
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        fontWeight: 500,
                                                                        paddingVertical: 10,
                                                                        marginLeft: 7
                                                                    }}>
                                                                        Bắt đầu:
                                                                    </Text>
                                                                    <Text style={{
                                                                        paddingVertical: 10,
                                                                        fontSize: 17,
                                                                        marginLeft: 6
                                                                    }}>
                                                                        10:00:00
                                                                    </Text>
                                                                </View>

                                                                <View style={{
                                                                    borderColor: '#ddd',
                                                                    borderWidth: 1,
                                                                    flexDirection: 'row',
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        fontWeight: 500,
                                                                        paddingVertical: 10,
                                                                        marginLeft: 7
                                                                    }}>
                                                                        Kết Thúc:
                                                                    </Text>
                                                                    <Text style={{
                                                                        paddingVertical: 10,
                                                                        fontSize: 17,
                                                                        marginLeft: 6
                                                                    }}>
                                                                        10:00:00
                                                                    </Text>
                                                                </View>

                                                                <View style={{
                                                                    borderColor: '#ddd',
                                                                    borderWidth: 1,
                                                                    flexDirection: 'row',
                                                                    marginBottom: 30
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        fontWeight: 500,
                                                                        paddingVertical: 10,
                                                                        marginLeft: 7
                                                                    }}>
                                                                        Mô Tả:
                                                                    </Text>
                                                                    <Text style={{
                                                                        paddingVertical: 10,
                                                                        fontSize: 17,
                                                                        marginLeft: 6
                                                                    }}>
                                                                        Không /
                                                                    </Text>
                                                                </View>

                                                            </View>
                                                        </View>
                                                    </View>
                                                ))}
                                            </View>

                                        </View>

                                    </View>

                                    {/* Chương trình tư vấn */}
                                    <View style={{
                                        marginTop: 10
                                    }}>
                                        <View>
                                            <Text style={{
                                                fontSize: 18,
                                                padding: 10,
                                                fontWeight: 500
                                            }}>
                                                Chương trình đã tư vấn
                                            </Text>
                                        </View>


                                        <View>
                                            <Text style={{
                                                fontSize: 18,
                                                padding: 10,
                                                fontWeight: 500
                                            }}>
                                                Sản Phẩm Đã Chọn
                                            </Text>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-around',
                                                // marginBottom: 10,
                                                marginTop: 10
                                            }}>
                                                <Text style={{
                                                    textAlign: 'center'
                                                }}>
                                                    Tên Sp
                                                </Text>

                                                <Text style={{
                                                    textAlign: 'center'
                                                }}>
                                                    Số Lượng
                                                </Text>
                                                {/* <Text>
                                                    Giá
                                                </Text>
                                                <Text>
                                                    Thành Tiền
                                                </Text> */}

                                            </View>

                                            {carts && carts.map(ca => (
                                                <View key={ca.id}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-around',
                                                        marginTop: 20,
                                                        borderBottomWidth: 1,
                                                        borderBottomColor: 'gray',

                                                    }}>
                                                        <Text style={{
                                                            textAlign: 'center'
                                                        }}>
                                                            {ca.name}
                                                        </Text>

                                                        <View style={{
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-around',
                                                            width: 100,

                                                        }}>

                                                            <View style={{
                                                                justifyContent: "center",
                                                                alignItems: 'center'
                                                            }}>
                                                                <Text style={{
                                                                    textAlign: 'center'
                                                                }}>
                                                                    {ca.quantity}
                                                                </Text>
                                                            </View>

                                                        </View>
                                                        {/* <View style={{
                                                            justifyContent: "center",
                                                            alignItems: 'center'
                                                        }}>
                                                            <Text style={{
                                                                textAlign: 'center'
                                                            }}>
                                                                {ca.price}
                                                            </Text>
                                                        </View>

                                                        <View style={{
                                                            justifyContent: "center",
                                                            alignItems: 'center'
                                                        }}>
                                                            <Text style={{
                                                                textAlign: 'center'
                                                            }}>
                                                                {ca.price * ca.quantity}
                                                            </Text>
                                                        </View> */}
                                                    </View>
                                                </View>
                                            ))}
                                        </View>

                                        {/* checkbox */}

                                        <View>
                                            <View style={{
                                                // flexDirection: 'row',
                                                // flexWrap: 'wrap'\
                                                marginTop: 20,
                                                marginBottom: 40
                                            }}>


                                                <View style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <TouchableOpacity style={{
                                                        backgroundColor: '#3c8dbc',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: 80,
                                                        borderRadius: 8
                                                    }}
                                                        onPress={() => toggleModal()}
                                                    >
                                                        <Text style={{
                                                            fontSize: 20,
                                                            color: 'white',
                                                            padding: 10
                                                        }}>
                                                            Đóng
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                </View>
                            ))}

                        </ScrollView>
                    </Modal>


                </View>
            </View>
        </SafeAreaView>
    )
}

export default Order_Done