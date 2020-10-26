# Shard

A unique ID for everyone and everything.

```
64 (44) Timestamp                            20 (6) Shard 14 (14) Noise 0
 00010111010101011101110111010011101111000111 000000       00000000000000
```

## Usage

The shard module is very easy to use, simply import Shard like:

```ts
// Imports
import Shard from "https://deno.land/x/shard/mod.ts";
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
sid.shard(); // serviceID
sid.timestamp(); // 1603702991291
sid.date(); // 2020-10-26T09:03:31.309Z
```

You can also change either of the values by passing a value into their respective values.

To load a generated shard simply pass it into the Shard constructor as an argument.

```ts
new Shard("20dLrFRw1eE");
```
