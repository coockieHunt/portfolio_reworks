import { IBlogPost } from '@/types/blog.d';
import { getBlogPostsOffset } from '@/api/service/blog.api';
import { useEffect, useState } from 'react';
import { PostGridContainer } from '@/containers/_blog/postGrid/postGrid.container';

import * as Styled from './NewPost.style';

import {Link as LinkComponent} from '@/components/Button/LinkButton';

export const NewPostContainer = () => {
    const [IsLoading, setIsLoading] = useState(true);
    const [LatestPost, setLatestPost] = useState<IBlogPost[]>([]);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        async function fetchLatestPost() {
            setIsLoading(true);
            try {
                const response = await getBlogPostsOffset(1, 2);
                if (response?.data?.posts && response.data.posts.length > 0) {
                    setLatestPost(response?.data?.posts || []);
                } else {
                    setHasError(true);
                }
            } catch (error) {
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchLatestPost();
    }, []);

    return (
        <Styled.Container>
                <Styled.PostContainer>
                    <PostGridContainer 
                        count={2}
                        data={LatestPost} 
                        loading={IsLoading}
                        isEmpty={LatestPost.length === 0}
                        hasError={hasError}
                    />
                </Styled.PostContainer>

                <LinkComponent 
                    ariaLabel='voir les autre page article'
                    href='/blog/'
                    type='route'
                >
                    Voir tous les articles
                </LinkComponent>

        </Styled.Container>
    )
}