/* eslint jsx-a11y/anchor-is-valid: 0 */
//We import register from auth.js in actions because we want to have acess to data through the api
import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import Goat from '../assets/goat.jpg';
import { register } from '../actions';
import { useToasts } from 'react-toast-notifications'
import onlyGuest from '../components/hoc/onlyGuest';


//we make the variblefunction Register and pass props into it. By having a notification functin addToast being equal to useToasts method
//also make a varible registerUser and have userData pass into it by letting register have userData and use .then 
//for callback on methods (return promise values as uid and fullname ect) in the arrow function into an errorMessage 
const Register = (props) => {

    const { addToast } = useToasts()

    const registerUser = (userData) => {
        
        register(userData)
            .then(
            _ => () => {},
        errorMessage => addToast(errorMessage, { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000 }))
    }
   
   //in the return we return text information, logo and the buttom with the RegisterForm functionality  
    return (
        <div className="auth-page">
        <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
            <h3 className="title has-text-grey">Register</h3>
            <p className="subtitle has-text-grey">Please Register to proceed.</p>
            <div className="box">
            <figure className="avatar">
                <img src={Goat}  alt="Servicario logo" />
            </figure>
            <RegisterForm onRegister={registerUser} />
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

// export default withRouter(Register)
export default onlyGuest(Register)