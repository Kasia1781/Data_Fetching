import { useState } from 'react';
import './App.css';
import { get } from './util/http';
import { BlogPost } from './components/BlogPosts';

function App() {
	const [fetchedPosts, setFetchedPost] = useState<BlogPost[]>();

	get('https://jsonplaceholder.typicode.com/posts');

	return <h1>Data fetching!</h1>;
}

export default App;
