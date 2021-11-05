import React from 'react';
import { connect } from 'react-redux';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Routes from './Routes';
import Spinner  from './components/Spinner';


class ServiceApp extends React.Component {

  //we are calling logout
  
  renderApplication = auth => 
    <React.Fragment>
      <Navbar
      loadFresh
      id="navbar-main"
      //create the function to navbar 
     
      auth={auth}/>
      <Navbar 
        auth={auth}
       
        id="navbar-clone" />
      <Sidebar />
      <Routes />
    </React.Fragment>

  render() {
    const { auth } = this.props
    return auth.isAuthResolved ? this.renderApplication(auth) : <Spinner/>
  }
}

const mapStateToProps = state => ({auth: state.auth})


export default connect(mapStateToProps) (ServiceApp) 