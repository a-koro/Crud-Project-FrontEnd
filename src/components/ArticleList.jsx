import React, { useState, useEffect } from 'react';
import Article from './Article';

export default function ArticleList() {

    const [elements, setElements] = useState([]);
    const [update, setUpdate] = useState(true);
    const [categories, setCategories] = useState([]);

    function fetchFromGetArticles() {
        fetch("/api/getArticles")
            .then(response => response.json())
            .then((data) => {
                setElements(data);
            });
    }

    function getCategories() {
        fetch("/api/getCategories")
            .then(response => response.json())
            .then(data => {
                setCategories(data.sort((a, b) => (a.name > b.name) ? 1 : -1));
            });
    }

    function getFilteredArticles(evt) {

        if (!evt.target.value) {
            fetchFromGetArticles();
        }
        else {
            fetch('/api/getFilteredArticles?category=' + evt.target.value)
                .then(response => response.json())
                .then(data => {
                    setElements(data);
                });
        }
    }

    useEffect(() => {
        fetchFromGetArticles();
    }, [update])

    useEffect(() => {
        getCategories();
    }, []);

    return (
            <div className="col-md-6 col-xs-12 offset-md-3 offset-xs-0">
                <select className="form-control form-control-sm col-2" onChange={getFilteredArticles}>
                    <option value="">Filter by</option>
                    {categories.map((category) => {
                        return <option value={category._id} key={category._id}>{category.name}</option>
                    })}
                </select>
                {elements.map((element) => {
                    return <Article
                        key={element._id}
                        title={element.title}
                        content={element.content}
                        userId={element.user._id}
                        firstName={element.user.firstName}
                        lastName={element.user.lastName}
                        articleId={element._id}
                        category={element.category.name}
                        update={{ update: update, setUpdate: setUpdate }} />
                })}
            </div>
    );
}