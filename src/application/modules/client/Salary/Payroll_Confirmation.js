import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { ButtonGroup } from '@rneui/themed'
import SelectDropdown from 'react-native-select-dropdown'
import { SearchBar } from '@rneui/themed';

const Payroll_Confirmation = () => {

    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const countries = [25, 50, 100]
    const buttons = ['Chờ Xác Nhận', 'Đã Xác Nhận'];
    const datas = [
        { id: 1, ngay: 'ngày 1', MaKH: 122, HDS: 123, TenKH: 'Ngô Xuân Quy', BPThucHien: 'abc', TrinhTrangTT: 'Đã Thanh Toán', HinhThucTT: 'TienMat', TongCong: 1222, ConNo: 0, NgGiuTien: 'MB12312', HoatDong: 'Hoạt Động' },
        { id: 2, title: 'data2', value: 122 },
        { id: 3, title: 'data3', value: 122 },
    ]


    // khai báo ẩn hiện khi click vào button
    const [isloadChoXN, setIsLoadChoXN] = useState(true)
    const [isloadDaXN, setIsLoadDaXN] = useState(false)

    useEffect(() => {
        if (buttons[selectedIndex] == 'Chờ Xác Nhận') {
            setIsLoadChoXN(true)
            setIsLoadDaXN(false)
        }
        else if (buttons[selectedIndex] == 'Đã Xác Nhận') {
            setIsLoadChoXN(false)
            setIsLoadDaXN(true)
        }


    }, [selectedIndex])


    return (
        <ScrollView>
            <View>


                {/* buutons */}
                <ScrollView horizontal style={{
                    marginTop: 10,

                }}>
                    <ButtonGroup
                        buttons={buttons}
                        selectedIndex={selectedIndex}
                        onPress={(value) => {
                            setSelectedIndex(value)

                        }}
                        containerStyle={{ marginBottom: 20, height: 50 }}
                        textStyle={{ fontSize: 13, textAlign: 'center' }}
                        buttonContainerStyle={{
                            width: 100,
                            borderRadius: 1,
                        }}
                    />
                </ScrollView>

                {/* Phiếu chưa duyệt */}
                {isloadChoXN &&

                    <View>
                        <View style={{
                            width: '99%',
                            marginTop: -20,
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
                                    Bảng Lương Cá Nhân
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
                                                marginTop: 10,
                                                opacity: 0.5
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
                                                width: '40%',
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
                                                marginTop: -10

                                            }}
                                            lightTheme={true}
                                        />
                                    </View>

                                    <View style={{ flexDirection: 'row', backgroundColor: '#00a65a' }}>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9', padding: 7 }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>
                                                ID</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Ngày Tạo</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Lương Tháng</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Họ Và Tên</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>TRạng Thái</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Ghi Chú</Text>
                                        </View>


                                    </View>
                                    {datas.map(data => (

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
                                                <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        padding: 10
                                                    }}>{data.TrinhTrangTT}</Text>
                                                </View>

                                            </>
                                        </View>
                                    ))}

                                </View>
                            </ScrollView>
                        </View>
                    </View>
                }

                {/* Phiếu chưa duyệt */}
                {isloadDaXN &&

                    <View>
                        <View style={{
                            width: '99%',
                            marginTop: -20,
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
                                    Phiếu mượn hàng cần duyệt
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
                                                width: '40%',
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

                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9', padding: 7 }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>
                                                ID</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Ngày Tạo</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Lương Tháng</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Họ Và Tên</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>TRạng Thái</Text>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>Ghi Chú</Text>
                                        </View>

                                    </View>
                                    {datas.map(data => (

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
                                    ))}

                                </View>
                            </ScrollView>
                        </View>
                    </View>
                }


            </View>
        </ScrollView>
    )
}

export default Payroll_Confirmation