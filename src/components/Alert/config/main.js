import { COLOR } from "../../../config";

export const DEBUG = {
    /**
     * Flag indicating whether the container debug is enabled. Default: false. If true, the alert container is visible.
     * @type {boolean}
     * @default false
     */
    container: false,

    /**
     * Color code for the container debug. Default: "#ff000032".
     * @type {string}
     * @default "#ff000032"
     */
    container_color: "#ff000032",
};

export const STYLE = {
    /**
     * Direction of the style, either "normal" or "reverse". Default: "normal".
     * @type {string}
     * @default "normal"
     */
    direction: "normal",

    /**
     * Width of the container. Default: "400px".
     * @type {string}
     * @default "400px"
     */
    width: "400px",

    /**
     * Height of the container. Default: "100vh".
     * @type {string}
     * @default "100vh"
     */
    height: "100vh",

    /**
     * Position object containing top and right positions of the container.
     * @type {Object}
     * @property {string} top - Top position of the container. Default: "0".
     * @property {string} right - Right position of the container. Default: "0".
     * @default { top: "0", right: "0" }
     */
    position: {
        top: "0",
        right: "0",
    },
};

export const COLOR_ALERT = {
    /**
     * Default color for alerts. Default: The primary color from the global COLOR configuration.
     * @type {string}
     * @default COLOR.primary
     */
    default: COLOR.primary,
};
