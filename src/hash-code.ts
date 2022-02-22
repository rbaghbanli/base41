import { Bit_Operation } from './bit-operation';

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

export class Hash_Code {

	/**
		Returns little-endian FNV1A 32-bit hash code
		@param data DataView to hash
		@returns little-endian FNV1A 32-bit hash code
	*/
	static get_fnv1a32_hash_code( data: DataView ): number {
		let hc = 2166136261;
		for ( let i = 0; i < data.byteLength; ++i ) {
			hc = ( hc ^ data.getUint8( i ) ) >>> 0;
			hc = Math.imul( hc, _FNV32_PRIME ) >>> 0;
		}
		return hc;
	}

	/**
		Returns little-endian FNV1A 64-bit hash code
		@param data DataView to hash
		@returns little-endian FNV1A 64-bit hash code
	*/
	static get_fnv1a64_hash_code( data: DataView ): bigint {
		const hc = new Uint32Array( [ 0x84222325, 0xcbf29ce4 ] ); // little-endian offset basis
		for ( let i = 0; i < data.byteLength; ++i ) {
			hc[ 0 ] = ( hc[ 0 ] ^ data.getUint8( i ) ) >>> 0;
			hc[ 0 ] = Math.imul( hc[ 0 ], _FNV64_PRIME[ 0 ] ) >>> 0;
			hc[ 1 ] = ( Math.imul( hc[ 0 ], _FNV64_PRIME[ 1 ] ) + Math.imul( hc[ 1 ], _FNV64_PRIME[ 0 ] ) ) >>> 0;
		}
		return ( BigInt( hc[ 0 ] ) << 64n ) + BigInt( hc[ 1 ] );
	}

	/**
		Returns the buffer containing SHA256 256-bit hash code
		@param data binary to hash
		@returns the buffer containing SHA256 256-bit hash code
	*/
	static get_sha256_hash_code( data: DataView ): ArrayBuffer {
		const bc = Math.ceil( ( data.byteLength + 1 + 8 ) / 64 );	// block count
		const lbi = bc - 1;	// last block index
		const h = [ 0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19 ];
		const v = new Array<number>( 8 );	// a, b, c, d, e, f, g, h
		const w = new Array<number>( 64 );
		for ( let bi = 0; bi < bc; ++bi ) {	// block index
			let wc = 16;	// word count
			if ( bi === lbi ) {	// if last block short iteration as last 2 words are data bit length
				wc = 14;
				w[ 14 ] = Math.floor( data.byteLength / 536870912 );	// higher word of data bit length = data byte length * 8 / 2**32
				w[ 15 ] = ( data.byteLength << 3 ) >>> 0; // lower word of data bit length
			}
			for ( let wi = 0; wi < wc; ++wi ) {	// word index to load data into worksheet
				w[ wi ] = 0;
				for ( let oi = 0; oi < 4; ++oi ) {	// octet index
					const doi = ( bi * 64 ) + ( wi << 2 ) + oi;	// data octet index = block index * block length + word index * word length + octet index
					const octet = doi < data.byteLength ? data.getUint8( doi ) : ( doi === data.byteLength ? 0x80 : 0 );
					w[ wi ] |= octet << ( ( 3 - oi ) << 3 );
				}
			}
			for ( let wi = 16; wi < 64; ++wi ) {	// word index to extend data in worksheet
				const s15 = w[ wi - 15 ];
				const s2 = w[ wi - 2 ];
				const s0 = ( Bit_Operation.rotate_uint32_right( s15, 7 ) ^ Bit_Operation.rotate_uint32_right( s15, 18 ) ^ ( s15 >>> 3 ) ) >>> 0;
				const s1 = ( Bit_Operation.rotate_uint32_right( s2, 17 ) ^ Bit_Operation.rotate_uint32_right( s2, 19 ) ^ ( s2 >>> 10 ) ) >>> 0;
				w[ wi ] = ( w[ wi - 16 ] + s0 + w[ wi - 7 ] + s1 ) >>> 0;
			}
			for ( let i = 0; i < 8; ++i ) {
				v[ i ] = h[ i ];
			}
			for ( let wi = 0; wi < 64; ++wi ) {	// word index to perform compression loop
				const s1 = ( Bit_Operation.rotate_uint32_right( v[ 4 ] /* e */, 6 ) ^
					Bit_Operation.rotate_uint32_right( v[ 4 ] /* e */, 11 ) ^
					Bit_Operation.rotate_uint32_right( v[ 4 ] /* e */, 25 ) ) >>> 0;
				const ch = ( ( v[ 4 ] /* e */ & v[ 5 ] /* f */ ) ^ ( ( ~v[ 4 ] /* e */ ) & v[ 6 ] /* g */ ) ) >>> 0;
				const t1 = ( v[ 7 ] /* h */ + s1 + ch + _SHA256_K[ wi ] + w[ wi ] ) >>> 0;
				const s0 = ( Bit_Operation.rotate_uint32_right( v[ 0 ] /* a */, 2 ) ^
					Bit_Operation.rotate_uint32_right( v[ 0 ] /* a */, 13 ) ^
					Bit_Operation.rotate_uint32_right( v[ 0 ] /* a */, 22 ) ) >>> 0;
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

}
