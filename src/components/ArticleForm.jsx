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

    async function getCategories() {
        await Axios.get('/api/getCategories')
            .then((response) => {
                setCategories(response.data.sort((a, b) => (a.name > b.name) ? 1 : -1));
            });
    }

    function checkFileSize(evt) {
        if(evt.target.files[0].size > 1000000) {
            setError("Image larger than 1MB");
            evt.target.value = "";
        } else if(evt.target.files[0].name.length > 200) {
            setError("Image name longer than 200 characters");
            evt.target.value = "";
        }
    }

    async function saveArticle(evt) {
        evt.preventDefault();

        try {
            if (evt.target.image.value) {
                var formData = new FormData();
                formData.append("title", evt.target.title.value);
                formData.append("content", evt.target.content.value);
                formData.append("category", evt.target.category.value);
                formData.append("image", evt.target.image.files[0]);
                const articleResponse = await Axios.post(
                    "/api/addArticleWithImage",
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'x-auth-token': userData.token
                        }
                    }
                );
            } else {
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
            }
            history.push('/articles');
        } catch (err) {
            setError(err.response.data.error);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="col-md-6 col-xs-12 offset-md-3 offset-xs-0">
            <h3 className="text-center">Write a new Article</h3>
            <form onSubmit={saveArticle}>
                {error &&
                    <Error message={error} clearError={() => setError(undefined)} />
                }
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" className="form-control" id="title" aria-describedby="titleHelp" placeholder="Enter title" minLength="2" maxLength="80" required />
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
                <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">Image</label>
                    <input type="file" className="form-control-file" accept=".jpg,.png" name="image" aria-describedby="imageHelp" onChange={checkFileSize} required/>
                    <small id="imageHelp" className="form-text text-muted">Images accepted up to 1MB</small>
                </div>
                <button type="submit" className="btn btn-primary">Publish</button>
                <button type="reset" className="btn btn-secondary ml-2">Reset</button>
            </form>
        </div>
    );
}