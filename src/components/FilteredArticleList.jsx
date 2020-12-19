import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import ImagePrevArticle from './ImagePrevArticle';
import ImagePrevArticleSmall from './ImagePrevArticleSmall';

export default function FilteredArticleList(props) {

    const [elements, setElements] = useState([]);

    async function getFilteredArticles() {
        
        try {
            await Axios.get('/api/getFilteredArticles?category=' + props.location.state.category)
            .then((response) => {
                setElements(response.data);
            });
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getFilteredArticles();
    }, []);

    return (
        <>
            <div className="col-md-6">
                <br/>
                <br/>
                { (elements.length > 0) &&
                    elements.slice(3).map((element) => {
                    return <><ImagePrevArticleSmall key={element._id} article={element}/><hr/></>
                })}
            </div>
            <div className="col-md-6">
                <h3>Latest articles</h3>
                <hr/>
                { (elements.length > 0) &&
                    elements.slice(0,3).map((element) => {
                    return <><ImagePrevArticle key={element._id} article={element}/><hr/></>
                })}
            </div>
        </>
    );
}