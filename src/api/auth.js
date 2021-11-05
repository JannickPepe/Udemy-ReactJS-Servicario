import firebase from 'firebase/app';
import 'firebase/auth';

import db from '../db';

//create the varible createUserProfile into userProfile by acess database collection in table profiles and let it have a reference 
//on userProfile.uid and with .set make a new userProfile with a uid connected in the uid row.
const createUserProfile = (userProfile) => 
  db.collection('profiles')
    .doc(userProfile.uid)
    .set(userProfile)

//create the functionvarible register and let the values be into the arrow function with async. 
//So we can wrap the return value of the register into a promise 
//Then we do a try catch and using await on res to see if the promise has been resolved corretly or with error with all the values
export const register = async ({email, password, fullName, avatar}) => {
  try {
    const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
    const { user } = res
    const userProfile = { uid: user.uid, fullName, email, avatar, services: [], description: ''}
    await createUserProfile(userProfile)
    return userProfile
  } catch(error) {
    return Promise.reject(error.message)
  }
}

//Create the function login with email and password as values. Then let it be passed into firebase on auth method
//to check the sign in values of email and password. Using catch to check error and reject the promise if there is and message will come
export const login = ({email, password}) => 
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error => Promise.reject(error.message))

export const logout = () => firebase.auth().signOut()

//create the varible to store the onAuthStateChanged value, so you can have offline and online state value in profile table on state row
export const onAuthStateChanged = onAuthCallback => 
  firebase.auth().onAuthStateChanged(onAuthCallback)

//crete the varible and let it into uid by acess db collection into table profiles and make referene with .doc on uid
//by .get read the data of the reference and by .then take and store immedietly the new uid into the row
export const getUserProfile = uid =>
  db.collection('profiles')
    .doc(uid)
    .get()
    .then(snapshot => ({uid, ...snapshot.data()})) 