export interface MyProjectContainerProps {
    id: string;
}

export interface IProject {
    id: string | number;
    title?: string;
    description?: string;
    content?: string;
    techStack: string[];
    favorite?: boolean;
    gitUrl?: string | null;
    webUrl?: string | null;
    galery?: IGaleryImage[];
    fileName?: string;
    column?: number;
    row?: number;
    gridPos?: { colStart: number; rowStart: number };
}


export interface IGaleryImage {
    img: string;
    title?: string;
    alt?: string;
}


export interface IBuildTabBuildProps {
    project: IProject;
    currentTab: string;
    setCurrentTab: (tab: string) => void;
}


