export default class Random_Number {

	/**
		Returns random 32-bit natural number
	*/
	static get random_nat32(): number {
		return Math.round( ( ( ( new Date() ).getTime() % 1000000 ) / 1000000 ) * Math.random() * 4294967295 );
	}

	/**
		Returns random 53-bit natural number
	*/
	static get random_nat53(): number {
		return Math.round( ( ( ( new Date() ).getTime() % 1000000 ) / 1000000 ) * Math.random() * 9007199254740991 );
	}

	/**
		Returns buffer containing random 128-bit
	*/
	static get random_uuid(): ArrayBuffer {
		return new Uint32Array( [ Random_Number.random_nat32, Random_Number.random_nat32, Random_Number.random_nat32, Random_Number.random_nat32 ] ).buffer;
	}

	/**
		Returns random natural number between 0 and specified value
		@param max upper bound of generated random number
	*/
	static get_random_nat( max: number ): number {
		return Math.round( ( ( ( new Date() ).getTime() % 1000000 ) / 1000000 ) * Math.random() * max );
	}

}