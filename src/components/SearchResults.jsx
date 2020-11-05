import React from 'react';
import { ResultsContext } from './Navbar';
import Article from './Article';

export default function SearchResults() {

    const [update, setUpdate] = React.useState(true);

    return (
        <div className="row">
        <div className="col-md-6 col-xs-12 offset-md-3 offset-xs-0">
            <ResultsContext.Consumer>
                {(context) => (
                    context.map((element) => {
                        return <Article
                            key={element._id}
                            title={element.title}
                            content={element.content}
                            author={element.authorFirstName + " " + element.authorLastName}
                            articleId={element._id}
                            category={element.category.name}
                            update={{ update: update, setUpdate: setUpdate }} />
                    })
                )}
            </ResultsContext.Consumer>
        </div>
    </div>
    );
}