import React from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Error from './Error';
import logo from '../articlomatic.png';

export default function Login() {

    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [error, setError] = React.useState();

    const history = useHistory();
    const { setUserData } = React.useContext(UserContext);

    async function loginUser(evt) {
        evt.preventDefault();
        try {
          const loginUser = { email, password };
          const loginResponse = await Axios.post(
            "/api/login",
            loginUser
          );
          setUserData({
            token: loginResponse.data.token,
            user: loginResponse.data.user,
          });
          localStorage.setItem("auth-token", loginResponse.data.token);
          history.push("/");
        } catch (err) {
          err.response.data.msg && setError(err.response.data.msg);
        }
      };

    return (
            <div className="col-md-4 col-xs-12 offset-md-4 offset-xs-0">
                <img src={logo} className="img-fluid mb-2" alt="Logo"></img>
                <h3 className="text">Login</h3>
                <form onSubmit={loginUser}>
                    { error &&
                        <Error message={error} clearError={() => setError(undefined)}/>
                    }
                    <div className="form-group">
                        <label htmlFor="email">email</label>
                        <input 
                            type="email" 
                            onChange={(evt) => {setEmail(evt.target.value)}} 
                            name="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="Enter email" 
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Password</label>
                        <input 
                            type="password" 
                            onChange={(evt) => {setPassword(evt.target.value)}} 
                            name="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Enter password" 
                            required />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
    );
}