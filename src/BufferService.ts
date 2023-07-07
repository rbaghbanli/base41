import * as IntegerService from './IntegerService';

const _BASE16_CHAR_ENCODE_STR = '0123456789abcdef';
const _BASE16_CHAR_DECODE_MAP = new Map<number, number>( _BASE16_CHAR_ENCODE_STR.split( '' ).map( ( s, i ) => [ s.charCodeAt( 0 ), i ] ) );
const _BASE16_DYAD_ENCODE_MAP = new Map<number, string>( Array.from( Array( 256 ).keys() ).map( i =>
	[ i, _BASE16_CHAR_ENCODE_STR.charAt( i >>> 4 ) + _BASE16_CHAR_ENCODE_STR.charAt( i & 0x0f ) ]
) );
const _BASE16_DYAD_DECODE_MAP = new Map<number, Map<number, number>>( Array.from( Array( 16 ).keys() ).map( i => [
	_BASE16_CHAR_ENCODE_STR.charCodeAt( i ),
	new Map<number, number>( Array.from( Array( 16 ).keys() ).map( ii => [
		_BASE16_CHAR_ENCODE_STR.charCodeAt( ii ),
		( i * 16 ) + ii
	] ) )
] ) );
const _BASE41_CHAR_ENCODE_STR = '0123456789abcdefghijklmnopqrstuvwxyzABCDE';
const _BASE41_CHAR_DECODE_MAP = new Map<number, number>( _BASE41_CHAR_ENCODE_STR.split( '' ).map( ( s, i ) => [ s.charCodeAt( 0 ), i ] ) );
const _BASE41_TRIAD_ENCODE_MAP = new Map<number, string>( Array.from( Array( 65536 ).keys() ).map( i => {
	const c1 = Math.trunc( i / 1681 );
	const r1 = i % 1681;
	const c2 = Math.trunc( r1 / 41 );
	return [ i, _BASE41_CHAR_ENCODE_STR.charAt( c1 ) + _BASE41_CHAR_ENCODE_STR.charAt( c2 ) + _BASE41_CHAR_ENCODE_STR.charAt( r1 % 41 ) ];
} ) );
const _BASE41_TRIAD_DECODE_MAP = new Map<number, Map<number, Map<number, number>>>( Array.from( Array( 41 ).keys() ).map( i => [
	_BASE41_CHAR_ENCODE_STR.charCodeAt( i ),
	new Map<number, Map<number, number>>( Array.from( Array( 41 ).keys() ).map( ii => [
		_BASE41_CHAR_ENCODE_STR.charCodeAt( ii ),
		new Map<number, number>( Array.from( Array( 41 ).keys() ).map( iii => [
			_BASE41_CHAR_ENCODE_STR.charCodeAt( iii ),
			( ( i * 41 ) + ii ) * 41 + iii
		] ) )
	] ) )
] ) );
const _FNV32_PRIME = 16777619;
const _FNV64_PRIME = new Uint32Array( [ 0x000001B3, 0x100 ] );
const _SHA256_K = [
	0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
];

/**
	Returns true if buffers contain the same bytes, false otherwise.
	@param data1 First Buffer or DataView to compare.
	@param data2 Second Buffer or DataView to compare.
	@returns True if Buffers or DataViews contain the same bytes, false otherwise.
*/
export function equate( data1: DataView | ArrayBufferLike | null | undefined, data2: DataView | ArrayBufferLike | null | undefined ): boolean {
	if ( data1 == null && data2 == null ) {
		return true;
	}
	if ( data1 == null || data2 == null ) {
		return false;
	}
	if ( data1.byteLength !== data2.byteLength ) {
		return false;
	}
	const dv1 = data1 instanceof DataView ? data1 : new DataView( data1 );
	const dv2 = data2 instanceof DataView ? data2 : new DataView( data2 );
	for ( let lfi = dv1.byteLength - 3, i = 0; i < dv1.byteLength; ) {
		if ( i < lfi ) {
			if ( dv1.getUint32( i ) !== dv2.getUint32( i ) ) {
				return false;
			}
			i += 4;
		}
		else {
			if ( dv1.getUint8( i ) !== dv2.getUint8( i ) ) {
				return false;
			}
			++i;
		}
	}
	return true;
}

/**
	Returns base 16 dyad string for code point.
	@param code Code point.
	@returns Base 16 dyad string for code point.
*/
export function getBase16Dyad( code: number ): string | undefined {
	return _BASE16_DYAD_ENCODE_MAP.get( code );
}

