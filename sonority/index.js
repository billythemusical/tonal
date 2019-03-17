import { name, chroma } from "../note";
import { ic } from "../interval";
import { compact } from "../array";

/**
 * Analyse sonority of musical elements. Currently only one function.
 *
 * ## Usage
 *
 * @example
 * import Sonority from "tonal/sonority"
 * Sonority.density(["C", "E", "G", "B"])) // => [2, 2, 1, 0, 1, 0];
 *
 * ## API
 * @module Sonority
 */
export default { density };

/**
 * Get the intervals analysis of a collection of notes
 *
 * Returns an array with the format `[p, m, n, s, d, t]` where:
 *
 * - p: the number of perfect fourths or fifths
 * - m: the number of major thirds or minor sixths
 * - n: the number of major sixths or minor thirds
 * - s: the number of major seconds or minor sevenths
 * - d: the number of major sevents or minor seconds
 * - t: the number of tritones
 *
 * This is, mostly, an academic puzzle to show the expresiveness of tonal.
 * Implements the ideas found in "The Analysis of Intervals" chapter from
 * [Harmonic Materials of Modern Music]():
 *
 * > The letters _pmn_, therefore, represent intervals commonly considered
 * consonant, whereas the letters _sdt_ represent the intervals commonly
 * considered dissonant. (...) A sonority represented, for example, by the
 * symbol `sd^2`, indicating a triad composed of one major second and two minor
 * seconds, would be recognized as a highly dissonant sound, while the symbol
 * `pmn` would indicate a consonant sound.
 *
 * @param {Array<string>} notes - the notes to analyze
 * @return {Array<number>} the _pmnsdt_ array
 *
 * @example
 * Sonority.density(["c", "d", "gb"])) // => [0, 1, 0, 1, 0, 1];
 */
export function density(list) {
  let a, b, i;
  const notes = compact(list.map(name));
  const len = notes.length;
  const result = [0, 0, 0, 0, 0, 0];
  for (a = 0; a < len; a++) {
    for (b = a; b < len; b++) {
      i = ic(chroma(notes[b]) - chroma(notes[a]));
      if (i === 6) result[5] = result[5] + 1;
      else if (i > 0) result[5 - i] = result[5 - i] + 1;
    }
  }
  return result;
}
