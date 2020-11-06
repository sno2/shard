// Imports
import { defaultMaxNoise } from "./_constants.ts";

/** The incremented value. */
let i = 0;

/**
 * Get an incremented value.
 * @param max The max value.
 * @internal
 */
export function increment (max: number = defaultMaxNoise): number
{
	if (max === 0) return i = 0;
	const current = i;
	i = (i + 1) % max;
	return current;
}
