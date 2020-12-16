import React, { useState, useEffect } from 'react';
import ImagePrevArticle from './ImagePrevArticle';
import ImagePrevArticleSmall from './ImagePrevArticleSmall';
import PrevArticle from './PrevArticle';


export default function ArticleList() {

    const [elements, setElements] = useState([]);
    const [update, setUpdate] = useState(true);
    const [categories, setCategories] = useState([]);
    const [randomTop, setRandomTop] = useState([]);

    async function fetchFromGetArticles() {
        await fetch("/api/getArticles")
            .then(response => response.json())
            .then((data) => {
                setElements(data);
                setRandomTop(data.slice(0,5).sort(() => Math.random() - 0.5));
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
        <>
            <div className="col-md-6 col-xs-12">
                {(randomTop.length > 0) &&
                    <ImagePrevArticle key={randomTop[0]._id} article={randomTop[0]}/>
                }
            </div>
            <div className="col-md-6 col-xs-12">
                {(randomTop.length > 0) &&
                    randomTop.slice(1,4).map((element) => {
                        return <><ImagePrevArticleSmall key={element._id} article={element}/><hr/></>
                    }
                )}
            </div>
            <div className="col-md-7 col-xs-12 mt-3">
                <select className="form-control form-control-sm col-2" onChange={getFilteredArticles}>
                    <option value="">Filter by</option>
                    {categories.map((category) => {
                        return <option value={category._id} key={category._id}>{category.name}</option>
                    })}
                </select>
                {elements.map((element) => {
                    return <PrevArticle
                        key={element._id}
                        title={element.title}
                        firstName={element.user.firstName}
                        lastName={element.user.lastName}
                        articleId={element._id}
                        category={element.category.name} />
                })}
            </div>
            <div className="col-md-4 offset-md-1 mt-5">
                <h5 className="text-right mb-4">Trending on Articl-O-matic</h5>
                {(elements.length > 0) &&
                    elements.slice(0,5).map((element) => {
                        return <><ImagePrevArticleSmall key={element._id} article={element}/><hr/></>
                    }
                )}
            </div>
        </>
    );
}