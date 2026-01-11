import * as Styled from './postGrid.style';
import { Link } from '@tanstack/react-router';
import { PostCardComponents } from '@/components/Postcard/Postcard.components';

//type
import { IBlogPost } from '@/types/blog.d';

export const PostGridContainer = ({ data, loading, count }: { data: IBlogPost[], loading: boolean, count: number }) => {
    return (
        <>
            <Styled.Container>
                <h2>Articles: </h2>
                <Styled.Grid>
                    {loading  ? (
                        Array.from({ length: count }).map((_, index) => (
                            <PostCardComponents
                                key={index}
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
                        ))
                    ) : (
                        data.map((data, index) => (
                            <Link
                                to={`/blog/${data.post.slug}`}
                                key={data.post.slug}
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
                        ))
                    )} 
                </Styled.Grid>
            </Styled.Container>
        </>
    );
};
