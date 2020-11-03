import React, { useState } from 'react';

export default function Article(props) {

    const [dateTime, setDateTime] = useState(new Date());
    const [editable, setEditable] = useState(false);

    function convertDateTime() {
        let timeStamp = props.articleId.toString().substring(0, 8);
        setDateTime(new Date(parseInt(timeStamp, 16) * 1000));
    }

    function editArticle() {

        fetch('/api/editArticle', {
            method: "POST",
            headers: {
                id: props.articleId
            }
        }).then(response => response.json())
        .then(data => {
            console.log(data);
        });

        setEditable(true);
    }

    React.useEffect(() => {
        convertDateTime();
    }, []);

    return (
        <div className="card mt-2">
            <div className="card-header">
                <div className="float-left"><h5 className="mt-2">{props.title}</h5></div>
                <div className="float-right">
                    <span className="mr-2">Category: {props.category}</span>
                    <button type="button" className="btn btn-outline-warning mx-1" onClick={editArticle}>Edit</button>
                    <button type="button" className="btn btn-outline-danger mx-1">Delete</button>
                </div>
            </div>
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                    { editable &&
                    <div className="input-group">
                        <textarea type="text" class="form-control" placeholder={props.content}></textarea>
                    </div>
                    }
                    { !editable &&
                        <p>{props.content}</p>
                    }
                    <footer className="blockquote-footer">{props.author + " " + dateTime.toLocaleTimeString("en-UK") + " " + dateTime.toLocaleDateString("en-UK")}</footer>
                </blockquote>
            </div>
        </div>
    );
}