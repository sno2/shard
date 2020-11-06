// Imports
import type { Big } from "../deps.ts";
import { Base, base62, big } from "../deps.ts";
import { increment } from "./_increment.ts";
import {
	unpackCount,
	unpackService,
	unpackTimestamp,
	packCount,
	packService,
	packTimestamp,
} from "./_bits.ts";

/** The options that can be used in a shard. */
export interface ShardOptions
{
	/** The counter value to prevent duplicates. */
	count: number,
	
	/** The shard ID to prevent duplicates over multi-threaded services. */
	service: number,
	
	/** The shard's creation date. */
	timestamp: Date | number
};

/**
 * A unique identity for everyone and everything.
 */
export class Shard
{
	
	#shard: bigint = 0n;
	
	/**
	 * Generate a new shard.
	 * @param options The shard generation options.
	 */
	public constructor (options?: Partial<ShardOptions> | Shard | string | bigint, base: Base | string = base62)
	{
		if (typeof options === "string") options = Base.decode(options, base as string);
		if (options instanceof Shard)
		{
			this
				.count(options.count())
				.service(options.service())
				.timestamp(options.timestamp());
		} else if (typeof options === "bigint")
		{
			this
				.count(unpackCount(options))
				.service(unpackService(options))
				.timestamp(unpackTimestamp(options));
		} else
		{
			const count = typeof options === "object" && options !== null && typeof options.count === "number" ? options.count : increment();
			this
				.count(count)
				.service(options?.service ?? 0)
				.timestamp(options?.timestamp ?? Date.now());
		}
	}
	
	/**
	 * Get the shard as a number representative.
	 */
	public num (): bigint;
	
	/**
	 * Set the shard representative value.
	 * @param value The shard representative value.
	 */
	public num (value: bigint): this;
	
	/**
	 * Set or get the shard representative.
	 * @param value The optional shard representative value.
	 */
	public num (value?: bigint): bigint | this
	{
		if (value === undefined) return this.#shard;
		this.#shard = value;
		return this;
	}
	
	/**
	 * Get the shard represented as a string.
	 * @param base The base or alphabet to get the shard represented in.
	 */
	public str (base: Base | string = base62): string
	{
		return Base.encode(this.#shard, base as string)
	}
	
	/**
	 * Get the count (random value) of this shard.
	 */
	public count (): number;
	
	/**
	 * Set the count (random value) on this shard.
	 * @param value The count or random value.
	 */
	public count (value: Big): this;
	
	/**
	 * Get or set the count (random value) from/on this shard.
	 * @param value The count or random value.
	 */
	public count (value?: Big): this | number
	{
		if (value === undefined) return Number(unpackCount(this.#shard));
		this.#shard = packCount(this.#shard, big(value));
		return this;
	}
	
	/**
	 * Get the serviceID of the shard representative.
	 */
	public service (): number;
	
	/**
	 * Set the serviceId on this shard representative.
	 * @param value The shard/serviceID.
	 */
	public service (value: Big): this;
	
	/**
	 * Get or set the serviceID on this shard representative.
	 * @param value The shard/serviceID.
	 */
	public service (value?: Big): this | number
	{
		if (value === undefined) return Number(unpackService(this.#shard));
		this.#shard = packService(this.#shard, big(value));
		return this;
	}
	
	/**
	 * Get the timestamp from this shard.
	 */
	public timestamp (): number;
	
	/**
	 * Set the timestamp on this shard object.
	 * @param value The date object or timestamp.
	 */
	public timestamp (value: Date | number | bigint | string): this;
	
	/**
	 * Get or set the timestamp on this shard.
	 * @param value The date object or timestamp.
	 */
	public timestamp (value?: Date | number | bigint | string): this | number
	{
		if (value === undefined) return Number(unpackTimestamp(this.#shard));
		this.#shard = packTimestamp(this.#shard, big(new Date(typeof value === "bigint" ? Number(value) : value).getTime()));
		return this;
	}
	
	/**
	 * Get the timestamp as a date object.
	 */
	public date (): Date;
	
	/**
	 * Set the timestamp on this shard object.
	 * @param value The date object or timestamp.
	 */
	public date (value: Date | number | bigint | string): this;
	
	/**
	 * Get or set the date on this shard object.
	 * @param value The date object or timestamp.
	 */
	public date (value?: Date | number | bigint | string): this | Date
	{
		if (value === undefined) return new Date(this.timestamp());
		return this.timestamp(value);
	}
	
}
