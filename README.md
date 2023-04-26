# ubdt
Ubiquitous Binary Data Transformation

The collection of useful functions to deal with multitude of common routines with binary data, be it ArrayBuffer, DataView, or Date.
Includes helper function for proper JSON string composing and parsing that supports most commonly used types, basic hash code and random number generators.
All of those should have been a part of JS/TS standard library, but alas.

Target: ES2020

## BinaryData

### rotateUint32BitsLeft
Returns the result of bit rotation of 32-bit unsigned integer to left

### rotateUint32BitsRight
Returns the result of bit rotation of 32-bit unsigned integer to right

### equateData
Returns true if two byte sequences contain the same bytes, false otherwise

### getBase16Dyad
Returns base 16 dyad string for code point

### getBase16DyadCodeAt
Returns code point of base 16 dyad string

### getBase41Triad
Returns base 41 triad string for code point

### getBase41TriadCodeAt
Returns code point of base 41 triad string

### getStringBufferByteLength
Returns the number of bytes in the buffer of string of specified encoding

### getString
Returns the string of specified encoding from the buffer

### getStringBuffer
Returns encoded buffer from the string of specified encoding

### setStringBuffer
Sets bytes into destination buffer from the string of specified encoding

### getBigInt
Returns the bigint decoded from the buffer

### getBigIntBuffer
Returns buffer of the bigint of specified byte length

### setBigIntBuffer
Sets buffer bytes from the bigint


## DateTime

### getDateString / getUtcDateString
Returns YYYY-MM-DD date string

### getTimeString / getUtcTimeString
Returns HH:MM:SS time string

### getDateTimeString / getUtcDateTimeString
Returns YYYY-MM-DD HH:MM:SS date-time string


## HashCode

### getFnv1a32HashCode
Returns little-endian FNV1A 32-bit hash code as number (not cryptographically secure)

### getFnv1a64HashCode
Returns little-endian FNV1A 64-bit hash code as bigint (not cryptographically secure)

### getSha256HashCodeBuffer
Returns buffer containing SHA256 256-bit hash code as ArrayBuffer (not cryptographically secure)


## JsonString

### getString
Returns JSON string with bigint, date, set, map, DataView and ArrayBuffer values wrapped into objects

### getObject
Returns object with bigint, date, set, map, DataView and ArrayBuffer values parsed from wrapper objects


## RandomNumber

### getRandomUint32
Returns pseudorandom 32-bit unsigned integer (not cryptographically secure)

### getRandomUint64
Returns pseudorandom 64-bit unsigned integer (not cryptographically secure)

### getRandomUint128
Returns pseudorandom 128-bit unsigned integer (not cryptographically secure)

### getRandomUint
Returns pseudorandom unsigned integer between 0 and specified value (not cryptographically secure)

### getRandomInt
Returns pseudorandom integer between two specified values (not cryptographically secure)

### getUuid
Returns UUID version 4 / random (not cryptographically secure)
