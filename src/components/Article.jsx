import React, { useState } from 'react';

export default function Article(props) {

    const [dateTime, setDateTime] = useState(new Date());
    const [editable, setEditable] = useState(false);
    const [content, setContent] = useState(props.content);

    function convertDateTime() {
        let timeStamp = props.articleId.toString().substring(0, 8);
        setDateTime(new Date(parseInt(timeStamp, 16) * 1000));
    }

    function editArticle() {

        // fetch('/api/editArticle', {
        //     method: "POST",
        //     headers: {
        //         id: props.articleId
        //     }
        // }).then(response => response.json())
        // .then(data => {
        //     console.log(data);
        // });

        setEditable(true);
    }

    function updateArticle(evt) {

        fetch('/api/updateArticle', {
            method: "POST",
            headers: {
                id: props.articleId,
                content: content
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
        setEditable(false);
    }

    function deletePost() {

        fetch('/api/deleteArticle', {
            method: "DELETE",
            headers: {
                id: props.articleId
            }
        })
        .then(response => response.json())
        .then(data => {
            props.update.setUpdate(!props.update.update);
        });
    };

    React.useEffect(() => {
        convertDateTime();
    }, []);

    return (
        <div className="card mt-2">
            <div className="card-header">
                <div className="float-left"><h5 className="mt-2">{props.title}</h5></div>
                <div className="float-right">
                    <span className="mr-2">Category: {props.category}</span>
                    { editable &&
                        <button type="button" className="btn btn-outline-warning mx-1" onClick={updateArticle}>Update</button>
                    }
                    { !editable &&
                        <button type="button" className="btn btn-outline-warning mx-1" onClick={editArticle}>Edit</button>
                    }
                    <button type="button" className="btn btn-outline-danger mx-1" onClick={deletePost}>Delete</button>
                </div>
            </div>
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                    { editable &&
                    <div className="input-group">
                        <textarea type="text" className="form-control" value={content} onChange={evt => setContent(evt.target.value)}></textarea>
                    </div>
                    }
                    { !editable &&
                        <p>{content}</p>
                    }
                    <footer className="blockquote-footer">{props.author + " " + dateTime.toLocaleTimeString("en-UK") + " " + dateTime.toLocaleDateString("en-UK")}</footer>
                </blockquote>
            </div>
        </div>
    );
}