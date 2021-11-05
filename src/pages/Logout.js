import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../actions';

class Logout extends React.Component {

  componentDidMount() {
      //take isauth and user object into props on auth
    const { isAuth, user } = this.props.auth
    //we can now logout on this page as a user
    if (isAuth) { this.props.dispatch(logout(user.uid)) }
  }

  //construct isAuth obeject into props = if we still are auth on this page we will be logged out... And if we are not auth on this page we are logged out
  render() {
    const { isAuth } = this.props.auth
    return (
      <div className="container">
        <div className="content-wrapper">
          { isAuth && <h1 className="title">You are getting logged out...</h1>}
          { !isAuth && <h1 className="title">You are logged out</h1>}
        </div>
      </div>
    )
  }
}

//destructur auth from state and provide auth object back to props
export default connect(({auth}) => ({auth}))(Logout);