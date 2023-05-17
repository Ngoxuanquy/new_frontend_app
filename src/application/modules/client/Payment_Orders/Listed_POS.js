import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown'
import Select from 'react-select';

import { Table, Row, Rows } from 'react-native-table-component';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons';

const Listed_POS = () => {

    const countries = ["Egypt", "Canada", "Australia", "Ireland"]
    const [selectedOption, setSelectedOption] = useState(null);
    const [tuans, setTuan] = useState([])
    const URL = 'http://192.168.1.101:3000/v1/api';



    function getFormattedDate(date) {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return day + '/' + month + '/' + year;
    }

    useEffect(() => {
        var today = new Date();

        // Tính toán ngày đầu tiên trong tuần
        var firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));

        // console.log(getFormattedDate(firstDayOfWeek))

        // Khai báo một mảng để lưu trữ các ngày trong tuần
        var daysOfWeek = [];

        // Thêm các ngày trong tuần vào mảng
        // Thêm các ngày trong tuần vào mảng
        for (var i = 0; i < 6; i++) {
            var day = new Date(firstDayOfWeek);
            day.setDate(firstDayOfWeek.getDate() + i);
            daysOfWeek.push(getFormattedDate(day));
        }

        // Hiển thị các ngày trong tuần
        setTuan(daysOfWeek)
    }, [])

    // const datas = [
    //     { id: 1, ngay: 'ngày 1', MaKH: 122, HDS: 123, TenKH: 'Ngô Xuân Quy', BPThucHien: 'abc', TrinhTrangTT: 'Đã Thanh Toán', HinhThucTT: 'TienMat', TongCong: 1222, ConNo: 0, NgGiuTien: 'MB12312', HoatDong: 'Hoạt Động' },
    //     { id: 2, title: 'data2', value: 122 },
    //     { id: 3, title: 'data3', value: 122 },
    // ]

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


    //api của đơn hàng đã hoàn thành

    const [datas, setData] = useState([])
    const [orders, setOrder] = useState([])
    const [contacts, setContact] = useState([])



    useFocusEffect(
        React.useCallback(() => {
            const getApiOrder = async () => {
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
                    },
                    body: JSON.stringify({
                        id: id
                    })
                };

                // Viết mã kiểm tra token đã hết hạn
                fetch(URL + '/contacts/get/ordercontact/' + id, requestOptions)
                    .then((data) => {
                        return data.json()
                    })
                    .then(data => {


                        if (data.metadata && Array.isArray(data.metadata)) {

                            // setData(data.metadata);
                            setData(data.metadata)


                        } else {
                            console.error('Invalid API response:', data);
                        }
                    })
            }
            getApiOrder();
        }, [])
    );

    const [products, setProduct] = useState([])


    useFocusEffect(
        React.useCallback(() => {

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
                fetch(URL + '/product/get', requestOptions)
                    .then((data) => {
                        return data.json()
                    })
                    .then(data => {
                        // console.log(data.message)
                        setProduct(data.metadata)
                    })
            }
            GetApiorders()
        }, [])
    );


    // console.log(datas)

    const [isModalVisible, setModalVisible] = useState(false);
    //khai báo xem chi tiết
    const [contact_details, setContactdetail] = useState([])
    const [order_details, setOrderdetail] = useState([])
    const [transaction_sell_lines_details, setTransactionSellLinesdetail] = useState([])




    const handerModal = (index) => {
        // console.log(index)
        // console.log(datas[index])
        setModalVisible(!isModalVisible);
        if (isModalVisible == false) {
            setContactdetail(datas[index])
            setTransactionSellLinesdetail(datas[index].transaction_sell_lines)
            setOrderdetail(datas[index].order_histories)
        }
        else {

        }
    }

    //Dữ liệu bảng sản phẩm
    const [sanphams, setSanPham] = useState([])

    useEffect(() => {
        const result = transaction_sell_lines_details.map(line => {
            const product = products.find(p => p.id === line.product_id);
            const { quantity, unit_price } = line;
            const price = quantity * parseFloat(unit_price);
            return { name: product.name, quantity, unit_price, price };
        });

        setSanPham(result)
    }, [transaction_sell_lines_details])

    // console.log({ contact_details })

    // console.log({ transaction_sell_lines_details })

    // console.log(order_details)

    // console.log(datas)

    // Tính tổng tiền
    const [total, setTotal] = useState()
    useEffect(() => {
        let total = 0;
        for (let i = 0; i < sanphams.length; i++) {
            const item = sanphams[i];
            const price = item.unit_price;
            const quantity = item.quantity;
            const itemTotal = price * quantity;
            total += itemTotal;
        }
        setTotal(total)
    }, [sanphams])


    return (
        <ScrollView>
            {/* Modal xem đơn */}
            <Modal isVisible={isModalVisible} style={{ marginBottom: 30 }}>
                <ScrollView style={{

                }}>
                    <View
                        style={{
                            flex: 1, backgroundColor: 'white', marginTop: 20,
                            alignContent: 'center',
                            width: '100%',
                        }}>
                        <TouchableOpacity onPress={handerModal} style={{
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
                                Mã đơn hàng: MKH {contact_details.id}
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
                                    <View >

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
                                                        {contact_details.name}
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
                                                        {contact_details.formatted_address}
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
                                                        Địa chỉ nhà :
                                                    </Text>
                                                    <Text style={{
                                                        paddingVertical: 10,
                                                        fontSize: 15,
                                                        marginLeft: 6,
                                                        marginTop: 1,
                                                        width: '60%'
                                                    }}>

                                                    </Text>
                                                </View>
                                                {order_details.map(order_detail => (
                                                    <>

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
                                                                Mã Hóa Đơn:
                                                            </Text>
                                                            <Text style={{
                                                                paddingVertical: 10,
                                                                fontSize: 17,
                                                                marginLeft: 6
                                                            }}>
                                                                HĐ{order_detail.id}
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
                                                                Số Hóa Đơn:
                                                            </Text>
                                                            <View style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',

                                                            }}>
                                                                <Text style={{
                                                                    fontSize: 17,
                                                                    marginLeft: 6
                                                                }}>
                                                                    {order_detail.id}
                                                                </Text>
                                                            </View>
                                                            <View>


                                                            </View>
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
                                                                NVKT{order_detail.nvkt_id}
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
                                                                Ngày Thanh Toán:
                                                            </Text>
                                                            <Text style={{
                                                                paddingVertical: 10,
                                                                fontSize: 17,
                                                                marginLeft: 6
                                                            }}>
                                                                {order_detail.start_order_at}
                                                            </Text>
                                                        </View>

                                                    </>
                                                ))}
                                            </View>
                                        </View>
                                    </View>
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
                                    Sản Phẩm
                                </Text>
                            </View>

                            {/* checkbox */}
                            <ScrollView horizontal={true} style={{
                                // marginBottom: 100
                                paddingLeft: 10

                            }}>
                                <View>
                                    <View style={{ flexDirection: 'row', backgroundColor: '#00a65a' }}>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9', padding: 20 }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>
                                                #</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Sản Phẩm</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Số Lượng</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Chiết Khấu</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Giá miên yết</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Khuyến Mãi</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Giá Bán</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Thành Tiền</Text>
                                        </View>

                                    </View>
                                    {sanphams.map((data, index) => (

                                        <View
                                            key={data.id}
                                            style={{ flexDirection: 'row' }}>
                                            <>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{index + 1}</Text>
                                                </View>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{data.name}</Text>
                                                </View>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>  {data.quantity}</Text>
                                                </View>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{(data.price * 10) / 100}</Text>
                                                </View>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{data.unit_price}</Text>
                                                </View>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>0</Text>
                                                </View>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{data.unit_price}</Text>
                                                </View>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{data.price}</Text>
                                                </View>
                                            </>
                                        </View>
                                    ))}

                                </View>
                            </ScrollView>

                            <View>
                                <Text style={{
                                    fontSize: 18,
                                    padding: 10,
                                    fontWeight: 500,
                                    marginTop: 20
                                }}>
                                    Thông tin Thanh Toán
                                </Text>
                            </View>

                            {/* checkbox */}
                            <ScrollView horizontal={true} style={{
                                // marginBottom: 100
                                paddingLeft: 10
                            }}>
                                <View>
                                    <View style={{ flexDirection: 'row', backgroundColor: '#00a65a' }}>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9', padding: 20 }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>
                                                #</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Ngày</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Số Phiếu xuất</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Số Tiền</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Nhấn để chọn chế độ thanh toán</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Thời gian hẹn chuyển khoản</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Ngân Hàng</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Ngày tiền về thực tế</Text>
                                        </View>

                                    </View>
                                    {order_details.map((data, index) => (

                                        <View
                                            key={data.id}
                                            style={{ flexDirection: 'row' }}>
                                            <>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{index + 1}</Text>
                                                </View>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{data.start_order_at}</Text>
                                                </View>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}> HĐS: {data.customer_id}</Text>
                                                </View>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{total}</Text>
                                                </View>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{data.status}</Text>
                                                </View>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{data.status}</Text>
                                                </View>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{data.nvkd_id}</Text>
                                                </View>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{total}</Text>
                                                </View>
                                            </>
                                        </View>
                                    ))}

                                </View>
                            </ScrollView>

                            {/* Chiết khấu NVKT */}
                            <View>
                                <View style={{
                                    marginTop: 10
                                }}>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        marginTop: 10,
                                        paddingVertical: 10,
                                        backgroundColor: '#d2d6de',
                                        marginBottom: 1

                                    }}>
                                        <Text style={{
                                            fontWeight: 500,
                                            width: 150

                                        }}>
                                            Chiếu khấu NVKT:
                                        </Text>
                                        <Text>
                                            {(total * 2) / 100}
                                        </Text>
                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        // marginTop: 10,
                                        paddingVertical: 10,
                                        backgroundColor: '#d2d6de',
                                        marginBottom: 1

                                    }}>
                                        <Text style={{
                                            fontWeight: 500,
                                            width: 150

                                        }}>
                                            Tổng phải trả:
                                        </Text>
                                        <Text>
                                            {total}
                                        </Text>
                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        // marginTop: 10,
                                        paddingVertical: 10,
                                        backgroundColor: '#d2d6de',
                                        marginBottom: 1

                                    }}>
                                        <Text style={{
                                            fontWeight: 500,
                                            width: 150

                                        }}>
                                            KH đã thanh toán:
                                        </Text>
                                        <Text style={{
                                            textAlign: 'left',

                                        }}>
                                            {total}
                                        </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        // marginTop: 10,
                                        paddingVertical: 10,
                                        backgroundColor: '#d2d6de',
                                        marginBottom: 1

                                    }}>
                                        <Text style={{
                                            fontWeight: 500,
                                            width: 150

                                        }}>
                                            Còn Nợ:
                                        </Text>
                                        <Text style={{
                                            textAlign: 'left'
                                        }}>
                                            0
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* Ghi chú khách hàng */}
                            <View style={{
                                marginTop: 20,
                                margin: 10
                            }}>
                                <Text style={{
                                    fontSize: 16
                                }}>
                                    Ghi Chú Bán Hàng
                                </Text>
                            </View>
                            <View style={{
                                // marginTop: 10,
                                paddingVertical: 10,
                                backgroundColor: '#d2d6de',
                                marginBottom: 1,
                                paddingLeft: 20

                            }}>
                                <View>
                                    <Text>
                                        ..........
                                    </Text>
                                </View>

                            </View>

                            {/* Nhân Viên Lưu Ý */}
                            <View style={{
                                marginTop: 20,
                                margin: 10
                            }}>
                                <Text style={{
                                    fontSize: 16
                                }}>
                                    Nhân Viên Lưu Ý
                                </Text>
                            </View>
                            <View style={{
                                // marginTop: 10,
                                paddingVertical: 10,
                                backgroundColor: '#d2d6de',
                                marginBottom: 1,
                                paddingLeft: 20

                            }}>
                                <View>
                                    <Text>
                                        ..........
                                    </Text>
                                </View>

                            </View>

                            <View>
                                <View style={{
                                    // flexDirection: 'row',
                                    // flexWrap: 'wrap'
                                }}>


                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 30,
                                        marginBottom: 30
                                    }}>
                                        <TouchableOpacity style={{
                                            backgroundColor: '#3c8dbc',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: 80,
                                            borderRadius: 8
                                        }}
                                            onPress={() => handerModal()}
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
                </ScrollView>
            </Modal>
            <View>
                <Text style={{
                    fontSize: 20,
                    padding: 10
                }}>
                    POS
                </Text>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: '93%',
                        backgroundColor: 'white',
                        padding: 10,
                        borderTopColor: '#3c8dbc',
                        borderTopWidth: 4
                    }}>
                        <View style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 0.4,
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                fontSize: 20
                            }}>
                                Bộ Lọc
                            </Text>
                        </View>
                        <View style={{
                            marginTop: 10,
                            padding: 10
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 600,

                            }}>
                                Kho Hàng:
                            </Text>

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
                                    width: '100%',
                                    backgroundColor: 'white',
                                    borderColor: 'black',
                                    borderWidth: 0.5,
                                    height: 37,
                                    marginTop: 1
                                }}

                                buttonTextStyle={{

                                }}

                            />
                        </View>

                        {/* Hóa Đơn VAT */}
                        <View style={{
                            paddingHorizontal: 10
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 600,

                            }}>
                                Hóa Đơn VAT:
                            </Text>

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
                                    width: '100%',
                                    backgroundColor: 'white',
                                    borderColor: 'black',
                                    borderWidth: 0.5,
                                    height: 37,
                                    marginTop: 1
                                }}

                                buttonTextStyle={{

                                }}

                            />
                        </View>
                        {/* Hình Thức TT */}
                        <View style={{
                            paddingHorizontal: 10,
                            marginTop: 10
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 600,

                            }}>
                                Hình Thức Thanh Toán:
                            </Text>

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
                                    width: '100%',
                                    backgroundColor: 'white',
                                    borderColor: 'black',
                                    borderWidth: 0.5,
                                    height: 37,
                                    marginTop: 2
                                }}

                                buttonTextStyle={{

                                }}

                            />
                        </View>
                        {/*Người Giữ Tiền  */}
                        <View style={{
                            paddingHorizontal: 10,
                            marginTop: 10

                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 600,

                            }}>
                                Người Giữ Tiền :
                            </Text>

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
                                    width: '100%',
                                    backgroundColor: 'white',
                                    borderColor: 'black',
                                    borderWidth: 0.5,
                                    height: 37,
                                    marginTop: 2
                                }}

                                buttonTextStyle={{

                                }}

                            />
                        </View>

                        {/* Khoảng Thời Gian */}
                        <View style={{
                            paddingHorizontal: 10,
                            marginTop: 10

                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 600,

                            }}>
                                Khoảng Thời Gian
                            </Text>

                            <SelectDropdown

                                data={tuans}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)

                                }}
                                defaultButtonText="Thời Gian"
                                buttonText={selectedOption ? selectedOption : 'Thời Gian'}

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
                                    width: '100%',
                                    backgroundColor: '#eeee',
                                    borderColor: 'black',
                                    borderWidth: 0.5,
                                    height: 40,
                                    marginTop: 2
                                }}

                                buttonTextStyle={{

                                }}

                            />
                        </View>
                    </View>
                </View>

                {/* Liệt Kê POS */}
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20
                }}>
                    <View style={{
                        padding: 10,
                        backgroundColor: 'white',
                        width: '93%',
                        borderTopColor: '#3c8dbc',
                        borderTopWidth: 4
                    }}>
                        <View>
                            <Text style={{
                                fontSize: 20,
                                padding: 10
                            }}>
                                Liệt Kê POS
                            </Text>
                        </View>

                        <ScrollView horizontal={true} style={{
                            marginBottom: 100
                        }}>
                            <View>
                                <View style={{ flexDirection: 'row', backgroundColor: '#f1f8ff' }}>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9', padding: 20 }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>
                                            Ngày</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Mã KH</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Hóa Đơn Số.</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Tên Khách Hàng</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Bộ Phận Thực Hiện</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Tình Trạng Thanh Toán</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Hình Thức Thanh Toán</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Tổng Cộng</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Đã Thanh Toán</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Còn Nợ</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Người Giữ Tiền</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Hoạt Động</Text>
                                    </View>
                                </View>
                                {datas.map((data, index) => (

                                    <View
                                        key={data.id}
                                        style={{ flexDirection: 'row' }}>
                                        <>
                                            <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                <Text style={{
                                                    textAlign: 'center',
                                                    padding: 10
                                                }}>{data.start_order_at}</Text>
                                            </View>
                                            <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                <Text style={{
                                                    textAlign: 'center',
                                                    padding: 10
                                                }}>{data.customer_id}</Text>
                                            </View>
                                            <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                <Text style={{
                                                    textAlign: 'center',
                                                    padding: 10
                                                }}> HĐS: {data.customer_id}</Text>
                                            </View>
                                            <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                <Text style={{
                                                    textAlign: 'center',
                                                    padding: 10
                                                }}>{data.name}</Text>
                                            </View>
                                            <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                <Text style={{
                                                    textAlign: 'center',
                                                    padding: 10
                                                }}>{data.nvkd_id}</Text>
                                            </View>
                                            <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                <Text style={{
                                                    textAlign: 'center',
                                                    padding: 10
                                                }}>{data.status}</Text>
                                            </View>
                                            <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                <Text style={{
                                                    textAlign: 'center',
                                                    padding: 10
                                                }}>{data.HinhThucTT}</Text>
                                            </View>
                                            <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                <Text style={{
                                                    textAlign: 'center',
                                                    padding: 10
                                                }}>{data.TongCong}</Text>
                                            </View>
                                            <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                <Text style={{
                                                    textAlign: 'center',
                                                    padding: 10
                                                }}>{data.TrinhTrangTT}</Text>
                                            </View>
                                            <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                <Text style={{
                                                    textAlign: 'center',
                                                    padding: 10
                                                }}>{data.ConNo}</Text>
                                            </View>
                                            <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                <Text style={{
                                                    textAlign: 'center',
                                                    padding: 10
                                                }}>{data.nvkd_id}</Text>
                                            </View>
                                            <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                <TouchableOpacity onPress={() => handerModal(index)}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>Xem Chi Tiết</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </>
                                    </View>
                                ))}

                            </View>
                        </ScrollView>

                        {/* <ScrollView horizontal={true} style={{
                            marginBottom: 100
                        }}>
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                <Row data={['Header 1', 'Header 2', 'Header 3', 'Header 1', 'Header 2', 'Header 3',]} style={styles.head} textStyle={styles.text} />
                                <Rows data={[['Data 1', 'Data 2', 'Data 3', 'Data 1', 'Data 2', 'Data 3'],
                                ['Data 4', 'Data 5', 'Data 6', 'Data 1', 'Data 2', 'Data 3'],
                                ['Data 7', 'Data 8', 'Data 9', 'Data 1', 'Data 2', 'Data 3'],
                                    // Add more rows here as needed
                                ]} textStyle={styles.text} />
                            </Table>
                        </ScrollView> */}


                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Listed_POS

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});