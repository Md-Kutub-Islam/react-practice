import React, { useRef, useState } from "react";

function Comment({ comment, addreply }) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const inputref = useRef(null);
  const [saveBtn, setSaveBtn] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    setShowReplyBox(true);
    setTimeout(() => {
      inputref.current.focus();
    }, 300);
  };

  const hanleCancelButton = () => {
    setShowReplyBox(false);
    // setReplyText("");
  };

  const handlreplySave = (commentId) => {
    console.log("save::", commentId, replyText);
    addreply(commentId, replyText);
    setShowReplyBox(false);
    setReplyText("");
  };

  const handleKeyDown = (e, commentId) => {
    console.log(e.key);

    if (e.key === "Enter") {
      console.log("comment.id", commentId);

      handlreplySave(commentId);
    } else if (e.key === "Backspace") {
      hanleCancelButton();
    }
  };

  return (
    <div>
      <li key={comment.id}>
        {comment.display}
        {!showReplyBox && (
          <button onClick={handleReply} className="btn">
            Reply
          </button>
        )}

        {/* showReplybox = true */}
        {showReplyBox ? (
          <>
            <br />
            <input
              ref={inputref}
              type="text"
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, comment.id)}
            />

            <br />
            <button onClick={handlreplySave} className="btn">
              save
            </button>
            <button onClick={hanleCancelButton} className="btn">
              Cancel
            </button>
          </>
        ) : null}

        {comment.children.length ? (
          <ul>
            {comment.children.map((item) => (
              <Comment key={item.id} comment={item} addreply={addreply} />
            ))}
          </ul>
        ) : null}
      </li>
    </div>
  );
}

export default Comment;
