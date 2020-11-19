import React, { useState } from 'react';
import Axios from 'axios';
import UserContext from '../context/UserContext';

export default function Article(props) {

    const [dateTime, setDateTime] = useState(new Date());
    const [editable, setEditable] = useState(false);
    const [content, setContent] = useState(props.content);
    const {userData} = React.useContext(UserContext);

    function convertDateTime() {
        let timeStamp = props.articleId.toString().substring(0, 8);
        setDateTime(new Date(parseInt(timeStamp, 16) * 1000));
    }

    function editArticle() {

        setEditable(true);
    }

    async function updateArticle(evt) {

        try {
            const updatedArticle = await Axios.post(
                '/api/updateArticle',
                {
                    'id': props.articleId,
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
                        id: props.articleId,
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
        convertDateTime();
    }, []);

    return (
        <div className="card mt-2">
            <div className="card-header">
                <div className="float-left"><h5 className="mt-2">{props.title}</h5></div>
                { ( (userData.user) && ((userData.user.id == props.userId) || (userData.user.role === "admin"))) &&
                    <div className="float-right">
                        <span className="mr-2">Category: {props.category}</span>
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
                <blockquote className="blockquote mb-0">
                    { editable &&
                    <div className="input-group">
                        <textarea type="text" className="form-control" rows="20" minLength="2" maxLength="4000" value={content} onChange={evt => setContent(evt.target.value)}></textarea>
                    </div>
                    }
                    { !editable &&
                        <p style={{'whiteSpace':'pre-wrap'}}>{content}</p>
                    }
                    <div>
                        <span className="float-left"><small># {props.firstName + " " + props.lastName}</small></span>
                        <span className="float-right"><small>{dateTime.toLocaleTimeString("en-UK") + " " + dateTime.toLocaleDateString("en-UK")}</small></span>
                    </div>
                </blockquote>
            </div>
        </div>
    );
}