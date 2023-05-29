import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions, } from 'react-native'
import React, { useState, useEffect } from 'react'
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import Calendars from '../../../Components/calendar/Calendars';
import DatePicker from 'react-native-modern-datepicker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const OnLeave = () => {
    const groups = [5, 10, 15, 20]
    const URL = 'http://192.168.1.101:3000/v1/api';


    //khai báo modal
    const [isModalVisible, setModalVisible] = useState(false);

    //xử lý xử kiện bật tắt modal
    const handerModal = () => {
        setModalVisible(!isModalVisible);
    }

    //khai báo modal lịch từ ngày
    const [isModalVisible_tungay, setModalVisible_tungay] = useState(false);

    //xử lý xử kiện bật tắt modal
    const handerModalTuNgay = () => {
        setModalVisible_tungay(!isModalVisible_tungay);
        setIsFromDate(!isFromDate)
    }

    //khai báo modal lịch từ ngày
    const [isModalVisible_denngay, setModalVisible_denngay] = useState(false);

    //xử lý xử kiện bật tắt modal
    const handerModalDenNgay = () => {
        setModalVisible_denngay(!isModalVisible_denngay);
        setIsToDate(!isToDate)
    }



    //dropdown nhân viên xin nghỉ
    const LoaiNghiPhep = ["Nghỉ Phép", "Nghỉ Việc", "Đi Muộn", "Nghỉ Sớm"]

    const [selectedOption_lnp, setSelectedOption_lnp] = useState(null);

    //Đăng ký lịch từ ngày

    const [fromDate, setFromDate] = useState('')
    const [isFromDate, setIsFromDate] = useState(false)
    const [endDate, setEndDate] = useState('')
    const [isEndDate, setIsEndDate] = useState('')

    //Đăng ký lịch đến ngày

    const [toDate, setToDate] = useState('')
    const [isToDate, setIsToDate] = useState(false)
    // const [endDate, setEndDate] = useState('')
    // const [isEndDate, setIsEndDate] = useState('')


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


    //lấy name từ AsyncStorage
    const getName = async () => {
        try {
            const username = await AsyncStorage.getItem('username');
            console.log('Token đã được lấy thành công');
            return username;
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

    //lấy những thông tin nhân viên kĩ thuật
    const [idNV, setIdNV] = useState([])
    const getNV = async () => {
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
            },

        };

        // Viết mã kiểm tra token đã hết hạn
        fetch(URL + '/user/get', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then(data => {
                for (let i = 0; i < data.metadata.length; i++) {
                    if (data.metadata[i].id === 1) {
                        data.metadata.splice(i, 1);
                        break; // Loại bỏ phần tử đầu tiên tìm thấy và thoát khỏi vòng lặp
                    }
                }
                const idArray = data.metadata.map(item => item.id);
                setIdNV(idArray);
            })
    }

    useEffect(() => {
        getNV()
    }, [])

    //dropdown nhân viên xin nghỉ
    const countries = ['NVKT']
    const [selectedOption_nvxn, setSelectedOption_nvxn] = useState(null);

    //dropdown Bàn giao cho
    const communication = idNV
    const [selectedOption_bangiaocho, setSelectedOption_bangiaocho] = useState(null);

    //Khai baos bien cong viec ban giao
    const [congviecbangiao, setCongVietBanGiao] = useState([])
    const [lydoxinnghi, setLyDoXinNghi] = useState([])
    const [camket, setCamKet] = useState([])

    //Xử lý Tạo đơn xin nghỉ phép
    const handleSubmit = async () => {
        const accessToken = await getToken()
        const id = await getID()
        const username = await getName()

        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "d420e946ae282dfadafede6b060ae66e3ffd2a9cddfe3dc9b4cd070f98ad4985aeab65e2751677f21f91f34c2a22a1f95bf0b330fd2eb0dfb2c1fb53a7c8d97a",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },
            body: JSON.stringify({
                user_id: id,
                username: username,
                type: selectedOption_lnp,
                from_date: fromDate,
                to_date: toDate,
                cv_ban_giao: congviecbangiao,
                note: lydoxinnghi,
                cam_ket: camket,
                ban_giao_cv: selectedOption_bangiaocho
            })

        };

        // Viết mã kiểm tra token đã hết hạn
        fetch(URL + '/don_xin_nghi_pheps/create', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then(data => {
                console.log(data)
                setModalVisible(!isModalVisible);

            })
    }

    //Lấy những thông tin về đơn xin nghỉ phép
    const [don_xin_nghi_pheps, setDonXinNghiPheps] = useState([])
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
                        "x-api-key": "d420e946ae282dfadafede6b060ae66e3ffd2a9cddfe3dc9b4cd070f98ad4985aeab65e2751677f21f91f34c2a22a1f95bf0b330fd2eb0dfb2c1fb53a7c8d97a",
                        "authorization": cleanedJwtString,
                        "x-client-id": id
                    },
                    body: JSON.stringify({
                        id: id
                    })
                };

                // Viết mã kiểm tra token đã hết hạn
                fetch(URL + '/don_xin_nghi_pheps/get/' + id, requestOptions)
                    .then((data) => {
                        return data.json()
                    })
                    .then(data => {
                        if (data.metadata && Array.isArray(data.metadata)) {
                            setDonXinNghiPheps(data.metadata)
                        } else {
                            console.error('Invalid API response:', data);
                        }
                    })
            }
            getApiOrder();
        }, [])
    );


    //khai báo modal detail
    const [isModalVisibleDetail, setModalVisibleDetail] = useState(false);

    //xử lý xử kiện bật tắt modal
    const handerModalDetail = (id) => {
        setModalVisibleDetail(!isModalVisibleDetail);
        if (isModalVisibleDetail == false) {
            getApiModal(id)
            return;
        }
        else {
            console.log('k có id')
        }
    }

    const [apidetails, setApiDetail] = useState([])

    const getApiModal = async (idmodal) => {
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
            },
            body: JSON.stringify({
                id: id
            })
        };

        // Viết mã kiểm tra token đã hết hạn
        fetch(URL + '/don_xin_nghi_pheps/getbyId/' + idmodal, requestOptions)
            .then((data) => {
                return data.json()
            })
            .then(data => {
                if (data.metadata && Array.isArray(data.metadata)) {
                    setApiDetail(data.metadata)
                } else {
                    console.error('Invalid API response:', data);
                }
            })
    }


    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#ecf0f5' }}>
            <Modal isVisible={isModalVisibleDetail} style={{ marginBottom: 30 }}>
                <ScrollView style={{
                }}>
                    <View style={{
                        flex: 1, backgroundColor: 'white', marginTop: 20,
                        alignContent: 'center',
                        width: '100%',
                    }}>
                        <TouchableOpacity onPress={handerModalDetail} style={{
                            marginLeft: Dimensions.get('window').width - 80,
                            marginTop: 20
                        }}>

                            <AntDesign name="close" size={24} color="black" style={{
                                opacity: 0.3
                            }} />
                        </TouchableOpacity>
                        <View>
                            <View>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 18
                                }}>
                                    ĐƠN XIN NGHỈ PHÉP DÀI HẠN
                                </Text>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginTop: 20
                                }}>
                                    <Text style={{
                                        lineHeight: 25
                                    }}>
                                        Kính Gửi:
                                    </Text>
                                    <View>
                                        <Text style={{
                                            lineHeight: 25
                                        }}>
                                            - Bán giám đốc công ty
                                        </Text>
                                        <Text style={{
                                            lineHeight: 25
                                        }}>
                                            - Phòng hành chính - nhân sự
                                        </Text>
                                        <Text style={{
                                            lineHeight: 25
                                        }}>
                                            - Quản lý và trưởng bộ phận
                                        </Text>
                                    </View>
                                </View>
                                {/* Thông tin */}
                                {apidetails.map(apidetail => (
                                    <View
                                        key={apidetail.id}
                                        style={{
                                            padding: 8,
                                            marginTop: 20,
                                        }}>

                                        <View style={{
                                            flexDirection: 'row',
                                            borderColor: 'gray',
                                            borderWidth: 0.5,
                                            padding: 7

                                        }}>
                                            <Text style={{
                                                fontSize: 16
                                            }}>
                                                Tôi tên là:
                                            </Text>
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: 500
                                            }}>
                                                {apidetail.user_name}
                                            </Text>
                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                            borderColor: 'gray',
                                            borderWidth: 0.5,
                                            padding: 7

                                        }}>
                                            <View style={{
                                                flexDirection: 'row'
                                            }}>
                                                <Text style={{
                                                    fontSize: 16
                                                }}>
                                                    Chức Vụ:
                                                </Text>
                                                <Text style={{
                                                    fontSize: 16,
                                                    fontWeight: 500
                                                }}>
                                                    Nhân Viên
                                                </Text>
                                            </View>

                                            <View style={{
                                                flexDirection: 'row',
                                                marginLeft: 10

                                            }}>
                                                <Text style={{
                                                    fontSize: 16
                                                }}>
                                                    Bộ Phận:
                                                </Text>
                                                <Text style={{
                                                    fontSize: 16,
                                                    fontWeight: 500
                                                }}>
                                                    PKT
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={{
                                            // flexDirection: 'row',
                                            borderColor: 'gray',
                                            borderWidth: 0.5,
                                            padding: 7

                                        }}>
                                            <View style={{
                                                flexDirection: 'row'
                                            }}>
                                                <Text style={{
                                                    fontSize: 16
                                                }}>
                                                    Nay tôi xin phép nghỉ dài hạn từ :
                                                </Text>
                                                <Text style={{
                                                    fontSize: 16,
                                                    fontWeight: 500
                                                }}>
                                                    {apidetail.from_date}
                                                </Text>
                                            </View>
                                            <View style={{
                                                flexDirection: 'row'
                                            }}>
                                                <Text style={{
                                                    fontSize: 16
                                                }}>
                                                    Đến :
                                                </Text>
                                                <Text style={{
                                                    fontSize: 16,
                                                    fontWeight: 500
                                                }}>
                                                    {apidetail.to_date}
                                                </Text>
                                            </View>

                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                            borderColor: 'gray',
                                            borderWidth: 0.5,
                                            padding: 7

                                        }}>
                                            <Text style={{
                                                fontSize: 16
                                            }}>
                                                Tổng số ngày nghỉ:
                                            </Text>
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: 500
                                            }}>
                                                a
                                            </Text>
                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                            borderColor: 'gray',
                                            borderWidth: 0.5,
                                            padding: 7

                                        }}>
                                            <Text style={{
                                                fontSize: 16
                                            }}>
                                                Thời gian đi làm lại:
                                            </Text>
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: 500
                                            }}>
                                                {apidetail.to_date}
                                            </Text>
                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                            borderColor: 'gray',
                                            borderWidth: 0.5,
                                            padding: 7

                                        }}>
                                            <Text style={{
                                                fontSize: 16
                                            }}>
                                                Lí do:
                                            </Text>
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: 500
                                            }}>
                                                {apidetail.note}
                                            </Text>
                                        </View>

                                        <View style={{
                                            // flexDirection: 'row',
                                            borderColor: 'gray',
                                            borderWidth: 0.5,
                                            padding: 7

                                        }}>
                                            <Text style={{
                                                fontSize: 16
                                            }}>
                                                Trong thời gian nghỉ phép tôi sẽ thông báo và bàn giao công việc cụ thể như sau:
                                            </Text>
                                            <View >
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-around',
                                                    marginTop: 10,
                                                    borderColor: 'gray',
                                                    borderWidth: 0.6
                                                }}>
                                                    <Text style={{
                                                        fontSize: 16
                                                    }}>
                                                        Công việc bàn giao
                                                    </Text>
                                                    <Text style={{
                                                        fontSize: 16
                                                    }}>
                                                        Người bàn giao
                                                    </Text>
                                                </View>

                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-around',
                                                    marginTop: 10,

                                                }}>
                                                    <Text>
                                                        {apidetail.ban_giao_cv}
                                                    </Text>
                                                    <Text>
                                                        {apidetail.cv_ban_giao}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                            borderColor: 'gray',
                                            borderWidth: 0.5,
                                            padding: 7

                                        }}>
                                            <Text style={{
                                                fontSize: 16
                                            }}>
                                                Tôi xin cam kết:
                                            </Text>
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: 500
                                            }}>
                                                {apidetail.cam_ket}
                                            </Text>
                                        </View>


                                        <View style={{
                                            flexDirection: 'row',
                                            borderColor: 'gray',
                                            borderWidth: 0.5,
                                            padding: 7

                                        }}>
                                            <Text style={{
                                                fontSize: 16
                                            }}>
                                                Kính mong ban giám đốc xem xét và giải quyết.
                                            </Text>

                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                            borderColor: 'gray',
                                            borderWidth: 0.5,
                                            padding: 7

                                        }}>
                                            <Text style={{
                                                fontSize: 16
                                            }}>
                                                Tôi xin chân thành cảm ơn
                                            </Text>

                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                            borderColor: 'gray',
                                            borderWidth: 0.5,
                                            padding: 7

                                        }}>
                                            <Text style={{
                                                fontSize: 16
                                            }}>
                                                Ngày tạo đơn
                                            </Text>
                                            <Text style={{
                                                fontSize: 16
                                            }}>
                                                Ngày tạo đơn
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 30,
                                marginTop: 10
                            }}>
                                <TouchableOpacity style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 70,
                                    backgroundColor: '#eeee',

                                }}
                                    onPress={() => handerModalDetail()}
                                >

                                    <Text style={{
                                        fontSize: 17,
                                        textAlign: 'center',
                                        // color: 'white',
                                        padding: 8
                                    }}>
                                        Đóng
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
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
                                Thêm mới đơn xin nghỉ phép
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
                                        Thông tin
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
                                                    borderBottomColor: '#ddd',
                                                    borderBottomWidth: 1,
                                                    flexDirection: 'row',
                                                    marginBottom: 5
                                                }}>
                                                    <Text style={{
                                                        fontSize: 17,
                                                        fontWeight: 500,
                                                        paddingVertical: 10,
                                                        marginLeft: 7,
                                                        width: 125
                                                    }}>
                                                        NV Xin Nghỉ:
                                                    </Text>
                                                    <SelectDropdown

                                                        data={countries}
                                                        onSelect={(selectedItem, index) => {
                                                            console.log(selectedItem, index)
                                                        }}
                                                        defaultButtonText="--Chọn--"
                                                        buttonText={selectedOption_nvxn ? selectedOption_nvxn : '--Chọn--'}
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
                                                            width: '50%',
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

                                                <View style={{
                                                    borderBottomColor: '#ddd',
                                                    borderBottomWidth: 1,
                                                    flexDirection: 'row',
                                                    marginBottom: 5
                                                }}>
                                                    <Text style={{
                                                        fontSize: 17,
                                                        fontWeight: 500,
                                                        paddingVertical: 10,
                                                        marginLeft: 7,
                                                        width: 125

                                                    }}>
                                                        Loại Giấy Phép:
                                                    </Text>
                                                    {/* <Calendars /> */}

                                                    <SelectDropdown

                                                        data={LoaiNghiPhep}
                                                        onSelect={(selectedItem, index) => {
                                                            setSelectedOption_lnp(selectedItem)
                                                        }}
                                                        defaultButtonText="--Chọn--"
                                                        buttonText={selectedOption_lnp ? selectedOption_lnp : '--Chọn--'}
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
                                                            width: '50%',
                                                            backgroundColor: 'white',
                                                            borderColor: 'black',
                                                            borderWidth: 0.5,
                                                            height: 37,
                                                            marginTop: 1,
                                                            marginLeft: 10
                                                        }}

                                                        buttonTextStyle={{

                                                        }}

                                                    />
                                                </View>



                                                <View style={{
                                                    borderBottomColor: '#ddd',
                                                    borderBottomWidth: 1,
                                                    flexDirection: 'row',
                                                    marginBottom: 5
                                                }}>
                                                    <Text style={{
                                                        fontSize: 17,
                                                        fontWeight: 500,
                                                        paddingVertical: 10,
                                                        marginLeft: 7,
                                                        width: 125

                                                    }}>
                                                        Nghỉ Từ Ngày :
                                                    </Text>
                                                    <TouchableOpacity onPress={() => handerModalTuNgay()
                                                    }
                                                        style={{
                                                            width: 145,
                                                            height: 40,
                                                            borderColor: 'gray',
                                                            borderWidth: 1,
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <Text style={{
                                                            textAlign: 'center'
                                                        }}>
                                                            {/* {fromDate} */}
                                                            {fromDate != "" ? fromDate : "Chonj"}
                                                        </Text>
                                                        <Modal isVisible={isModalVisible_tungay} style={{ marginBottom: 30 }}>
                                                            <View>
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
                                                                        setIsFromDate(false)
                                                                        setModalVisible_tungay(false)

                                                                    }}
                                                                />
                                                                {/* )} */}
                                                            </View>
                                                        </Modal>
                                                    </TouchableOpacity>


                                                </View>

                                                {/* Đến ngày */}
                                                <View style={{
                                                    borderBottomColor: '#ddd',
                                                    borderBottomWidth: 1,
                                                    flexDirection: 'row',
                                                    marginBottom: 5
                                                }}>
                                                    <Text style={{
                                                        fontSize: 17,
                                                        fontWeight: 500,
                                                        paddingVertical: 10,
                                                        marginLeft: 7,
                                                        width: 125

                                                    }}>
                                                        Ngày Đi Làm :
                                                    </Text>
                                                    <TouchableOpacity onPress={() => handerModalDenNgay()
                                                    }
                                                        style={{
                                                            width: 145,
                                                            height: 40,
                                                            borderColor: 'gray',
                                                            borderWidth: 1,
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <Text style={{
                                                            textAlign: 'center'
                                                        }}>
                                                            {/* {fromDate} */}
                                                            {toDate != "" ? toDate : "Chonj"}
                                                        </Text>
                                                        <Modal isVisible={isModalVisible_denngay} style={{ marginBottom: 30 }}>
                                                            <View>
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
                                                                        setToDate(date)
                                                                        setIsToDate(false)
                                                                        setModalVisible_denngay(false)

                                                                    }}
                                                                />
                                                                {/* )} */}
                                                            </View>
                                                        </Modal>
                                                    </TouchableOpacity>
                                                </View>

                                                {/* Đến ngày */}
                                                <View style={{
                                                    borderBottomColor: '#ddd',
                                                    borderBottomWidth: 1,
                                                    flexDirection: 'row',
                                                    marginBottom: 5
                                                }}>
                                                    <Text style={{
                                                        fontSize: 17,
                                                        fontWeight: 500,
                                                        paddingVertical: 10,
                                                        marginLeft: 7
                                                    }}>
                                                        Số Ngày Nghỉ :
                                                    </Text>
                                                    <Text style={{
                                                        paddingVertical: 10,
                                                        fontSize: 15,
                                                        marginLeft: 6,
                                                        marginTop: 1,
                                                        width: '60%'
                                                    }}>
                                                        3
                                                    </Text>
                                                </View>

                                                {/* Đến ngày */}
                                                <View style={{
                                                    borderBottomColor: '#ddd',
                                                    borderBottomWidth: 1,
                                                    flexDirection: 'row',
                                                    marginBottom: 5
                                                }}>
                                                    <Text style={{
                                                        fontSize: 17,
                                                        fontWeight: 500,
                                                        paddingVertical: 10,
                                                        marginLeft: 7,
                                                        width: 125

                                                    }}>
                                                        Bàn Giao Cho :
                                                    </Text>
                                                    <SelectDropdown

                                                        data={communication}
                                                        onSelect={(selectedItem, index) => {
                                                            setSelectedOption_bangiaocho(selectedItem)
                                                        }}
                                                        defaultButtonText="--Chọn--"
                                                        buttonText={selectedOption_bangiaocho ? selectedOption_bangiaocho : '--Chọn--'}
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
                                                            width: '50%',
                                                            backgroundColor: 'white',
                                                            borderColor: 'black',
                                                            borderWidth: 0.5,
                                                            height: 37,
                                                            marginTop: 1,
                                                            marginLeft: 10
                                                        }}

                                                        buttonTextStyle={{

                                                        }}

                                                    />
                                                </View>

                                                {/* Đến ngày */}
                                                <View style={{
                                                    // borderColor: '#ddd',
                                                    // borderWidth: 1,
                                                    flexDirection: 'column',
                                                }}>
                                                    <Text style={{
                                                        fontSize: 17,
                                                        fontWeight: 500,
                                                        paddingVertical: 10,
                                                        marginLeft: 7
                                                    }}>
                                                        Công Việc Bàn Giao :
                                                    </Text>
                                                    <TextInput style={{
                                                        width: '100%',
                                                        height: 107,
                                                        borderColor: 'gray',
                                                        borderWidth: 1
                                                    }}
                                                        onChangeText={(e) => setCongVietBanGiao(e)}
                                                    />
                                                </View>

                                                {/* Đến ngày */}
                                                <View style={{
                                                    borderColor: '#ddd',
                                                    borderWidth: 1,
                                                    flexDirection: 'column',
                                                }}>
                                                    <Text style={{
                                                        fontSize: 17,
                                                        fontWeight: 500,
                                                        paddingVertical: 10,
                                                        marginLeft: 7
                                                    }}>
                                                        Lý do xin nghỉ (Nếu Có) :
                                                    </Text>
                                                    <TextInput style={{
                                                        width: '100%',
                                                        height: 77,
                                                        borderColor: 'gray',
                                                        borderWidth: 1
                                                    }}
                                                        onChangeText={(e) => setLyDoXinNghi(e)}

                                                    />
                                                </View>

                                                {/* Cam Kết */}
                                                <View style={{
                                                    borderColor: '#ddd',
                                                    borderWidth: 1,
                                                    flexDirection: 'column',
                                                }}>
                                                    <Text style={{
                                                        fontSize: 17,
                                                        fontWeight: 500,
                                                        paddingVertical: 10,
                                                        marginLeft: 7
                                                    }}>
                                                        Cam Kết :
                                                    </Text>
                                                    <TextInput style={{
                                                        width: '100%',
                                                        height: 77,
                                                        borderColor: 'gray',
                                                        borderWidth: 1
                                                    }}
                                                        onChangeText={(e) => setCamKet(e)}
                                                    />
                                                </View>
                                            </View>

                                            <View style={{
                                                justifyContent: 'flex-end',
                                                flexDirection: 'row',
                                                alignItems: 'flex-end',
                                                marginTop: 20,
                                                marginBottom: 30
                                            }}>
                                                <TouchableOpacity style={{
                                                    width: 60,
                                                    backgroundColor: '#eeee',
                                                    height: 40,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 5

                                                }}
                                                    onPress={() => handerModal()}
                                                >
                                                    <Text style={{
                                                        textAlign: 'center',
                                                    }}>
                                                        Đóng
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{
                                                    width: 60,
                                                    backgroundColor: 'red',
                                                    height: 40,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 5,
                                                    opacity: 0.8,
                                                    marginLeft: 20

                                                }}
                                                    onPress={() => handleSubmit()}
                                                >
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        color: 'white',

                                                    }}>
                                                        Lưu
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                            </View>

                        </View>

                    </View>
                </ScrollView>
            </Modal>
            <View>
                <View style={{ backgroundColor: '#ecf0f5', paddingVertical: 12 }}>
                    <Text style={{ fontSize: 24, color: '#3c8dbc' }}>Đơn xin nghỉ phép</Text>
                </View>
                <View
                    style={{
                        paddingHorizontal: 20,
                        borderWidth: 1,
                        borderTopWidth: 4,
                        borderTopColor: '#3c8dbc',
                        borderRadius: 8,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginVertical: 8,
                        }}
                    >
                        <Text style={{ fontSize: 16 }}>Đơn xin nghỉ phép</Text>
                        <TouchableOpacity
                            style={{
                                paddingVertical: 8,
                                paddingHorizontal: 12,
                                backgroundColor: '#3c8dbc',
                                borderWidth: 1,
                                borderColor: '#367fa9',
                                borderRadius: 4,
                            }}
                            onPress={() => handerModal()}
                        >
                            <Text style={{ color: '#fff', fontSize: 16 }}>+ Thêm</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderWidth: 0.8, borderRadius: 4 }}>
                        <View>
                            <Text style={{ fontSize: 16 }}>Show 25 entries</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16 }}>Search</Text>
                                <TextInput
                                    style={{
                                        height: 28,
                                        margin: 12,
                                        borderWidth: 1,
                                        padding: 10,
                                        flex: 1,
                                        borderRadius: 4,
                                    }}
                                />
                            </View>
                        </View>
                        <View>
                            <View
                                style={{
                                    alignSelf: 'stretch',
                                    flexDirection: 'row',
                                    marginVertical: 20,
                                }}
                            >
                                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                                    <Text style={{ textAlign: 'center' }}>Id</Text>
                                </View>
                                <View style={{ flex: 2, alignSelf: 'stretch' }}>
                                    <Text style={{ textAlign: 'center' }}>Họ tên</Text>
                                </View>
                                <View style={{ flex: 2, alignSelf: 'stretch' }}>
                                    <Text style={{ textAlign: 'center' }}>Ngày xin nghỉ</Text>
                                </View>
                                <View style={{ flex: 2, alignSelf: 'stretch' }}>
                                    <Text style={{ textAlign: 'center' }}>Trạng thái</Text>
                                </View>
                            </View>
                            {don_xin_nghi_pheps.map((don_xin_nghi_phep, index) => (
                                <TouchableOpacity
                                    key={don_xin_nghi_phep.id}
                                    style={{
                                        alignSelf: 'stretch',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        borderTopWidth: 1,
                                        // borderBottomWidth: 1,
                                        paddingVertical: 7
                                    }}
                                    onPress={() => handerModalDetail(don_xin_nghi_phep.id)}

                                >

                                    <View style={{ flex: 1, alignSelf: 'stretch', }}>
                                        <Text style={{ textAlign: 'center' }}>{index + 1}</Text>
                                    </View>
                                    <View style={{ flex: 2, alignSelf: 'stretch' }}>
                                        <Text style={{ textAlign: 'center' }}>{don_xin_nghi_phep.user_name}</Text>
                                    </View>
                                    <View style={{ flex: 2, alignSelf: 'stretch' }}>
                                        <Text style={{ textAlign: 'center' }}>{don_xin_nghi_phep.from_date}</Text>
                                    </View>
                                    <View style={{ flex: 2, alignSelf: 'stretch' }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            {don_xin_nghi_phep.status == "Chưa xác nhận" ?
                                                <TouchableOpacity style={{
                                                    backgroundColor: 'red',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 3
                                                }}>
                                                    <Text style={{ color: 'white', textAlign: 'center' }}>{don_xin_nghi_phep.status}</Text>
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity style={{ backgroundColor: 'green', padding: 3 }}>
                                                    <Text style={{ color: 'white', textAlign: 'center' }}>{don_xin_nghi_phep.status}</Text>
                                                </TouchableOpacity>
                                            }

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', paddingVertical: 12 }}>
                        <Text>Showing 1 to 4 of 4 entries</Text>
                        <Text>Previous 1 next</Text>
                    </View>
                </View>
            </View>

            <View>
                <View style={{ backgroundColor: '#ecf0f5', paddingVertical: 12 }}>
                    <Text style={{ fontSize: 24, color: '#3c8dbc' }}>Đơn xin nghỉ việc</Text>
                </View>
                <View
                    style={{
                        paddingHorizontal: 20,
                        borderWidth: 1,
                        borderTopWidth: 4,
                        borderTopColor: '#3c8dbc',
                        borderRadius: 8,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginVertical: 8,
                        }}
                    >
                        <Text style={{ fontSize: 16 }}>Đơn xin nghỉ việc</Text>
                        <TouchableOpacity
                            style={{
                                paddingVertical: 8,
                                paddingHorizontal: 12,
                                backgroundColor: '#3c8dbc',
                                borderWidth: 1,
                                borderColor: '#367fa9',
                                borderRadius: 4,
                            }}
                        >
                            <Text style={{ color: '#fff', fontSize: 16 }}>+ Thêm</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderWidth: 0.8, borderRadius: 4 }}>
                        <View>
                            <Text style={{ fontSize: 16 }}>Show 25 entries</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16 }}>Search</Text>
                                <TextInput
                                    style={{
                                        height: 28,
                                        margin: 12,
                                        borderWidth: 1,
                                        padding: 10,
                                        flex: 1,
                                        borderRadius: 4,
                                    }}
                                />
                            </View>
                        </View>
                        <View>
                            <View
                                style={{
                                    alignSelf: 'stretch',
                                    flexDirection: 'row',
                                    marginVertical: 20,
                                }}
                            >
                                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                                    <Text style={{ textAlign: 'center' }}>Id</Text>
                                </View>
                                <View style={{ flex: 2, alignSelf: 'stretch' }}>
                                    <Text style={{ textAlign: 'center' }}>Họ tên</Text>
                                </View>
                                <View style={{ flex: 2, alignSelf: 'stretch' }}>
                                    <Text style={{ textAlign: 'center' }}>Ngày xin nghỉ</Text>
                                </View>
                                <View style={{ flex: 2, alignSelf: 'stretch' }}>
                                    <Text style={{ textAlign: 'center' }}>Trạng thái</Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    alignSelf: 'stretch',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    borderTopWidth: 1,
                                    borderBottomWidth: 1,
                                }}
                            ></View>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', paddingVertical: 12 }}>
                        <Text>Showing 1 to 4 of 4 entries</Text>
                        <Text>Previous 1 next</Text>
                    </View>
                </View>
            </View>

            <View>
                <View style={{ backgroundColor: '#ecf0f5', paddingVertical: 12 }}>
                    <Text style={{ fontSize: 24, color: '#3c8dbc' }}>
                        Đơn xin nghỉ sớm, đi muộn
                    </Text>
                </View>
                <View
                    style={{
                        paddingHorizontal: 20,
                        borderWidth: 1,
                        borderTopWidth: 4,
                        borderTopColor: '#3c8dbc',
                        borderRadius: 8,
                    }}
                >
                    <View
                        style={{
                            marginVertical: 8,
                        }}
                    >
                        <Text style={{ fontSize: 16 }}>Đơn xin nghỉ sớm / đi muộn</Text>
                        <View style={{ flexDirection: 'row', columnGap: 8 }}>
                            <TouchableOpacity
                                style={{
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    backgroundColor: '#3c8dbc',
                                    borderWidth: 1,
                                    borderColor: '#367fa9',
                                    borderRadius: 4,
                                }}
                            >
                                <Text style={{ color: '#fff', fontSize: 16 }}>+ Nghỉ sớm</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    backgroundColor: '#3c8dbc',
                                    borderWidth: 1,
                                    borderColor: '#367fa9',
                                    borderRadius: 4,
                                }}
                            >
                                <Text style={{ color: '#fff', fontSize: 16 }}>+ Đi muộn</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0.8, borderRadius: 4 }}>
                        <View>
                            <Text style={{ fontSize: 16 }}>Show 25 entries</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16 }}>Search</Text>
                                <TextInput
                                    style={{
                                        height: 28,
                                        margin: 12,
                                        borderWidth: 1,
                                        padding: 10,
                                        flex: 1,
                                        borderRadius: 4,
                                    }}
                                />
                            </View>
                        </View>
                        <View>
                            <View
                                style={{
                                    alignSelf: 'stretch',
                                    flexDirection: 'row',
                                    marginVertical: 20,
                                }}
                            >
                                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                                    <Text style={{ textAlign: 'center' }}>Id</Text>
                                </View>
                                <View style={{ flex: 2, alignSelf: 'stretch' }}>
                                    <Text style={{ textAlign: 'center' }}>Họ tên</Text>
                                </View>
                                <View style={{ flex: 2, alignSelf: 'stretch' }}>
                                    <Text style={{ textAlign: 'center' }}>Ngày xin nghỉ</Text>
                                </View>
                                <View style={{ flex: 2, alignSelf: 'stretch' }}>
                                    <Text style={{ textAlign: 'center' }}>Trạng thái</Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    alignSelf: 'stretch',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    borderTopWidth: 1,
                                    borderBottomWidth: 1,
                                }}
                            ></View>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', paddingVertical: 12 }}>
                        <Text>Showing 1 to 4 of 4 entries</Text>
                        <Text>Previous 1 next</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default OnLeave
