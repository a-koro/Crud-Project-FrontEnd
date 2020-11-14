import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleForm from './components/ArticleForm';
import CategoryForm from './components/CategoryForm';
import CategoryList from './components/CategoryList';
import { ResultsProvider } from './components/Navbar';
import SearchResults from './components/SearchResults';
import UserContext from './context/UserContext';
import Axios from 'axios';
import Register from './components/Register';
import Login from './components/Login';
import MyArticles from './components/MyArticles';

function App() {

  const [userData, setUserData] = React.useState({
    token: undefined,
    user: undefined
  });

  React.useEffect(() => {
    const checkUserLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if(token === null) {
        localStorage.setItem("auth-token","");
        token = "";
      }
      const tokenValid = await Axios.post('/api/tokenIsValid',
      null,
      {
        headers: {
          "x-auth-token": token
        }
      });
      if(tokenValid) {
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
    checkUserLoggedIn();
  },[]);

  return (
    <div className="container-fluid p-0">
      <BrowserRouter>
        <UserContext.Provider value={ {userData, setUserData} }>
          <Navbar/>
          <Switch>
            <ResultsProvider>
              <Route exact path="/" component={ArticleList}/>
              <Route path="/articles" component={ArticleList}/>
              <Route path="/categories" component={CategoryList}/>
              <Route path="/myArticles" component={MyArticles}/>
              <Route path="/articleForm" component={ArticleForm}/>
              <Route path="/categoryForm" component={CategoryForm}/>
              <Route path="/searchResults" component={SearchResults}/>
              <Route path="/register" component={Register}/>
              <Route path="/login" component={Login}/>
              <Route path="/admin"/>
            </ResultsProvider>
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
