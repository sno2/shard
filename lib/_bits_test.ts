// Imports
import { assertStrictEquals } from "https://deno.land/std@0.74.0/testing/asserts.ts";
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
		unpackCount(0b110011n),
		0b110011n
	);
});

Deno.test("unpack shard", async () => {
	assertStrictEquals(
		unpackShard(0b11001100000000000000n),
		0b110011n
	);
});

Deno.test("unpack timestamp", async () => {
	assertStrictEquals(
		unpackTimestamp(0b11001100000000000000000000n),
		0b110011n
	);
});

Deno.test("pack count", async () => {
	assertStrictEquals(
		packCount(0n, 1n),
		1n
	);
});

Deno.test("pack shard", async () => {
	assertStrictEquals(
		packShard(0n, 1n),
		0b100000000000000n
	);
});

Deno.test("pack timestamp", async () => {
	assertStrictEquals(
		packTimestamp(0n, 1n),
		0b100000000000000000000n
	);
});
