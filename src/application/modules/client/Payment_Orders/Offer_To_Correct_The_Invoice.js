import { View, Text, ScrollView } from 'react-native'
import React from 'react'

const Offer_To_Correct_The_Invoice = () => {

    const datas = [
        { id: 1, ngay: 'ngày 1', MaKH: 122, HDS: 123, TenKH: 'Ngô Xuân Quy', BPThucHien: 'abc', TrinhTrangTT: 'Đã Thanh Toán', HinhThucTT: 'TienMat', TongCong: 1222, ConNo: 0, NgGiuTien: 'MB12312', HoatDong: 'Hoạt Động' },
        { id: 2, title: 'data2', value: 122 },
        { id: 3, title: 'data3', value: 122 },
    ]

    return (
        <>
            <View style={{
                width: '99%'
            }}>
                <Text style={{
                    padding: 10,
                    fontSize: 20
                }}>
                    Đề Nghị Sửa Hóa Đơn
                </Text>
                <View style={{
                    backgroundColor: 'white',
                    borderTopColor: '#3c8dbc',
                    borderTopWidth: 4
                }}>
                    <Text style={{
                        fontSize: 20,
                        padding: 10
                    }}>
                        Đề Nghị Sửa Hóa Đơn
                    </Text>
                </View>
                <ScrollView horizontal={true} style={{
                    marginBottom: 100,
                    backgroundColor: 'white',
                }}>
                    <View style={{
                        marginBottom: 50,
                    }}>

                        <View style={{ flexDirection: 'row', backgroundColor: '#f1f8ff' }}>
                            <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9', padding: 20 }}>
                                <Text style={{
                                    textAlign: 'center'
                                }}>
                                    Ngày Tạo</Text>
                            </View>
                            <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                <Text style={{
                                    textAlign: 'center'
                                }}>Nhân Viên Kĩ Thuật</Text>
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
                                }}>Mã Hóa Đơn</Text>
                            </View>
                            <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                <Text style={{
                                    textAlign: 'center'
                                }}>Số Hóa Đơn</Text>
                            </View>
                            <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                <Text style={{
                                    textAlign: 'center'
                                }}>Loại</Text>
                            </View>
                            <View style={{ width: 120, borderWidth: 1, justifyContent: 'center', borderColor: '#C1C0B9' }}>
                                <Text style={{
                                    textAlign: 'center'
                                }}>Ngày Giao Dịch</Text>
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


                                </>
                            </View>
                        ))}

                    </View>
                </ScrollView>
            </View>

        </>
    )
}

export default Offer_To_Correct_The_Invoice