/**
	Returns the code point of base 16 dyad string.
	@param value Base 16 string.
	@param ix Index of dyad.
	@returns Code point of base 16 dyad string.
*/
export function getBase16DyadCodeAt( value: string, ix: number ): number | undefined {
	return _BASE16_DYAD_DECODE_MAP.get( value.charCodeAt( ix ) )?.get( value.charCodeAt( ix + 1 ) );
}

/**
	Returns base 41 triad string for code point.
	@param code Code point.
	@returns Base 41 triad string for code point.
*/
export function getBase41Triad( code: number ): string | undefined {
	return _BASE41_TRIAD_ENCODE_MAP.get( code );
}

/**
	Returns code point of base 41 triad string.
	@param value Base 41 string.
	@param ix Index of triad.
	@returns Code point of base 41 triad string.
*/
export function getBase41TriadCodeAt( value: string, ix: number ): number | undefined {
	return _BASE41_TRIAD_DECODE_MAP.get( value.charCodeAt( ix ) )?.get( value.charCodeAt( ix + 1 ) )?.get( value.charCodeAt( ix + 2 ) );
}

/**
	Returns the number of bytes in encoded string.
	@param value String of specified encoding.
	@param encoding Encoding: 'base16', 'base41', 'ascii', or 'ucs2'.
	@returns Number of bytes.
*/
export function getStringByteLength( value: string,
	encoding: 'base16' | 'base41' | 'ascii' | 'ucs2' = 'ucs2' ): number {
	switch ( encoding ) {
		case 'base16': return Math.ceil( value.length / 2 );
		case 'base41': return Math.round( value.length * 2 / 3 );
		case 'ascii': return value.length;
		default:
		case 'ucs2': return value.length * 2;
	}
}

/**
	Returns string of specified encoding decoded from the buffer.
	@param data Buffer to decode.
	@param encoding Encoding: 'base16', 'base41', 'ascii', or 'ucs2'.
	@param littleEndian True if little end first.
	@returns Decoded string.
*/
export function toString( data: DataView | ArrayBufferLike,
	encoding: 'base16' | 'base41' | 'ascii' | 'ucs2' = 'ucs2', littleEndian?: boolean ): string {
	const dv = data instanceof DataView ? data : new DataView( data );
	switch ( encoding ) {
		case 'base16': { // 2 characters per 1 byte
			let str = '';
			for ( let i = 0; i < dv.byteLength; ++i ) {
				str += _BASE16_DYAD_ENCODE_MAP.get( dv.getUint8( i ) );
			}
			return str;
		}
		case 'base41': { // 3 characters per 2 bytes + 1 or 2 characters if trailing byte
			let str = '';
			for ( let lfi = dv.byteLength - 1, i = 0; i < dv.byteLength; i += 2 ) {
				if ( i < lfi ) {
					str += _BASE41_TRIAD_ENCODE_MAP.get( dv.getUint16( i, littleEndian ) );
				}
				else {
					const c = dv.getUint8( i );
					if ( c < 41 ) {
						str += _BASE41_CHAR_ENCODE_STR.charAt( c );
					}
					else {
						str += _BASE41_CHAR_ENCODE_STR.charAt( Math.trunc( c / 41 ) );
						str += _BASE41_CHAR_ENCODE_STR.charAt( c % 41 );
					}
				}
			}
			return str;
		}
		case 'ascii': { // 1 character per 1 bytes
			let str = '';
			for ( let i = 0; i < dv.byteLength; ++i ) {
				str += String.fromCharCode( dv.getUint8( i ) );
			}
			return str;
		}
		default:
		case 'ucs2': { // 1 character per 2 bytes + 1 character if trailing byte
			let str = '';
			for ( let lfi = dv.byteLength - 1, i = 0; i < dv.byteLength; i += 2 ) {
				if ( i < lfi ) {
					str += String.fromCharCode( dv.getUint16( i, littleEndian ) );
				}
				else {
					str += String.fromCharCode( dv.getUint8( i ) );
				}
			}
			return str;
		}
	}
}

