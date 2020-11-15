import React, {useState, useEffect} from 'react';
import Article from './Article';
import Axios from 'axios';
import UserContext from '../context/UserContext';
import PrevArticle from './PrevArticle';

export default function MyArticles() {

    const [elements, setElements] = useState([]);
    const [update, setUpdate] = useState(true);
    const [categories, setCategories] = useState([]);

    const {userData} = React.useContext(UserContext);

    async function fetchMyArticles() {
        try {
            const myArticles = await Axios.post(
                '/api/myArticles',
                null,
                {
                    headers: {
                        'x-auth-token': userData.token
                    }
                });
            setElements(myArticles.data);
        } catch(err) {
            console.log(err);
        }
        
    }

    function getCategories() {
        fetch("/api/getCategories")
            .then(response => response.json())
            .then(data => {
                setCategories(data.sort((a, b) => (a.name > b.name) ? 1 : -1));
            });
    }

    useEffect(() => {
        getCategories();
        fetchMyArticles();
    }, []);

    return (
            <div className="col-md-6 col-xs-12 offset-md-3 offset-xs-0">
                <select className="form-control form-control-sm col-2">
                    <option value="">Filter by</option>
                    {categories.map((category) => {
                        return <option value={category._id} key={category._id}>{category.name}</option>
                    })}
                </select>
                {elements.map((element) => {
                    return <PrevArticle
                        key={element._id}
                        title={element.title}
                        firstName={element.user.firstName}
                        lastName={element.user.lastName}
                        articleId={element._id}
                        category={element.category.name}/>
                })}
            </div>
    );
}