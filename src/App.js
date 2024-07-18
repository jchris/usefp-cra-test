import './App.css';
import { useFireproof } from 'use-fireproof';

function App() {

  const { useDocument, useLiveQuery } = useFireproof('xyz');

  const [doc, setDoc, saveDoc] = useDocument(() => ({ message: '', created: Date.now(), updated: Date.now() }));

  const allDocs = useLiveQuery('_id')

  const handleSubmit = (event) => {
    event.preventDefault();
    saveDoc({ ...doc, updated: Date.now() });
    setDoc()
  };

  const handleChange = (event) => {
    setDoc({ ...doc, message: event.target.value });
  };

  return (
    <div className="App">
      <header className="App-header">
        <pre>
          {JSON.stringify(doc, null, 2)}
        </pre>
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
