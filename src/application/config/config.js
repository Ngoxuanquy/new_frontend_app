import firebase from 'firebase/compat/app'

import 'firebase/compat/auth'

import 'firebase/compat/firestore'

import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyBPJ4BxGacrlcF0bIxZqbd3TOrcapDd_AQ',
    authDomain: 'test-1f299.firebaseapp.com',
    projectId: 'test-1f299',
    storageBucket: 'test-1f299.appspot.com',
    messagingSenderId: '915482232234',
    appId: '1:915482232234:web:c34b7f6c51b4d2a97e97d3',
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase }
