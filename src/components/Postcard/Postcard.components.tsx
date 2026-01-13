import { getProxyUrl } from "@/utils/image"
import * as Styled from './PostCard.style';
import { TagsComponent } from '@/components/Tags/Tags.component';
import { Link } from '@tanstack/react-router';


interface PostCardProps {
    index: number;
    slug: string;
    title: string;
    summary: string;
    featured_image: string;
    authorName: string;
    publishDate: string;
    loading: boolean;
    tags?: any[];
}

export const PostCardComponents = ({
    index,
    title,
    summary,
    featured_image,
    authorName,
    publishDate,
    loading,
    tags,
    slug,
}: PostCardProps) => {
    return(
        <Styled.PostPreview loading={loading}>
            <Link 
                to={loading ? '#' : `/blog/${slug}`} 
                aria-label={loading ? 'Loading...' : `Read more about ${title}`}
            >
                <img
                    src={
                        getProxyUrl(featured_image) ||
                        'https://via.placeholder.com/600x400?text=No+Image'
                    }
                    alt={title}
                />
                
                <div className="content">
                    <h2 className="font_code" style={{ letterSpacing: '0.05rem' }}>
                        <span className="index">{index + 1}.</span>
                        {title}
                    </h2>

                    
                    <div className="tagList" >
                        {tags && tags.map((tag) => (
                            <TagsComponent key={tag.id} color={tag.color} name={tag.name} id={tag.id} />
                        ))}
                    </div>
                
                    <div className="info">
                        <span className="brace">{'{'}</span>
                        
                        <p>
                            {summary}
                        </p>

                        <span className="brace">{'}'}</span>
                    </div>

                    <div className="footer">
                        <small>
                            // By {authorName} | Published on {new Date(publishDate).toLocaleDateString()}
                        </small>
                    </div>
                </div>
            </Link>
        </Styled.PostPreview>
    )
}