import React, {useState} from 'react';
import Axios from 'axios';
import UserContext from '../context/UserContext';
import SearchContext from '../context/SearchContext';
import {useHistory} from 'react-router-dom';
import "../css/article.css";

export default function PrevArticle(props) {
    const [dateTime, setDateTime] = useState(new Date());
    const { userData } = React.useContext(UserContext);
    const { setSearchData } = React.useContext(SearchContext);
    const history = useHistory();

    function convertDateTime() {
        let timeStamp = props.articleId.toString().substring(0, 8);
        setDateTime(new Date(parseInt(timeStamp, 16) * 1000));
    }

    async function selectArticle(evt) {
        const selectedArticle = await Axios.get(
            `/api/getSpecificArticle?id=${props.articleId}`,
            {
                headers: {
                    'x-auth-token': userData.token
                }
            }
        );
        setSearchData(selectedArticle.data);
        history.push('/searchResults');
    }

    React.useEffect(() => {
        convertDateTime();
    }, []);

    return (
        <div className="card p-1 mt-2 prevArticle" onClick={selectArticle}>
            <div className="mb-0 card-body">
                <h3 className="mb-4">{props.title}</h3>
                <div>
                    <span className="float-left"># {props.firstName + " " + props.lastName}</span>
                    <span className="float-right">{dateTime.toLocaleTimeString("en-UK") + " " + dateTime.toLocaleDateString("en-UK")}</span>
                </div>
            </div>
        </div>
    );
}