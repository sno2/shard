// Imports
import type { Message } from "../deps2.ts";
import { big } from "../deps.ts";
import { HmacSha256 } from "../deps2.ts";
import { eight, thousand, zero } from "./_constants.ts";

/**
 * Turn a date with milliseconds to a timestamp without.
 * @param from The date/timestamp.
 */
export function fromDate (from: Date | number | bigint): bigint
{
	return BigInt(new Date(typeof from === "bigint" ? Number(from) : from).getTime()) / thousand;
}

/**
 * hmac using sha256.
 * @param secret The secret.
 * @param content The content.
 */
export function hash (secret: Message, content: Message): bigint
{
	return new HmacSha256(secret).update(content).digest().reduce((number, byte, index) => number | (big(byte) << (eight * big(index))), zero);
}
