// Imports
import {
	zero,
	one,
	two
} from "./_constants.ts";

/**
 * Unpack some values from n.
 * @param n The bigint to unpack from.
 * @param pos The position in the bitfield to start extraction from.
 * @param size The amount of bits to extract.
 * @internal
 */
export function unpack (
	n: bigint,
	pos: bigint,
	size: bigint
): bigint {
	return (n & ((two ** size - one) << pos)) >> pos;
}

/**
 * Pack a value somewhere into n.
 * @param n The big integer to pack value into.
 * @param value The value to pack into n.
 * @param pos The position to pack n into.
 * @param size The size of n.
 * @internal
 */
export function pack (
	n: bigint,
	value: bigint,
	pos: bigint,
	size: bigint
): bigint {
	return (n - (unpack(n, pos, size) << pos)) | (unpack(value, zero, size) << pos);
}

/**
 * Unpack the count from a shard.
 * @param n The shard.
 * @internal
 */
export function unpackCount (n: bigint): bigint
{
	return unpack(n, zero, 14n);
}

/**
 * Pack count into a shard.
 * @param n The shard.
 * @param value The value.
 * @internal
 */
export function packCount (n: bigint, value: bigint): bigint
{
	return pack(n, value, zero, 14n);
}

/**
 * Unpack the shard (or serviceID) from a shard.
 * @param n The shard.
 * @internal
 */
export function unpackShard (n: bigint): bigint
{
	return unpack(n, 14n, 6n);
}

/**
 * Pack the shard (or serviceID) into a shard.
 * @param n The shard.
 * @param value The shard or serviceID.
 * @internal
 */
export function packShard (n: bigint, value: bigint): bigint
{
	return pack(n, value, 14n, 6n);
}

/**
 * Unpack the timestamp from the shard.
 * @param n The shard.
 * @internal
 */
export function unpackTimestamp (n: bigint): bigint
{
	return unpack(n, 20n, 44n);
}

/**
 * Pack a timestamp into the shard.
 * @param n The shard.
 * @param value The timestamp.
 */
export function packTimestamp (n: bigint, value: bigint): bigint
{
	return pack(n, value, 20n, 44n);
}
