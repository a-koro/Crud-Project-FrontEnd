import './App.css';
import Navbar from './components/Navbar';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleForm from './components/ArticleForm';
import CategoryForm from './components/CategoryForm';

function App() {

  return (
    <div className="container-fluid p-0">
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={ArticleList}/>
          <Route path="/articles" component={ArticleList}/>
          <Route path="/articleForm" component={ArticleForm}/>
          <Route path="/categoryForm" component={CategoryForm}/>
          <Route path="/admin"/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
