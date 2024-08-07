import { useState } from "react";
import "./App.css";
import Comment from "./Comment";

function App() {
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      display: "hello",
      children: [
        {
          id: 10,
          display: "Very nice",
          children: [
            {
              id: 11,
              display: "Awesome :)",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      display: "Amazing",
      children: [],
    },
  ]);

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  const newComment = (text) => {
    return {
      id: new Date().getTime(),
      display: text,
      children: [],
    };
  };
  const handleNewComment = (e) => {
    if (input) {
      setComments([...comments, newComment(input)]);
      setInput("");
    }
  };

  const addReply = (commentId, text) => {
    console.log("app:", commentId, text);
    const copyComments = [...comments];
    addComments(copyComments, commentId, text);
    setComments(copyComments);
  };

  // const addComments = (comments, parentId, text) => {
  //   for (let i = 0; i < comments.length; i++) {
  //     let comment = comments[i];
  //     if (comment.id === parentId) {
  //       console.log("found object", parentId, text);
  //       comment.children.unShift(newComment(text));
  //     }
  //   }

  //   for (let i = 0; i < comments.length; i++) {
  //     let comment = comments[i];
  //     console.log("----children-parentId--------", parentId);
  //     addComments(comment.children, parentId, text);
  //   }
  // };

  const addComments = (comments, parentId, text) => {
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      if (comment.id === parentId) {
        console.log("***********First Level*******", parentId, text);
        comment.children.unshift(newComment(text));
      }
      console.log("comment:", comment);
    }

    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      console.log("----children-parentId--------", parentId);
      addComments(comment.children, parentId, text);
    }
  };
  return (
    <div className="App">
      <h1>Nested Comment</h1>
      {/* input */}
      <div>
        <input
          type="text"
          placeholder="Enter comment"
          value={input}
          onChange={handleOnChange}
          className="input-box"
        />
      </div>

      {/* button */}
      <div>
        <button onClick={handleNewComment} className="comment-button">
          Comment
        </button>
      </div>

      {/* comment section */}
      <div className="comments">
        {comments &&
          comments.map((item) => (
            <Comment key={item.id} comment={item} addreply={addReply} />
          ))}
      </div>
    </div>
  );
}

export default App;
