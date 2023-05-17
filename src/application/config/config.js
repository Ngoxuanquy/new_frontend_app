import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'


const firebaseConfig = {
    apiKey: 'AIzaSyDEHe7IFWBYhDOSV5pynPuzwCMi0ggay8Q',
    authDomain: 'test-70d99.firebaseapp.com',
    projectId: 'test-70d99',
    storageBucket: 'test-70d99.appspot.com',
    messagingSenderId: '1035909150314',
    appId: '1:1035909150314:web:840ee97bc0d994f0a53c13',
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase }