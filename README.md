# Shard

An authentic unique ID for everyone and everything.

```
64 (44) Timestamp                               20 (6) Service   14 (14) Noise 0
 00010111010101011101110111010011101111000111    000000           00000000000000
```

## Usage

The shard module is very easy to use, simply import Shard like:

```ts
// Imports
import { Shard } from "https://deno.land/x/shard/mod.ts";
```

To generate a new shard simply create a new instance of shard:

```ts
const sid = new Shard();
```

To get a string representative of the shard simply call `<Shard>.str()`.

```ts
sid.str();
// 20dLrFRw1eE
```

To get the timestamp, shard/serviceID or count simply call their respective methods:

```ts
sid.count(); // 0
sid.service(); // serviceID
sid.timestamp(); // 1603702991291
sid.date(); // 2020-10-26T09:03:31.309Z
```

You can also change either of the values by passing a value into their respective values.

To load a generated shard simply pass it into the Shard constructor as an argument.

```ts
new Shard("20dLrFRw1eE");
```

## Multi-threaded

If you're using Shard when using multiple threads or workers you should also define the serviceID in the shard object to prevent ID collisions:

```ts
new Shard({ service: 1 });
```

## Shards with Integrity

Shards with integrity is a concept very similar to JSON Web Tokens, the only differences are that an integrity shard doesn't store header info or JSON data. An integrity shard stores a hash, expiration timestamp, last updated timestamp and issued at timestamp, version and the shard (id) itself. This reaches the same goals as JWT just for storing an authentic ID. The ID cannot be manipulated, nor can any of the timestamps.

```ts
// Imports
import { IntegrityShard } from "https://deno.land/x/shard";
```

Create a new integrity shard.

```ts
const myShard = new Shard();

const token = new IntegrityShard({
	secret: "hello-world",
	shard: myShard
});

// Should be passed as Authorization header.
const Authorization = token.str();

// Should be passed as X-Refresh-Token header.
const xRefreshToken = token.getRefreshToken();
```

To verify a refresh token execute the following:

```ts
token.verifyRefreshToken(xRefreshToken);
// "refresh token expired"
// "refresh token invalid"
// undefined
```

The refresh token verification will return a string upon failure, or undefined if there are no issues with the refresh token.

To validate the integrity of the integrity shard execute the following:

```ts
token.verify();
// "token expired"
// "token invalid"
// undefined
```

The integrity shard verification will return a string upon failure, or undefined if there are no issues with the integrity shard.

### Extend integrity shard lifetime

```ts
const token = IntegrityShard.from(secret, req.headers.authorization);

// Verify that the token has not been tampered with.
const __tokenVerify = token.verify();
if (typeof __tokenVerify === "string")
	throw new Error(__tokenVerify);

const __refreshTokenVerify = token.verifyRefreshToken(req.headers["refresh-token"]);
if (typeof __refreshTokenVerify === "string")
	throw new Error(__refreshTokenVerify);

// give this new token to the client
const newIntegrityShard = token.ext();
const newToken = newIntegrityShard.str();
const newRefreshToken = newToken.getRefreshToken();
```
