// Imports
import type { Big } from "../deps.ts";
import type { Message } from "../deps2.ts";
import type { ShardConstructorOptions } from "./Shard.ts";
import { Base, base62 } from "../deps.ts";
import { Shard } from "./Shard.ts";
import { thousand, b40, b256_40_40_40_64, expSize } from "./_constants.ts";
import { fromDate, hash } from "./_util.ts";
import {
	packVersion,
	packExpiresAt,
	packIssuedAt,
	packUpdatedAt,
	packHash,
	unpackVersion,
	unpackExpiresAt,
	unpackIssuedAt,
	unpackUpdatedAt,
	unpackHash
} from "./_bits.ts";

/**
 * The options that can be passed into an integrity shard.
 */
export interface IntegrityShardOptions
{
	/** The secret key used to place integrity on the shard. */
	secret: Message;
	
	/** The shard itself. */
	shard?: ShardConstructorOptions;
	
	/**
	 * The base or alphabet used to deconstruct a string
	 * representative of a shard.
	 */
	base?: Base | string;
	
	/** The expiration date or timestamp of the shard. */
	exp?: string | number | bigint | Date;
	
	/** The date or timestamp the shard was integrited. */
	iat?: string | number | bigint | Date;
	
	/** The date or timestamp the shard integrity was updated. */
	upd?: string | number | bigint | Date;
	
	/** The version of this integrity token. */
	v?: number | bigint;
	
	/** The integrity hash of the shard. */
	hash?: bigint;
}

/**
 * A secure shard with integrity. You can trust it. I promise.
 */
export class IntegrityShard extends Shard
{
	
	/**
	 * Turn a string or bigint representation of an
	 * integrity shard into an integrity shard object.
	 * @param secret The hmac secret.
	 * @param iShard The integrity shard to decode.
	 */
	public static from (secret: Message, iShard: IntegrityShard | bigint | string, base: Base | string = base62): IntegrityShard
	{
		if (iShard instanceof IntegrityShard) return new IntegrityShard({
			secret,
			base,
			shard: iShard,
			exp: iShard.expiresAt,
			iat: iShard.issuedAt,
			upd: iShard.updatedAt,
			hash: iShard.hash,
			v: iShard.version
		});
		iShard = typeof iShard === "string" ? Base.decode(iShard, base as any) : iShard;
		return new IntegrityShard({
			secret,
			base,
			shard: iShard,
			exp: unpackExpiresAt(iShard),
			iat: unpackIssuedAt(iShard),
			upd: unpackUpdatedAt(iShard),
			hash: unpackHash(iShard),
			v: unpackVersion(iShard)
		});
	}
	
	#secret: Message;
	
	#exp: number;
	#iat: number;
	#upd: number;
	#v: number;
	#hash: bigint;
	
