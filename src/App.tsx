import './App.css';
import { get } from './util/http';

function App() {
	get('https://jsonplaceholder.typicode.com/posts');

	return <h1>Data fetching!</h1>;
}

export default App;
