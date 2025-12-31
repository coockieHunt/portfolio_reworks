// src/routes/blog/index.tsx
import React, {useEffect} from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'

import {getBlogPosts} from '../../api/blog.api'

//type
interface IBlogPost {
	author: string,
	post: {
		id: number,
		authorId: string,
		content: string,
		createdAt: string,
		editedAt: string,
		published: boolean,
		slug: string,
		summary: string,
		title: string,
	}
}

export const Route = createFileRoute('/blog/')({
	component: BlogIndex,
})



function BlogIndex() {
	const [blogPosts, setBlogPosts] = React.useState<IBlogPost[]>([])
	const [loading, setLoading] = React.useState(true)

	const FetchBlogPosts = async () => {
		console.log("Fetch blog posts here")
		const blogPosts = await getBlogPosts()
		const dataPost = blogPosts?.data || []
		const Post = blogPosts?.data?.posts || []
		if(Post.length > 0) {
			console.log("Blog posts data:", Post)
			setBlogPosts(Post)
			setLoading(false)
		}
	}

	useEffect(() => {
		FetchBlogPosts()
	}, [])

	return (
		<div>
			<div className="hero">
				<h1>Blog</h1>
				<p>Découvrez des articles sur React, TypeScript, et les dernières technologies web pour améliorer vos compétences</p>
				{loading ? (
					<p>Chargement en cours...</p>
				) : (
					<>
						<ul>
							{blogPosts && blogPosts.length > 0 ? (
								blogPosts.map((data) => (
									<li key={data.post.slug} className="post-preview">
										<h2>
											<Link to={`/blog/post/${data.post.slug}`}>
												{data.post.title}
											</Link>
										</h2>

										<p style={{color: '#cecece'}}>{data.post.summary}</p>

									</li>
								))
							) : (
								<p>Aucun article disponible.</p>
							)}
						</ul>

					</>
				)}
			</div>
			
		</div>
	)
}