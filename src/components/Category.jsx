import React from 'react';
import UserContext from '../context/UserContext';
import Axios from 'axios';

export default function Category(props) {

    const {userData} = React.useContext(UserContext);

    async function deleteCategory() {

        try {
            await Axios.delete('/api/deleteCategory',
                {
                    headers: {
                        'x-auth-token': userData.token,
                        id: props.categoryId
                    }
                }
            ).then((response) => {
                if(response.data.safeToDelete) {
                    props.update.setUpdate(!props.update.update);
                } else {
                    alert('Articles attached to category\nDelete all the articles in this category before deleting');
                }
            });
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="card mt-2">
            <div className="card-header">
                <div className="float-left"><h5 className="mt-2">{props.name}</h5></div>
                { (userData.user && (userData.user.role === "admin")) &&
                    <div className="float-right">
                        <button type="button" className="btn btn-outline-danger mx-1" onClick={deleteCategory}>Delete</button>
                    </div>
                }
            </div>
        </div>
    );
}