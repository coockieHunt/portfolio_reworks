import { getProxyUrl } from "@/utils/image"
import * as Styled from './PostCard.style';
import { TagsComponent } from '@/components/Tags/Tags.component';
import { Link } from '@tanstack/react-router';
import { ImageLazyLoad } from "../ImageLazyLoad/ImageLazyLoad.componenet";
import { useWindowSize } from '@/hooks/useScreenResize.hook';
import { SCREEN_SIZE } from '@/config';

interface PostCardProps {
    index: number;
    slug: string;
    title: string;
    summary: string;
    featured_image: string;
    authorName: string | undefined;
    publishDate: string;
    loading: boolean;
    tags?: any[];
    priority?: boolean; 
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
    priority = false,
}: PostCardProps) => {
    const isMobile = !!useWindowSize(parseInt(SCREEN_SIZE.mobile) + 600);
    const imageSize = isMobile ? { width: 200, height: 200 } : { width: 300, height: 300 };

    const truncatedSummary = summary.length > 580 
        ? summary.substring(0, 580) + "..." 
        : summary;
    return(
        <Styled.PostPreview $loading={loading} >
            <Link 
                to={loading ? '#' : `/blog/${slug}`} 
                aria-label={loading ? 'Loading...' : `Read more about ${title}`}
            >
                <ImageLazyLoad
                    src={
                        getProxyUrl(
                            featured_image, 
                            { size: imageSize }
                        ) ||
                        'https://via.placeholder.com/600x400?text=No+Image'
                    }
                    height={imageSize.height.toString()}
                    width={imageSize.width.toString()}
                    alt={title}
                    title={title}
                    lazy={!priority}
                    fetchPriority={priority ? 'high' : undefined}
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
                        
                        <p>{truncatedSummary}</p>

                        <span className="brace">{'}'}</span>
                    </div>

                    <div className="footer">
                        <small>
                            {authorName ? `// By ${authorName} | Published on ${new Date(publishDate).toLocaleDateString()}` : `// Published on ${new Date(publishDate).toLocaleDateString()}`}
                        </small>
                    </div>
                </div>
            </Link>
        </Styled.PostPreview>
    )
}