import { Fragment, useState, useEffect } from "react";
import "./App.css";
import SplitPane from "react-split-pane";

function App() {
  const [count, setCount] = useState(0);
  const [showCount, setShowCount] = useState(false);
  const [notes, setNotes] = useState("");
  const [results, setResults] = useState([]);

  // const NODE_URL = `http://localhost:4000`;
  const NODE_URL = `https://www.dneuron-split-notes-server.vercel.app/`;

  //Count timer for 2 seconds
  useEffect(() => {
    const countTimer = async () => {
      try {
        let timer;
        if (showCount) timer = setTimeout(() => setShowCount(false), 2000);

        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    countTimer();
    getAllNotes(); // calling this on useEffect for initial render and results state change render
  }, [showCount]);

  const handleShowCount = () => {
    setShowCount(true);
  };

  // Getting all notes from database
  const getAllNotes = async () => {
    try {
      const response = await fetch(`${NODE_URL}/getAll`);
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const { listNotes } = await response.json();
      // console.log("RESPONSE : ", listNotes[0].notes);
      setResults(listNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Adding a note to database
  const addNote = async (e, is_update) => {
    e.preventDefault();
    try {
      const response = await fetch(`${NODE_URL}/addNotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes, is_update }),
      });

      const { msg } = await response.json();
      if (response.status == "200") setNotes("");
      setCount((prev) => prev + 1);
      alert(msg);
      handleShowCount();
    } catch (error) {
      console.error("Something wrong : ", error);
    }
  };

  // Delete all notes from database
  const deleteNotes = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${NODE_URL}/deleteAll`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const { msg } = await response.json();
      if (response.status == "200") setNotes("");
      setCount((prev) => prev + 1);
      alert(msg);
      handleShowCount();
    } catch (error) {
      console.error("Something wrong : ", error);
    }
  };

  // Returning rendered HTML page with embedded CSS
  return (
    <Fragment>
      <div>
        <SplitPane split="horizontal" defaultSize={500}>
          <div>
            <SplitPane split="vertical">
              <div style={{ height: "100%" }}>
                <h2> Operations </h2>
                <div className="btn-group">
                  <button className="button" onClick={(e) => addNote(e, 0)}>
                    Add
                  </button>
                  <button className="button" onClick={(e) => addNote(e, 1)}>
                    Update
                  </button>
                  <button className="button" onClick={(e) => deleteNotes(e)}>
                    Delete All
                  </button>
                  <button
                    className="button"
                    onClick={(e) => handleShowCount(e)}
                  >
                    Count
                  </button>
                  <div>
                    {showCount && (
                      <div>
                        <h3>Count is {count}</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ height: "100%" }}>
                <h2>Enter Notes Here</h2>
                <textarea
                  placeholder="Enter input here..."
                  className="input-1 poppins-thin"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
            </SplitPane>
          </div>
          <div className="results">
            <h3>LAST 5 INSERTED RESULTS</h3>
            <div className="ul-list">
              <ul>
                {results.map((result, index) => (
                  <li className="list-notes" key={index}>
                    {result.notes}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SplitPane>
      </div>
    </Fragment>
  );
}

export default App;
