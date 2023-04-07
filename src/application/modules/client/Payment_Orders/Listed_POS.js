import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown'
import Select from 'react-select';

import { Table, Row, Rows } from 'react-native-table-component';
const Listed_POS = () => {

    const countries = ["Egypt", "Canada", "Australia", "Ireland"]
    const [selectedOption, setSelectedOption] = useState(null);
    const [tuans, setTuan] = useState([])

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
                                                }}>{data.NgGiuTien}</Text>
                                            </View>
                                            <View style={{ width: 120, borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'center', }}>
                                                <Text style={{
                                                    textAlign: 'center',
                                                    padding: 10
                                                }}>{data.HoatDong}</Text>
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