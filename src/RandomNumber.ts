const _UINT32_UPPER_BOUND = 1 + ( -1 >>> 0 );

/**
	Returns pseudorandom unsigned integer between 0 and specified value (not cryptographically secure)
	@param exclusiveLimit upper exclusive bound of generated random number
	@returns pseudorandom unsigned integer
*/
export function getRandomUint( exclusiveLimit: number ): number {
	return Math.floor( Math.random() * Math.abs( exclusiveLimit ) );
}

/**
	Returns pseudorandom integer between inclusive and exclusive bounds (not cryptographically secure)
	@param inclusiveLimit lower inclusive bound of generated random number
	@param exclusiveLimit upper exclusive bound of generated random number
	@returns pseudorandom integer
*/
export function getRandomInt( inclusiveLimit: number, exclusiveLimit: number ): number {
	return inclusiveLimit + Math.trunc( Math.random() * ( exclusiveLimit - inclusiveLimit ) );
}

/**
	Returns pseudorandom 32-bit unsigned integer (not cryptographically secure)
	@returns pseudorandom unsigned 32 bit integer
*/
export function getRandomUint32(): number {
	return getRandomUint( _UINT32_UPPER_BOUND );
}

/**
	Returns pseudorandom 64-bit unsigned integer (not cryptographically secure)
	@returns pseudorandom unsigned 64 bit integer
*/
export function getRandomUint64(): bigint {
	return ( BigInt( getRandomUint32() ) << 32n ) + BigInt( getRandomUint32() );
}

/**
	Returns pseudorandom 128-bit unsigned integer (not cryptographically secure)
	@returns pseudorandom unsigned 128 bit integer
*/
export function getRandomUint128(): bigint {
	return ( getRandomUint64() << 64n ) + getRandomUint64();
}

/**
	Returns UUID version 4 / random
	@returns UUID version 4 / random
*/
export function getUuid(): bigint {
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
