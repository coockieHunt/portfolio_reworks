export interface IUseLightBox {
    isLightBoxOpen: boolean;
    currentImg: string | null;
    currentAlt: string;
    ChangeLightBoxImg: (imgUrl: string, altText?: string) => void;
    ToggleLightBox: () => void;
}
