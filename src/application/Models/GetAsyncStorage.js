import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

class GetAsyncStorage {

    getToken = async (req, res, next) => {
        const token = await AsyncStorage.getItem('accessToken');
        return token
    }

    getId = async (req, res, next) => {

        const id = await AsyncStorage.getItem('id');
        return id
    }

}

module.exports = new GetAsyncStorage()