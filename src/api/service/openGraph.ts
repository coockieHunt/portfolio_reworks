import { AssetsBaseUrl } from '../../config';
import { IOpenGraphData } from '../interface/api.interface';

export function getOpenGraphUrl({ slug, title, author, lastEdit }: IOpenGraphData): string {
    const params = new URLSearchParams({
        slug,
        title,
        author,
        date: lastEdit,
    });

    const url_build = `${AssetsBaseUrl}/opengraph/get?${params.toString()}`;

    return url_build;
}
