import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

const OnLeave = () => {
    const groups = [5, 10, 15, 20]

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#ecf0f5' }}>
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
