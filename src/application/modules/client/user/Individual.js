import React, { useEffect } from 'react'
import { ScrollView, TextInput, TouchableOpacity, View, Text } from 'react-native'
import IoIcon from 'react-native-vector-icons/Ionicons'
import DatePicker from 'react-native-modern-datepicker'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Individual = () => {
    const [fromDate, setFromDate] = useState('')
    const [isFromDate, setIsFromDate] = useState(false)
    const [endDate, setEndDate] = useState('')
    const [isEndDate, setIsEndDate] = useState('')
    const URL = 'http://192.168.1.101:3000/v1/api';


    function RenderItem({ title, value }) {
        return (
            <View style={{ borderBottomWidth: 1, width: '100%', marginVertical: 8 }}>
                <Text>{title}</Text>
                <Text style={{ paddingVertical: 4 }}>{value}</Text>
            </View>
        )
    }

    const datas = [
        {
            id: 1,
            MaKH: 122,
            TenKH: 'Ngô Xuân Quy',
            GioGui: '2023-03-17',
            Nguon: 'NVDND000001',
            TrangThai: 'Mới',
            DoanhSo: '',
            CKDonThem: '',
            XemDon: '#',
        },
        { id: 2, title: 'data2', value: 122 },
        { id: 3, title: 'data3', value: 122 },
    ]



    //lấy token từ AsyncStorage
    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            console.log('Token đã được lấy thành công');
            return token;
        } catch (error) {
            console.log('Lỗi khi lấy token: ', error);
        }
    };

    //lấy id từ AsyncStorage
    const getID = async () => {
        try {
            const id = await AsyncStorage.getItem('id');
            console.log('Token đã được lấy thành công');
            return id;
        } catch (error) {
            console.log('Lỗi khi lấy token: ', error);
        }
    };

    const Createdaily_results = async () => {
        const accessToken = await getToken()
        const id = await getID()
        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "39081e3d21dc8f2c3fddaff1ae20142b0ae3a0c1849da2a3bd753ddf8db599d983b28c681972c5ecc8990f164527f5d4a0a1820240de22e80b0f61dfbdedde7d",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },
            body: JSON.stringify({
                user_id: id,
                business_id: 1,
                type: "your_type_value",
                ca: "your_ca_value",
                so_cong: 0,
                bac_luong: "your_bac_luong_value",
                luong_cb: 0,
                doanh_so: 0,
                doanh_so_yc: 0,
                so_don_yc: 0,
                tb_don_yc: 0,
                ds_ban_may: 0,
                don_ban_may: 0,
                don_ps: 0,
                don_vs: 0,
                thuong: 0,
                phat: 0,
                chiet_khau: 0,
                don_them: 0,
                thu_nhap_ngay: 0
            })
        };


        // Lấy dữ liệu của khách hàng
        fetch(URL + '/daily_results/create', requestOptions)
            .then(() => {
                GetApi()
            })
    }

    //Lấy Api của chỉ số cá nhân

    const [acceptdailyresultdetails, setAcceptdailyresultdetails] = useState([])

    const GetApi = async () => {

        const accessToken = await getToken()
        const id = await getID()
        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "39081e3d21dc8f2c3fddaff1ae20142b0ae3a0c1849da2a3bd753ddf8db599d983b28c681972c5ecc8990f164527f5d4a0a1820240de22e80b0f61dfbdedde7d",
                "authorization": cleanedJwtString,
                "x-client-id": id
            }
        };


        // Lấy dữ liệu của khách hàng
        fetch(URL + '/daily_results/get/' + id, requestOptions)
            .then((data) => {
                return data.json()
            })
            .then(data => {
                // console.log(data.metadata)
                if (data.metadata.length !== 0) {
                    setAcceptdailyresultdetails(data.metadata)
                }
                else {
                    Createdaily_results()
                    console.log('tạo')
                }
            })
    }

    useEffect(() => {
        GetApi()
    }, [])


    //Tạo Chỉ Số Cá Nhân Theo Từng Ngày


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
                    zIndex: 99,
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
                    <View style={{ margin: 12, rowGap: 4, position: 'relative', zIndex: 8 }}>
                        <View style={{ position: 'relative' }}>
                            <TextInput
                                placeholder="From Date"
                                style={{
                                    height: 40,
                                    borderWidth: 1,
                                    paddingHorizontal: 10,
                                    borderRadius: 4,
                                }}
                                onFocus={() => setIsFromDate(true)}
                                value={fromDate}
                            />

                            <View
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    width: '100%',
                                    zIndex: 99,
                                }}
                            >
                                {isFromDate && (
                                    <DatePicker
                                        options={{
                                            backgroundColor: '#090C08',
                                            textHeaderColor: '#FFA25B',
                                            textDefaultColor: '#F6E7C1',
                                            selectedTextColor: '#fff',
                                            mainColor: '#F4722B',
                                            textSecondaryColor: '#D6C7A1',
                                            borderColor: 'rgba(122, 146, 165, 0.1)',
                                        }}
                                        mode="calendar"
                                        minuteInterval={30}
                                        style={{ borderRadius: 10 }}
                                        onSelectedChange={(date) => {
                                            setFromDate(date)
                                            setIsFromDate(false)
                                        }}
                                    />
                                )}
                            </View>
                        </View>

                        <View style={{ position: 'relative' }}>
                            <TextInput
                                placeholder="To Date"
                                style={{
                                    height: 40,
                                    borderWidth: 1,
                                    paddingHorizontal: 10,
                                    borderRadius: 4,
                                }}
                                value={endDate}
                                onFocus={() => setIsEndDate(true)}
                            />
                            <View
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    width: '100%',
                                    zIndex: 99,
                                }}
                            >
                                {isEndDate && (
                                    <DatePicker
                                        options={{
                                            backgroundColor: '#090C08',
                                            textHeaderColor: '#FFA25B',
                                            textDefaultColor: '#F6E7C1',
                                            selectedTextColor: '#fff',
                                            mainColor: '#F4722B',
                                            textSecondaryColor: '#D6C7A1',
                                            borderColor: 'rgba(122, 146, 165, 0.1)',
                                        }}
                                        mode="calendar"
                                        minuteInterval={30}
                                        style={{ borderRadius: 10 }}
                                        onSelectedChange={(date) => {
                                            setEndDate(date)
                                            setIsEndDate(false)
                                        }}
                                    />
                                )}
                            </View>
                        </View>
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
            </View>

            <View
                style={{
                    borderWidth: 1,
                    padding: 12,
                    borderRadius: 4,
                    borderTopWidth: 4,
                    borderTopColor: '#3c8dbc',
                    backgroundColor: '#fff',
                    marginTop: 16,
                }}
            >
                <Text style={{ fontWeight: 600, fontSize: 18, paddingBottom: 8 }}>Chỉ số ngày</Text>
                <Text style={{ fontSize: 12, marginVertical: 12 }}>
                    Tính từ 2023-04-01 00:00:00 {'->'} 2023-04-05 23:59:59
                </Text>
                <View style={{ borderWidth: 0.2, marginVertical: 12 }} />
                {acceptdailyresultdetails.map(acceptdailyresultdetail => (
                    <View
                        key={acceptdailyresultdetail.id}
                        style={{ flexDirection: 'row', columnGap: 10, justifyContent: 'space-between' }}
                    >
                        <View style={{ flex: 1 }}>
                            <Text>Bậc hiện tại: Bậc 1</Text>
                            <RenderItem title={'GTTB đơn'} value={acceptdailyresultdetail.tb_don_yc} />
                            <RenderItem title={'Tỉ lệ VS'} value={'<5%'} />
                            <RenderItem title={'OLE'} value={acceptdailyresultdetail.ole + '%'} />
                            <Text>Mục tiêu: Bậc 2</Text>
                            <RenderItem title={'GTTB đơn'} value={700000} />
                            <RenderItem title={'Tỉ lệ VS'} value={'<5%'} />
                            <RenderItem title={'OLE'} value={'85%'} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <RenderItem title={'Lương tạm tính'} value={0} />
                            <RenderItem title={'Ngày công'} value={acceptdailyresultdetail.so_cong} />
                            <RenderItem title={'Chiết khấu thay lõi'} value={0} />
                            <RenderItem title={'Chiết khấu đơn thêm'} value={acceptdailyresultdetail.chiet_khau_don_them} />
                            <RenderItem title={'Số đơn phát sinh'} value={acceptdailyresultdetail.don_ps + ' đơn'} />
                            <RenderItem title={'Gía trị TB hiện tại'} value={0} />
                            <RenderItem title={'Gía trị TB yêu cầu'} value={700000} />
                            <RenderItem title={'Gía trị TB còn thiếu'} value={700000} />
                            <RenderItem title={'Tổng số tiền còn thiếu'} value={0} />
                            <RenderItem title={'Số đơn vệ sinh'} value={0 + ' đơn'} />
                            <RenderItem title={'Tỉ lệ vệ sinh TT'} value={0} />
                            <RenderItem title={'OLE'} value={0 + '%'} />
                            <RenderItem title={'Số km trung bình/đơn'} value={0} />
                            <RenderItem title={'Thời gian trung bình đơn'} value={'0 phút'} />
                        </View>
                    </View>
                ))}
            </View>

            <View style={{ borderWidth: 1, padding: 12, marginTop: 12 }}>
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
                                    padding: 14
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                    }}
                                >
                                    Mã KH
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
                                    Tên KH
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
                                    Giờ gửi
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
                                    Nguồn
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
                                    Doanh số
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
                                    CK đơn thêm
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
                            <View
                                key={data.id}
                                style={{ flexDirection: 'row' }}>
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
                                            {data.MaKH}
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
                                            {data.TenKH}
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
                                            {data.GioGui}
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
                                            {data.Nguon}
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
                                            {data.DoanhSo}
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
                                            {data.CKDonThem}
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
                                            {data.XemDon}
                                        </Text>
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

export default Individual
