/**
 * @function getRandomINt
 * @param min
 * @param max
 * @returns number - random number between min and max (exclusively)
 */

export default function getRandomINt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}
