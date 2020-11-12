import React from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Register() {

    const history = useHistory();

    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [passwordCheck, setPasswordCheck] = React.useState();
    const [firstName, setFirstName] = React.useState();
    const [lastName, setLastName] = React.useState();

    const registerUser = async (evt) => {
        evt.preventDefault();
        const userToRegister = {email,password,passwordCheck,firstName,lastName};
        const registerResponse = await Axios.post(
            '/api/register',
            userToRegister
        );
    }

    return (
        <div className="row">
            <div className="col-md-4 col-xs-12 offset-md-4 offset-xs-0">
                <h3>Register</h3>
                <form onSubmit={registerUser}>
                    <div className="form-group">
                        <label htmlFor="email">email</label>
                        <input type="email" onChange={(evt) => {setEmail(evt.target.value)}} name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />
                        <small id="emailHelp" className="form-text text-muted"></small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Password</label>
                        <input type="password" onChange={(evt) => {setPassword(evt.target.value)}} name="password" className="form-control" id="password" aria-describedby="passHelp" placeholder="Enter password" required />
                        <small id="passHelp" className="form-text text-muted"></small>
                        <input type="password" onChange={(evt) => {setPasswordCheck(evt.target.value)}} name="passwordCheck" className="form-control" id="passwordCheck" aria-describedby="passCheckHelp" placeholder="Verify password" required />
                        <small id="passCheckHelp" className="form-text text-muted"></small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">Personal Information</label>
                        <input className="form-control" type="text" onChange={(evt) => {setFirstName(evt.target.value)}} placeholder="First name" name="firstName" id="firstName" minLength="2" maxLength="20" required />
                        <input className="form-control" type="text" onChange={(evt) => {setLastName(evt.target.value)}} placeholder="Last name" name="lastName" id="lastName" minLength="2" maxLength="20" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    );
}