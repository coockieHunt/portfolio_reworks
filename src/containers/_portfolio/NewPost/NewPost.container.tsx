import { TitleTextComponent } from '@/components/Text/Text.component';
import { IBlogPost } from '@/types/blog.d';
import { getBlogPostsOffset } from '@/api/blog.api';
import { useEffect, useState } from 'react';
import { PostGridContainer } from '@/containers/_blog/postGrid/postGrid.container';

import * as Styled from './NewPost.style';

import {Link as LinkComponent} from '@/components/Button/LinkButton';

export const NewPostContainer = (id) => {
    const [IsLoading, setIsLoading] = useState(true);
    const [LatestPost, setLatestPost] = useState<IBlogPost[]>([]);

    useEffect(() => {
        async function fetchLatestPost() {
            setIsLoading(true);
            try {
                const response = await getBlogPostsOffset(1, 2);
                if (response?.data?.posts && response.data.posts.length > 0) {
                    setLatestPost(response?.data?.posts || []);
                }
            } catch (error) {
                console.error('Error fetching latest post:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchLatestPost();
    }, []);

    return (
        <Styled.Container id={id}>
               <TitleTextComponent
                    subtitle={'Vous pouvez aussi consulter'}
                    subtitleOpacity={0.3}
                >
                    Dernier article
                </TitleTextComponent>
                <Styled.PostContainer>
                    <PostGridContainer 
                        count={2}
                        data={LatestPost} 
                        loading={IsLoading}
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