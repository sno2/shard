// Imports
import {
	zero,
	one,
	two,
	countPos,
	countSize,
	shardPos,
	shardSize,
	timestampPos,
	timestampSize,
	iatPos,
	iatSize,
	expPos,
	expSize,
	updPos,
	updSize,
	hashPos,
	hashSize,
	versionPos,
	versionSize
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
	return unpack(n, countPos, countSize);
}

/**
 * Pack count into a shard.
 * @param n The shard.
 * @param value The value.
 * @internal
 */
export function packCount (n: bigint, value: bigint): bigint
{
	return pack(n, value, countPos, countSize);
}

/**
 * Unpack the shard (or serviceID) from a shard.
 * @param n The shard.
 * @internal
 */
export function unpackShard (n: bigint): bigint
{
	return unpack(n, shardPos, shardSize);
}

/**
 * Pack the shard (or serviceID) into a shard.
 * @param n The shard.
 * @param value The shard or serviceID.
 * @internal
 */
export function packShard (n: bigint, value: bigint): bigint
{
	return pack(n, value, shardPos, shardSize);
}

/**
 * Unpack the timestamp from the shard.
 * @param n The shard.
 * @internal
 */
export function unpackTimestamp (n: bigint): bigint
{
	return unpack(n, timestampPos, timestampSize);
}

/**
 * Pack a timestamp into the shard.
 * @param n The shard.
 * @param value The timestamp.
 * @internal
 */
export function packTimestamp (n: bigint, value: bigint): bigint
{
	return pack(n, value, timestampPos, timestampSize);
}

/**
 * Unpack the integrity shard version.
 * @param n The shard.
 * @internal
 */
export function unpackVersion (n: bigint): bigint
{
	return unpack(n, versionPos, versionSize);
}

/**
 * Pack a version number into a integrity shard.
 * @param n The shard.
 * @param value The timestamp.
 * @internal
 */
export function packVersion (n: bigint, value: bigint): bigint
{
	return pack(n, value, versionPos, versionSize);
}

/**
 * Unpack the issued at timestamp from the integrity shard.
 * @param n The shard.
 * @internal
 */
export function unpackIssuedAt (n: bigint): bigint
{
	return unpack(n, iatPos, iatSize);
}

/**
 * Pack an issued at timestamp into a integrity shard.
 * @param n The shard.
 * @param value The timestamp.
 * @internal
 */
export function packIssuedAt (n: bigint, value: bigint): bigint
{
	return pack(n, value, iatPos, iatSize);
}

/**
 * Unpack the expires at timestamp from the integrity shard.
 * @param n The shard.
 * @internal
 */
export function unpackExpiresAt (n: bigint): bigint
{
	return unpack(n, expPos, expSize);
}

/**
 * Pack an expires at timestamp into a integrity shard.
 * @param n The shard.
 * @param value The timestamp.
 * @internal
 */
export function packExpiresAt (n: bigint, value: bigint): bigint
{
	return pack(n, value, expPos, expSize);
}

/**
 * Unpack the updated at timestamp from the integrity shard.
 * @param n The shard.
 * @internal
 */
export function unpackUpdatedAt (n: bigint): bigint
{
	return unpack(n, updPos, updSize);
}

/**
 * Pack an updated at timestamp into a integrity shard.
 * @param n The shard.
 * @param value The timestamp.
 * @internal
 */
export function packUpdatedAt (n: bigint, value: bigint): bigint
{
	return pack(n, value, updPos, updSize);
}

/**
 * Unpack the hash from the integrity shard.
 * @param n The shard.
 * @internal
 */
export function unpackHash (n: bigint): bigint
{
	return unpack(n, hashPos, hashSize);
}

/**
 * Pack a hash into a integrity shard.
 * @param n The shard.
 * @param value The timestamp.
 * @internal
 */
export function packHash (n: bigint, value: bigint): bigint
{
	return pack(n, value, hashPos, hashSize);
}
