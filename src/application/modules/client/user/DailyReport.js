import React from 'react'
import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'

import SelectDropdown from 'react-native-select-dropdown'

import IoIcon from 'react-native-vector-icons/Ionicons'

const DailyReport = () => {
    const [selectedOption, setSelectedOption] = useState(null)
    const staffs = ['NVDND00001']
    const groups = ['Tổ 5 - KT KD']

    const datas = [
        {
            id: 1,
            HoTen: 'Ngô Xuân Quy',
            BaoCaoNgay: '01-02-2023',
            TrangThai: 'Null',
            Xem: '#',
        },
        // { id: 2, title: 'data2', value: 122 },
        // { id: 3, title: 'data3', value: 122 },
    ]

    return (
        <ScrollView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#ecf0f5' }}>
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
                        <TextInput
                            placeholder="From Date"
                            style={{
                                height: 40,
                                borderWidth: 1,
                                paddingHorizontal: 10,
                                borderRadius: 4,
                            }}
                        />
                        <TextInput
                            placeholder="To Date"
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
                        }}
                    >
                        <Text style={{ color: '#fff' }}>Lọc</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ margin: 12, rowGap: 4 }}>
                    <SelectDropdown
                        data={staffs}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        defaultButtonText="--Lọc nhân viên--"
                        buttonText={selectedOption ? selectedOption : '--Lọc nhân viên--'}
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
                    <SelectDropdown
                        data={groups}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        defaultButtonText="--Tổ--"
                        buttonText={selectedOption ? selectedOption : '--Tổ--'}
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
                        justifyContent: 'flex-end',
                        marginVertical: 8,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            paddingVertical: 8,
                            paddingHorizontal: 12,
                            backgroundColor: '#3c8dbc',
                            borderWidth: 1,
                            borderColor: '#367fa9',
                            borderRadius: 4,
                            marginRight: 12,
                        }}
                    >
                        <Text style={{ color: '#fff', fontSize: 12 }}>+ Thêm báo cáo cá nhân</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            // justifyContent: 'space-between',
                            marginHorizontal: 12,
                        }}
                    >
                        <TouchableOpacity style={{ padding: 8, width: '50%', borderWidth: 1 }}>
                            <Text style={{}}>Báo cáo hằng ngày</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                padding: 8,
                                width: '50%',
                                borderWidth: 1,
                                borderTopWidth: 0,
                                borderRightWidth: 0,
                            }}
                        >
                            <Text style={{ color: '#3c8dbc' }}>Lịch sử báo cáo</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={{ fontSize: 16 }}>Show 10 entries</Text>
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
                                            Báo cáo ngày
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

                                {datas.map((data) => (
                                    <View style={{ flexDirection: 'row' }}>
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
                                                    {data.HoTen}
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
                                                    {data.BaoCaoNgay}
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
                                                    {data.TrangThai}
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
                                                    {data.Xem}
                                                </Text>
                                            </View>
                                        </>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default DailyReport
