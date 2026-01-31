import * as Styled from './postGrid.style';
import { PostCardComponents } from '@/components/Postcard/Postcard.components';

//type
import { IBlogPost } from '@/types/blog.d';
import styled from 'styled-components';

export const PostGridContainer = ({ data, loading, count, isEmpty }: { data: IBlogPost[], loading: boolean, count: number, isEmpty: boolean }) => {
    //if indexed is false, we don't show the post 
    const visiblePosts = data.filter((postData) => postData.post.indexed);
    const showEmptyState = isEmpty || (!loading && visiblePosts.length === 0);

    return (
        <>
            <Styled.Container>
                {showEmptyState ? (
                    <Styled.Empty>
                        <span><strong>Oops!</strong> Aucun article trouvé.</span>
                        <span className='sub'>peut être essayez une autre recherche ?</span>
                    </Styled.Empty>
                ) : (
                    <Styled.Grid>
                        <ul>
                            {loading ? (
                                Array.from({ length: count }).map((_, index) => (
                                    <li key={index} style={{ listStyle: 'none' }} >
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
                                // 3. On utilise visiblePosts ici au lieu de data
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
                                            // Le premier élément VISIBLE aura bien la priorité
                                            priority={index === 0}
                                        />
                                    </li>
                                ))
                            )}
                        </ul>
                    </Styled.Grid>
                )}
            </Styled.Container>
        </>
    );
};