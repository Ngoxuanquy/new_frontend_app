import React, { useState, useContext } from 'react';

// import all the components we are going to use
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
    ListItem, Button,
    Dialog,
    CheckBox,
    Avatar,
} from '@rneui/themed';
// import Call API
import call from 'react-native-phone-call';
import { useEffect } from 'react';

const Phone = ({ navigation }) => {
    const [inputValue, setInputValue] = useState('0589401978');
    const [isLoading, setIsLoading] = useState(true)


    function triggerCall(number) {
        // Check for perfect 10 digit length
        if (inputValue.length != 10) {
            alert('Please insert correct contact number');
            return;
        }

        const args = {
            number: number,
            prompt: true,
        };
        // Make a call
        call(args).catch(console.error);
    };




    const [refreshing, setRefreshing] = React.useState(false);


    const handerPhone = () => {
        triggerCall("0589401978")
    }

    const [visible1, setVisible1] = useState(false);

    const toggleDialog1 = () => {
        setVisible1(!visible1);
    };


    return (
        <View>
            <View style={[styles.container, { marginTop: 0, zIndex: 100 }]}>
                <View style={{
                }} >

                    <View style={{

                    }}>
                        <ListItem.Swipeable

                            style={{
                                backgroundColor: 'white'
                            }}
                            leftWidth={80}
                            rightWidth={90}
                            minSlideWidth={40}
                            leftContent={(action) => (
                                <Button
                                    containerStyle={{
                                        justifyContent: 'center',
                                        backgroundColor: '#499ceb',

                                    }}
                                    type="clear"
                                    icon={{
                                        name: 'archive-outline',
                                        type: 'material-community',
                                        color: 'black',

                                    }}
                                // onPress={action}
                                />
                            )}
                            rightContent={(action) => (
                                <Button
                                    containerStyle={{
                                        justifyContent: 'center',
                                        backgroundColor: '#35e84d',
                                    }}
                                    type="clear"

                                    icon={{ name: 'phone', color: 'black' }}
                                    onPress={handerPhone}

                                />
                            )}
                        >
                            {/* <Icon name="label-important-outline" type="material" /> */}
                            <ListItem.Content style={{


                            }}>
                                <ListItem.Title style={{
                                }}>Phòng Điều Hành 1</ListItem.Title>
                                <ListItem.Subtitle style={{
                                }}>Hey, I'm John Doe</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem.Swipeable>

                        <Dialog
                            isVisible={visible1}
                            onBackdropPress={toggleDialog1}
                        >
                            <Dialog.Title title="Phòng Điều Hành 1" />
                            <Text style={{
                                fontSize: 20,
                                lineHeight: 40
                            }}>
                                Phòng Điều Hành 1

                            </Text>
                            <Text>
                                Hey, I'm John Doe
                            </Text>
                            <Text>
                                Số điện thoại: 0589401978
                            </Text>
                        </Dialog>
                    </View>

                    <ListItem.Swipeable
                        style={{
                            // marginTop: 20
                        }}
                        leftWidth={80}
                        rightWidth={90}
                        minSlideWidth={40}
                        leftContent={(action) => (
                            <Button
                                containerStyle={{
                                    justifyContent: 'center',
                                    backgroundColor: '#499ceb',
                                    height: 70,
                                    // marginTop: 20


                                }}
                                type="clear"
                                icon={{
                                    name: 'archive-outline',
                                    type: 'material-community',
                                    color: 'black'
                                }}
                                onPress={action}
                            />
                        )}
                        rightContent={(action) => (
                            <Button
                                containerStyle={{
                                    justifyContent: 'center',
                                    backgroundColor: '#35e84d',
                                    height: 70,
                                    // marginTop: 20
                                }}
                                type="clear"
                                icon={{ name: 'phone', color: 'black' }}
                                onPress={action}
                            />
                        )}
                    >
                        {/* <Icon name="label-important-outline" type="material" /> */}
                        <ListItem.Content>
                            <ListItem.Title>Phòng Điều Hành 2</ListItem.Title>
                            <ListItem.Subtitle>Hey, I'm Quy</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem.Swipeable>

                    <ListItem.Swipeable
                        style={{
                            // marginTop: 20
                        }}
                        leftWidth={80}
                        rightWidth={90}
                        minSlideWidth={40}
                        leftContent={(action) => (
                            <Button
                                containerStyle={{
                                    justifyContent: 'center',
                                    backgroundColor: '#499ceb',
                                    height: 70,
                                    // marginTop: 20

                                }}
                                type="clear"
                                icon={{
                                    name: 'archive-outline',
                                    type: 'material-community',
                                    color: 'black'
                                }}
                                onPress={action}
                            />
                        )}
                        rightContent={(action) => (
                            <Button
                                containerStyle={{
                                    justifyContent: 'center',
                                    backgroundColor: '#35e84d',
                                    height: 70,
                                    // marginTop: 20
                                }}
                                type="clear"
                                icon={{ name: 'phone', color: 'black' }}
                                onPress={action}
                            />
                        )}
                    >
                        {/* <Icon name="label-important-outline" type="material" /> */}
                        <ListItem.Content>
                            <ListItem.Title>Phòng Điều Hành 3</ListItem.Title>
                            <ListItem.Subtitle>Hey, I'm Cường</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem.Swipeable>

                </View>
            </View>
        </View>
    );
};

export default Phone;

const styles = StyleSheet.create({
    container: {
        // padding: 10,
    },
    titleText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    titleTextsmall: {
        marginVertical: 8,
        fontSize: 16,
    },
    buttonStyle: {
        justifyContent: 'center',
        marginTop: -15,
        padding: 10,
        width: 60,
        height: 60,
        borderRadius: 100
    },
    buttonTextStyle: {
        color: '#fff',
        textAlign: 'center',
    },
    textInput: {
        height: 60,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: '100%',
        paddingHorizontal: 10,
        borderRadius: 7,
        fontSize: 24
    },
});