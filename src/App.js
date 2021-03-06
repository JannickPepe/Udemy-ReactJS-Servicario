import React from 'react';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import initStore from './store';

import { BrowserRouter as Router } from 'react-router-dom';
import ServiceApp from './ServiceApp';
import { 
  onAuthStateChanged, 
  storeAuthUser, 
  subscribeToMessages,
  checkUserConnection } from './actions';



const store = initStore()

class App extends React.Component {

  //callback function whenever u r logged in or out
  componentDidMount() {
    this.unsubscribeAuth = onAuthStateChanged(authUser => {
      store.dispatch(storeAuthUser(authUser))

      if(authUser) {
        checkUserConnection(authUser.uid)
        this.unsubcribeMessages = store.dispatch(subscribeToMessages(authUser.uid))
      }
      if (!authUser) { 
        this.unsubscribeMessages && this.unsubscribeMessages()
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeAuth()
    this.unsubcribeMessages()
  }


  render() {
    return (
      <Provider store={store}>
        <ToastProvider>
          <Router>
            <ServiceApp />
          </Router>
        </ToastProvider>
      </Provider>
    )
  }
}

export default App;
