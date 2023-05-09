import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Button, Image, ScrollView, TextInput, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBar } from '@rneui/themed';
import ThemeConText from '../../../config/themeConText';
import OrderAction from '../../../Components/cart/OrderAction';
import Spinner from 'react-native-loading-spinner-overlay';


export default function ThanhToan({ route, navigation }) {

    const { id_tran } = route.params;

    console.log({ id_tran })

    const URL = 'http://192.168.0.102:3000/v1/api';

    // const { name, id_chuyen, number } = route.params;


    const [cliedId, setCliedID] = useState(0);
    const [Apis, setApi] = useState([])
    const [sanphams, setSanPham] = useState([])
    const [taikhoan, setTaiKhoan] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const Arrays = [
        {
            id: 1,
            name: 'Lọc Nước'
        },
        {
            id: 2,
            name: 'Kangaroo'
        },
        {
            id: 3,
            name: 'Cá'
        },
        {
            id: 4,
            name: 'Voi'
        },
        {
            id: 5,
            name: 'Khủng Long'
        },
        {
            id: 6,
            name: 'All'
        },
    ]




    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

    }, []);


    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
        setSearch(search);
    };

    //xử lý chọn sản phẩm
    function handerProperties(name, id) {
        setCliedID(id);
        // let data;
        // if (name === 'All') {
        //     data = products;
        //     setProduct(data);
        //     return;
        // }
        // data = products.filter((item) => {
        //     return item.properties == name;
        // });
    }

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

    const [cart, setCart] = useState([])


    //Lấy apis product
    const [products, setProduct] = useState([])

    const GetApiorders = async (id1) => {

        console.log(id1)

        const accessToken = await getToken()
        const id = await getID()


        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a9ae60c5abf0771d5cfc763a143bd796723733b7d2fa537e940dbad50edfcf1bf0f8d25096264293e2d9deb9df2515a241bedda3045777be6ebc38c35c3ac141",
                "authorization": cleanedJwtString,
                "x-client-id": id
            }
        };


        // Lấy dữ liệu của khách hàng
        fetch(URL + '/product/get', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then(data => {
                // console.log(data.message)
                setProduct(data.metadata)
            })

        const requestOptions1 = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a9ae60c5abf0771d5cfc763a143bd796723733b7d2fa537e940dbad50edfcf1bf0f8d25096264293e2d9deb9df2515a241bedda3045777be6ebc38c35c3ac141",
                "authorization": cleanedJwtString,
                "x-client-id": id
            }
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/transactions_sell_line/get/' + id_tran, requestOptions1)
            .then((data) => {
                return data.json()
            })
            .then(data => {
                // const products = data.metadata.map(item => item.product);

                // setCart(products);


                const products = data.metadata && data.metadata.map(item => {
                    const product = item.product;
                    product.quantity = item.quantity;
                    return product;
                });

                console.log(products);
                setCart(products)
                setIsLoading(false)


            })
    }

    useEffect(() => {
        GetApiorders()
    }, [id_tran])


    //Xử lý chọn hàng 
    const handerChon = async (id1, product) => {

        const accessToken = await getToken()
        const id = await getID()


        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a9ae60c5abf0771d5cfc763a143bd796723733b7d2fa537e940dbad50edfcf1bf0f8d25096264293e2d9deb9df2515a241bedda3045777be6ebc38c35c3ac141",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },
            body: JSON.stringify({

                transactionId: id_tran,
                productId: id1,
                quantity: 1,
                price: product.price,
                item_tax: 0,
                variation_id: 1

            })
        };


        // Lấy dữ liệu của khách hàng
        fetch(URL + '/transactions_sell_line', requestOptions)
            .then((data) => {

                const requestOptions1 = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": "a9ae60c5abf0771d5cfc763a143bd796723733b7d2fa537e940dbad50edfcf1bf0f8d25096264293e2d9deb9df2515a241bedda3045777be6ebc38c35c3ac141",
                        "authorization": cleanedJwtString,
                        "x-client-id": id
                    }
                };

                // Lấy dữ liệu của khách hàng
                fetch(URL + '/transactions_sell_line/get/' + id_tran, requestOptions1)
                    .then((data) => {
                        return data.json()
                    })
                    .then(data => {
                        // const products = data.metadata.map(item => item.product);

                        // setCart(products);


                        const products = data.metadata.map(item => {
                            const product = item.product;
                            product.quantity = item.quantity;
                            return product;
                        });

                        console.log(products);
                        setCart(products)

                    })

            })
    }




    const handerThanhToan = async () => {
        const accessToken = await getToken()
        const id = await getID()


        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions1 = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a9ae60c5abf0771d5cfc763a143bd796723733b7d2fa537e940dbad50edfcf1bf0f8d25096264293e2d9deb9df2515a241bedda3045777be6ebc38c35c3ac141",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },

        };


        // Lấy dữ liệu của khách hàng
        fetch(URL + '/orders/updateaction/' + id_tran, requestOptions1)
            .then((data) => {
                fetch(URL + '/transactions/update/' + id_tran, requestOptions1)
                navigation.navigate('Đơn đang thực hiện')
            })

    }


    const Update_Cong = async (productId, quantity) => {


        const accessToken = await getToken()
        const id = await getID()


        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a9ae60c5abf0771d5cfc763a143bd796723733b7d2fa537e940dbad50edfcf1bf0f8d25096264293e2d9deb9df2515a241bedda3045777be6ebc38c35c3ac141",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },
            body: JSON.stringify({
                transactionId: id_tran,
                productId: productId,
                quantity: quantity
            })
        };


        // Lấy dữ liệu của khách hàng
        fetch(URL + '/transactions_sell_line/updatecong', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then(data => {
                // console.log(data.message)

                const requestOptions1 = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": "a9ae60c5abf0771d5cfc763a143bd796723733b7d2fa537e940dbad50edfcf1bf0f8d25096264293e2d9deb9df2515a241bedda3045777be6ebc38c35c3ac141",
                        "authorization": cleanedJwtString,
                        "x-client-id": id
                    }
                };

                // Lấy dữ liệu của khách hàng
                fetch(URL + '/transactions_sell_line/get/' + id_tran, requestOptions1)
                    .then((data) => {
                        return data.json()
                    })
                    .then(data => {

                        // console.log(data)
                        // const quantity = data.metadata.map(item => item.quantity);
                        // const products = data.metadata.map(item => item.product);
                        // const test = products.concat(quantity)

                        // console.log(test)

                        // setCart(products);

                        //lấy trường quantity trong bảng transaction_sell_line vào products
                        const products = data.metadata.map(item => {
                            const product = item.product;
                            product.quantity = item.quantity;
                            return product;
                        });

                        console.log(products);
                        setCart(products)

                    })

            })
    }

    const Update_Tru = async (productId, quantity) => {


        const accessToken = await getToken()
        const id = await getID()


        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a9ae60c5abf0771d5cfc763a143bd796723733b7d2fa537e940dbad50edfcf1bf0f8d25096264293e2d9deb9df2515a241bedda3045777be6ebc38c35c3ac141",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },
            body: JSON.stringify({
                transactionId: id_tran,
                productId: productId,
                quantity: quantity
            })
        };


        // Lấy dữ liệu của khách hàng
        fetch(URL + '/transactions_sell_line/updatetru', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then(data => {
                // console.log(data.message)

                const requestOptions1 = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": "a9ae60c5abf0771d5cfc763a143bd796723733b7d2fa537e940dbad50edfcf1bf0f8d25096264293e2d9deb9df2515a241bedda3045777be6ebc38c35c3ac141",
                        "authorization": cleanedJwtString,
                        "x-client-id": id
                    }
                };

                // Lấy dữ liệu của khách hàng
                fetch(URL + '/transactions_sell_line/get/' + id_tran, requestOptions1)
                    .then((data) => {
                        return data.json()
                    })
                    .then(data => {

                        // console.log(data)
                        // const quantity = data.metadata.map(item => item.quantity);
                        // const products = data.metadata.map(item => item.product);
                        // const test = products.concat(quantity)

                        // console.log(test)

                        // setCart(products);

                        //lấy trường quantity trong bảng transaction_sell_line vào products
                        const products = data.metadata.map(item => {
                            const product = item.product;
                            product.quantity = item.quantity;
                            return product;
                        });

                        console.log(products);
                        setCart(products)

                    })

            })
    }

    const handerDelete = async (productId) => {

        const accessToken = await getToken()
        const id = await getID()

        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');


        const requestOptions1 = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a9ae60c5abf0771d5cfc763a143bd796723733b7d2fa537e940dbad50edfcf1bf0f8d25096264293e2d9deb9df2515a241bedda3045777be6ebc38c35c3ac141",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },
            body: JSON.stringify({
                productId: productId,
                transactionId: id_tran,

            })
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/transactions_sell_line/delete', requestOptions1)
            .then((data) => {
                fetch(URL + '/transactions_sell_line/get/' + id_tran, requestOptions1)
                    .then((data) => {
                        return data.json()
                    })
                    .then(data => {

                        //lấy trường quantity trong bảng transaction_sell_line vào products
                        const products = data.metadata.map(item => {
                            const product = item.product;
                            product.quantity = item.quantity;
                            return product;
                        });

                        console.log(products);
                        setCart(products)

                    })
            })

    }


    return (
        <View style={{
            flex: 1,
            // backgroundColor: theme.maunen
        }}>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{
                    tintColor: 'black',
                    backgroundColor: '#eeeeee',
                    size: 10,
                    marginBottom: 0,
                }} />
            }>
                <ScrollView horizontal>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        alignItems: 'center',

                    }}>
                        {Arrays && Arrays.map((Array, index) => (
                            <View key={Array.id} style={{

                            }}>
                                <TouchableOpacity
                                    onPress={() => handerProperties(Array.name, Array.id)}
                                    style={{
                                        borderRadius: 10,
                                    }}
                                >
                                    <Text style={
                                        [
                                            index + 1 === cliedId ? styles.buttonAction : styles.butonUn,
                                            {
                                                // color: theme.color
                                            }
                                            // styles.butonUn
                                        ]

                                    }>
                                        {Array.name}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <View>
                    <View>
                        {products && products.map((product, index) => (
                            <View
                                key={product.id}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    // borderWidth: 0.4,
                                    // borderColor: 'gray',
                                    borderBottomColor: 'gray',
                                    borderBottomWidth: 1,
                                    paddingVertical: 6

                                }}>
                                <View style={{
                                    width: '40%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        lineHeight: 30,
                                        textAlign: 'center',

                                    }}>
                                        {product.name}
                                    </Text>


                                </View>
                                <View style={{
                                    width: '40%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        lineHeight: 30,
                                        textAlign: 'center',

                                    }}>
                                        {product.alert_quantity}
                                    </Text>

                                </View>

                                <View>
                                    <TouchableOpacity style={{
                                        backgroundColor: 'green',
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}
                                        title="A"
                                        onPress={() => handerChon(product.id, product)}
                                    >
                                        <Text style={{
                                            padding: 10,
                                            color: 'white'
                                        }}>
                                            Chọn
                                        </Text>
                                    </TouchableOpacity>

                                </View>

                            </View>
                        ))}
                    </View>
                </View>

                <View style={{
                    marginTop: 20,
                    padding: 10
                }}>
                    <View>
                        <Text style={{
                            fontSize: 20
                        }}>
                            Sản Phẩm Đã Chọn
                        </Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginBottom: 10,
                        marginTop: 10
                    }}>
                        <Text>
                            Tên Sp
                        </Text>

                        <Text>
                            Số Lượng
                        </Text>
                        <Text>
                            Thành Tiền
                        </Text>
                        <Text>
                            Xóa
                        </Text>
                    </View>

                    <View>
                        {cart && cart.map(ca => (
                            <View key={ca.id}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    marginTop: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'gray'
                                }}>
                                    <Text>
                                        {ca.name}
                                    </Text>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        width: 100,

                                    }}>
                                        {ca.quantity <= 1 ? <TouchableOpacity style={{
                                            width: 40,
                                            // padding: 10,
                                            backgroundColor: '#eeeeee',
                                            justifyContent: "center",
                                            alignItems: 'center'
                                        }}
                                            onPress={() => alert('Số lượng phải lớn hơn 1!!')}

                                        >
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>
                                                -
                                            </Text>
                                        </TouchableOpacity>
                                            :
                                            <TouchableOpacity style={{
                                                width: 40,
                                                // padding: 10,
                                                backgroundColor: '#eeeeee',
                                                justifyContent: "center",
                                                alignItems: 'center'
                                            }}
                                                onPress={() => Update_Tru(ca.id, ca.quantity)}

                                            >
                                                <Text style={{
                                                    textAlign: 'center'
                                                }}>
                                                    -
                                                </Text>
                                            </TouchableOpacity>
                                        }
                                        <View style={{
                                            justifyContent: "center",
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>
                                                {ca.quantity}
                                            </Text>
                                        </View>
                                        <TouchableOpacity style={{
                                            width: 40,
                                            padding: 10,
                                            backgroundColor: '#eeeeee',
                                            justifyContent: "center",
                                            alignItems: 'center'
                                        }}
                                            onPress={() => Update_Cong(ca.id, ca.quantity)}
                                        >
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>
                                                +
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text>
                                        {ca.price * ca.quantity}
                                    </Text>
                                    <TouchableOpacity style={{
                                        padding: 6,
                                        backgroundColor: 'red'
                                    }}
                                        onPress={() => handerDelete(ca.id)}
                                    >
                                        <Text style={{
                                            color: 'white'
                                        }}>
                                            Xóa
                                        </Text>
                                    </TouchableOpacity>
                                </View>


                            </View>
                        ))}
                        <View>
                            <Text>
                                Tổng Tiền :
                            </Text>

                        </View>
                    </View>
                </View>

                <View style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    marginRight: 10,
                    marginTop: 20
                }}>
                    <TouchableOpacity onPress={() => handerThanhToan()} style={{
                        padding: 10,
                        backgroundColor: '#ff0000',
                    }}>
                        <Text style={{
                            color: 'white'
                        }}>
                            Thanh Toán
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView >


        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    butonUn: {
        // backgroundColor: 'gray',
        width: 110,
        height: 50,
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',


    },
    buttonAction: {
        backgroundColor: '#CC3333',
        width: 120,
        height: 50,
        borderColor: 'black',
        borderWidth: 0.3,
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        // borderRadius: 10,
        color: 'gold',
        fontWeight: 'bold',

    }
});


