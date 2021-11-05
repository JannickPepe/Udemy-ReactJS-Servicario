import db from '../db';

//Create the object createRef with the values collection and docId then 
// go onto specific path by db.doc onto the object collection + docId
export const createRef = (collection, docId) => db.doc(`${collection}/` + docId)

//export everything from the given collections auth and connection files
export * from './services'; //collection
export * from './auth';
export * from './offers'; //collection
export * from './collaborations'; //collection
export * from './connection';