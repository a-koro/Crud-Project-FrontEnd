import React from 'react';

export default function Category(props) {

    function deleteCategory() {

        fetch('/api/deleteCategory', {
            method: "DELETE",
            headers: {
                id: props.categoryId
            }
        }).then(response => response.json())
        .then(data => {
            if(data.safeToDelete) {
                props.update.setUpdate(!props.update.update);
            } else {
                alert('Articles attached to category\nDelete all the articles in this category before deleting');
            }
        });
    }

    return (
        <div className="card mt-2">
            <div className="card-header">
                <div className="float-left"><h5 className="mt-2">{props.name}</h5></div>
                <div className="float-right">
                    <button type="button" className="btn btn-outline-danger mx-1" onClick={deleteCategory}>Delete</button>
                </div>
            </div>
        </div>
    );
}