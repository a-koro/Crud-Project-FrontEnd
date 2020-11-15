import React from 'react';
import { ResultsContext } from './Navbar';
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
        <div className="col-md-6 col-xs-12 offset-md-3 offset-xs-0">
            {searchData.map((element) => {
                return <Article
                    key={element._id}
                    title={element.title}
                    content={element.content}
                    userId={element.user._id}
                    firstName={element.user.firstName}
                    lastName={element.user.lastName}
                    articleId={element._id}
                    category={element.category.name}
                    update={{ update: update, setUpdate: setUpdate }} />
            })}
        </div>
    );
}