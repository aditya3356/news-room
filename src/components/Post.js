import axios from "axios";
import { useEffect, useState } from "react";
import { apiEndpoint } from "../constants";
import { parseComments } from "../utils";
import back from "../images/chevron-down.png";
import spinner from "../images/spinner.gif";

let controller;

const Post = ({ objectID, title, points, backClickHandler }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = (objectID) => {
      controller = new AbortController();
      axios
        .get(`${apiEndpoint}items/${objectID}`, { signal: controller.signal })
        .then(({ data }) => {
          console.log(data);
          setComments(parseComments(data.children));
          setLoading(false);
        })
        .catch((error) => {
          if (error.name !== "CanceledError") {
            console.log(error);
          }
        });
    };

    getPost(objectID);
  }, [objectID]);

  const backButtonClicked = () => {
    if (controller) {
      controller.abort();
    }

    backClickHandler();
  };

  const renderComments = (comments) => {
    return comments.map((comment) => {
      return (
        <div className="flex flex-col items-start mt-3">
          <div className="text-xs text-[#828282] font-semibold">
            {comment.author} on {comment.createdAt.toDateString()}
          </div>
          <div
            className="text-sm text-left"
            dangerouslySetInnerHTML={{ __html: comment.text }}
          />
          <div className="pl-6 mt-3">{renderComments(comment.replies)}</div>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center">
        <img
          src={back}
          className="w-6 h-6 cursor-pointer rotate-90 mr-6"
          onClick={backButtonClicked}
        />
        <div>
          <div className="text-lg font-bold">{title}</div>
          <div className="text-sm text-left">{points} points</div>
        </div>
      </div>
      {loading ? (
        <img src={spinner} alt="spinner" className="block m-auto" />
      ) : 
        ((comments.length>0)?(<div className="mt-6 bg-slate-100 p-2 rounded-md w-full">
          {renderComments(comments)}
        </div>): null)
      }
    </div>
  );
};

export default Post;
