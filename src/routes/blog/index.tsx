// src/routes/blog/index.tsx
import React, {useEffect} from 'react'
import { createFileRoute } from '@tanstack/react-router'
import styled from 'styled-components';

//api
import {getBlogPosts} from '@/api/blog.api'

// containers
import { HeroContainer } from '@/containers/_blog/hero/hero.container'

//icons
import { Share, Twitter, Instagram, InstagramIcon, Linkedin } from 'lucide-react';

//lib
import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter'


import { PostGridContainer } from '@/containers/_blog/postGrid/postGrid.container'
interface IBlogPost {
    author: string,
    post: {
        id: number,
        featurend_image: string,
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

const CustomHero = styled(HeroContainer)`
	display: flex;
	align-items: center;
	justify-content: center;

	margin-bottom: 0px;

	& .social {
		display: flex;
		flex-direction: column;
		position: absolute;
		left: 20px;
		display: flex;
		gap: 20px;

		& svg {
			width: 25px;
			cursor: pointer;
			transition: transform 0.3s ease;

			&:hover {
				color: var(--secondary);
				transform: scale(1.1);
			}
		}
	}
`

const ShadowOverlay = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: red;
    pointer-events: none;

	background: linear-gradient(
		to bottom,
		${HexToRgbaConverter('var(--secondary)', 0.10)} 0%,
		rgba(0, 0, 0, 0) 70%
	);
`;


function BlogIndex() {
	const [blogPosts, setBlogPosts] = React.useState<IBlogPost[]>([])
	const [isLoading, setIsLoading] = React.useState(true)

	const FetchBlogPosts = async () => {
		console.log("Fetch blog posts here")
		const blogPosts = await getBlogPosts()
		const dataPost = blogPosts?.data || []
		const Post = dataPost?.posts || []
		if(Post.length > 0) {
			console.log("Blog posts data:", Post)
			setBlogPosts(Post)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		FetchBlogPosts()
	}, [])

	return (
		<>
			<CustomHero className="blog-hero">
					<div className="social">
						<Share/>
						<Twitter/>{/* change by local icon */}
						<InstagramIcon/>
						<Linkedin/>
					</div>
					<h1 className='font_code'>Voir les article</h1>
			</CustomHero>
			<ShadowOverlay/>

			<div>
				<PostGridContainer data={blogPosts} isLoading={isLoading} />
			</div>
		</>
	)
}