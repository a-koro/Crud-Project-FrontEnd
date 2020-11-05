import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import "../css/search.css";

let result = [];

export const ResultsContext = React.createContext({});
export const ResultsProvider = (props) => {
    return (
        <ResultsContext.Provider value={result}>
            {props.children}
        </ResultsContext.Provider>
    );
};

export default function Navbar() {

    const [suggestions, setSuggestions] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState("");
    const history = useHistory();

    function searchArticlesByTitle(evt) {
        setSearchValue(evt.target.value);

        if(evt.target.value.length > 1) {
            fetch('/api/searchArticlesByTitle', {
                method: "GET",
                headers: {
                    title: evt.target.value
                }
            }).then(response => response.json())
            .then(data => {
                console.log(data);
                setSuggestions(data);
            });
        } else {
            setSuggestions([]);
        }
    }

    function getSpecificArticle(evt) {
        setSearchValue("");
        
        fetch('/api/getSpecificArticle', {
            method: "GET",
            headers: {
                id: evt.target.id
            }
        }).then(response => response.json())
        .then(data => {
            result = data;
            history.push('/searchResults');
        });
        setSuggestions([]);
    }

    function formSubmit(evt) {
        evt.preventDefault();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <Link className="navbar-brand" to='/'>Articl-o-matic</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/articles" className="nav-link">Articles</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/categories" className="nav-link">Categories</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Create
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link to="/categoryForm" className="dropdown-item">Category</Link>
                            <Link to="/articleForm" className="dropdown-item">Article</Link>
                        </div>
                    </li>
                </ul>
                <div className="searchDiv">
                <form className="form-inline my-2 my-lg-0" onSubmit={formSubmit}>
                    <input className="form-control mr-sm-2" name="title" type="search" placeholder="Search Articles" aria-label="Search" value={searchValue} onChange={searchArticlesByTitle}/>
                    <div id="suggestions">
                        {suggestions.map((suggestion) => (
                            <p class="suggestion" id={suggestion._id} key={suggestion._id} onClick={getSpecificArticle}>{suggestion.title}</p>
                        ))}
                    </div>
                </form>
                </div>
            </div>
        </nav>
    );
}