# ubdt
Ubiquitous Binary Data Transformation

Set of ubiquitous binary data transformation functions, including encoding, bitwise and hash functions.


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

### getDataLength
Returns the number of decoded bytes in string containing encoded bytes

### getString
Returns the string containing encoded bytes

### getBuffer
Returns the buffer containing decoded bytes

### setData
Returns the binary set with decoded bytes


## DateTime

### getDateString / getUtcDateString
Returns YYYY-MM-DD date string

### getTimeString / getUtcTimeString
Returns HH:MM:SS time string

### getDateTimeString / getUtcDateTimeString
Returns YYYY-MM-DD HH:MM:SS date-time string


## HashCode

### getFnv1a32HashCode
Returns little-endian FNV1A 32-bit hash code

### getFnv1a64HashCode
Returns little-endian FNV1A 64-bit hash code

### getSha256HashCodeBuffer
Returns buffer containing SHA256 256-bit hash code


## JsonString

### getString
Returns JSON string with bigint and date values wrapped into objects

### getObject
Returns object with bigint and date values parsed from wrapping objects


## RandomNumber

### getRandomUint32
Returns random 32-bit unsigned integer

### getRandomUint64
Returns random 64-bit unsigned integer

### getRandomUint128
Returns random 128-bit unsigned integer

### getRandomUint
Returns random unsigned integer between 0 and specified value