/**
	Sets buffer bytes from the string of specified encoding.
	@param data Sufficiently long destination buffer.
	@param value String to encode.
	@param encoding Encoding: 'base16', 'base41', 'ascii', or 'ucs2'.
	@param littleEndian True if little end first.
	@returns Decoded binary data.
*/
export function setString( data: DataView | ArrayBufferLike, value: string,
	encoding: 'base16' | 'base41' | 'ascii' | 'ucs2' = 'ucs2', littleEndian?: boolean ): ArrayBuffer {
	if ( data.byteLength < getStringByteLength( value, encoding ) ) {
		throw new RangeError( 'insufficient destination binary data length' );
	}
	const dv = data instanceof DataView ? data : new DataView( data );
	switch ( encoding ) {
		case 'base16': { // 1 byte per 2 characters + 1 byte if trailing character
			for ( let lfi = value.length - 1, i = 0, bi = 0; i < value.length; ++i, ++bi ) {
				if ( i < lfi ) {
					dv.setUint8(
						bi,
						_BASE16_DYAD_DECODE_MAP.get( value.charCodeAt( i ) )?.get( value.charCodeAt( ++i ) ) ?? 0
					);
				}
				else {
					dv.setUint8( bi, _BASE16_CHAR_DECODE_MAP.get( value.charCodeAt( i ) ) ?? 0 );
				}
			}
			return dv.buffer;
		}
		case 'base41': { // 2 bytes per 3 characters + 1 byte if trailing 1 or 2 characters
			for ( let lfi = value.length - 2, i = 0, bi = 0; i < value.length; ++i, bi += 2 ) {
				if ( i < lfi ) {
					dv.setUint16(
						bi,
						_BASE41_TRIAD_DECODE_MAP.get( value.charCodeAt( i ) )?.get( value.charCodeAt( ++i ) )?.get( value.charCodeAt( ++i ) ) ?? 0,
						littleEndian
					);
				}
				else {
					let c = _BASE41_CHAR_DECODE_MAP.get( value.charCodeAt( i ) ) ?? 0;
					if ( ++i < value.length ) {
						c = ( c * 41 ) + ( _BASE41_CHAR_DECODE_MAP.get( value.charCodeAt( i ) ) ?? 0 );
					}
					dv.setUint8( bi, c );
				}
			}
			return dv.buffer;
		}
		case 'ascii': { // 1 byte per 1 character
			for ( let i = 0; i < value.length; ++i ) {
				dv.setUint8( i, value.charCodeAt( i ) );
			}
			return dv.buffer;
		}
		default:
		case 'ucs2': { // 2 bytes per 1 character
			for ( let i = 0, bi = 0; i < value.length; ++i, bi += 2 ) {
				dv.setUint16( bi, value.charCodeAt( i ), littleEndian );
			}
			return dv.buffer;
		}
	}
}

/**
	Returns buffer of the string of specified encoding.
	@param value String to encode.
	@param encoding Encoding: 'base16', 'base41', 'ascii', or 'ucs2'.
	@param littleEndian True if little end first.
	@returns Encoded buffer.
*/
export function fromString( value: string,
	encoding: 'base16' | 'base41' | 'ascii' | 'ucs2' = 'ucs2', littleEndian?: boolean ): ArrayBuffer {
	return setString( new ArrayBuffer( getStringByteLength( value, encoding ) ), value, encoding, littleEndian );
}

/**
	Returns the number of bytes in encoded bigint.
	@param value BigInt value.
	@returns Number of bytes.
*/
export function getBigIntByteLength( value: bigint ): number {
	let byteLength = 0;
	let v = value;
	do {
		++byteLength;
		v >>= 8n;
	}
	while ( v > 0n || v < -1n );
	return byteLength;
}

/**
	Returns bigint decoded from the buffer.
	@param data Buffer to decode.
	@param littleEndian True if little end first.
	@returns Decoded bigint.
*/
export function toBigInt( data: DataView | ArrayBufferLike, littleEndian?: boolean ): bigint {
	const dv = data instanceof DataView ? data : new DataView( data );
	let v = 0n;
	if ( dv.byteLength > 0 ) {
		if ( littleEndian ) {
			v = BigInt( dv.getInt8( dv.byteLength - 1 ) )
			for ( let i = dv.byteLength - 2; i > -1; --i ) {
				v = ( v << 8n ) | BigInt( dv.getUint8( i ) );
			}
		}
		else {
			v = BigInt( dv.getInt8( 0 ) );
			for ( let i = 1; i < dv.byteLength; ++i ) {
				v = ( v << 8n ) | BigInt( dv.getUint8( i ) );
			}
		}
	}
	return v;
}