	public get expiresAt (): number { return this.#exp; }
	public get issuedAt (): number { return this.#iat; }
	public get updatedAt (): number { return this.#upd; }
	public get version (): number { return this.#v; }
	public get hash (): bigint { return this.#hash; }
	public get lifetimeGuess (): number { return this.#exp - this.#upd; }
	
	/**
	 * Create a new shard with integrity.
	 * @param options The shard integrity options.
	 */
	public constructor (options: IntegrityShardOptions)
	{
		// Initiate the shard.
		super(options.shard as any, (options.base ?? base62) as any);
		this.#secret = options.secret;
		this.#v = Number(options.v ?? 0);
		this.#iat = Number(fromDate(Number(options.iat ?? Date.now()))) * 1000;
		this.#exp = Number(fromDate(Number(options.exp ?? (this.#iat + 60_000)))) * 1000;
		this.#upd = Number(fromDate(Number(options.upd ?? this.#iat))) * 1000;
		super.num(packVersion(this.num(), BigInt(this.#v)));
		super.num(packIssuedAt(this.num(), fromDate(this.#iat)));
		super.num(packUpdatedAt(this.num(), fromDate(this.#upd)));
		super.num(packExpiresAt(this.num(), fromDate(this.#exp)));
		this.#hash = options.hash ?? hash(this.#secret, base62.encode(this.num()));
		super.num(packHash(super.num(), this.#hash))
	}
	
	/**
	 * Clone the integrity shard.
	 */
	protected clone (overrides?: Omit<IntegrityShardOptions, "base" | "shard" | "secret">): IntegrityShard
	{
		overrides ??= {};
		overrides.exp ??= this.expiresAt;
		overrides.iat ??= this.issuedAt;
		overrides.upd ??= this.updatedAt;
		overrides.v ??= this.version;
		return new (this.constructor as any)({
			secret: this.#secret,
			shard: this,
			...overrides
		});
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
		if (value === undefined) return super.num();
		throw new Error("For integrity reasons this feature has been disabled.");
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
	public count (value?: Big): number | this
	{
		if (value === undefined) return super.count();
		throw new Error("For integrity reasons this feature has been disabled.");
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
	public service (value?: Big): number | this
	{
		if (value === undefined) return super.service();
		throw new Error("For integrity reasons this feature has been disabled.");
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
	public timestamp (value?: Date | number | bigint | string): number | this
	{
		if (value === undefined) return super.timestamp();
		throw new Error("For integrity reasons this feature has been disabled.");
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
	public date (value?: Date | number | bigint | string): Date | this
	{
		if (value === undefined) return new Date(this.timestamp());
		throw new Error("For integrity reasons this feature has been disabled.");
	}
	
	/**
	 * Extend the lifetime of this integrited shard.
	 * @param lifetime The amount of seconds to extend the
	 * lifetime by, or a date object for the new expiration
	 * timestamp.
	 */
	public ext (lifetime: Date | number | bigint | string = this.lifetimeGuess): IntegrityShard
	{
		const now = Date.now();
		return this.clone({
			upd: now,
			exp: new Date((lifetime instanceof Date || typeof lifetime === "string") ? lifetime : Number(lifetime) + now)
		});
	}
	
	/**
	 * Fetch a refresh token for this integrited shard.
	 * @param exp The amount of seconds the token should live for.
	 * @param since The timestamp of which the refresh
	 *  token should work from, if set to true the exp
	 *  param will act as the timestamp the refresh token
	 *  will expire.
	 */
	public getRefreshToken (exp: bigint | number = 86_400_000, since: Date | number | bigint | true = Date.now()): string
	{
		const _exp = fromDate(typeof since === "boolean" && since === true ? exp : (new Date(since instanceof Date ? since : Number(since)).getTime() + (Number(exp) * 1000)));
		return base62.encode((hash(this.#secret, base62.encode((this.num() << 40n) | _exp)) << 40n) | _exp);
	}
	
	/**
	 * Verify that some refresh token is valid against this
	 * integrity shard.
	 * @param token The refresh token.
	 */
	public verifyRefreshToken (token: string, since: Date | number | bigint | string = Date.now()): void | "refresh token expired" | "refresh token invalid"
	{
		const _since = fromDate(typeof since === "string" ? new Date(since) : since);
		const _ = base62.decode(token);
		const _exp = _ & b40;
		if (_since >= _exp) return "refresh token expired";
		return _ !== ((hash(this.#secret, base62.encode((this.num() << expSize) | _exp)) << expSize) | _exp)
			? "refresh token invalid"
			: undefined;
	}
	
	/**
	 * Verify that the integrity shard is still valid, and
	 * has not been manipulated.
	 */
	public verify (since: Date | number | bigint | string = Date.now()): void | "token expired" | "token invalid"
	{
		const _since = fromDate(typeof since === "string" ? new Date(since) : since);
		if (_since * thousand >= this.#exp) return "token expired";
		const _hash = this.num() & b256_40_40_40_64;
		const _ = this.num() - _hash;
		
	}
	
	/**
	 * Get the shard object out of this integrity shard.
	 */
	public shard (): Shard
	{
		return new Shard(this);
	}
	
}
