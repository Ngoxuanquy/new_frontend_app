import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Button, Image, ScrollView, TextInput, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBar } from '@rneui/themed';
import ThemeConText from '../../../config/themeConText';
import OrderAction from '../../../Components/cart/OrderAction';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect } from '@react-navigation/native';


export default function ThanhToan({ route, navigation }) {

    const { id_tran } = route.params;


    const URL = 'http://192.168.11.232:3000/v1/api';

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


    // 
    // useEffect(() => {
    //     GetApiorders(transactionId)
    // }, [])

    // console.log(cart)

    //Xử lý lấy id cửa transaction_sell_line

    const [transactionId, setTransactionId] = useState()

    useFocusEffect(
        React.useCallback(() => {
            const getId = async (id_tran) => {
                const accessToken = await getToken()
                const id = await getID()

                const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                        "authorization": cleanedJwtString,
                        "x-client-id": id
                    },
                };


                // Lấy dữ liệu của khách hàng
                fetch(URL + '/transactions/getbyconcactid/' + id_tran, requestOptions)
                    .then((data) => data.json())
                    .then((data) => {

                        setTransactionId(data.metadata[0].id)
                        // console.log(data.metadata[0].id)

                        const requestOptions1 = {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                                "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                                "authorization": cleanedJwtString,
                                "x-client-id": id
                            }
                        };

                        // Lấy dữ liệu của sản phẩm đã mua
                        fetch(URL + '/transactions_sell_line/get/' + data.metadata[0].id, requestOptions1)
                            .then((data) => {
                                return data.json()
                            })
                            .then(data => {
                                if (data.metadata.length != 0) {
                                    const products = data.metadata && data.metadata.map(item => {
                                        const product = item.product;
                                        product.quantity = item.quantity;
                                        product.product_id = item.product_id

                                        return product;
                                    })
                                    setCart(products)
                                    setIsLoading(false)
                                }
                                else {
                                    setCart([])
                                    setIsLoading(false)

                                }
                            })
                    })
            }
            getId(id_tran)
        }, [id_tran])
    );

    // useFocusEffect(
    //     React.useCallback(() => {

    //         const GetApiorders = async () => {

    //             const accessToken = await getToken()
    //             const id = await getID()
    //             const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

    //             const requestOptions = {
    //                 method: 'POST',
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
    //                     "authorization": cleanedJwtString,
    //                     "x-client-id": id
    //                 }
    //             };


    //             // Lấy dữ liệu của khách hàng
    //             fetch(URL + '/product/get', requestOptions)
    //                 .then((data) => {
    //                     return data.json()
    //                 })
    //                 .then(data => {
    //                     // console.log(data.metadata)
    //                     setProduct(data.metadata)
    //                 })
    //         }
    //         GetApiorders()
    //     }, [])
    // );


    //Lấy hàng tồn kho cửa từng nhân viên
    //khai báo tồn kho kết hợp với tên products
    const [inventoryproducts, setInventoryProduct] = useState([])
    useFocusEffect(
        React.useCallback(() => {
            const getProductVariation = async (id_tran) => {
                const accessToken = await getToken()
                const id = await getID()

                const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                        "authorization": cleanedJwtString,
                        "x-client-id": id
                    },
                };

                // Lấy dữ liệu của khách hàng
                fetch(URL + '/variation_location_details/get/' + id, requestOptions)
                    .then((data) => data.json())
                    .then((data) => {

                        // Create a map to store the quantity available for each product ID
                        data.metadata.forEach(item => {
                            item.name = item.products.name;
                            delete item.products;
                        });

                        // Print the updated response
                        setInventoryProduct(data.metadata);
                    })
            }
            getProductVariation()
        }, [])
    );

    // useEffect(() => {
    //     getId(id_tran)
    // })


    //Xử lý chọn hàng 
    const handerChon = async (id1, product) => {

        const accessToken = await getToken()
        const id = await getID()

        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },
            body: JSON.stringify({
                transactionId: transactionId,
                productId: id1,
                quantity: 1,
                price: product.price,
                item_tax: 0,
                variation_id: 1,
                contactId: id_tran

            })
        };


        // Lấy dữ liệu của khách hàng
        fetch(URL + '/transactions_sell_line', requestOptions)
            .then((data) => {

                const requestOptions1 = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                        "authorization": cleanedJwtString,
                        "x-client-id": id
                    }
                };

                // Lấy dữ liệu của khách hàng
                fetch(URL + '/transactions_sell_line/get/' + transactionId, requestOptions1)
                    .then((data) => {
                        return data.json()
                    })
                    .then(data => {

                        const products = data.metadata && data.metadata.map(item => {
                            const product = item.product;
                            product.quantity = item.quantity;
                            product.product_id = item.product_id

                            return product;
                        });

                        setCart(products)

                    })

            })
    }

    // console.log(cart)


    //Tính tổng tiền

    const [total, setTotal] = useState(0)

    useEffect(() => {
        let totals = 0;
        for (let i = 0; i < cart.length; i++) {
            totals += cart[i].price * cart[i].quantity;
        }
        setTotal(totals)
    }, [cart])

    //xử lý khi thanh toán thì trừ sản phẩm trong tồn kho
    // console.log({ cart })


    const calculateRemainingQuantity = async () => {

        const id_user = await getID()

        // Create a map of product_id to quantity in the cart
        const cartQuantities = {};
        cart.forEach(item => {
            const { product_id, quantity } = item;
            cartQuantities[product_id] = (cartQuantities[product_id] || 0) + quantity;
        });

        // Calculate the remaining quantity for each inventory product
        const updatedInventoryProducts = inventoryproducts.map(product => {
            const { id, products_id, qty_available } = product;
            const cartQuantity = cartQuantities[products_id] || 0;
            const remainingQuantity = parseInt(qty_available) - cartQuantity;

            // Return the updated product object with remaining quantity
            return { id, product_id: products_id, qty_available: remainingQuantity.toString(), user_id: id_user };
        });

        // Return the updated inventory products
        console.log(updatedInventoryProducts)
        return updatedInventoryProducts;
    }

    // Call the function to calculate the remaining quantity

    const updatedInventory = async () => {
        const Inventory = await calculateRemainingQuantity();

        const accessToken = await getToken()
        const id_user = await getID()
        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions1 = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                "authorization": cleanedJwtString,
                "x-client-id": id_user
            },
            body: JSON.stringify(
                {
                    Inventory: Inventory
                }
            )

        };

        fetch(URL + '/variation_location_details/update', requestOptions1)
    }



    //Lấy những đơn hàng trong chỉ số cá nhân
    //Lấy Api của chỉ số cá nhân

    const [acceptdailyresultdetails, setAcceptdailyresultdetails] = useState([])
    const [donVs, setDonVs] = useState()
    const [donPs, setDonPs] = useState()
    const [doanhso, setDoanhSo] = useState()



    const GetDailyresult = async () => {

        const accessToken = await getToken()
        const id = await getID()
        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
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
                setDonVs(data.metadata[0].don_vs)
                setDonPs(data.metadata[0].don_ps)
                setDoanhSo(data.metadata[0].doanh_so)

            })
    }

    useEffect(() => {
        GetDailyresult()
    }, [])




    // console.log(acceptdailyresultdetails)

    //tĂNG số lượng sản phẩm
    const Update_Cong = async (productId, quantity) => {


        const accessToken = await getToken()
        const id = await getID()


        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },
            body: JSON.stringify({
                transactionId: transactionId,
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
                        "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                        "authorization": cleanedJwtString,
                        "x-client-id": id
                    }
                };

                // Lấy dữ liệu của khách hàng
                fetch(URL + '/transactions_sell_line/get/' + transactionId, requestOptions1)
                    .then((data) => {
                        return data.json()
                    })
                    .then(data => {

                        // console.log(data.metadata)
                        // const quantity = data.metadata.map(item => item.quantity);
                        // const products = data.metadata.map(item => item.product);
                        // const test = products.concat(quantity)

                        // console.log(test)

                        // setCart(products);

                        //lấy trường quantity trong bảng transaction_sell_line vào products
                        const products = data.metadata && data.metadata.map(item => {
                            const product = item.product;
                            product.quantity = item.quantity;
                            product.product_id = item.product_id
                            return product;
                        });

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
                "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },
            body: JSON.stringify({
                transactionId: transactionId,
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
                        "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                        "authorization": cleanedJwtString,
                        "x-client-id": id
                    }
                };

                // Lấy dữ liệu của khách hàng
                fetch(URL + '/transactions_sell_line/get/' + transactionId, requestOptions1)
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
                        const products = data.metadata && data.metadata.map(item => {
                            const product = item.product;
                            product.quantity = item.quantity;
                            product.product_id = item.product_id

                            return product;
                        });

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
                "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },
            body: JSON.stringify({
                productId: productId,
                transactionId: transactionId,

            })
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/transactions_sell_line/delete', requestOptions1)
            .then((data) => {
                fetch(URL + '/transactions_sell_line/get/' + transactionId, requestOptions1)
                    .then((data) => {
                        return data.json()
                    })
                    .then(data => {

                        //lấy trường quantity trong bảng transaction_sell_line vào products
                        const products = data.metadata && data.metadata.map(item => {
                            const product = item.product;
                            product.quantity = item.quantity;
                            product.product_id = item.product_id

                            return product;
                        });

                        setCart(products)

                    })
                    .catch(err => console.log(err))
            })

    }

    //update Đơn Thêm
    const updateDonVe = async () => {
        const accessToken = await getToken()
        const id = await getID()
        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions1 = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },
            body: JSON.stringify({
                id: id,
                donVs: donVs
            })
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/daily_results/update/donvesinh/', requestOptions1)
    }

    //update Đơn Phát Sinh
    const updateDonPhatSinh = async () => {
        const accessToken = await getToken()
        const id = await getID()
        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions1 = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },
            body: JSON.stringify({
                id: id,
                donPs: donPs,
                doanhso: doanhso + total
            })
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/daily_results/update/donphatsinh/', requestOptions1)
    }

    //Xử lý transation_payload
    const transaction_payload = async () => {
        const accessToken = await getToken()
        const id = await getID()
        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },
            body: JSON.stringify({
                transactionId: id_tran,
                method: "cash",
                contactsId: id_tran
            })

        };
        fetch(URL + '/transaction_payments/create/', requestOptions)

    }

    //xử lý thonh toán 
    const handerThanhToan = async () => {

        const accessToken = await getToken()
        const id = await getID()
        const cleanedJwtString = accessToken.replace(/^"|"$/g, '');

        const requestOptions1 = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },

        };

        const requestOptions2 = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a",
                "authorization": cleanedJwtString,
                "x-client-id": id
            },
            body: JSON.stringify({
                id: id_tran,
                final_total: total
            })

        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/orders/updateaction/' + id_tran, requestOptions1)
            .then((data) => {
                fetch(URL + '/transactions/update', requestOptions2)
                transaction_payload()
            })
            .then(() => {
                fetch(URL + '/orderhistory/update/' + id_tran, requestOptions1)

                updatedInventory()

                if (total == 0) {
                    updateDonVe()
                }
                else {
                    updateDonPhatSinh()
                }

                navigation.navigate('Đơn đang thực hiện')


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
                    <View
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
                                Tên Sản Phẩm
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
                                Số Lượng Tồn
                            </Text>

                        </View>

                        <View>
                            <Text style={{
                                padding: 10,
                                // color: 'white'
                            }}>
                                Trạng Thái
                            </Text>
                        </View>

                    </View>
                    <View>
                        {/* Gọi api trong tồn kho và sản phẩm */}
                        {inventoryproducts && inventoryproducts.map((product, index) => (
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
                                        {product.qty_available}
                                    </Text>

                                </View>

                                <View>
                                    {product.qty_available > 0 ?
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

                                        :
                                        <TouchableOpacity style={{
                                            backgroundColor: 'red',
                                            justifyContent: 'center',
                                            alignItems: 'center',

                                        }}
                                            title="A"
                                        >
                                            <Text style={{
                                                padding: 10,
                                                color: 'white'
                                            }}>
                                                Hết Hàng
                                            </Text>
                                        </TouchableOpacity>
                                    }
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
                        <View style={{
                            marginTop: 15,

                        }}>
                            <Text style={{
                                fontSize: 18
                            }}>
                                Tổng Tiền : {total}
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


