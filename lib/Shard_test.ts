// Imports
import { Shard } from "./Shard.ts";
import { Base } from "../deps.ts";
import {
	unpackCount,
	unpackService,
	unpackTimestamp
} from "./_bits.ts";
import {
	assertEquals,
	assertStrictEquals
} from "https://deno.land/std@0.76.0/testing/asserts.ts";

Deno.test("create specific shard", () => {
	const g = new Shard({
		count: 0,
		service: 0,
		timestamp: 0
	});
	assertStrictEquals(g.num(), 0n);
	assertStrictEquals(g.str(), "0");
	assertStrictEquals(g.count(), 0);
	assertStrictEquals(g.service(), 0);
	assertStrictEquals(g.timestamp(), 0);
	assertEquals(g.date(), new Date(0));
});

Deno.test("create specific shard from bigint", () => {
	const g = new Shard(0n);
	assertStrictEquals(g.num(), 0n);
	assertStrictEquals(g.str(), "0");
	assertStrictEquals(g.count(), 0);
	assertStrictEquals(g.service(), 0);
	assertStrictEquals(g.timestamp(), 0);
	assertEquals(g.date(), new Date(0));
});

Deno.test("create specific shard from string", () => {
	const g = new Shard("0");
	assertStrictEquals(g.num(), 0n);
	assertStrictEquals(g.str(), "0");
	assertStrictEquals(g.count(), 0);
	assertStrictEquals(g.service(), 0);
	assertStrictEquals(g.timestamp(), 0);
	assertEquals(g.date(), new Date(0));
});

Deno.test("clone shard", () => {
	const g = new Shard({
		count: 0,
		service: 0,
		timestamp: 0
	});
	assertStrictEquals(g.num(), 0n);
	assertStrictEquals(g.str(), "0");
	assertStrictEquals(g.count(), 0);
	assertStrictEquals(g.service(), 0);
	assertStrictEquals(g.timestamp(), 0);
	assertEquals(g.date(), new Date(0));
	const c = new Shard(g);
	assertStrictEquals(c.num(), 0n);
	assertStrictEquals(c.str(), "0");
	assertStrictEquals(c.count(), 0);
	assertStrictEquals(c.service(), 0);
	assertStrictEquals(c.timestamp(), 0);
	assertEquals(c.date(), new Date(0));
});

Deno.test("create specific shard with date", () => {
	const g = new Shard({
		count: 0,
		service: 0,
		timestamp: new Date(0)
	});
	assertStrictEquals(g.num(), 0n);
	assertStrictEquals(g.str(), "0");
	assertStrictEquals(g.count(), 0);
	assertStrictEquals(g.service(), 0);
	assertStrictEquals(g.timestamp(), 0);
	assertEquals(g.date(), new Date(0));
});

Deno.test("generate shard", () => {
	const g = new Shard();
	assertStrictEquals(g.timestamp(), Number(unpackTimestamp(g.num())));
	assertStrictEquals(g.service(), Number(unpackService(g.num())));
	assertStrictEquals(g.count(), Number(unpackCount(g.num())));
});

Deno.test("clone generated shard by string", () => {
	const g = new Shard();
	const c = new Shard(g.str());
	assertStrictEquals(c.count(), g.count());
	assertStrictEquals(c.service(), g.service());
	assertStrictEquals(c.timestamp(), g.timestamp());
	assertStrictEquals(c.num(), g.num());
	assertStrictEquals(c.str(), g.str());
});

Deno.test("to string with different base", () => {
	const g = new Shard({
		count: 4,
		service: 0,
		timestamp: 0
	});
	assertStrictEquals(g.str("0123"), "10");
	assertStrictEquals(g.str(new Base("0123")), "10");
});

Deno.test("modifications to shard", () => {
	const g = new Shard({
		count: 0,
		service: 0,
		timestamp: 0
	});
	g.count(1);
	g.service(1);
	g.timestamp(1);
	g.date(new Date(1));
	g.date(1);
	assertStrictEquals(g.num(), 1064961n);
	assertStrictEquals(g.str(), "4t2N");
	assertStrictEquals(g.count(), 1);
	assertStrictEquals(g.service(), 1);
	assertStrictEquals(g.timestamp(), 1);
	assertEquals(g.date(), new Date(1));
	g.num(1n);
	assertStrictEquals(g.num(), 1n);
});

Deno.test("create shard from longer string", () => {
	const g = new Shard("4t2N");
	assertStrictEquals(g.num(), 1064961n);
	assertStrictEquals(g.str(), "4t2N");
	assertStrictEquals(g.count(), 1);
	assertStrictEquals(g.service(), 1);
	assertStrictEquals(g.timestamp(), 1);
	assertEquals(g.date(), new Date(1));
});
