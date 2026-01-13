import * as Styled from './postGrid.style';
import { Link } from '@tanstack/react-router';
import { PostCardComponents } from '@/components/Postcard/Postcard.components';

//type
import { IBlogPost } from '@/types/blog.d';

export const PostGridContainer = ({ data, loading, count }: { data: IBlogPost[], loading: boolean, count: number }) => {
    return (
        <>
            <Styled.Container>
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
                        data.map((data, index) => (
                            <li key={data.post.slug} style={{ listStyle: 'none' }}>
                                <Link
                                    to={`/blog/${data.post.slug}`}
                                    aria-label={`Read more about ${data.post.title}`}
                                >
                                    <PostCardComponents
                                        index={index}
                                        slug={data.post.slug}
                                        title={data.post.title}
                                        summary={data.post.summary}
                                        featured_image={data.post.featuredImage}
                                        authorName={data.author.name}
                                        publishDate={data.post.createdAt}
                                        tags={data.tags}
                                        loading={false}
                                    />
                                </Link>
                            </li>
                        ))
                    )} 
                    </ul>
                </Styled.Grid>
            </Styled.Container>
        </>
    );
};