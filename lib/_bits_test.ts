// Imports
import { assertStrictEquals } from "https://deno.land/std@0.74.0/testing/asserts.ts";
import {
	unpack,
	unpackCount,
	unpackShard,
	unpackTimestamp,
	unpackVersion,
	unpackExpiresAt,
	unpackIssuedAt,
	unpackUpdatedAt,
	unpackHash,
	pack,
	packCount,
	packShard,
	packTimestamp,
	packVersion,
	packExpiresAt,
	packIssuedAt,
	packUpdatedAt,
	packHash,
} from "./_bits.ts";
import {
	countPos,
	countSize,
	shardPos,
	shardSize,
	timestampPos,
	timestampSize,
	expPos,
	expSize,
	iatPos,
	iatSize,
	updPos,
	updSize,
	hashPos,
	hashSize,
	versionPos,
	versionSize
} from "./_constants.ts";

function mess (pos: bigint, size: bigint): bigint
{
	return (0b110011n << pos) | (0b111n << (pos + size));
}

Deno.test("unpack from start", async () => {
	assertStrictEquals(
		unpack(0b10101010n, 0n, 2n),
		0b10n
	);
});

Deno.test("unpack from middle", async () => {
	assertStrictEquals(
		unpack(0b10101010n, 3n, 2n),
		0b1n
	);
});

Deno.test("unpack from end", async () => {
	assertStrictEquals(
		unpack(0b10101010n, 6n, 2n),
		0b10n
	);
});

Deno.test("pack from start", async () => {
	assertStrictEquals(
		pack(0b10101010n, 0b01n, 0n, 2n),
		0b10101001n
	);
});

Deno.test("pack from middle", async () => {
	assertStrictEquals(
		pack(0b10101010n, 0b01n, 4n, 2n),
		0b10011010n
	);
});

Deno.test("pack from end", async () => {
	assertStrictEquals(
		pack(0b10101010n, 0b01n, 6n, 2n),
		0b01101010n
	);
});

Deno.test("unpack count", async () => {
	assertStrictEquals(
		unpackCount(mess(countPos, countSize)),
		0b110011n
	);
});

Deno.test("unpack shard", async () => {
	assertStrictEquals(
		unpackShard(mess(shardPos, shardSize)),
		0b110011n
	);
});

Deno.test("unpack timestamp", async () => {
	assertStrictEquals(
		unpackTimestamp(mess(timestampPos, timestampSize)),
		0b110011n
	);
});

Deno.test("unpack version", async () => {
	assertStrictEquals(
		unpackVersion(mess(versionPos, versionSize)),
		0b110011n
	)
});

Deno.test("unpack iat", async () => {
	assertStrictEquals(
		unpackIssuedAt(mess(iatPos, iatSize)),
		0b110011n
	);
});

Deno.test("unpack exp", async () => {
	assertStrictEquals(
		unpackExpiresAt(mess(expPos, expSize)),
		0b110011n
	);
});

Deno.test("unpack upd", async () => {
	assertStrictEquals(
		unpackUpdatedAt(mess(updPos, updSize)),
		0b110011n
	);
});

Deno.test("unpack hash", async () => {
	assertStrictEquals(
		unpackHash(mess(hashPos, hashSize)),
		0b110011n
	);
});

Deno.test("pack count", async () => {
	assertStrictEquals(
		packCount(0n, 1n),
		1n << countPos
	);
});

Deno.test("pack shard", async () => {
	assertStrictEquals(
		packShard(0n, 1n),
		1n << shardPos
	);
});

Deno.test("pack timestamp", async () => {
	assertStrictEquals(
		packTimestamp(0n, 1n),
		1n << timestampPos
	);
});

Deno.test("pack version", async () => {
	assertStrictEquals(
		packVersion(0n, 1n),
		1n << versionPos
	);
});

Deno.test("pack expires at", async () => {
	assertStrictEquals(
		packExpiresAt(0n, 1n),
		1n << expPos
	);
});

Deno.test("pack issued at", async () => {
	assertStrictEquals(
		packIssuedAt(0n, 1n),
		1n << iatPos
	);
});

Deno.test("pack updated at", async () => {
	assertStrictEquals(
		packUpdatedAt(0n, 1n),
		1n << updPos
	);
});

Deno.test("pack hash", async () => {
	assertStrictEquals(
		packHash(0n, 1n),
		1n << hashPos
	);
});
