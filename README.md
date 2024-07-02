# base41
Base41 encoding stringify and parse functions.

Base41 encoding converts every pair of bytes into trio of characters.
This implementation uses alphabet '0123456789abcdefghijkLmnopqrstuvwxyzABCDE' without padding for readability and URL friendliness.

Base41 encoding results in string representation 25% shorter than base16 encoding that uses 2 characters for every byte.

While base64 encoding that uses 4 characters for every 3 bytes results in shorter string representation,
 the advantage over base41 is not realized for shorter byte sequences.
For example, 8 byte sequence encoded with either base64 or base41 will result in 12 character long string,
 and 16 byte sequence encoded with either base64 or base41 will result in 24 character long string.

Target: ES2022 [browser+NodeJS][ESM+CJS].

### stringify
Returns the base41 encoded string.
If buffer has odd length, then the last byte is encoded into a single character or a pair of characters.

### parse
Returns buffer decoded from the base41 encoded string.
If base41 encoded string length is not equal to multiples of 3 then remaining 1 or 2 characters are decoded as a single byte.

### parseInto
Write byte sequence parsed from the base41 encoded string into the destination buffer.

### stringifyCode
Returns base41 string representation.
From '000' to 'CEh' for a pair of bytes (0 - 65535),
 and from '0' to '69' for a byte (0 - 255).

### parseCode
Returns code point of base41 string.
From 0 to 65535 for a trio of characters ('000' - 'CEh'),
 and from 0 to 255 otherwise ('0' - '69').

### byteLength
Returns the number of bytes to be parsed from base41 encoded string.
