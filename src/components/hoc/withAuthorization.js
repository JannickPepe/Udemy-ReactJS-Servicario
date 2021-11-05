import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

//i will create the varible and let its values be into component. Set the authorization by create the function auth in the render
//and set it into this.props and then return value by checking if we are auth or not auth and have all the values onto this.props
//in the component - so if we are logged in we will have auth values or the last be redireted to login. 
const withAuthorization = Component => {

    class WithAuthorization extends React.Component {

        render() {
            const { auth} = this.props
            return auth.isAuth ? <Component {...this.props} /> : <Redirect to="/login" />
        }
    }
    return connect(({auth}) => ({auth}))(WithAuthorization)
}

//I can now wrap this into other export defaults - example ServiceCreate.js
export default withAuthorization;



