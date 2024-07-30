import "./App.css";
import { useState } from "react";
// import explorer from "./data/folderData.js";
import explorer from "./data/folderData.js";
import Folder from "./component/Folder";
import useTraverceTree from "./hooks/use-traverce-tree.js";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTraverceTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);

    setExplorerData(finalTree);
  };

  return (
    <div className="App">
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
    </div>
  );
}
