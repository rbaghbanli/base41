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
const _BASE41_CHAR_ENCODE_STR = 'abcdefghijklmnopqrstuvwxyzLMNOPQRSTUVWXYZ';
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

export default class Data_Transformation {

	// get YYYY-MM-DD date string
	static get_date_string( date: Date ): string {
		const month = `00${ ( date.getMonth() + 1 ).toString() }`.slice( -2 );
		const day = `00${ date.getDate().toString() }`.slice( -2 );
		return `${ date.getFullYear().toString() }-${ month }-${ day }`;
	}

	// get HH:MM:SS time string
	static get_time_string( date: Date ): string {
		const hour = `00${ date.getHours().toString() }`.slice( -2 );
		const minute = `00${ date.getMinutes().toString() }`.slice( -2 );
		const second = `00${ date.getSeconds().toString() }`.slice( -2 );
		return `${ hour }:${ minute }:${ second }`;
	}

	static equal_binary( bin1: DataView, bin2: DataView ): boolean {
		if ( bin1 == null && bin2 == null ) {
			return true;
		}
		if ( bin1 == null || bin2 == null ) {
			return false;
		}
		if ( bin1.byteLength !== bin2.byteLength ) {
			return false;
		}
		for ( let lfi = bin1.byteLength - 3, i = 0; i < bin1.byteLength; ) {
			if ( i < lfi ) {
				if ( bin1.getUint32( i ) !== bin2.getUint32( i ) ) {
					return false;
				}
				i += 4;
			}
			else {
				if ( bin1.getUint8( i ) !== bin2.getUint8( i ) ) {
					return false;
				}
				++i;
			}
		}
		return true;
	}

	static get_base16_dyad( code: number ): string | undefined {
		return _BASE16_DYAD_ENCODE_MAP.get( code );
	}

	static get_base16_dyad_code_at( str: string, ix: number ): number | undefined {
		return _BASE16_DYAD_DECODE_MAP.get( str.charCodeAt( ix ) )?.get( str.charCodeAt( ix + 1 ) );
	}

	static get_base41_triad( code: number ): string | undefined {
		return _BASE41_TRIAD_ENCODE_MAP.get( code );
	}

	static get_base41_triad_code_at( str: string, offset: number ): number | undefined {
		return _BASE41_TRIAD_DECODE_MAP.get(
			str.charCodeAt( offset ) )?.get( str.charCodeAt( offset + 1 ) )?.get( str.charCodeAt( offset + 2 )
		);
	}

	static get_binary_length_from_string( str: string, encoding: string = 'ucs2' ): number {
		switch ( encoding ) {
			case 'base16': return Math.ceil( str.length / 2 );
			case 'base41': return Math.round( str.length * 2 / 3 );
			case 'ascii': return str.length;
			default:
			case 'ucs2': return str.length * 2;
		}
	}

	static get_string_from_binary( bin: DataView, encoding: string = 'ucs2', little_endian?: boolean ): string {
		switch ( encoding ) {
			case 'base16': {
				let str = '';
				for ( let i = 0; i < bin.byteLength; ++i ) {
					str += _BASE16_DYAD_ENCODE_MAP.get( bin.getUint8( i ) );
				}
				return str;
			}	// 2 characters per 1 byte
			case 'base41': {
				let str = '';
				for ( let lfi = bin.byteLength - 1, i = 0; i < bin.byteLength; i += 2 ) {
					if ( i < lfi ) {
						str += _BASE41_TRIAD_ENCODE_MAP.get( bin.getUint16( i, little_endian ) );
					}
					else {
						const c = bin.getUint8( i );
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
			}	// 3 characters per 2 bytes + 1 or 2 characters if trailing byte
			case 'ascii': {
				let str = '';
				for ( let i = 0; i < bin.byteLength; ++i ) {
					str += String.fromCharCode( bin.getUint8( i ) );
				}
				return str;
			}	// 1 character per 1 bytes
			default:
			case 'ucs2': {
				let str = '';
				for ( let lfi = bin.byteLength - 1, i = 0; i < bin.byteLength; i += 2 ) {
					if ( i < lfi ) {
						str += String.fromCharCode( bin.getUint16( i, little_endian ) );
					}
					else {
						str += String.fromCharCode( bin.getUint8( i ) );
					}
				}
				return str;
			}	// 1 character per 2 bytes + 1 character if trailing byte
		}
	}

	static get_buffer_from_string( str: string, encoding: string = 'ucs2', little_endian?: boolean ): ArrayBuffer {
		return this.set_binary_from_string(
			new DataView( new ArrayBuffer( this.get_binary_length_from_string( str, encoding ) ) ), str, encoding, little_endian
		).buffer;
	}

	static set_binary_from_string( bin: DataView, str: string, encoding: string = 'ucs2', little_endian?: boolean ): DataView {
		switch ( encoding ) {
			case 'base16': {
				for ( let lfi = str.length - 1, i = 0, bi = 0; i < str.length; ++i, ++bi ) {
					if ( i < lfi ) {
						bin.setUint8(
							bi,
							_BASE16_DYAD_DECODE_MAP.get( str.charCodeAt( i ) )?.get( str.charCodeAt( ++i ) ) ?? 0
						);
					}
					else {
						bin.setUint8( bi, _BASE16_CHAR_DECODE_MAP.get( str.charCodeAt( i ) ) ?? 0 );
					}
				}
				return bin;
			}	// 1 byte per 2 characters + 1 byte if trailing character
			case 'base41': {
				for ( let lfi = str.length - 2, i = 0, bi = 0; i < str.length; ++i, bi += 2 ) {
					if ( i < lfi ) {
						bin.setUint16(
							bi,
							_BASE41_TRIAD_DECODE_MAP.get( str.charCodeAt( i ) )?.get( str.charCodeAt( ++i ) )?.get( str.charCodeAt( ++i ) ) ?? 0,
							little_endian
						);
					}
					else {
						let c = _BASE41_CHAR_DECODE_MAP.get( str.charCodeAt( i ) ) ?? 0;
						if ( ++i < str.length ) {
							c = ( c * 41 ) + ( _BASE41_CHAR_DECODE_MAP.get( str.charCodeAt( i ) ) ?? 0 );
						}
						bin.setUint8( bi, c );
					}
				}
				return bin;
			}	// 2 bytes per 3 characters + 1 byte if trailing 1 or 2 characters
			case 'ascii': {
				for ( let i = 0; i < str.length; ++i ) {
					bin.setUint8( i, str.charCodeAt( i ) );
				}
				return bin;
			}	// 1 byte per 1 character
			default:
			case 'ucs2': {
				for ( let i = 0, bi = 0; i < str.length; ++i, bi += 2 ) {
					bin.setUint16( bi, str.charCodeAt( i ), little_endian );
				}
				return bin;
			}	// 2 bytes per 1 character
		}
	}

}
