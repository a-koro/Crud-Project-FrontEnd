import React from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import Error from './Error';
import logo from '../articlomatic.png';

export default function Register() {

    const history = useHistory();

    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [passwordCheck, setPasswordCheck] = React.useState();
    const [firstName, setFirstName] = React.useState();
    const [lastName, setLastName] = React.useState();
    const [error, setError] = React.useState();

    const registerUser = async (evt) => {
        evt.preventDefault();
        try {
            if(!(password == passwordCheck)) {
                alert("password hasn't been confirmed");
            } else {
                const userToRegister = {email,password,passwordCheck,firstName,lastName};
                const registerResponse = await Axios.post(
                    '/api/register',
                    userToRegister
                );
                history.push('/');
            }
        } catch (err) {
            if(err.response.data.msg)
                setError(err.response.data.msg);
        }
    }

    return (
            <div className="col-md-4 col-xs-12 offset-md-4 offset-xs-0 mt-3">
                <img src={logo} className="img-fluid mb-2" alt="Logo"/>
                <h3 className="text">Register</h3>
                <form onSubmit={registerUser}>
                    { error && 
                        <Error message={error} clearError={() => setError(undefined)}/>
                    }
                    <div className="form-group">
                        <label htmlFor="email">email</label>
                        <input type="email" onChange={(evt) => {setEmail(evt.target.value)}} name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />
                        <small id="emailHelp" className="form-text text-muted"></small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={(evt) => {setPassword(evt.target.value)}} name="password" className="form-control" id="password" aria-describedby="passHelp" placeholder="Enter password" required />
                        <small id="passHelp" className="form-text text-muted"></small>
                        <label htmlFor="passwordCheck">Verify Password</label>
                        <input type="password" onChange={(evt) => {setPasswordCheck(evt.target.value)}} name="passwordCheck" className="form-control" id="passwordCheck" aria-describedby="passCheckHelp" placeholder="Verify password" required />
                        <small id="passCheckHelp" className="form-text text-muted"></small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">Personal Information</label>
                        <input className="form-control" type="text" onChange={(evt) => {setFirstName(evt.target.value)}} placeholder="First name" name="firstName" id="firstName" minLength="2" maxLength="20" required />
                        <input className="form-control mt-2" type="text" onChange={(evt) => {setLastName(evt.target.value)}} placeholder="Last name" name="lastName" id="lastName" minLength="2" maxLength="20" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
        </div>
    );
}