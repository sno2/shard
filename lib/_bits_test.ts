// Imports
import { assert } from "https://deno.land/std@0.74.0/testing/asserts.ts";
import {
	unpack,
	unpackCount,
	unpackShard,
	unpackTimestamp,
	pack,
	packCount,
	packShard,
	packTimestamp
} from "./_bits.ts";

Deno.test("unpack from start", async () => {
	assert(
		unpack(
			0b10101010n,
			0n,
			2n
		) === 0b10n,
		"Doesn't match the expected outcome."
	);
});

Deno.test("unpack from middle", async () => {
	assert(
		unpack(
			0b10101010n,
			3n,
			2n
		) === 0b1n,
		"Doesn't match the expected outcome."
	);
});

Deno.test("unpack from end", async () => {
	assert(
		unpack(
			0b10101010n,
			6n,
			2n
		) === 0b10n,
		"Doesn't match the expected outcome."
	);
});

Deno.test("pack from start", async () => {
	assert(
		pack(
			0b10101010n,
			0b01n,
			0n,
			2n
		) === 0b10101001n,
		"Doesn't match the expected outcome."
	);
});

Deno.test("pack from middle", async () => {
	assert(
		pack(
			0b10101010n,
			0b01n,
			4n,
			2n
		) === 0b10011010n,
		"Doesn't match the expected outcome."
	);
});

Deno.test("pack from end", async () => {
	assert(
		pack(
			0b10101010n,
			0b01n,
			6n,
			2n
		) === 0b01101010n,
		"Doesn't match the expected outcome."
	);
});

Deno.test("unpack count", async () => {
	assert(
		unpackCount(
			0b110011n
		) === 0b110011n,
		"Doesn't match the expected outcome."
	);
});

Deno.test("unpack shard", async () => {
	assert(
		unpackShard(
			0b11001100000000000000n
		) === 0b110011n,
		"Doesn't match the expected outcome."
	);
});

Deno.test("unpack timestamp", async () => {
	assert(
		unpackTimestamp(
			0b11001100000000000000000000n
		) === 0b110011n,
		"Doesn't match the expected outcome."
	);
});

Deno.test("pack count", async () => {
	assert(
		packCount(0n, 1n) === 1n,
		"Doesn't match the expected outcome."
	);
});

Deno.test("pack shard", async () => {
	assert(
		packShard(0n, 1n) === 0b100000000000000n,
		"Doesn't match the expected outcome."
	);
});

Deno.test("pack timestamp", async () => {
	assert(
		packTimestamp(0n, 1n) === 0b100000000000000000000n,
		"Doesn't match the expected outcome."
	);
});
