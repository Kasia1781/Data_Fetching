import { ReactNode, useEffect, useState } from 'react';
import './App.css';
import { get } from './util/http';
import BlogPosts, { BlogPost } from './components/BlogPosts';
import fetchingImg from './assets/data-fetching.png';
import ErrorMessage from './components/ErrorMessage';

function App() {
	const [fetchedPosts, setFetchedPost] = useState<BlogPost[]>();
	const [isFetching, setIsFetching] = useState(false); //stan ładowania
	const [error, setError] = useState<string>(); //obsługa błędów

	//typujemy dane które otrzymujemy z API
	type RawDataBlogPosts = {
		id: number;
		userId: number;
		title: string;
		body: string;
	};

	useEffect(() => {
		async function fetchPosts() {
			setIsFetching(true);

			try {
				const data = (await get(
					'https://jsonplaceholder.typicode.com/posts'
				)) as RawDataBlogPosts[];

				//Pobrane dane musimy przekonwertować tak aby odpowiadały type BlogPost.
				const blogPosts: BlogPost[] = data.map((rawPost) => {
					return {
						id: rawPost.id,
						title: rawPost.title,
						text: rawPost.body,
					};
				});
				setFetchedPost(blogPosts);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				}
			}

			setIsFetching(false);
		}

		fetchPosts();
	}, []);

	let content: ReactNode;

	if (fetchedPosts) {
		content = <BlogPosts posts={fetchedPosts} />;
	}

	if (isFetching) {
		content = <p id='loading-fallback'>Fetching posts...</p>;
	}

	if (error) {
		content = <ErrorMessage text={error} />;
	}

	return (
		<main>
			<img src={fetchingImg} alt='Image' />
			{content}
		</main>
	);
}

export default App;
