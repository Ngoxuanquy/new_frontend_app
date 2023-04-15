import { View, Text, TouchableOpacity, Button, Image, Dimensions, Keyboard, Platform, KeyboardAvoidingView, TextInput, StyleSheet, TouchableWithoutFeedback, } from 'react-native'
import React, { useState } from 'react'
import { ButtonGroup } from '@rneui/themed'

import Header from '../../../Components/Header/Header'
import { ScrollView } from 'react-native'
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
// import Checkbox from 'expo-checkbox';
import { useEffect, useRef } from 'react'
import { CheckBox } from 'react-native-elements';



const Active_Order = ({ navigation }) => {


    const [selectedIndex, setSelectedIndex] = useState(0);

    // khai báo button đơn hàng
    const buttons = ['Đơn chờ thực hiện', 'Đơn đang thực hiện', 'Đơn đã hoàn thành', 'Đơn thu nợ'];

    // Khai báo hỗ trợ đơn hàng
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]
    const [selectedOption, setSelectedOption] = useState(null);

    //bật tắt model
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    //Khai báo check box trong chương trình đã tư vấn
    // const [isChecked, setChecked] = useState(false);

    const options = [
        { id: 1, value: 'VSBD90k ko tặng', isChecked: true },
        { id: 2, value: 'VSBD90k tặng lõi 1 AQUA', isChecked: false },
        { id: 3, value: 'Lắp máy mới', isChecked: false },
        { id: 4, value: 'Lắp lại máy', isChecked: false },
        { id: 5, value: 'TLCB Kang', isChecked: false },
        { id: 6, value: 'TLCB Karofi', isChecked: false },
        { id: 7, value: 'Tháo, di chuyển, lắp lại máy cũ', isChecked: false },
        { id: 8, value: 'TL-VS-BD Kang', isChecked: false },
        { id: 9, value: 'TL-VS-BD Karofi', isChecked: false },
        { id: 10, value: 'TL-VS-BD RO', isChecked: false },
        { id: 11, value: 'Sửa máy', isChecked: false },
        { id: 12, value: 'Sửa máy 200k', isChecked: false },
        { id: 13, value: 'Khách có NC thay lõi', isChecked: false },


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

    console.log(checkedItems)


    return (
        <ScrollView>
            {/* <Header /> */}
            <View>
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

                        }}>
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
                            Đơn Đang Thực Hiện
                        </Text>

                        <View style={{
                            backgroundColor: '#088db5',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 10
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

                                    MKH19771 -

                                    Chị Lan - Ngõ 27 Lê Văn Lương, quận Thanh Xuân, Hà Nội
                                </Text>

                                <View style={{
                                    width: '100%'
                                }}>
                                    <TouchableOpacity style={{
                                        width: '100%',
                                        backgroundColor: 'red',
                                        padding: 10,
                                        borderRadius: 7

                                    }}>
                                        <Text style={{
                                            textAlign: 'center',
                                            color: 'white'
                                        }}>
                                            Tính Tiền
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '100%',
                                        backgroundColor: 'blue',
                                        padding: 10,
                                        borderRadius: 7
                                    }}>
                                        <Text style={{
                                            textAlign: 'center',
                                            color: 'white'
                                        }}>
                                            Up Ảnh
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '100%',
                                        backgroundColor: 'yellow',
                                        padding: 10,
                                        borderRadius: 7

                                    }}
                                        onPress={toggleModal}
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


                <Modal isVisible={isModalVisible} style={{ marginBottom: 30 }}>
                    <ScrollView style={{

                    }}>
                        <View style={{
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
                                    Mã đơn hàng: MKH1812
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
                                                        Ngô Xuân Quy
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
                                                        Ngõ 27 Lê Văn Lương, quận Thanh Xuân, Hà Nội
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
                                                    <View style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
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

                                                            }}

                                                            buttonTextStyle={{

                                                            }}

                                                        />
                                                    </View>
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

                                {/* checkbox */}

                                <View>
                                    <View style={{
                                        // flexDirection: 'row',
                                        // flexWrap: 'wrap'
                                    }}>
                                        {options.map(option => (
                                            <View style={{
                                                flexDirection: 'row'
                                            }}>
                                                <CheckBox
                                                    key={option.id}
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

                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <TouchableOpacity style={{
                                                backgroundColor: '#3c8dbc',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: 60,
                                                borderRadius: 8
                                            }}>
                                                <Text style={{
                                                    fontSize: 20,
                                                    color: 'white',
                                                    padding: 10
                                                }}>
                                                    Lưu
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* Ảnh tại nhà khách hàng */}
                            <View style={{
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20
                            }}>
                                <View style={{
                                    width: '95%',
                                    backgroundColor: '#d9edf7',
                                    borderWidth: 1,
                                    borderColor: '#bce8f1'
                                }}>
                                    <Text style={{
                                        fontSize: 18,
                                        padding: 10
                                    }}>
                                        Ảnh tại nhà khách hàng
                                    </Text>
                                    <View style={{
                                        backgroundColor: 'white',

                                    }}>

                                        <View style={{
                                            marginBottom: 30,
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            marginTop: 20

                                        }}>
                                            <Image style={{
                                                width: 150,
                                                height: 100,
                                                marginLeft: 10
                                            }}
                                                source={{
                                                    uri: 'https://cdn.baogiaothong.vn/upload/2-2022/images/2022-05-25/2-1653445668-926-width740height481.jpg'
                                                }}
                                            />
                                            <TouchableOpacity style={{
                                                marginTop: 30,
                                                backgroundColor: 'red',
                                                height: 40,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 10,
                                                flexDirection: 'row'
                                            }}>
                                                <AntDesign name="delete" size={20} color="white" style={{
                                                    marginLeft: 3
                                                }} />
                                                <Text style={{
                                                    color: 'white',
                                                    paddingVertical: 10,
                                                    marginLeft: 2,
                                                    marginRight: 2
                                                }}>
                                                    Xóa
                                                </Text>
                                            </TouchableOpacity>
                                        </View>


                                        <View style={{
                                            marginBottom: 30,
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                        }}>
                                            <Image style={{
                                                width: 150,
                                                height: 100,
                                                marginLeft: 10
                                            }}
                                                source={{
                                                    uri: 'https://cdn.baogiaothong.vn/upload/2-2022/images/2022-05-25/2-1653445668-926-width740height481.jpg'
                                                }}
                                            />
                                            <TouchableOpacity style={{
                                                marginTop: 30,
                                                backgroundColor: 'red',
                                                height: 40,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 10,
                                                flexDirection: 'row'

                                            }}>
                                                <AntDesign name="delete" size={20} color="white" />
                                                <Text style={{
                                                    color: 'white',
                                                    paddingVertical: 10,
                                                    marginLeft: 2,
                                                    marginRight: 2
                                                }}>
                                                    Xóa
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        {/* Tính tổng số ảnh */}
                                        <View>
                                            <Text style={{
                                                fontSize: 20,
                                                padding: 10
                                            }}>
                                                Tổng số ảnh đã updoad: 7 Cái
                                            </Text>
                                        </View>


                                        <KeyboardAvoidingView
                                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                                            style={styles.container}
                                        >
                                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                                <View style={styles.inner}>
                                                    <TextInput placeholder="Username" style={styles.textInput} />
                                                    <View style={styles.btnContainer}>
                                                        <Button title="Đóng" onPress={toggleModal} />
                                                        <Button title="Submit" onPress={() => null} />
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </KeyboardAvoidingView>
                                    </View>
                                </View>
                            </View>
                        </View>


                    </ScrollView>
                </Modal>


            </View>
        </ScrollView>
    )
}

export default Active_Order


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
    },
    header: {
        fontSize: 36,
        marginBottom: 48
    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});