/**
	Sets buffer bytes from the bigint.
	@param data Destination buffer.
	@param value Bigint to encode.
	@param littleEndian True if little end first.
	@returns Encoded buffer.
*/
export function setBigInt( data: DataView | ArrayBufferLike, value: bigint, littleEndian?: boolean ): ArrayBuffer {
	const dv = data instanceof DataView ? data : new DataView( data );
	let v = value;
	if ( littleEndian ) {
		for ( let i = 0; i < dv.byteLength; ++i ) {
			dv.setUint8( i, Number( v & 0xffn ) );
			v >>= 8n;
		}
	}
	else {
		for ( let i = dv.byteLength - 1; i >= 0; --i ) {
			dv.setUint8( i, Number( v & 0xffn ) );
			v >>= 8n;
		}
	}
	return dv.buffer;
}

/**
	Returns encoded buffer of the bigint.
	@param value Bigint to encode.
	@param littleEndian True if little end first.
	@returns Encoded buffer.
*/
export function fromBigInt( value: bigint, littleEndian?: boolean ): ArrayBuffer {
	return setBigInt( new ArrayBuffer( getBigIntByteLength( value ) ), value, littleEndian );
}

/**
	Returns FNV1A 32-bit hash code (not cryptographically secure).
	@param data Binary data to hash.
	@param littleEndian True if little end first.
	@returns FNV1A 32-bit hash code.
*/
export function toFnv1a32HashCode( data: DataView | ArrayBufferLike, littleEndian?: boolean ): number {
	const dv = data instanceof DataView ? data : new DataView( data );
	let hc = 2166136261;
	for ( let i = 0; i < dv.byteLength; ++i ) {
		hc = ( hc ^ dv.getUint8( i ) ) >>> 0;
		hc = Math.imul( hc, _FNV32_PRIME ) >>> 0;
	}
	return littleEndian ?
		hc :
		IntegerService.reverseUint32Bytes( hc );
}

/**
	Returns FNV1A 64-bit hash code (not cryptographically secure).
	@param data Binary data to hash.
	@param littleEndian True if little end first.
	@returns FNV1A 64-bit hash code.
*/
export function toFnv1a64HashCode( data: DataView | ArrayBufferLike, littleEndian?: boolean ): bigint {
	const dv = data instanceof DataView ? data : new DataView( data );
	const hc = new Uint32Array( [ 0x84222325, 0xcbf29ce4 ] ); // little-endian offset basis
	for ( let i = 0; i < dv.byteLength; ++i ) {
		hc[ 0 ] = ( hc[ 0 ] ^ dv.getUint8( i ) ) >>> 0;
		hc[ 0 ] = Math.imul( hc[ 0 ], _FNV64_PRIME[ 0 ] ) >>> 0;
		hc[ 1 ] = ( Math.imul( hc[ 0 ], _FNV64_PRIME[ 1 ] ) + Math.imul( hc[ 1 ], _FNV64_PRIME[ 0 ] ) ) >>> 0;
	}
	return littleEndian ?
		( BigInt( hc[ 1 ] ) << 32n ) | BigInt( hc[ 0 ] ) :
		( BigInt( IntegerService.reverseUint32Bytes( hc[ 0 ] ) ) << 32n ) | BigInt( IntegerService.reverseUint32Bytes( hc[ 1 ] ) );
}

