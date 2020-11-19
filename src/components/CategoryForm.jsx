import React from 'react';
import { useHistory } from "react-router-dom";
import UserContext from '../context/UserContext';

export default function CategoryForm() {

    const {userData} = React.useContext(UserContext);
    const history = useHistory();

    function saveArticle(evt) {

        evt.preventDefault();

        fetch('/api/addCategory', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userData.token
            },
            body: JSON.stringify({
                'name': evt.target.name.value
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.exists) {
                alert("Category exists");
            }
            else {
                history.push('/categories');
            }
        }).catch(err => {
            console.log(err.response.data.msg);
        });
    }

    return (
            <div className="col-md-4 col-xs-12 offset-md-4 offset-xs-0">
                <h3 className="text-center">Add Category</h3>
                <form onSubmit={saveArticle}>
                    <div className="form-group">
                        <label htmlFor="name">Title</label>
                        <input type="text" name="name" className="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name" minLength="2" maxLength="20" required/>
                        <small id="nameHelp" className="form-text text-muted">Max 20 Characters</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
    );
}