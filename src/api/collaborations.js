import firebase from 'firebase/app';
import db from '../db';

import { createRef } from './index';

export const createCollaboration = collab => 
    db.collection('collaborations')
        .add(collab)
        .then(docRef => docRef.id)

//subcollection messages is getting created into the speicfic user doc in profiles collection
export const sendMessage = message => 
    db.collection('profiles')
        .doc(message.toUser)
        .collection('messages')
        .add(message)

//We go to the table profiles, select the current userId and then go to message row and take from the id
export const subscribeToMessages = (userId, callback) =>
    db.collection('profiles')
        .doc(userId)
        .collection('messages')
        .onSnapshot(snapshot => {
          const messages = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            callback(messages)
    })

//We can now receive status on markMessageAsRead from message through db table row data
export const markMessageAsRead = message =>
  db.collection('profiles')
    .doc(message.toUser)
      .collection('messages')
      .doc(message.id)
      .update({isRead: true})
        

//We can now receive fetchCollaborations from userId
export const fetchCollaborations = userId => 
  db.collection('collaborations')
    .where('allowedPeople', 'array-contains', userId)
    .get()
    .then(snapshot => snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})))


export const subToCollaboration = (collabId, done) =>
  db.collection('collaborations')
    .doc(collabId)
    .onSnapshot(snapshot => {
      const collab = {id: snapshot.id, ...snapshot.data()}
      done(collab)
    })

//joinCollaboration med data collabId og uid - userRef bliver skabt fra profiles table hen på uid row
export const joinCollaboration = (collabId, uid) => {
  const userRef = createRef('profiles', uid)

    //we will go to our collection in db and get data from table collaboration on collabId and update 
    //the fieldvalue array med ny userRef
    return db
      .collection('collaborations')
      .doc(collabId)
      .update({ joinedPeople: firebase.firestore.FieldValue.arrayUnion(userRef)})
}

    
export const leaveCollaboration = (collabId, uid) => {
  const userRef = createRef('profiles', uid)
    
    // we will go to our collection in db and go to collaboration table get data collabId and update on joinedpeople row 
    //by remove whatever userRef value in the array
    return db
      .collection('collaborations')
      .doc(collabId)
      .update({ joinedPeople: firebase.firestore.FieldValue.arrayRemove(userRef)})
}


// create the callback function = i will go to table profiles and into doc and find uid row and then take data into user on id
export const subToProfile = (uid, done) => 
  db.collection('profiles')
    .doc(uid)
    .onSnapshot(snapshot => {
      const user = {id: snapshot.id, ...snapshot.data()}
      done(user)
    })


//create the object and make a call to database
export const sendChatMessage = ({message, collabId, timestamp}) => 
  //we want to acess db collection into table collection and acess the data with doc
  //then the subcollection messages and get a reference into timestamp and get data  into the message 
  db.collection('collaborations')
    .doc(collabId)
    .collection('messages')
    .doc(timestamp)
    .set(message)


//create the object with the values collabId and done. Go to collaboration collection and get reference to collabID 
//then go to subcollection and change the values and return them
export const subToMessages = (collabId, done) => 
  db.collection('collaborations')
  .doc(collabId)
  .collection('messages')
  .onSnapshot(snapshot => done(snapshot.docChanges()))


//Create the object  and have the values collabId and expiresAt. Go to collection collaborations 
//get a reference and updadate the field in the refered reference
export const startCollaboration = (collabId, expiresAt) => 
  db.collection('collaborations')
    .doc(collabId)
    .update({expiresAt})