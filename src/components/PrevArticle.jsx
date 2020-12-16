import React, {useState} from 'react';
import Axios from 'axios';
import UserContext from '../context/UserContext';
import SearchContext from '../context/SearchContext';
import {useHistory} from 'react-router-dom';
import "../css/article.css";
import TimeAgo from 'react-timeago';

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
        <div className="card p-1 mt-2 prevArticle border-top-0 border-right-0" onClick={selectArticle}>
            <div className="mb-0 card-body">
                <h4 className="mb-4">{props.title}</h4>
                <div>
                    <span className="float-left"><small className="text-muted">@{props.firstName + " " + props.lastName}</small></span>
                    <span className="float-right"><small className="text-muted"><TimeAgo date={dateTime}/></small></span>
                    {/* <span className="float-right">{dateTime.toLocaleTimeString("en-UK") + " " + dateTime.toLocaleDateString("en-UK")}</span> */}
                </div>
            </div>
        </div>
    );
}