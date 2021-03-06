import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import UserContext from '../context/UserContext';
import PrevArticle from './PrevArticle';

export default function MyArticles() {

    const [elements, setElements] = useState([]);
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

    async function getCategories() {
        await Axios.get('/api/getCategories')
            .then((response) => {
                setCategories(response.data.sort((a, b) => (a.name > b.name) ? 1 : -1));
            });
    }

    async function getFilteredArticles(evt) {
        if (!evt.target.value) {
            fetchMyArticles();
        }
        else {
            await Axios.post('/api/getUsersFilteredArticles?category=' + evt.target.value,
                null,
                {
                    headers: {
                    'x-auth-token': userData.token
                    }
                }).then((response) => {
                    setElements(response.data);
                }
            );
        }
    }

    useEffect(() => {
        getCategories();
        fetchMyArticles();
    }, []);

    return (
            <div className="col-md-6 col-xs-12 offset-md-3 offset-xs-0">
                <select className="form-control form-control-sm col-2" onChange={getFilteredArticles}>
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