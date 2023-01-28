import axios from 'axios';
import { useState } from 'react';
import './App.css';
import ListItem from './components/ListItem';
import Searchbar from './components/Searchbar';
import { apiEndpoint } from './constants';

function App() {

  const [searchValue, setSearchValue] = useState("");
  const [news, setNews] = useState([]);

  const searchValueChangeHandler = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value !== "") {
      getNews(e.target.value);
    } else {
      setNews([]);
    }
  };

  const getNews = (queryStr) => {
    axios
      .get(`${apiEndpoint}search?query=${queryStr}`)
      .then(({ data }) => {
        console.log(data.hits);
        const filteredData = data.hits.filter((article) => article.title!==null && article.title!=='');
        const fetchedNews = filteredData.map((article) => {
          return {
            title: article.title,
            author: article.author,
            points: article.points,
            objectID: article.objectID,
            createdAt: article.created_at_i,
            numComments: article.num_comments,
          };
        });
        setNews(fetchedNews);
      })
      .catch((error) => {
        console.log(error);
        setNews([]);
      });
  };

  const crossClickHandler = () => {
    setSearchValue("");
    setNews([]);
  };

  return (
    <div className="App pt-4 pr-10 pl-10">
      <Searchbar searchValue={searchValue} searchValueChangeHandler={searchValueChangeHandler} crossClickHandler={crossClickHandler} />
      <div className="mt-6">
        {news.map(article => <ListItem key={article.objectID} title={article.title} author={article.author} points={article.points} numComments={article.numComments} createdAt={article.createdAt} />)}
      </div>
    </div>
  );
}

export default App;
