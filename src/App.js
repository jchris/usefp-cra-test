import './App.css';
import { useFireproof, useAllDocs } from 'use-fireproof';

function App() {

  const { useDocument, database } = useFireproof('xyz');

  const [doc, setDoc, saveDoc] = useDocument(() => ({ message: 'Hello World', created: Date.now(), updated: Date.now() }));

  const allDocs = useAllDocs()

  const handleSubmit = (event) => {
    event.preventDefault();
    database.put({ ...doc, updated: Date.now() });
    saveDoc();
  };

  const handleChange = (event) => {
    setDoc({ ...doc, message: event.target.value });
  };

  console.log(allDocs)

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <pre>
            {JSON.stringify(doc, null, 2)}
          </pre>
        </p>
        <form onSubmit={handleSubmit}>
          <input type="text" value={doc.message} onChange={handleChange} />
          <button type="submit">Save</button>
        </form>
        <ul>
          {allDocs.docs.map((doc) => (
            <li key={doc._id}>{doc.message}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
