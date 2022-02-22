# ubdt
Ubiquitous Binary Data Transformation

Set of ubiquitous binary data transformation functions, including encoding, bitwise and hash functions.


## Bit Operation

### Bit_Operation.rotate_uint32_left
Returns the result of bit rotation of 32-bit unsigned integer to left

### Bit_Operation.rotate_uint32_right
Returns the result of bit rotation of 32-bit unsigned integer to right


## Data Transformation

### Data_Transformation.get_date_string
Returns YYYY-MM-DD date string

### Data_Transformation.get_time_string
Returns HH:MM:SS time string

### Data_Transformation.equal_data
Returns true if two byte sequences contain the same bytes, false otherwise

### Data_Transformation.get_base16_dyad
Returns base 16 dyad string for code point

### Data_Transformation.get_base16_dyad_code_at
Returns code point of base 16 dyad string

### Data_Transformation.get_base41_triad
Returns base 41 triad string for code point

### Data_Transformation.get_base41_triad_code_at
Returns code point of base 41 triad string

### Data_Transformation.get_data_length_from_string
Returns the number of decoded bytes in string containing encoded bytes

### Data_Transformation.get_string_from_data
Returns the string containing encoded bytes

### Data_Transformation.get_buffer_from_string
Returns the buffer containing decoded bytes

### Data_Transformation.set_data_from_string
Returns the binary set with decoded bytes


## Hash Code

### Hash_Code.get_fnv1a32_hash_code
Returns little-endian FNV1A 32-bit hash code

### Hash_Code.get_fnv1a64_hash_code
Returns little-endian FNV1A 64-bit hash code

### Hash_Code.get_sha256_hash_code
Returns buffer containing SHA256 256-bit hash code


## Random Number

### Random_Number.random_uint32
Returns random 32-bit unsigned integer

### Random_Number.random_uint64
Returns random 64-bit unsigned integer

### Random_Number.random_uint128
Returns random 128-bit unsigned integer

### Random_Number.get_random_uint
Returns random unsigned integer between 0 and specified value
