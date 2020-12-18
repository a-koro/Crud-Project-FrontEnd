import React from 'react';
import SearchContext from '../context/SearchContext';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import "../css/article.css";
import TimeAgo from 'react-timeago';

export default function ImagePrevArticle(props) {
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
        <div className="card border-0 prevArticle" onClick={selectArticle}>
            <img className="card-img-top imageScaling" src={"https://mern-articlomaric-app.herokuapp.com/api/articleImage?articleId=" + props.article._id} alt="Article Image" />
            <div className="card-body pl-2 pt-0">
                <small className="text-muted">{props.article.category.name}</small>
                <h5 className="card-title">{props.article.title}</h5>
                <p className="card-text">{props.article.content.split(".")[0] + "."}</p>
                <div>
                    <span className="card-text float-left"><small className="text-muted">{"@" + props.article.user.firstName + " " + props.article.user.lastName}</small></span>
                    <span className="card-text float-right"><small className="text-muted"><TimeAgo date={props.article.createdAt} /></small></span>
                </div>
            </div>
        </div>
    );
}