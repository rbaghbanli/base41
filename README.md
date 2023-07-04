# ubdt
Ubiquitous Binary Data Transformation

The collection of useful functions to deal with multitude of common routines with binary data, be it number, ArrayBuffer, DataView, or Date.
Includes helper function for extended JSON string composing and parsing that supports most commonly used types.

Target: ES2020


## BufferService

### equate
Returns true if two byte sequences contain the same bytes, false otherwise

### getBase16Dyad
Returns base 16 dyad string for code point

### getBase16DyadCodeAt
Returns code point of base 16 dyad string

### getBase41Triad
Returns base 41 triad string for code point

### getBase41TriadCodeAt
Returns code point of base 41 triad string

### getStringByteLength
Returns the number of bytes in the buffer of string of specified encoding ( 'base16' | 'base41' | 'ascii' | 'ucs2' )

### getBigIntByteLength
Returns the number of bytes in the buffer of bigint

### toString
Returns the string of specified encoding ( 'base16' | 'base41' | 'ascii' | 'ucs2' ) from the buffer

### fromString
Returns encoded buffer from the string of specified encoding ( 'base16' | 'base41' | 'ascii' | 'ucs2' )

### setString
Sets bytes into destination buffer from the string of specified encoding ( 'base16' | 'base41' | 'ascii' | 'ucs2' )

### toBigInt
Returns the bigint decoded from the buffer

### fromBigInt
Returns buffer of the bigint of specified byte length

### setBigInt
Sets buffer bytes from the bigint

### toFnv1a32HashCode
Returns FNV1A 32-bit hash code as number (not cryptographically secure)

### toFnv1a64HashCode
Returns FNV1A 64-bit hash code as bigint (not cryptographically secure)

### toSha256HashCode
Returns SHA256 256-bit hash code as bigint (not cryptographically secure)

### toSha256HashCodeBuffer
Returns SHA256 256-bit hash code as ArrayBuffer (not cryptographically secure)


## DateService

### toString
Returns YYYY-MM-DD( HH:MM(:SS(.UUU))) or HH:MM(:SS(.UUU)) date, time or date-time string

### fromString
Returns Date from YYYY-MM-DD( HH:MM(:SS(.UUU))) date or date-time string


## IntegerService

### rotateUint32BitsLeft
Returns the result of bit rotation of 32-bit unsigned integer to left

### rotateUint32BitsRight
Returns the result of bit rotation of 32-bit unsigned integer to right

### reverseUint32Bytes
Returns the result of byte reversal of 32-bit unsigned integer

### randomizeUint32
Returns pseudorandom 32-bit unsigned integer (not cryptographically secure)

### randomizeUint64
Returns pseudorandom 64-bit unsigned integer (not cryptographically secure) as bigint

### randomizeUint128
Returns pseudorandom 128-bit unsigned integer (not cryptographically secure) as bigint

### randomizeUint
Returns pseudorandom unsigned integer between 0 and specified value (not cryptographically secure)

### randomizeInt
Returns pseudorandom integer between two specified values (not cryptographically secure)

### generateUuid
Returns UUID version 4 / random as bigint


## JsonService

### toString
Returns JSON string with bigint, Date, Set, Map, DataView and ArrayBuffer values wrapped into objects

### fromString
Returns value with bigint, Date, Set, Map, DataView and ArrayBuffer values parsed from wrapper objects
