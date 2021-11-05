/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useToasts } from 'react-toast-notifications';
import { Redirect } from 'react-router-dom';
import Goat from '../assets/goat.jpg';
import { login } from '../actions';
import onlyGuest from '../components/hoc/onlyGuest';

//make login into an empty arrow function - make an functional array with objects as redirect and setRedirect - so we can get a new state after an action
//Make a useForm method that will contain register and handlesubmit objects
//also add the notification from toast into useToasts
const Login = () => {
  const [ redirect, setRedirect ] = useState(false)
  const { register, handleSubmit } = useForm()
  const { addToast } = useToasts()

  //create onLogin and let it have data into loginData which will have its data passed in by login using .then which will pass a 
  //callback as setRedirect where it has true as parameter, if there is an error then invoke the arrow function with addToast
  const onLogin = loginData => {
    login(loginData)
      .then(
        _ => setRedirect(true),
        errorMessage => addToast(errorMessage, { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000 })
      )
  }
  //if redirect get invoked by if statement it will go back one patch back in the url
  if (redirect) { return <Redirect to="/" />}

  return (
    <div className="auth-page">
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title has-text-grey">Login</h3>
          <p className="subtitle has-text-grey">Please login to proceed.</p>
          <div className="box">
            <figure className="avatar">
              <img src={Goat}  alt="Servicario logo" />
            </figure>
            <form onSubmit={handleSubmit(onLogin)}>
              <div className="field">
                <div className="control">
                 
                  <input 
                    ref={register}
                    name="email"
                    className="input is-large"
                    type="email"
                    placeholder="Your Email"
                    autoComplete="email" />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input 
                    ref={register}
                    name="password"
                    className="input is-large"
                    type="password"
                    placeholder="Your Password"
                    autoComplete="current-password" />
                </div>
              </div>
              <button
              
                type="submit"
                className="button is-block is-info is-large is-fullwidth">Sign In</button>
            </form>
          </div>
          <p className="has-text-grey">
            <a>Sign In With Google</a>&nbsp;
            <a href="/">Sign Up</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  )
}

//Only a guest can login 
export default onlyGuest(Login)
