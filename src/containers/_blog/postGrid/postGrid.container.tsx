import { useMemo } from 'react';
import * as Styled from './postGrid.style';
import { PostCardComponents } from '@/components/Postcard/Postcard.components';
import { InfoDataTextComponent } from '@/components/Text/Text.component';

//type
import { IBlogPost } from '@/types/blog.d';

interface PostGridProps {
    data: IBlogPost[];
    loading: boolean;
    count: number;
    isEmpty: boolean;
    hasError: boolean;
}

export const PostGridContainer = ({ 
    data, 
    loading, 
    count, 
    isEmpty, 
    hasError 
}: PostGridProps) => {

    const visiblePosts = useMemo(() => {
        return data.filter((postData) => postData.post.indexed);
    }, [data]);

    const showEmptyState = !loading && (isEmpty || visiblePosts.length === 0);

    if (hasError) {
        return (
            <Styled.Container>
                <InfoDataTextComponent
                    StrongText="Erreur"
                    text="Impossible de charger les articles."
                    subtitle="Veuillez réessayer plus tard."
                />
            </Styled.Container>
        );
    }

    if (showEmptyState) {
        return (
            <Styled.Container>
                <InfoDataTextComponent
                    StrongText="Oops!"
                    text="Aucun article trouvé."
                    subtitle="Peut-être essayez une autre recherche ?"
                />
            </Styled.Container>
        );
    }

    return (
        <Styled.Container>
            <Styled.Grid>
                <ul>
                    {loading ? (
                        Array.from({ length: count }).map((_, index) => (
                            <li key={`skeleton-${index}`} style={{ listStyle: 'none' }}>
                                <PostCardComponents
                                    index={index}
                                    slug=""
                                    title=""
                                    summary=""
                                    featured_image=""
                                    authorName=""
                                    publishDate=""
                                    tags={[]}
                                    loading={true}
                                />
                            </li>
                        ))
                    ) : (
                        visiblePosts.map((postData, index) => (
                            <li key={postData.post.slug} style={{ listStyle: 'none' }}>
                                <PostCardComponents
                                    index={index}
                                    slug={postData.post.slug}
                                    title={postData.post.title}
                                    summary={postData.post.summary}
                                    featured_image={postData.post.featuredImage}
                                    authorName={postData.author.name}
                                    publishDate={postData.post.createdAt}
                                    tags={postData.tags}
                                    loading={false}
                                    priority={index === 0}
                                />
                            </li>
                        ))
                    )}
                </ul>
            </Styled.Grid>
        </Styled.Container>
    );
};