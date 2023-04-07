import { View, Text } from 'react-native'
import React from 'react'
import IoIcon from 'react-native-vector-icons/Ionicons'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'

import SelectDropdown from 'react-native-select-dropdown'
import { useState } from 'react'
import { ScrollView } from 'react-native'

const ProposalPaper = () => {
    const [selectedOption, setSelectedOption] = useState(null)

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

    return (
        <View style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#ecf0f5' }}>
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
                            console.log(selectedItem, index)
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
                                                {data.ThuocBoPhan}
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
                                                {data.Loai}
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
    )
}

export default ProposalPaper
