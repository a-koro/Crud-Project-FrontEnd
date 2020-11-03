import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Article from './components/Article';
import Author from './components/Author';
import ArticleList from './components/ArticleList';
import ArticleForm from './components/ArticleForm';

function App() {

  function fetchFromGetArticles() {
    fetch("/api/getArticles")
      .then(response => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div className="container-fluid p-0">
      <BrowserRouter>
        <Navbar/>
        <button onClick={fetchFromGetArticles}>Get Articles</button>
        <Switch>
          <Route exact path="/" component={ArticleList}/>
          <Route path="/articles" component={ArticleList}/>
          <Route path="/articleForm" component={ArticleForm}/>
          <Route path="/admin"/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
