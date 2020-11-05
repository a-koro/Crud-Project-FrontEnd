import React, { useState, useEffect } from 'react';
import Category from './Category';

export default function CategoryList() {

    const [update, setUpdate] = useState(true);
    const [categories, setCategories] = useState([]);

    function getCategories() {
        fetch("/api/getCategories")
            .then(response => response.json())
            .then(data => {
                setCategories(data.sort((a, b) => (a.name > b.name) ? 1 : -1));
            });
    }

    useEffect(() => {
        getCategories();
    },[update]);

    return (
        <div className="row">
            <div className="col-md-4 col-xs-12 offset-md-4 offset-xs-0">
                {categories.map((element) => {
                    return <Category
                        key={element._id}
                        name={element.name}
                        categoryId={element._id}
                        update={{ update: update, setUpdate: setUpdate }} />
                })}
            </div>
        </div>
    );
}