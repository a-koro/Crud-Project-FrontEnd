import React, { useState, useEffect } from 'react';
import ImagePrevArticle from './ImagePrevArticle';
import ImagePrevArticleSmall from './ImagePrevArticleSmall';
import PrevArticle from './PrevArticle';
import Axios from 'axios';


export default function ArticleList() {

    const [elements, setElements] = useState([]);
    const [update, setUpdate] = useState(true);
    const [categories, setCategories] = useState([]);
    const [randomTop, setRandomTop] = useState([]);
    const [trending, setTrending] = useState([]);
    const [loadingSpinner, setLoadingSpinner] = React.useState(true);

    async function fetchTrendingArticles() {
        try {
            const trendingArticlesResponse = await Axios.get('/api/getTrendingArticles');
            setTrending(trendingArticlesResponse.data);
        } catch(err) {
            console.log(err);
        }
    }

    async function fetchFromGetArticles() {
        await Axios.get('/api/getArticles')
        .then((response) => {
            setElements(response.data.slice(4,-1));
            setRandomTop(response.data.slice(0,4).sort(() => Math.random() - 0.5));
        });
        setLoadingSpinner(false);
    }

    async function getCategories() {
        await Axios.get('/api/getCategories')
            .then((response) => {
                setCategories(response.data.sort((a, b) => (a.name > b.name) ? 1 : -1));
            });
    }

    async function getFilteredArticles(evt) {
        
        if (!evt.target.value) {
            fetchFromGetArticles();
        }
        else {
            try {
                await Axios.get('/api/getFilteredArticles?category=' + evt.target.value)
                .then((response) => {
                    setElements(response.data);
                });
            } catch(err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        fetchFromGetArticles();
    }, [update])

    useEffect(() => {
        getCategories();
        fetchTrendingArticles();
    }, []);

    return (
        <>
            { loadingSpinner &&
                <div className="col-12 text-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
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
                <select className="form-control form-control-sm col-md-3" onChange={getFilteredArticles}>
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
                        }
                )}
            </div>
            <div className="col-md-4 offset-md-1 mt-5">
                <h5 className="text-right mb-4">Trending on Articl-O-matic</h5>
                {trending.map((trend) => {
                        return <><ImagePrevArticleSmall key={trend._id} article={trend}/><hr/></>
                })}
            </div>
        </>
    );
}