/**
	Returns the buffer containing SHA256 256-bit hash code (not cryptographically secure).
	@param data Binary data to hash.
	@returns Buffer containing SHA256 256-bit hash code.
*/
export function toSha256HashCodeBuffer( data: DataView | ArrayBufferLike ): ArrayBuffer {
	const dv = data instanceof DataView ? data : new DataView( data );
	const bc = Math.ceil( ( dv.byteLength + 1 + 8 ) / 64 );	// block count
	const lbi = bc - 1;	// last block index
	const h = [ 0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19 ];
	const v = new Array<number>( 8 );	// a, b, c, d, e, f, g, h
	const w = new Array<number>( 64 );
	for ( let bi = 0; bi < bc; ++bi ) {	// block index
		let wc = 16;	// word count
		if ( bi === lbi ) {	// if last block short iteration as last 2 words are data bit length
			wc = 14;
			w[ 14 ] = Math.floor( dv.byteLength / 536870912 );	// higher word of data bit length = data byte length * 8 / 2**32
			w[ 15 ] = ( dv.byteLength << 3 ) >>> 0; // lower word of data bit length
		}
		for ( let wi = 0; wi < wc; ++wi ) {	// word index to load data into worksheet
			w[ wi ] = 0;
			for ( let oi = 0; oi < 4; ++oi ) {	// octet index
				const doi = ( bi * 64 ) + ( wi << 2 ) + oi;	// data octet index = block index * block length + word index * word length + octet index
				const octet = doi < dv.byteLength ? dv.getUint8( doi ) : ( doi === dv.byteLength ? 0x80 : 0 );
				w[ wi ] |= octet << ( ( 3 - oi ) << 3 );
			}
		}
		for ( let wi = 16; wi < 64; ++wi ) {	// word index to extend data in worksheet
			const s15 = w[ wi - 15 ];
			const s2 = w[ wi - 2 ];
			const s0 = ( IntegerService.rotateUint32BitsRight( s15, 7 ) ^ IntegerService.rotateUint32BitsRight( s15, 18 ) ^ ( s15 >>> 3 ) ) >>> 0;
			const s1 = ( IntegerService.rotateUint32BitsRight( s2, 17 ) ^ IntegerService.rotateUint32BitsRight( s2, 19 ) ^ ( s2 >>> 10 ) ) >>> 0;
			w[ wi ] = ( w[ wi - 16 ] + s0 + w[ wi - 7 ] + s1 ) >>> 0;
		}
		for ( let i = 0; i < 8; ++i ) {
			v[ i ] = h[ i ];
		}
		for ( let wi = 0; wi < 64; ++wi ) {	// word index to perform compression loop
			const s1 = ( IntegerService.rotateUint32BitsRight( v[ 4 ] /* e */, 6 ) ^
				IntegerService.rotateUint32BitsRight( v[ 4 ] /* e */, 11 ) ^
				IntegerService.rotateUint32BitsRight( v[ 4 ] /* e */, 25 ) ) >>> 0;
			const ch = ( ( v[ 4 ] /* e */ & v[ 5 ] /* f */ ) ^ ( ( ~v[ 4 ] /* e */ ) & v[ 6 ] /* g */ ) ) >>> 0;
			const t1 = ( v[ 7 ] /* h */ + s1 + ch + _SHA256_K[ wi ] + w[ wi ] ) >>> 0;
			const s0 = ( IntegerService.rotateUint32BitsRight( v[ 0 ] /* a */, 2 ) ^
				IntegerService.rotateUint32BitsRight( v[ 0 ] /* a */, 13 ) ^
				IntegerService.rotateUint32BitsRight( v[ 0 ] /* a */, 22 ) ) >>> 0;
			const maj = ( ( v[ 0 ] /* a */ & v[ 1 ] /* b */ ) ^ ( v[ 0 ] /* a */ & v[ 2 ] /* c */ ) ^ ( v[ 1 ] /* b */ & v[ 2 ] /* c */ ) ) >>> 0;
			const t2 = ( s0 + maj ) >>> 0;
			v[ 7 ] /* h */ = v[ 6 ]; /* g */
			v[ 6 ] /* g */ = v[ 5 ]; /* f */
			v[ 5 ] /* f */ = v[ 4 ]; /* e */
			v[ 4 ] /* e */ = ( v[ 3 ] /* d */ + t1 ) >>> 0;
			v[ 3 ] /* d */ = v[ 2 ]; /* c */
			v[ 2 ] /* c */ = v[ 1 ]; /* b */
			v[ 1 ] /* b */ = v[ 0 ]; /* a */
			v[ 0 ] /* a */ = ( t1 + t2 ) >>> 0;
		}
		for ( let i = 0; i < 8; ++i ) {
			h[ i ] = ( h[ i ] + v[ i ] ) >>> 0;
		}
	}
	const hc = new Uint8Array( 32 );
	for ( let i = 0; i < 8; ++i ) {
		for ( let oi = 0; oi < 4; ++oi ) {	// octet index
			hc[ ( i << 2 ) + oi ] = h[ i ] >>> ( ( 3 - oi ) << 3 );
		}
	}
	return hc.buffer;
}

/**
	Returns SHA256 256-bit hash code (not cryptographically secure).
	@param data Binary data to hash.
	@param littleEndian True if little end first.
	@returns Bigint containing SHA256 256-bit hash code.
*/
export function toSha256HashCode( data: DataView | ArrayBufferLike, littleEndian?: boolean ): bigint {
	return toBigInt( toSha256HashCodeBuffer( data ), littleEndian );
}
