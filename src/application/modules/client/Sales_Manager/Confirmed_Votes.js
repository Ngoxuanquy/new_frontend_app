import { View, Text, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { SearchBar } from '@rneui/themed';
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons';


const Confirmed_Votes = () => {

    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    //Khởi tạo phân trang
    const countries = [25, 50, 100]

    //data của table
    const datas = [
        { id: 1, ngay: 'ngày 1', MaKH: 122, HDS: 123, TenKH: 'Ngô Xuân Quy', BPThucHien: 'abc', TrinhTrangTT: 'Đã Thanh Toán', HinhThucTT: 'TienMat', TongCong: 1222, ConNo: 0, NgGiuTien: 'MB12312', HoatDong: 'Hoạt Động' },
        { id: 2, title: 'data2', value: 122 },
        { id: 3, title: 'data3', value: 122 },
    ]

    //bật tắt model
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };



    return (
        <ScrollView>
            <View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 20,
                        lineHeight: 40
                    }}>
                        Công ty TNHH TM&DV DND
                    </Text>
                    <Text style={{
                        fontSize: 16
                    }}>
                        Các yêu cầu cần xác nhận
                    </Text>

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: '#3c8dbc',
                            padding: 10,
                            marginTop: 7,
                            borderRadius: 7
                        }}>
                            <Text style={{
                                color: 'white'
                            }}>
                                + Đề Nghị Tạm Ứng
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: '#3c8dbc',
                            padding: 10,
                            marginTop: 7,
                            borderRadius: 7,
                            marginLeft: 5
                        }}>
                            <Text style={{
                                color: 'white'
                            }}>
                                + Đề Nghị duyệt chi
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>




                {/* Phiếu chưa duyệt */}


                <View>
                    <View style={{
                        width: '99%',
                        marginTop: 20,
                        borderTopColor: '#3c8dbc',
                        borderTopWidth: 4
                    }}>

                        <View style={{
                            backgroundColor: 'white',

                        }}>
                            <Text style={{
                                fontSize: 17,
                                padding: 10
                            }}>
                                Phiếu Thanh Toán Chưa Duyệt
                            </Text>
                        </View>

                        <ScrollView horizontal={true} style={{
                            marginBottom: 100,
                            backgroundColor: 'white',
                        }}>

                            <View style={{
                                marginBottom: 50,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    marginBottom: 30

                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontSize: 18,
                                        padding: 10,
                                        marginTop: 5
                                    }}>
                                        Show
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
                                            width: '15%',
                                            backgroundColor: 'white',
                                            borderColor: 'black',
                                            borderWidth: 0.5,
                                            height: 35,
                                            marginTop: 10
                                        }}

                                        buttonTextStyle={{

                                        }}

                                    />
                                    <Text style={{
                                        textAlign: 'center',
                                        fontSize: 18,
                                        padding: 10,
                                        marginTop: 5
                                    }}>
                                        entries
                                    </Text>
                                </View>

                                {/* search */}

                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontSize: 18,
                                        padding: 10,
                                        marginTop: 5
                                    }}>
                                        Search
                                    </Text>
                                    <SearchBar
                                        placeholder="Type Here..."
                                        onChangeText={(e) => setSearch(e)}
                                        value={search}
                                        containerStyle={{
                                            width: '45%',
                                            marginBottom: 20,
                                            borderRadius: 10,
                                            backgroundColor: 'white',
                                            borderColor: 'white',
                                            borderWidth: 0.1
                                        }}
                                        inputContainerStyle={{
                                            backgroundColor: '#eeee',
                                            height: 40,
                                            borderRadius: 10,

                                        }}
                                        lightTheme={true}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', backgroundColor: '#00a65a' }}>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9', padding: 20 }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>
                                            ID</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Người Đề Nghị</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Ngày Mượn</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Trạng Thái</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Lúc Trả</Text>
                                    </View>

                                </View>
                                {datas.map(data => (
                                    <TouchableOpacity onPress={toggleModal}>
                                        <View style={{ flexDirection: 'row', }}>
                                            <>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{data.ngay}</Text>
                                                </View>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{data.MaKH}</Text>
                                                </View>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{data.HDS}</Text>
                                                </View>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{data.TenKH}</Text>
                                                </View>
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{data.BPThucHien}</Text>
                                                </View>

                                            </>
                                        </View>
                                    </TouchableOpacity>
                                ))}

                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>

            <View>
                <Modal isVisible={isModalVisible} style={{ marginBottom: 30 }} >
                    <View style={{
                        backgroundColor: 'white',
                        flex: 1,
                        marginTop: 20
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
                            <View>
                                <Text style={{
                                    fontSize: 22,
                                    paddingLeft: 10,
                                    marginTop: -10
                                }}>
                                    Bảng mượn kho
                                </Text>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 10
                                }}>
                                    <View style={{
                                        width: "95%",
                                        height: 0.6,
                                        backgroundColor: 'black',
                                        opacity: 0.2
                                    }}>
                                    </View>
                                </View>

                                {/* Họ và tên */}

                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 20
                                }}>
                                    <View style={{
                                        borderColor: 'black',
                                        borderWidth: 0.4,
                                        width: "90%",
                                        padding: 10
                                    }}>
                                        <Text style={{
                                            fontSize: 17
                                        }}>
                                            Họ và tên:
                                            <Text style={{
                                                fontWeight: 600,
                                                paddingLeft: 10
                                            }}>
                                                NV1812
                                            </Text>
                                        </Text>
                                    </View>

                                    <View style={{
                                        borderLeftColor: 'black',
                                        borderLeftWidth: 0.4,
                                        borderRightColor: 'black',
                                        borderRightWidth: 0.4,
                                        width: "90%",
                                        padding: 10
                                    }}>
                                        <Text style={{
                                            fontSize: 17,
                                            width: '100%'
                                        }}>
                                            Bậc:
                                            <Text style={{
                                                fontWeight: 600,
                                                paddingLeft: 10
                                            }}>
                                                Kỹ thuật CSKH thử việc 1 fulltime
                                            </Text>
                                        </Text>
                                    </View>

                                    <View style={{
                                        borderColor: 'black',
                                        borderWidth: 0.4,
                                        width: "90%",
                                        padding: 10
                                    }}>
                                        <Text style={{
                                            fontSize: 17
                                        }}>
                                            Tổ:
                                            <Text style={{
                                                fontWeight: 600,
                                                paddingLeft: 10
                                            }}>
                                                Tổ 5 - KT KD
                                            </Text>
                                        </Text>
                                    </View>

                                </View>

                                {/* Bảng show thông tin */}

                                <View>

                                </View>

                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    )
}

export default Confirmed_Votes