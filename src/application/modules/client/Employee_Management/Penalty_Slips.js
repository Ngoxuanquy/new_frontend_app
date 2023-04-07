import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown'
import Select from 'react-select';
import { SearchBar } from '@rneui/themed';
import { Table, Row, Rows } from 'react-native-table-component';

import Calendars from '../../../Components/calendar/Calendars';

const Penalty_Slips = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const countries = [25, 50, 100]
    const datas = [
        { id: 1, ngay: 'ngày 1', MaKH: 122, HDS: 123, TenKH: 'Ngô Xuân Quy', BPThucHien: 'abc', TrinhTrangTT: 'Đã Thanh Toán', HinhThucTT: 'TienMat', TongCong: 1222, ConNo: 0, NgGiuTien: 'MB12312', HoatDong: 'Hoạt Động' },
        { id: 2, title: 'data2', value: 122 },
        { id: 3, title: 'data3', value: 122 },


    ]


    return (
        <ScrollView>
            <View>
                <Text style={{
                    fontSize: 20,
                    padding: 10
                }}>
                    Tồn Kho Cá Nhân
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
                                Danh Mục:
                            </Text>

                            <SelectDropdown

                                data={countries}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                }}
                                defaultButtonText="--Chọn Nhân Viên--"
                                buttonText={selectedOption ? selectedOption : '--Chọn Nhân Viên--'}
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
                                    marginTop: 2,
                                    opacity: 0.5

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
                                Danh Mục:
                            </Text>

                            <SelectDropdown

                                data={countries}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                }}
                                defaultButtonText="--Chọn Trạng Thái--"
                                buttonText={selectedOption ? selectedOption : '--Chọn Trạng Thái--'}
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
                                    marginTop: 2,
                                    opacity: 0.5

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
                                Kiểu Phạt:
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
                                    marginTop: 2,
                                    opacity: 0.5

                                }}

                                buttonTextStyle={{

                                }}

                            />
                        </View>

                        {/* Từ Ngày */}
                        <View style={{
                            paddingHorizontal: 10,
                            marginTop: 10
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 600,

                            }}>
                                Từ Ngày
                            </Text>

                            <Calendars />
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
                                Phiếu Phạt
                            </Text>
                        </View>

                        <ScrollView horizontal={true} style={{
                            marginBottom: 100
                        }}>
                            <View>
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
                                            width: '17%',
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
                                <View style={{ flexDirection: 'row', backgroundColor: '#f1f8ff' }}>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9', padding: 15 }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>
                                            ID</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Tên Nhân Viên</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Lỗi</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Tiền Phạt</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Hóa Đơn</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Thời Gian Phạt</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Nhân Viên</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>PĐH</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>PHC</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>PKT</Text>
                                    </View>

                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>Trạng Thái</Text>
                                    </View>
                                    <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                        <Text style={{
                                            textAlign: 'center'
                                        }}>#</Text>
                                    </View>
                                </View>
                                {datas.map(data => (
                                    <View style={{ flexDirection: 'row' }}>
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

export default Penalty_Slips

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});