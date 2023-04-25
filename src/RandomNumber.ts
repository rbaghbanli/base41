const _UINT32_UPPER_BOUND = 1 + ( -1 >>> 0 );

export class RandomNumber {

	/**
		Returns random 32-bit unsigned integer
		@returns random unsigned 32 bit integer
	*/
	static getRandomUint32(): number {
		return this.getRandomUint( _UINT32_UPPER_BOUND );
	}

	/**
		Returns random 64-bit unsigned integer
		@returns random unsigned 64 bit integer
	*/
	static getRandomUint64(): bigint {
		return ( BigInt( RandomNumber.getRandomUint32() ) << 32n ) + BigInt( RandomNumber.getRandomUint32() );
	}

	/**
		Returns random 128-bit unsigned integer
		@returns random unsigned 128 bit integer
	*/
	static getRandomUint128(): bigint {
		return ( RandomNumber.getRandomUint64() << 64n ) + RandomNumber.getRandomUint64();
	}

	/**
		Returns v4 UUID
		@returns v4 UUID
	*/
	static getUuid(): bigint {
		const bytes = new Uint8Array( 16 );
		bytes.forEach( ( b, i ) => { bytes[ i ] = Math.random() * 256; } );
		bytes[ 6 ] = ( bytes[ 6 ] & 0x0f ) | 0x40;
		bytes[ 8 ] = ( bytes[ 8 ] & 0x3f ) | 0x80;

		// TODO

		return ( RandomNumber.getRandomUint64() << 64n ) + RandomNumber.getRandomUint64();
	}

	/**
		Returns random unsigned integer between 0 and specified value
		@param max upper exclusive bound of generated random number
		@returns random unsigned integer between 0 and specified value
	*/
	static getRandomUint( max: number ): number {
		return Math.floor( Math.random() * max );
	}

}
