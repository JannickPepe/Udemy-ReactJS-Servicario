//this is the file where i setup componentDidMount with stored values that will go into this.props so i can use it
//then ill have dispatch to show the fetchUserServices case with value user onto u.id - I am taking the fetch case by import it with {}
import React from 'react';
import withAuthorization from '../../components/hoc/withAuthorization';
import ServiceItem from '../../components/service/ServiceItem';

import { fetchUserServices } from '../../actions';

class UserServices extends React.Component {

  componentDidMount() {
    const { auth: { user }, dispatch } = this.props

    dispatch(fetchUserServices(user.uid))

  }

  //Make so services can be shown if the user have autenticification and display it with the current styling hooked to services.map
  //which means data can be stored by map (whenever you create a service) - The map() method creates a new array 
  //by calling a provided function on every element in the calling array
  render() {
    const { services } = this.props.auth
    return (
      <div className="container">
        <div className="content-wrapper">
        <h1 style={{color: 'orange'}} className="title">Your Services</h1>
          {/*mapping over service which is s*/}
          <div className="columns is-multiline">
            {
              services.map(s => (
                <div key={s.id} className="column">
                  <ServiceItem service={s}/>
                </div>
                )
              )
            }
          </div>
        </div>
      </div>
    )
  }
}


export default withAuthorization(UserServices);