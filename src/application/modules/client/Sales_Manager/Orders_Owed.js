import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { SearchBar } from '@rneui/themed';
const Orders_Owed = () => {

    const [search, setSearch] = useState("");
    const countries = [25, 50, 100]
    const [selectedOption, setSelectedOption] = useState(null);
    const datas = [
        { id: 1, ngay: 'ngày 1', MaKH: 122, HDS: 123, TenKH: 'Ngô Xuân Quy', BPThucHien: 'abc', TrinhTrangTT: 'Đã Thanh Toán', HinhThucTT: 'TienMat', TongCong: 1222, ConNo: 0, NgGiuTien: 'MB12312', HoatDong: 'Hoạt Động' },
        { id: 2, title: 'data2', value: 122 },
        { id: 3, title: 'data3', value: 122 },
    ]


    return (
        <ScrollView>
            <View style={{
                width: '99%'
            }}>
                <Text style={{
                    padding: 10,
                    fontSize: 20
                }}>
                    Những Đơn Hàng Đang Nợ
                </Text>
                <View style={{
                    backgroundColor: 'white',
                    borderTopColor: '#3c8dbc',
                    borderTopWidth: 4
                }}>
                    <Text style={{
                        fontSize: 15,
                        padding: 15
                    }}>
                        Những Đơn Hàng Nhân Viên Kỹ Thuật Đang Nợ
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
                                    width: '10%',
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
                                    width: '25%',
                                    marginBottom: 20,
                                    borderRadius: 10,
                                    backgroundColor: 'white',


                                    // backgroundColor: 'white'
                                }}
                                inputContainerStyle={{
                                    backgroundColor: 'white',
                                    height: 40,
                                    borderRadius: 10,
                                    borderColor: 'gray',
                                    borderWidth: 0.5,
                                    marginTop: -10
                                }}
                                lightTheme={true}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', backgroundColor: '#f1f8ff' }}>
                            <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9', padding: 15 }}>
                                <Text style={{
                                    textAlign: 'center'
                                }}>
                                    Ngày Xong Đơn</Text>
                            </View>
                            <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                <Text style={{
                                    textAlign: 'center'
                                }}>Mã Hóa Đơn</Text>
                            </View>
                            <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                <Text style={{
                                    textAlign: 'center'
                                }}>Mã Khách Hàng</Text>
                            </View>
                            <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                <Text style={{
                                    textAlign: 'center'
                                }}>Tên Khách Hàng</Text>
                            </View>
                            <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                <Text style={{
                                    textAlign: 'center'
                                }}>Nhân Viên Kĩ Thuật</Text>
                            </View>
                            <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                <Text style={{
                                    textAlign: 'center'
                                }}>Tổng Cộng</Text>
                            </View>
                            <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                <Text style={{
                                    textAlign: 'center'
                                }}>Người Giữ Tiền</Text>
                            </View>
                            <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                <Text style={{
                                    textAlign: 'center'
                                }}>Ghi Chú</Text>
                            </View>

                            <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                <Text style={{
                                    textAlign: 'center'
                                }}>#</Text>
                            </View>

                        </View>
                        {datas.map(data => (

                            <View
                                key={data.id}
                                style={{ flexDirection: 'row', }}>
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


                                </>
                            </View>
                        ))}

                    </View>
                </ScrollView>
            </View>

        </ScrollView>
    )
}

export default Orders_Owed