// Imports
import { increment } from "./_increment.ts";
import { assertStrictEquals, assertNotStrictEquals } from "https://deno.land/std@0.76.0/testing/asserts.ts";

let lastTest = 0;

Deno.test("reset 1", () => assertStrictEquals(increment(0), 0));
Deno.test("reset 2", () => assertStrictEquals(increment(0), 0));
Deno.test("increment 1", () => assertStrictEquals(increment(3), lastTest++));
Deno.test("increment 2", () => assertStrictEquals(increment(3), lastTest++));
Deno.test("increment 3", () => assertStrictEquals(increment(3), lastTest++));
Deno.test("increment 4 reset", () => assertNotStrictEquals(increment(3), lastTest++));
