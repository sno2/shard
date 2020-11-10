export const zero = 0n;
export const one = 1n;
export const two = 2n;
export const eight = 8n;
export const thousand = 1000n;

// 2n ** 40n - 1n
export const b40 = 1099511627775n;

// ( 2n ** 256n - 1n ) << 240n
export const b256_40_40_40_64 = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000000000000000000000000000000000000000000n;

export const defaultNoiseLength = 14;
export const defaultMaxNoise = 2 ** defaultNoiseLength - 1;

export const countPos = 0n;
export const countSize = 14n;
export const servicePos = 14n;
export const serviceSize = 6n;
export const timestampPos = 20n;
export const timestampSize = 44n;

export const versionPos = 64n;
export const versionSize = 16n;
export const iatPos = 80n;
export const iatSize = 40n;
export const expPos = 120n;
export const expSize = 40n;
export const updPos = 160n;
export const updSize = 40n;
export const hashPos = 200n;
export const hashSize = 256n;
