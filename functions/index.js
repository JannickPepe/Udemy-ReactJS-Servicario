// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();

//writing data in realtime database with cloud function, by have onUserStatusChanged hooked with the given ref into the dokcument field
//make async and have the values to be trigged by eventStatus into change.after.val()
//- a trigger
exports.onUserStatusChanged = functions.database.ref('/status/{uid}').onUpdate(
  async (change, context) => {
    const eventStatus = change.after.val()

    //connect userFirestoreRef into firestore.doc path in the collections
    const userFirestoreRef = firestore.doc(`/profiles/${context.params.uid}`)

    //read the newly data and change it when await is triggered
    const statusSnapshot = await change.after.ref.once('value')
    //To get the actual value
    const status = statusSnapshot.val()

    if (status.last_changed > eventStatus.last_changed) {
      return null
    }

    //give new date when eventstatus is triggered by a change
    eventStatus.last_changed = new Date(eventStatus.last_changed)
    return userFirestoreRef.update(eventStatus)
  }
) 