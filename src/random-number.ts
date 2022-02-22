export const RANDOM_NUMBER_MAX_UINT32 = -1 >>> 0;

export class Random_Number {

	/**
		Returns random 32-bit unsigned integer
	*/
	static get random_uint32(): number {
		return Math.floor( ( ( ( new Date() ).getTime() % 1000000 ) / 1000000 ) * Math.random() * RANDOM_NUMBER_MAX_UINT32 );
	}

	/**
		Returns random 64-bit unsigned integer
	*/
	static get random_uint64(): bigint {
		return ( BigInt( Random_Number.random_uint32 ) << 32n ) + BigInt( Random_Number.random_uint32 );
	}

	/**
		Returns random 128-bit unsigned integer
	*/
	static get random_uint128(): bigint {
		return ( Random_Number.random_uint64 << 64n ) + Random_Number.random_uint64;
	}

	/**
		Returns random unsigned integer between 0 and specified value
		@param max upper exclusive bound of generated random number
		@returns random unsigned integer between 0 and specified value
	*/
	static get_random_uint( max: number ): number {
		return Math.floor( ( ( ( new Date() ).getTime() % RANDOM_NUMBER_MAX_UINT32 ) / RANDOM_NUMBER_MAX_UINT32 ) * Math.random() * max );
	}

}
