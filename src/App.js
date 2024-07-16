import logo from './logo.svg';
import './App.css';
import { useFireproof, useLiveQuery } from 'use-fireproof';

function App() {

  const { useDocument } = useFireproof('xyz');

  const [doc, setDoc, saveDoc] = useDocument(() => ({ message: 'Hello World', created: Date.now(), updated: Date.now() }));

  // const allDocs = useLiveQuery('_id')

  const handleSubmit = (event) => {
    event.preventDefault();
    setDoc({ ...doc, updated: Date.now() });
    saveDoc();
  };

  const handleChange = (event) => {
    setDoc({ ...doc, message: event.target.value });
  };

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
      </header>
      <ul>
        {/* {allDocs.docs.map((doc) => (
          <li key={doc._id}>{doc.message}</li>
        ))} */}
      </ul>
    </div>
  );
}

export default App;
