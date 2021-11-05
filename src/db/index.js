// This import loads the firebase namespace.
import firebase from 'firebase/app';
// These imports load individual services into the firebase namespace.
import 'firebase/firestore'

//Create db and let firebase.initializeApp method have the values below and connect have realtime database connected as well
const db = firebase 
    .initializeApp(
        {
            apiKey: "AIzaSyA0eq5Z2bcNxQUbtB0q7yIcVLoQ2F2jZdU",
            authDomain: "servicario-ecb76.firebaseapp.com",
            databaseURL: "https://servicario-ecb76.firebaseio.com",
            projectId: "servicario-ecb76",
            storageBucket: "servicario-ecb76.appspot.com",
            messagingSenderId: "197041447293",
            appId: "1:197041447293:web:8110ba809f45297ef6ac14",
            measurementId: "G-2VT08MEEGJ"
        }
    )
    .firestore()

export default db;

//create the function Timestamp and set the value into firebase 
//So whenever a message is written in the specific collaboration, the message will have a Timestamp containing numbers
const { Timestamp } = firebase.firestore
export { Timestamp } 