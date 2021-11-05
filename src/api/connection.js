import firebase from 'firebase/app';
//Reference to the Realtime databse
import 'firebase/database';

//create the function createFirebaseRef where it will have the values 
//collection and id and then it will go into firebase database with ref to contain collection objects with id
export const createFirebaseRef = (collection, id) => firebase.database().ref(`/${collection}/${id}`)

//Show if the user is offline and when the users status last got changed
export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP
}

//show if the user is online in the table user and when the users status last got changed
export const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP
}

//create the function and pass it into a callback which will go into firebase app and establish connection to the root path 
//and then change on values - it can now be changed immedietly by snapshot when callback pass the snapshot.val()
export const onConnectionChanged = callback => 
  firebase
    .database()
    .ref('.info/connected')
    .on('value', snapshot => {
      callback(snapshot.val())
    })