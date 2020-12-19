import React, { useState } from 'react';
import Axios from 'axios';
import UserContext from '../context/UserContext';
import TimeAgo from 'react-timeago';
require('dotenv').config();

export default function Article(props) {

    const [editable, setEditable] = useState(false);
    const [content, setContent] = useState(props.article.content);
    const {userData} = React.useContext(UserContext);
    const [baseUrl, setBaseUrl] = useState("");

    function editArticle() {

        setEditable(true);
    }

    async function updateArticle(evt) {

        try {
            await Axios.post(
                '/api/updateArticle',
                {
                    'id': props.article._id,
                    'content': content
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': userData.token
                    }
                }
            );
            setEditable(false);
        } catch(err) {
            console.log(err.response.data.msg);
        }
    }

    async function deleteArticle() {
        try {
            await Axios.delete(
                '/api/deleteArticle',
                {
                    headers: {
                        id: props.article._id,
                        'x-auth-token': userData.token
                    }
                }
            );
            props.update.setUpdate(!props.update.update);
        } catch(err) {
            console.log(err.response.data.msg);
        }
    };

    React.useEffect(() => {
        if(true) {
            setBaseUrl("https://mern-articlomaric-app.herokuapp.com");
        }
    }, []);

    return (
        <div className="card mt-2 border-0">
            <div className="card-header bg-white">
                <p className="text-muted mb-0">{props.article.category.name}</p>
                <div className="float-left"><h1 className="font-italic">{props.article.title}</h1></div>
                { ( (userData.user) && ((userData.user.id == props.article.user._id) || (userData.user.role === "admin"))) &&
                    <div className="float-right">
                        { editable &&
                            <button type="button" className="btn btn-outline-warning mx-1" onClick={updateArticle}>Update</button>
                        }
                        { !editable &&
                            <button type="button" className="btn btn-outline-warning mx-1" onClick={editArticle}>Edit</button>
                        }
                        <button type="button" className="btn btn-outline-danger mx-1" onClick={deleteArticle}>Delete</button>
                    </div>
                }
            </div>
            <div className="card-body">
                { props.article.image &&
                    <img className="card-img-top mb-3" src={baseUrl + "/api/articleImage?articleId=" + props.article._id} alt="Article Image"/>
                }
                <blockquote className="blockquote mb-0">
                    { editable &&
                    <div className="input-group">
                        <textarea type="text" className="form-control" rows="20" minLength="2" maxLength="4000" value={content} onChange={evt => setContent(evt.target.value)}></textarea>
                    </div>
                    }
                    { !editable &&
                        <p style={{'whiteSpace':'pre-wrap'}} className="font-italic">{content}</p>
                    }
                    {/* <div>
                        <span className="float-left"><small className="text-muted">@{props.article.user.firstName + " " + props.article.user.lastName}</small></span>
                        <span className="float-right"><small>{dateTime.toLocaleTimeString("en-UK") + " " + dateTime.toLocaleDateString("en-UK")}</small></span>
                    </div> */}
                    <div>
                        <span className="card-text float-left"><small className="text-muted">{"@" + props.article.user.firstName + " " + props.article.user.lastName}</small></span>
                        <span className="card-text float-right"><small className="text-muted"><TimeAgo date={props.article.createdAt}/></small></span>
                    </div>
                </blockquote>
            </div>
        </div>
    );
}