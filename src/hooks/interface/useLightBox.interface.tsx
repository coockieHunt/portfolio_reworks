export interface IUseLightBox {
    isLightBoxOpen: boolean;
    currentImg: string | null;
    ChangeLightBoxImg: (imgUrl: string) => void;
    ToggleLightBox: () => void;
}
