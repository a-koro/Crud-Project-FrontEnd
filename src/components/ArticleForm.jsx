import React, { useState, useEffect } from 'react';

export default function ArticleForm() {

    const [categories, setCategories] = useState([]);

    function getCategories() {
        fetch("/api/getCategories")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCategories(data);
            });
    }

    function saveArticle(evt) {
        evt.preventDefault();
        fetch('/api/addArticle', {
            method: "POST",
            headers: {
                "title": evt.target.title.value,
                "content": evt.target.content.value,
                "category": evt.target.category.value,
                "firstName": evt.target.firstName.value,
                "lastName": evt.target.lastName.value
            }
        }).then(response => response.json())
        .then(data => {
            console.log(data);
        });
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="row">
            <div className="col-md-4 col-xs-12 offset-md-4 offset-xs-0">
                <form onSubmit={saveArticle}>
                    <div className="form-group">
                        <label for="title">Title</label>
                        <input type="text" name="title" className="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter title" maxLength="60" required/>
                        <small id="emailHelp" className="form-text text-muted">Max 60 Characters</small>
                    </div>
                    <div className="form-group">
                        <label for="content">Content</label>
                        <textarea className="form-control" id="content" name="content" rows="10" placeholder="Write article" required></textarea>
                    </div>
                    <div className="form-group">
                        <label for="category">Category</label>
                        <select className="form-control" name="category" id="category" required>
                            <option value="">Select Category</option>
                            {categories.map((category) => {
                                return <option value={category._id}>{category.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">Author</label>
                        <input className="form-control" type="text" placeholder="First name" name="firstName" id="firstName" required/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Last name" name="lastName" id="lastName" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="reset" className="btn btn-secondary ml-2">Reset</button>
                </form>
            </div>
        </div>
    );
}