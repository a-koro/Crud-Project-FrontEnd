import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import UserContext from '../context/UserContext';
import Error from './Error';

export default function ArticleForm() {

    const [categories, setCategories] = useState([]);
    const [error, setError] = React.useState();
    const history = useHistory();

    const { userData } = React.useContext(UserContext);

    function getCategories() {
        fetch("/api/getCategories")
            .then(response => response.json())
            .then(data => {
                setCategories(data.sort((a, b) => (a.name > b.name) ? 1 : -1));
            });
    }

    async function saveArticle(evt) {
        evt.preventDefault();

        try {
            const articleResponse = await Axios.post(
                "/api/addArticle",
                {
                    "title": evt.target.title.value,
                    "content": evt.target.content.value,
                    "category": evt.target.category.value
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': userData.token
                    }
                }
            );
            history.push('/articles');
        } catch(err) {
            setError(err.response.data.error);
        }
        // await fetch('/api/addArticle', {
        //     method: "POST",
        //     headers: {
        //         'x-auth-token': userData.token,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         "title": evt.target.title.value,
        //         "content": evt.target.content.value,
        //         "category": evt.target.category.value
        //     })
        // }).then((response) => {
        //     response.json();
        // }).then(data => {
        //     history.push('/articles');
        // }).catch((err) => {
        //     setError(err);
        // });
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
            <div className="col-md-4 col-xs-12 offset-md-4 offset-xs-0">
                <h3 className="text-center">Add Article</h3>
                <form onSubmit={saveArticle}>
                    { error && 
                        <Error message={error} clearError={() => setError(undefined)}/>
                    }
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" className="form-control" id="title" aria-describedby="titleHelp" placeholder="Enter title" minLength="2" maxLength="80" required/>
                        <small id="titleHelp" className="form-text text-muted">Max 80 Characters</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea className="form-control" id="content" name="content" rows="10" aria-describedby="contentHelp" placeholder="Write article" minLength="60" maxLength="4000" required></textarea>
                        <small id="contentHelp" className="form-text text-muted">Max 1000 Characters</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select className="form-control" name="category" id="category" required>
                            <option value="">Select Category</option>
                            {categories.map((category) => {
                                return <option value={category._id} key={category._id}>{category.name}</option>
                            })}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Publish</button>
                    <button type="reset" className="btn btn-secondary ml-2">Reset</button>
                </form>
            </div>
    );
}