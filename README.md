# ubdt
Ubiquitous Binary Data Transformation

The collection of ubiquitous functions to deal with multitude of common routines with binary data,
 be it integer, Date, ArrayBuffer or DataView.

Target: ES2020 [browser or NodeJS].


## BufferService
Service includes base 41 encoding and decoding functions.
Base 41 encoding (3 characters for every pair of bytes) results in string representation shorter than base 16 encoding,
 while remaining URL friendly.
Base 41 encoding can be compared to most popular base 64 encoding (4 characters for every 3 bytes).
Base 64 encoding results in shorter string representation, but the advantage over base 41 is not always realized.
For example, 8 bytes encoded with either base 64 or base 41 will result in 12 character long string.
16 bytes encoded with either base 64 or base 41 will result in 24 character long string.
As such, encoding binary GUIDs yields no advantage to base 64 encoding.
Once byte sequences get longer, then base 64 ecoding produces shorter string representation.

### equate
Returns true if two buffers contain the same bytes, false otherwise.

### getBase16Dyad
Returns base 16 dyad string (2 characters) for a code point (1 byte), for example '4b' for code point 75.

### getBase16DyadCodeAt
Returns the code point (1 byte) of base 16 dyad string (2 characters).

### getBase41Triad
Returns base 41 triad string (3 characters) for code point (2 bytes), for example '2hg' for code point 4075.

### getBase41TriadCodeAt
Returns code point (2 bytes) of base 41 triad string.

### getStringByteLength
Returns the number of bytes in the buffer of string of specified encoding ('base16'|'base41'|'ascii'|'ucs2').

### getBigIntByteLength
Returns the number of bytes in the buffer of bigint.

### toString
Returns the string of specified encoding ('base16'|'base41'|'ascii'|'ucs2') from the buffer.

### fromString
Returns encoded buffer from the string of specified encoding ('base16'|'base41'|'ascii'|'ucs2').

### setString
Sets bytes into destination buffer from the string of specified encoding ('base16'|'base41'|'ascii'|'ucs2').

### toBigInt
Returns the bigint decoded from the buffer.

### fromBigInt
Returns buffer of the bigint of specified byte length.

### setBigInt
Sets buffer bytes from the bigint.

### getFnv1a32HashCode
Returns FNV1A 32-bit hash code as number (not cryptographically secure).

### getFnv1a64HashCode
Returns FNV1A 64-bit hash code as bigint (not cryptographically secure).

### getSha256HashCode
Returns SHA256 256-bit hash code as bigint (not cryptographically secure).

### getSha256HashCodeBuffer
Returns SHA256 256-bit hash code as ArrayBuffer (not cryptographically secure).


## DateService
Universal and convinent date-time string format support.

### toString
Returns YYYY-MM-DD[ HH:MM[:SS[.UUU]]] or HH:MM[:SS[.UUU]] date/time/date-time string.

### fromString
Returns Date from YYYY-MM-DD[ HH:MM[:SS[.UUU]]] date/date-time string.


## IntegerService
Service provides additional bitwise operations and randomization functions.

### rotateUint32BitsLeft
Returns the result of bit rotation of 32-bit unsigned integer to left.

### rotateUint32BitsRight
Returns the result of bit rotation of 32-bit unsigned integer to right.

### reverseUint32Bytes
Returns the result of byte reversal of 32-bit unsigned integer.

### randomizeUint32
Returns pseudorandom 32-bit unsigned integer.
Not cryptographically secure.

### randomizeUint64
Returns pseudorandom 64-bit unsigned integer as bigint.
Not cryptographically secure.

### randomizeUint128
Returns pseudorandom 128-bit unsigned integer as bigint.
Not cryptographically secure.

### randomizeUint
Returns pseudorandom unsigned integer between 0 and specified value.
Not cryptographically secure.

### randomizeInt
Returns pseudorandom integer between two specified values.
Not cryptographically secure.

### generateUuid
Returns UUID version 4 / random as bigint.
Not cryptographically secure.


## JsonService
Helper functions for extended JSON stringification and parsing that supports most commonly used value types,
 such as bigint, Date, Set, Map, DataView and ArrayBuffer.

### replace
JSON replacer function. Replaces extended type values with wrapper objects.

### revive
JSON reviver function. Revives extended type values from wrapper objects.

### toString
Returns JSON string with extended type values wrapped into objects.

### fromString
Returns value with extended type values parsed from wrapper objects.
