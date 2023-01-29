import axios from "axios";
import { useState } from "react";
import "./App.css";
import ListItem from "./components/ListItem";
import Post from "./components/Post";
import Searchbar from "./components/Searchbar";
import { apiEndpoint } from "./constants";
import spinner from "./images/spinner.gif";

let controller;

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [news, setNews] = useState([]);
  const [selectedArticleIdx, setSelectedArticleIdx] = useState(-1);
  const [loading, setLoading] = useState(false);

  const searchValueChangeHandler = (e) => {
    setSearchValue(e.target.value);
    if (controller) {
      controller.abort();
    }
    if (e.target.value !== "") {
      getNews(e.target.value);
    } else {
      setNews([]);
    }
  };

  const getNews = (queryStr) => {
    controller = new AbortController();
    setLoading(true);
    axios
      .get(`${apiEndpoint}search?query=${queryStr}`, {
        signal: controller.signal,
      })
      .then(({ data }) => {
        console.log(data.hits);
        const filteredData = data.hits.filter(
          (article) => article.title !== null && article.title !== ""
        );
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
        setLoading(false);
      })
      .catch((error) => {
        if (error.name !== "CanceledError") {
          setNews([]);
        }
      });
  };

  const crossClickHandler = () => {
    setSearchValue("");
    setNews([]);
    setLoading(false);
    if (controller) {
      controller.abort();
    }
  };

  const articleClickHandler = (idx) => {
    setSelectedArticleIdx(idx);
  };

  const backClickHandler = () => {
    setSelectedArticleIdx(-1);
  };

  return (
    <div className="App pt-4 pr-10 pl-10">
      {selectedArticleIdx === -1 ? (
        <div>
          <Searchbar
            searchValue={searchValue}
            searchValueChangeHandler={searchValueChangeHandler}
            crossClickHandler={crossClickHandler}
          />
          <div className="mt-6">
            {      loading ? (
        <img src={spinner} alt="spinner" className="block m-auto" />
      ) :news.map((article, idx) => (
              <ListItem
                key={article.objectID}
                title={article.title}
                author={article.author}
                points={article.points}
                numComments={article.numComments}
                createdAt={article.createdAt}
                onClickHandler={() => articleClickHandler(idx)}
              />
            ))}
          </div>
        </div>
      ) : (
        <Post
          objectID={news[selectedArticleIdx].objectID}
          title={news[selectedArticleIdx].title}
          points={news[selectedArticleIdx].points}
          backClickHandler={backClickHandler}
        />
      )}
    </div>
  );
}

export default App;
