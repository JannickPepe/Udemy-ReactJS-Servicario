import { COLLABORATION_CREATED_FROM_OFFER, 
  FETCH_USER_MESSAGES_SUCCESS,
  SET_COLLABORATION,
  SET_COLLABORATION_JOINED_PEOPLE,
  UPDATE_COLLABORATION_USER, SET_COLLABORATION_MESSAGES, RESET_COLLABORATION_MESSAGES, REMOVE_COLLABORATION_MESSAGE  } from '../types';
import * as api from '../api';

export const collaborate = ({collaboration, message}) => dispatch =>
  api.createCollaboration(collaboration)
    .then(collabId => {
      message.cta = `/collaborations/${collabId}`
      api.sendMessage(message)
      api.markOfferAsInCollaboration(collaboration.fromOffer)
      dispatch({
        type: COLLABORATION_CREATED_FROM_OFFER,
        offerId: collaboration.fromOffer,
        offersType: 'sent'
      })
      return collabId
    }) 

//passing callback (in api collabaorations) function to messages on userId through subcribeToMessages
//Every user FETCH has a Case in Reducers auth 
export const subscribeToMessages = userId => dispatch =>
    api.subscribeToMessages(userId, 
      messages => dispatch({type: FETCH_USER_MESSAGES_SUCCESS, messages}))


      
// export const markMessageAsRead = message => dispatch =>
//   api.markMessageAsRead(message)
//      .then(_ => dispatch({type: MARK_MESSAGE_AS_READ, messageId: message.id}))

export const markMessageAsRead = message => api.markMessageAsRead(message)

//passing from the export const fetchCollaborations in api collaborations to make a function 
export const fetchCollaborations = userId => api.fetchCollaborations(userId)

//passing the callback function from api - collaborations
export const subToCollaboration = (collabId, done) => dispatch =>
  api.subToCollaboration(collabId, async collaboration => {
    //extract information from joinedPeople
    let joinedPeople = []

    //mapping over joinedPeople when the promise has been resolved and then take userRef and return id
    if (collaboration.joinedPeople) {
      joinedPeople = await Promise.all(
        collaboration.joinedPeople.map(async userRef => {
          const userSnapshot = await userRef.get()
          return {id: userSnapshot.id, ...userSnapshot.data()}
        })
      )
    }

    dispatch({type: SET_COLLABORATION, collaboration})
    dispatch({type: SET_COLLABORATION_JOINED_PEOPLE, joinedPeople})
    done({joinedPeople})
  })


export const joinCollaboration = (collabId, userId) => 
  api.joinCollaboration(collabId, userId)

//a const leavecollab witht he data collabId and userId will have its data updated by being removed from collab
export const leaveCollaboration = (collabId, userId) =>
  api.leaveCollaboration(collabId, userId)


//passing callback function to api - collaboration and dispatch the type on user (reference in types folder) 
//and make case in reducers - collaboration
export const subToProfile = uid => dispatch =>
  api.subToProfile(uid, user => 
    dispatch({type: UPDATE_COLLABORATION_USER, user}))


//get the function into message and dispatch the expire text by return api data by looking 
//into senndChatMessage onto message and catch err by go through the type and return the text 
export const sendChatMessage = message => dispatch => {
  return api
    .sendChatMessage(message)
    .catch(err => {
      dispatch({type: REMOVE_COLLABORATION_MESSAGE, messageId: message.timestamp})
        return Promise.reject('Collaboration is expired!')
    })
}


export const subToMessages = collabId => dispatch => {
  //expression for 
  dispatch({type: RESET_COLLABORATION_MESSAGES})
  //return callback function subToMessages
  return api.subToMessages(collabId, messages => {
    //expression for
    dispatch({type: SET_COLLABORATION_MESSAGES, messages})
  })
}

//I will take the created function from api - collaborations and pass it into the db
//make expiresAt functionality in pages - collaborationDetail
export const startCollaboration = (collabId, expiresAt) =>
  api.startCollaboration(collabId, expiresAt)