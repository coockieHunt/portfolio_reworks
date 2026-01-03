/**
 * @function GenerateRandomNumber
 * @description
 * Generates a random integer between the given min and max values, inclusive.
 *
 * @param {number} min - The minimum possible value of the generated number.
 * @param {number} max - The maximum possible value of the generated number.
 * @returns {number} The random integer generated in the interval [min, max].
 *
 * @example
 * const random = GenerateRandomNumber(1, 10);
 */
export const GenerateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
