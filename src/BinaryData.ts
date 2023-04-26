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

export class BinaryData {

	/**
		Returns the result of bit rotation of 32-bit natural number to left
		@param value 32-bit number
		@param shift number of bits to rotate by
		@returns the result of bit rotation of 32-bit natural number to left
	*/
	static rotateUint32BitsLeft( value: number, shift: number ): number {
		return ( ( value << shift ) | ( value >>> ( 32 - shift ) ) ) >>> 0;
	}

	/**
		Returns the result of bit rotation of 32-bit natural number to right
		@param value 32-bit number
		@param shift number of bits to rotate by
		@returns the result of bit rotation of 32-bit natural number to right
	*/
	static rotateUint32BitsRight( value: number, shift: number ): number {
		return ( ( value >>> shift ) | ( value << ( 32 - shift ) ) ) >>> 0;
	}

	/**
		Returns true if binary data sets contain the same bytes, false otherwise
		@param data1 binary data to compare
		@param data2 binary data to compare
		@returns true if binary data sets contain the same bytes, false otherwise
	*/
	static equateData( data1: DataView | ArrayBufferLike | null | undefined, data2: DataView | ArrayBufferLike | null | undefined ): boolean {
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
		Returns base 16 dyad string for code point
		@param code code point
		@returns base 16 dyad string for code point
	*/
	static getBase16Dyad( code: number ): string | undefined {
		return _BASE16_DYAD_ENCODE_MAP.get( code );
	}

	/**
		Returns the code point of base 16 dyad string
		@param value base 16 string
		@param ix index of dyad
		@returns code point of base 16 dyad string
	*/
	static getBase16DyadCodeAt( value: string, ix: number ): number | undefined {
		return _BASE16_DYAD_DECODE_MAP.get( value.charCodeAt( ix ) )?.get( value.charCodeAt( ix + 1 ) );
	}

	/**
		Returns base 41 triad string for code point
		@param code code point
		@returns base 41 triad string for code point
	*/
	static getBase41Triad( code: number ): string | undefined {
		return _BASE41_TRIAD_ENCODE_MAP.get( code );
	}

	/**
		Returns code point of base 41 triad string
		@param value base 41 string
		@param ix index of triad
		@returns code point of base 41 triad string
	*/
	static getBase41TriadCodeAt( value: string, ix: number ): number | undefined {
		return _BASE41_TRIAD_DECODE_MAP.get( value.charCodeAt( ix ) )?.get( value.charCodeAt( ix + 1 ) )?.get( value.charCodeAt( ix + 2 ) );
	}

	/**
		Returns the number of bytes in encoded string
		@param value string of specified encoding
		@param encoding 'base16', 'base41', 'ascii', or 'ucs2'
		@returns number of bytes
	*/
	static getStringBufferByteLength( value: string,
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
		Returns string of specified encoding
		@param data buffer to decode
		@param encoding 'base16', 'base41', 'ascii', or 'ucs2'
		@param littleEndian true if little end first
		@returns decoded string
	*/
	static getString( data: DataView | ArrayBufferLike,
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
		Returns buffer of the string of specified encoding
		@param value string to encode
		@param encoding 'base16', 'base41', 'ascii', or 'ucs2'
		@param littleEndian true if little end first
		@returns encoded buffer
	*/
	static getStringBuffer( value: string,
		encoding: 'base16' | 'base41' | 'ascii' | 'ucs2' = 'ucs2', littleEndian?: boolean ): ArrayBuffer {
		return this.setStringBuffer( new ArrayBuffer( this.getStringBufferByteLength( value, encoding ) ), value, encoding, littleEndian );
	}

	/**
		Sets buffer bytes from the string of specified encoding
		@param data sufficiently long destination buffer
		@param value string to encode
		@param encoding 'base16', 'base41', 'ascii', or 'ucs2'
		@param littleEndian true if little end first
		@returns decoded binary data
	*/
	static setStringBuffer( data: DataView | ArrayBufferLike, value: string,
		encoding: 'base16' | 'base41' | 'ascii' | 'ucs2' = 'ucs2', littleEndian?: boolean ): ArrayBuffer {
		if ( data.byteLength < this.getStringBufferByteLength( value, encoding ) ) {
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
		Decodes bigint out of provided buffer
		@param data buffer to decode
		@returns decoded bigint
	*/
	static getBigInt( data: DataView | ArrayBufferLike ): bigint {
		const dv = data instanceof DataView ? data : new DataView( data );
		let v = 0n;
		for ( let i = 0; i < dv.byteLength; ++i ) {
			v = ( v << 8n ) + BigInt( dv.getUint8( i ) );
		}
		return v;
	}

	/**
		Returns buffer of the bigint of specified byte length
		@param value bigint to encode
		@param byteLength buffer byte length
		@returns encoded buffer
	*/
	static getBigIntBuffer( value: bigint, byteLength: number ): ArrayBuffer {
		return this.setBigIntBuffer( new ArrayBuffer( byteLength ), value );
	}

	/**
		Sets buffer bytes from the bigint
		@param data destination buffer
		@param value bigint to encode
		@returns encoded buffer
	*/
	static setBigIntBuffer( data: DataView | ArrayBufferLike, value: bigint ): ArrayBuffer {
		const dv = data instanceof DataView ? data : new DataView( data );
		let v = value;
		for ( let i = 0; i < dv.byteLength; ++i ) {
			dv.setUint8( i, Number( v & 0xffn ) );
			v >>= 8n;
		}
		return dv.buffer;
	}

}
