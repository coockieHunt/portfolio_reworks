import * as Styled from './postGrid.style';
import { Link } from '@tanstack/react-router';
import React, { useState } from 'react';
//type
interface IBlogPost {
    author: string;
    post: {
        id: number;
        featurend_image: string;
        authorId: string;
        content: string;
        createdAt: string;
        editedAt: string;
        published: boolean;
        slug: string;
        summary: string;
        title: string;
    };
}

export const PostGridContainer = ({ data }) => {
    return (
        <>
            <Styled.Container>
                <Styled.Grid>
                    {data.map((data) => (
                        <Link
                            to={`/blog/${data.post.slug}`}
                            key={data.post.slug}
                        >
                            <Styled.PostPreview
                                key={data.post.slug}
                                className="post-preview"
                            >
                                <img
                                    src={
                                        data.post.featurend_image ||
                                        'https://via.placeholder.com/600x400?text=No+Image'
                                    }
                                    alt={data.post.title}
                                />

                                <div className="content">
                                    <h2
                                        className="font_code"
                                        style={{ letterSpacing: '0.1rem' }}
                                    >
                                        {data.post.title}
                                    </h2>
                                    <div className="info">
                                        <p>{data.post.summary}</p>
                                    </div>
                                    <div className="footer">
                                        <small>
                                            By {data.author.name} | Published on{' '}
                                            {new Date(
                                                data.post.published
                                                    ? data.post.createdAt
                                                    : data.post.editedAt,
                                            ).toLocaleDateString()}
                                        </small>
                                    </div>
                                </div>
                            </Styled.PostPreview>
                        </Link>
                    ))}
                </Styled.Grid>
            </Styled.Container>
        </>
    );
};
