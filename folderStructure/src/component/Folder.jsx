import { useState } from "react";

function Folder({ handleInsertNode, explorer }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };
  if (explorer.isFolder) {
    return (
      <div
        style={{
          marginTop: 5,
          cursor: "pointer",
        }}
      >
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>📁{explorer.name}</span>

          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
          </div>
        </div>
        <div
          style={{
            marginLeft: 5,
            cursor: "pointer",
            display: expand ? "block" : "none",
          }}
        >
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "🗄️"}</span>
              <input
                type="text"
                onKeyDown={(e) => onAddFolder(e)}
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                className="inputContainer__input"
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return (
              <Folder handleInsertNode={handleInsertNode} explorer={exp} />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <span className="file">🗄️{explorer.name}</span>
      </div>
    );
  }
}

export default Folder;
