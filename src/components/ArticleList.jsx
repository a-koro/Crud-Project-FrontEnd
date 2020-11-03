import { PromiseProvider } from 'mongoose';
import React, { useState, useEffect } from 'react';
import Article from './Article';

export default function ArticleList() {

    const [elements, setElements] = useState([]);

    function fetchFromGetArticles() {
        fetch("/api/getArticles")
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setElements(data);
            });
    }

    useEffect(() => {
        fetchFromGetArticles();
    }, [])

    return (
        <div className="row">
            <div className="col-md-6 col-xs-12 offset-md-3 offset-xs-0">
                {elements.map((element) => {
                    return <Article title={element.title} content={element.content} author={element.authorFirstName + " " + element.authorLastName} articleId={element._id} category={element.category.name}/>
                })}
            </div>
        </div>
    );
}