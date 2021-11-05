/* eslint no-useless-escape: 0 */
//We import useForm so we can validate and we import isValidImage, isValidUrl and sameAs from validators.js
import React from 'react';
import {useForm} from 'react-hook-form';
import { isValidImage, isValidUrl, sameAs } from '../../helpers/validators';

//MAke the varible RegisterForm and have props into it (later we will set it into Register.js)
const RegisterForm = (props) => {

    // we make the method useForm by having the below values passed into it
    const { register, handleSubmit, errors, getValues } = useForm()

    //in the return we have a pattern for email using RegExp by react hook form. WE will then wrap each input in a 
    //div called form-error where we will take the written input and validate, if an error occure a message will be triggered
    //We make minLenght, we make URL string validate and same as ect
    return(
        <form onSubmit={handleSubmit(props.onRegister)}>
        <div className="field">
            <div className="control">   
                <input ref={register({required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} 
                    name="email"
                    className="input is-large"
                    type="email"
                    placeholder="Your Email"
                    autoComplete="email" 
                />

                { errors.email && 
                    <div className="form-error">
                        { errors.email.type === 'required' && <span className="help is-danger">Email is required</span> }
                        { errors.email.type === 'pattern' && <span className="help is-danger">Email address is not valid</span> }
                    </div>
                }
                
            </div>
        </div>
        <div className="field">
            <div className="control">
            <input ref={register({required: true, minLength: 10})}
                name="fullName"
                className="input is-large"
                type="text"
                placeholder="Full Name"  
            />
            { errors.fullName && 
                <div className="form-error">
                    { errors.fullName.type === 'required' && <span className="help is-danger">Name is required</span> }
                    { errors.fullName.type === 'minLength' && <span className="help is-danger">Minimum length is 10 characters</span> }
                </div>
            }
        </div>
        </div>
        <div className="field">
            <div className="control">
            <input ref={register({required: true, validate: {isValidImage, isValidUrl} })}
                name="avatar"
                className="input is-large"
                type="text"
                placeholder="Avatar"
            />
            { errors.avatar &&
                <div className="form-error">
                { errors.avatar.type === 'required' &&  <span className="help is-danger">Avatar is required</span> }
                { errors.avatar.type === 'isValidImage' && <span className="help is-danger">Avatart extension is not valid</span> }
                { errors.avatar.type === 'isValidUrl' && <span className="help is-danger">Avatar url is not valid</span> }
                </div>
            }
        </div>
        </div>
        <div className="field">
            <div className="control">
            <input ref={register({required: true, minLength: 6})}
                name="password"
                className="input is-large"
                type="password"
                placeholder="Your Password"
                autoComplete="current-password" 
            />
            { errors.password &&
                <div className="form-error">
                { errors.password.type === 'required' && <span className="help is-danger">Password is required</span> }
                { errors.password.type === 'minLength' && <span className="help is-danger">Minimum length is 6 characters</span> }
                </div>
            }
        </div>
        </div>
        <div className="field">
            <div className="control">
            <input ref={register({required: true, minLength: 6, validate: {sameAs: sameAs(getValues, 'password')}})}
                name="passwordConfirmation"
                className="input is-large"
                type="password"
                placeholder="Repeat Password"
                autoComplete="current-password" 
            />
            { errors.passwordConfirmation &&
                <div className="form-error">
                    { errors.passwordConfirmation.type === 'required' &&  <span className="help is-danger">Password confirm is required</span> }
                    { errors.passwordConfirmation.type === 'minLength' && <span className="help is-danger">Minimum length is 6 characters</span> }
                    { errors.passwordConfirmation.type === 'sameAs' && <span className="help is-danger">Password confirmation is not the same as password</span> }
                </div>
            }
        </div>
        </div>
        <button
            type="submit"
            className="button is-block is-info is-large is-fullwidth">Register</button>
        </form>
    )
}

export default RegisterForm;