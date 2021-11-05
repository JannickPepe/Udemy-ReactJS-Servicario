import { combineReducers } from 'redux';
import services from '../reducers/services';
import selectedService from '../reducers/selectedService';
import auth from './auth';
import offers from './offers';
import collaboration from './collaboration';

//make object serviceApp and set it to combineReducers with the given values
//We can now implement combineReducers in the different reducer files
const serviceApp = combineReducers({
    services,
    selectedService,
    auth,
    offers,
    collaboration
})

//function now created - import it in file ReceivedMessages
export const getMessages = state => state.auth.messages

export default serviceApp;