# base41
Base41 encoding and decoding.

Base41 encoding (3 characters for every 2 bytes) uses alphabet '0123456789abcdefghijkLmnopqrstuvwxyzABCDE' and does not require padding.
In base41 encoded string every triplet of characters is parsed into a couple of bytes.
If string length is not equal to multiples of 3 then remaining 1 or 2 characters are parsed into a single byte.

Base41 encoding results in string representation 25% shorter than base16 encoding (2 characters for every byte),
 while remaining easily readable and URL friendly.

While base64 encoding (4 characters for every 3 bytes) generally results in shorter string representation,
 the advantage over base41 is not realized for shorter byte sequences.
For example, 8 byte sequence encoded with either base64 or base41 will result in 12 character long string,
 and 16 byte sequence encoded with either base64 or base41 will result in 24 character long string.

Target: ES2022 [browser+NodeJS][ESM+CJS].

### byteString
Returns base41 string (from '0' to '69') for byte value (0 - 255).

### wordString
Returns base41 string (from '000' to 'CEh') for word value (0 - 65535).

### codeAt
Returns code point (0 - 65535) of base41 string, for example returns code point 4075 for string '2hg'.

### byteLength
Returns the number of bytes to be parsed from base41 encoded string.

### stringify
Returns the base41 encoded string.

### write
Write byte sequence decoded from the base41 encoded string into destination buffer.

### parse
Returns buffer decoded from the base41 encoded string.
