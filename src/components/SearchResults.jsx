import React from 'react';
import Article from './Article';
import { useHistory } from "react-router-dom";
import SearchContext from '../context/SearchContext';

export default function SearchResults() {

    const { searchData } = React.useContext(SearchContext);

    const [update, setUpdate] = React.useState(true);
    const history = useHistory();

    React.useEffect(() => {
        if (!update) {
            history.push('/articles');
        }
    }, [update]);

    return (
        <div className="col-md-8 col-xs-12 offset-md-2 offset-xs-0">
            {searchData.map((element) => {
                return <Article
                    key={element._id}
                    update={{ update: update, setUpdate: setUpdate }} 
                    article={element}/>
            })}
        </div>
    );
}