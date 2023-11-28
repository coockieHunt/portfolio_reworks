import {COLOR} from './main'

export const STYLE = {
    /**
     * Background color of the container. Default: The primary color from the global COLOR configuration.
     * @type {string}
     * @default COLOR.primary
     */
    background_color: COLOR.primary,

    /**
     * Flag indicating whether the container has a border. Default: true.
     * @type {boolean}
     * @default true
     */
    border: true,

    /**
     * Border radius of the container. Default: "30%".
     * @type {string}
     * @default "30%"
     */
    border_radius: "5px",

    /**
     * Position offset on hide arrow. Default: "-60px".
     * @type {string}
     * @default "-60px"
     */
    hide_offset: "-60px",

    /**
     * Position object containing bottom and right positions of the container.
     * @type {Object}
     * @property {string} bottom - Bottom position of the container. Default: "60px".
     * @property {string} right - Right position of the container. Default: "25px".
     * @default { bottom: "60px", right: "25px" }
     */
    position: {
        bottom: "60px",
        right: "25px"
    },
};