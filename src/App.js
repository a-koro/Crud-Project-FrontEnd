import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleForm from './components/ArticleForm';
import CategoryForm from './components/CategoryForm';
import CategoryList from './components/CategoryList';
import SearchResults from './components/SearchResults';
import UserContext from './context/UserContext';
import SearchContext from './context/SearchContext';
import Axios from 'axios';
import Register from './components/Register';
import Login from './components/Login';
import MyArticles from './components/MyArticles';
import Footer from './components/Footer';
import './css/footer.css';
import FilteredArticleList from './components/FilteredArticleList';

function App() {

  const [userData, setUserData] = React.useState({
    token: undefined,
    user: undefined
  });
  const [searchData, setSearchData] = React.useState([]);

  React.useEffect(() => {
    const checkUserLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null || token === "") {
        localStorage.setItem("auth-token", "");
        token = "";
      } else {
        const tokenValid = await Axios.post('/api/tokenIsValid',
          null,
          {
            headers: {
              "x-auth-token": token
            }
          });
        if (tokenValid) {
          const loggedInUser = await Axios.get(
            "/api/getLoggedInUser",
            {
              headers: {
                "x-auth-token": token
              }
            });
          setUserData({
            token: token,
            user: loggedInUser.data
          });
        }
      }
    }
    checkUserLoggedIn();
  }, []);

  return (
    <>
    <div className="container p-0 mainBox">
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <SearchContext.Provider value={{ searchData, setSearchData }}>
            <Navbar />
            <div className="row m-0">
            <Switch>
                <Route exact path="/" component={ArticleList} />
                <Route path="/articles" component={ArticleList} />
                <Route path="/categories" component={CategoryList} />
                <Route path="/myArticles" component={MyArticles} />
                <Route path="/articleForm" component={ArticleForm} />
                <Route path="/categoryForm" component={CategoryForm} />
                <Route path="/searchResults" component={SearchResults} />
                <Route path="/filteredArticleList"render={(props) => <FilteredArticleList {...props} key={Math.random()}/>}/>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/admin" />
            </Switch>
            </div>
          </SearchContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
    <Footer className="footerBox"/>
    </>
  );
}

export default App;
