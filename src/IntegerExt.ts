const _UINT32_UPPER_BOUND = 1 + ( -1 >>> 0 );

/**
	Returns the result of bit rotation of 32-bit unsigned integer number to left.
	@param value 32-bit unsigned integer.
	@param shift Number of bits to rotate by.
	@returns The result of bit rotation of 32-bit unsigned integer to left.
*/
export function rotateUint32BitsLeft( value: number, shift: number ): number {
	return ( ( value << shift ) | ( value >>> ( 32 - shift ) ) ) >>> 0;
}

/**
	Returns the result of bit rotation of 32-bit unsigned integer to right.
	@param value 32-bit unsigned integer.
	@param shift Number of bits to rotate by.
	@returns The result of bit rotation of 32-bit unsigned integer to right.
*/
export function rotateUint32BitsRight( value: number, shift: number ): number {
	return ( ( value >>> shift ) | ( value << ( 32 - shift ) ) ) >>> 0;
}

/**
	Reverses bytes of 32-bit unsigned integer.
	@param value 32-bit unsigned integer.
	@returns The result of byte reversal of 32-bit unsigned integer.
*/
export function reverseUint32Bytes( value: number ): number {
	return ( ( ( value & 0xff ) << 24 ) | ( ( value & 0xff00 ) << 8 ) | ( ( value & 0xff0000 ) >>> 8 ) | ( ( value & 0xff000000 ) >>> 24 ) ) >>> 0;
}

/**
	Returns pseudorandom unsigned integer between 0 and specified value (not cryptographically secure).
	@param exclusiveLimit Upper exclusive bound of generated random number.
	@returns Pseudorandom unsigned integer.
*/
export function randomizeUint( exclusiveLimit: number ): number {
	return Math.floor( Math.random() * Math.abs( exclusiveLimit ) );
}

/**
	Returns pseudorandom integer between inclusive and exclusive bounds (not cryptographically secure).
	@param inclusiveLimit Lower inclusive bound of generated random number.
	@param exclusiveLimit Upper exclusive bound of generated random number.
	@returns Pseudorandom integer.
*/
export function randomizeInt( inclusiveLimit: number, exclusiveLimit: number ): number {
	return inclusiveLimit + Math.trunc( Math.random() * ( exclusiveLimit - inclusiveLimit ) );
}

/**
	Returns pseudorandom 32-bit unsigned integer (not cryptographically secure).
	@returns Pseudorandom unsigned 32 bit integer.
*/
export function randomizeUint32(): number {
	return randomizeUint( _UINT32_UPPER_BOUND );
}

/**
	Returns pseudorandom 64-bit unsigned integer (not cryptographically secure).
	@returns Pseudorandom unsigned 64 bit integer.
*/
export function randomizeUint64(): bigint {
	return ( BigInt( randomizeUint32() ) << 32n ) + BigInt( randomizeUint32() );
}

/**
	Returns pseudorandom 128-bit unsigned integer (not cryptographically secure).
	@returns Pseudorandom unsigned 128 bit integer.
*/
export function randomizeUint128(): bigint {
	return ( randomizeUint64() << 64n ) + randomizeUint64();
}

/**
	Returns UUID version 4 / random.
	@returns UUID version 4 / random.
*/
export function generateUuid( version: 4 = 4 ): bigint {
	let uuid = 0n;
	for ( let i = 0; i < 16; ++i ) {
		let byte = Math.floor( Math.random() * 256 );
		if ( i === 6 ) {
			byte = ( byte & 0x0f ) | 0x40;
		}
		else if ( i === 8 ) {
			byte = ( byte & 0x3f ) | 0x80;
		}
		uuid = ( uuid << 8n ) + BigInt( byte );
	}
	return uuid;
}
