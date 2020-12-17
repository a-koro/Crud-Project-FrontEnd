import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import "../css/search.css";
import UserContext from '../context/UserContext';
import SearchContext from '../context/SearchContext';
import logo from '../articlomatic.png';

export default function Navbar() {

    const { userData, setUserData } = React.useContext(UserContext);
    const { setSearchData } = React.useContext(SearchContext);
    const [categories, setCategories] = React.useState([]);


    const [suggestions, setSuggestions] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState("");
    const history = useHistory();

    function searchArticlesByTitle(evt) {
        setSearchValue(evt.target.value);

        if (evt.target.value.length > 1) {
            fetch('/api/searchArticlesByTitle?title=' + evt.target.value)
                .then(response => response.json())
                .then(data => {
                    setSuggestions(data);
                });
        } else {
            setSuggestions([]);
        }
    }

    function getSpecificArticle(evt) {
        setSearchValue("");

        fetch('/api/getSpecificArticle?id=' + evt.target.id)
            .then(response => response.json())
            .then(data => {
                setSearchData(data);
                history.push('/searchResults');
            });
        setSuggestions([]);
    }

    function formSubmit(evt) {
        evt.preventDefault();
    }

    function logout() {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
    }

    function getCategories() {
        fetch("/api/getCategories")
            .then(response => response.json())
            .then(data => {
                setCategories(data.sort((a, b) => (a.name > b.name) ? 1 : -1));
            });
    }

    React.useEffect(() => {
        getCategories();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light mb-4">
            <Link className="navbar-brand" to='/'><img src={logo} height='35' /></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/articles" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Read
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {categories.map((element) => {
                                return <a className="dropdown-item" href={element._id} key={element._id}>{element.name}</a>
                            })}
                        </div>
                    </li>
                    {(userData.user && (userData.user.role === "admin")) &&
                        <li className="nav-item">
                        <Link to="/categories" className="nav-link">Categories</Link>
                    </li>
                    }
                    {(userData.user && (userData.user.role === "user")) &&
                        <>
                            <li className="nav-item">
                                <Link to="/myArticles" className="nav-link">My Articles</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/articleForm" className="nav-link">Write</Link>
                            </li>
                        </>
                    }
                    {(userData.user && (userData.user.role === "admin")) &&
                        <li className="nav-item">
                            <Link to="/categoryForm" className="nav-link">Create Category</Link>
                        </li>
                    }
                </ul>
                <div className="searchDiv">
                    <form className="form-inline my-2 my-lg-0" onSubmit={formSubmit}>
                        <input className="form-control mr-sm-2" name="title" type="search" placeholder="Search Articles" aria-label="Search" value={searchValue} onChange={searchArticlesByTitle} />
                        <div id="suggestions">
                            {suggestions.map((suggestion) => (
                                <p className="suggestion" id={suggestion._id} key={suggestion._id} onClick={getSpecificArticle}>{suggestion.title}</p>
                            ))}
                        </div>
                    </form>
                </div>
                <ul className="navbar-nav mr-0">
                    {
                        userData.user ?
                            <li className="nav-item">
                                <Link to="/" onClick={logout} className="nav-link">Logout</Link>
                            </li> :
                            (<>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                            </>)
                    }
                </ul>
            </div>
        </nav>
    );
}