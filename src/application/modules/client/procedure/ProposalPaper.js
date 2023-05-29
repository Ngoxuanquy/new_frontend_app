import { View, Text } from 'react-native'
import React from 'react'
import IoIcon from 'react-native-vector-icons/Ionicons'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import SelectDropdown from 'react-native-select-dropdown'
import { useState } from 'react'
import { ScrollView, Dimensions } from 'react-native'
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const ProposalPaper = () => {
    const [selectedOption, setSelectedOption] = useState(null)
    const [selectedOption_loaigiay, setSelectedOptionLoaiGiay] = useState(null)

    const URL = 'http://192.168.1.101:3000/v1/api';

    const datas = [
        {
            id: 1,
            HoTen: 'Ngô Xuân Quy',
            ThuocBoPhan: 'Phòng kỹ thuật',
            Loai: 'Giấy đề nghị',
            TrangThai: 'Chờ xác nhận',
            Xem: '#',
        },
        // { id: 2, title: 'data2', value: 122 },
        // { id: 3, title: 'data3', value: 122 },
    ]

    const types = ['Phiếu giải trình', 'Giấy đề nghị']

    //khai báo modal
    const [isModalVisible, setModalVisible] = useState(false);

    //xử lý xử kiện bật tắt modal
    const handerModal = () => {
        setModalVisible(!isModalVisible);
    }


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


    //dropdown nhân viên xin nghỉ
    const countries = ['NVKT']
    const [selectedOption_nvxn, setSelectedOption_nvxn] = useState(null);

    //Khai báo biến
    const [ndgiaitrinh, setNDGiaiTrinh] = useState('')
    const [cancudexuat, setCanCuDeXuat] = useState('')
    const [phuongan, setPhuongAn] = useState('')

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
                type: selectedOption_loaigiay,
                cam_ket: cancudexuat,
                note: phuongan,
                noi_dung: ndgiaitrinh,
            })

        };

        // Viết mã kiểm tra token đã hết hạn
        fetch(URL + '/giay_de_nghis/create', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then(data => {
                console.log(data)
                setModalVisible(!isModalVisible);

            })
    }

    //Lấy những thông tin về đơn xin nghỉ phép
    const [don_de_nghis, setDonXinNghiPheps] = useState([])
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
                fetch(URL + '/giay_de_nghis/get/' + id, requestOptions)
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

    const handerPhanLoai = async (item) => {
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
                type: item,
                id: id
            })
        };

        // Viết mã kiểm tra token đã hết hạn
        fetch(URL + '/giay_de_nghis/getbytype', requestOptions)
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


    //khai báo modal detail
    const [isModalVisibleDetail, setModalVisibleDetail] = useState(false);

    //xử lý xử kiện bật tắt modal
    const handerModalDetail = (id) => {
        console.log(id)
        setModalVisibleDetail(!isModalVisibleDetail)
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

        console.log({ idmodal })


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
        fetch(URL + '/giay_de_nghis/getbyId/' + idmodal, requestOptions)
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
        <ScrollView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#ecf0f5' }}>
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
                                            flexDirection: 'row',
                                            borderColor: 'gray',
                                            borderWidth: 0.5,
                                            padding: 7

                                        }}>
                                            <Text style={{
                                                fontSize: 16
                                            }}>
                                                Đề Nghị:
                                            </Text>
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: 500
                                            }}>
                                                {apidetail.noi_dung}
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
                                            padding: 7,
                                            marginBottom: 10

                                        }}>
                                            <Text style={{
                                                fontSize: 16
                                            }}>
                                                Ngày tạo đơn
                                            </Text>
                                            <Text style={{
                                                fontSize: 16
                                            }}>
                                                {apidetail.date}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>

                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 30,
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
                                Thêm mới
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
                                                        Loại Giấy* :
                                                    </Text>
                                                    <SelectDropdown

                                                        data={types}
                                                        onSelect={(selectedItem, index) => {
                                                            setSelectedOptionLoaiGiay(selectedItem)
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
                                                        Nội dung giải trình :
                                                    </Text>
                                                    <TextInput style={{
                                                        width: '100%',
                                                        height: 107,
                                                        borderColor: 'gray',
                                                        borderWidth: 1
                                                    }}
                                                        onChangeText={(e) => setNDGiaiTrinh(e)}
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
                                                        Căn cứ đề xuất :
                                                    </Text>
                                                    <TextInput style={{
                                                        width: '100%',
                                                        height: 77,
                                                        borderColor: 'gray',
                                                        borderWidth: 1
                                                    }}
                                                        onChangeText={(e) => setCanCuDeXuat(e)}

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
                                                        Phương án đề xuất :
                                                    </Text>
                                                    <TextInput style={{
                                                        width: '100%',
                                                        height: 77,
                                                        borderColor: 'gray',
                                                        borderWidth: 1
                                                    }}
                                                        onChangeText={(e) => setPhuongAn(e)}
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
            <View
                style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    borderTopWidth: 4,
                    borderTopColor: '#3c8dbc',
                    backgroundColor: '#fff',
                    marginTop: 16,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        columnGap: 8,
                        borderBottomWidth: 0.2,
                        padding: 12,
                    }}
                >
                    <IoIcon name="funnel" style={{ fontSize: 20 }} color={'#3c8dbc'} />
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#3c8dbc' }}>Bộ lọc</Text>
                </View>
                <View>
                    <View style={{ margin: 12, rowGap: 4 }}>
                        <Text>Từ 0h ngày: </Text>
                        <TextInput
                            placeholder="Từ 0h ngày"
                            style={{
                                height: 40,
                                borderWidth: 1,
                                paddingHorizontal: 10,
                                borderRadius: 4,
                            }}
                        />
                        <Text>Đến 0h ngày:</Text>
                        <TextInput
                            placeholder="Đến 0h ngày"
                            style={{
                                height: 40,
                                borderWidth: 1,
                                paddingHorizontal: 10,
                                borderRadius: 4,
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#3c8dbc',
                            width: 60,
                            height: 32,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 12,
                            borderRadius: 4,
                            marginBottom: 20,
                        }}
                    >
                        <Text style={{ color: '#fff' }}>Lọc</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ margin: 12 }}>
                    <Text>Phân loại</Text>
                    <SelectDropdown
                        data={types}
                        onSelect={(selectedItem, index) => {
                            handerPhanLoai(selectedItem)
                        }}
                        defaultButtonText="--Chọn--"
                        buttonText={selectedOption ? selectedOption : '--Chọn--'}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                        buttonStyle={{
                            width: '100%',
                            backgroundColor: 'white',
                            borderColor: 'black',
                            borderWidth: 0.5,
                            height: 37,
                            marginTop: 10,
                        }}
                        buttonTextStyle={{}}
                    />
                </View>
            </View>

            <View
                style={{
                    paddingHorizontal: 20,
                    borderWidth: 1,
                    borderTopWidth: 4,
                    borderTopColor: '#3c8dbc',
                    borderRadius: 8,
                    marginTop: 12,
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
                    <Text style={{ fontSize: 16 }}>Giấy đề nghị, xác nhận</Text>
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

                <View style={{ borderWidth: 0.8, borderRadius: 4, marginBottom: 20 }}>
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

                    <ScrollView
                        horizontal
                        style={{
                            marginTop: 20,
                            backgroundColor: 'white',
                        }}
                    >
                        <View>
                            <View style={{ flexDirection: 'row', backgroundColor: '#f1f8ff' }}>
                                <View
                                    style={{
                                        width: 120,
                                        borderWidth: 1,
                                        justifyContent: 'center',
                                        borderColor: '#C1C0B9',
                                        padding: 10

                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        Id
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        width: 120,
                                        borderWidth: 1,
                                        justifyContent: 'center',
                                        borderColor: '#C1C0B9',
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        Họ tên
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        width: 120,
                                        borderWidth: 1,
                                        justifyContent: 'center',
                                        borderColor: '#C1C0B9',
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        Thuộc bộ phận
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        width: 120,
                                        borderWidth: 1,
                                        justifyContent: 'center',
                                        borderColor: '#C1C0B9',
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        Loại
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        width: 120,
                                        borderWidth: 1,
                                        justifyContent: 'center',
                                        borderColor: '#C1C0B9',
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        Trạng thái
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        width: 120,
                                        borderWidth: 1,
                                        justifyContent: 'center',
                                        borderColor: '#C1C0B9',
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        #
                                    </Text>
                                </View>
                            </View>

                            {don_de_nghis.map((data) => (
                                <View
                                    key={data.id}
                                    style={{ flexDirection: 'row' }}>
                                    <>
                                        <View
                                            style={{
                                                width: 120,
                                                borderWidth: 1,
                                                borderColor: '#C1C0B9',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    padding: 10,
                                                }}
                                            >
                                                {data.id}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                width: 120,
                                                borderWidth: 1,
                                                borderColor: '#C1C0B9',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    padding: 10,
                                                }}
                                            >
                                                {data.user_name}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                width: 120,
                                                borderWidth: 1,
                                                borderColor: '#C1C0B9',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    padding: 10,
                                                }}
                                            >
                                                {data.phong_ban}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                width: 120,
                                                borderWidth: 1,
                                                borderColor: '#C1C0B9',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    padding: 10,
                                                }}
                                            >
                                                {data.type}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                width: 120,
                                                borderWidth: 1,
                                                borderColor: '#C1C0B9',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    textAlign: 'center',
                                                    padding: 10,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                {data.status == 'Chưa xác nhận' ?
                                                    <TouchableOpacity style={{
                                                        backgroundColor: 'red',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Text style={{
                                                            padding: 5,
                                                            textAlign: 'center',
                                                            color: 'white'

                                                        }}>
                                                            {data.status}
                                                        </Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity style={{
                                                        backgroundColor: 'green',
                                                    }}>
                                                        <Text>
                                                            {data.status}
                                                        </Text>
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                width: 120,
                                                borderWidth: 1,
                                                borderColor: '#C1C0B9',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <TouchableOpacity
                                                onPress={() => handerModalDetail(data.id)}
                                            >
                                                <Text
                                                    style={{
                                                        textAlign: 'center',
                                                        padding: 10,
                                                    }}
                                                >
                                                    Xem
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View >
            </View >
        </ScrollView >
    )
}

export default ProposalPaper
