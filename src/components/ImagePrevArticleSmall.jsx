import React from 'react';
import SearchContext from '../context/SearchContext';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
import "../css/article.css";
import TimeAgo from 'react-timeago';

export default function ImagePrevArticleSmall(props) {
    const { setSearchData } = React.useContext(SearchContext);
    const history = useHistory();

    async function selectArticle(evt) {
        const selectedArticle = await Axios.get(
            `/api/getSpecificArticle?id=${props.article._id}`
        );
        setSearchData(selectedArticle.data);
        history.push('/searchResults');
    }

    return (
        <div className="card border-0 mb-4 prevArticle" onClick={selectArticle}>
            <div className="row no-gutters d-flex flex-row justify-content-between">
                <div className="col-7 mr-2 d-flex flex-column justify-content-between">
                    <small className="text-muted">{props.article.category.name}</small>
                    <h5 className="card-title">{props.article.title}</h5>
                    <div>
                        <span className="card-text float-left"><small className="text-muted">{"@" + props.article.user.firstName + " " + props.article.user.lastName}</small></span>
                        <span className="card-text float-right"><small className="text-muted"><TimeAgo date={props.article.createdAt}/></small></span>
                    </div>
                    
                </div>
                <div className="col-4">
                    <img src={"/api/articleImage?articleId=" + props.article._id} className="img-fluid imageScalingSmall" alt="Article Image" />
                </div>
            </div>

        </div>
    );
}