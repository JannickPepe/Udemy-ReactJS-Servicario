//This is the code for having the different fetch functions connected to the api
//import from db and my function createRef from my api - index.js file. So it can inherit the values
import db from '../db';
import { createRef } from './index';

//have the function fecthServiceById and pass it into serviceId then go into dabase on collection with services table 
export const fetchServiceById = serviceId => 
  db.collection('services')
  //then get a document reference for the document within the collection at the specified path
    .doc(serviceId)
    //read the specific value
    .get()
    //then store the id immedietly and the retrieve immedielt the data in the document as in object
    .then(snapshot => ({id: snapshot.id, ...snapshot.data()}
    ))


export const fetchServices = () => 
  db.collection('services')
    .get()
    .then(snapshot => {
      const services = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      return services
    })

//have the function fetchUserServices into userId by making userRef. So whenever a createRef which contain profiles table and userId have happen
//it will then return data from database db from the table services in collection.
export const fetchUserServices = userId => {
  const userRef = createRef('profiles', userId)
    return db
      .collection('services')
      // With where we make a query and return it
      .where("user", "==", userRef)
      .where("user", "==", userRef)
      //Execute the query and return the results
      .get()
      //make a callback function services and take immedielty whatever values docs.map referes to
      .then(snapshot => {
        const services = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        return services
      })
}

export const createService = newService => {
  return db
    .collection('services')
    .add(newService)
    .then(docRef => docRef.id)
} 