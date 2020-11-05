import './App.css';
import Navbar from './components/Navbar';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleForm from './components/ArticleForm';
import CategoryForm from './components/CategoryForm';
import CategoryList from './components/CategoryList';
import { ResultsProvider } from './components/Navbar';
import SearchResults from './components/SearchResults';

function App() {

  return (
    <div className="container-fluid p-0">
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <ResultsProvider>
            <Route exact path="/" component={ArticleList}/>
            <Route path="/articles" component={ArticleList}/>
            <Route path="/categories" component={CategoryList}/>
            <Route path="/articleForm" component={ArticleForm}/>
            <Route path="/categoryForm" component={CategoryForm}/>
            <Route path="/searchResults" component={SearchResults}/>
            <Route path="/admin"/>
          </ResultsProvider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
