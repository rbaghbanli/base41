export default class Random_Number {

	static get random_nat32(): number {
		return Math.round( ( ( ( new Date() ).getTime() % 1000000 ) / 1000000 ) * Math.random() * 4294967295 );
	}

	static get random_nat53(): number {
		return Math.round( ( ( ( new Date() ).getTime() % 1000000 ) / 1000000 ) * Math.random() * 9007199254740991 );
	}

	static get random_uuid(): ArrayBuffer {
		return new Uint32Array( [ Random_Number.random_nat32, Random_Number.random_nat32, Random_Number.random_nat32, Random_Number.random_nat32 ] ).buffer;
	}

	static get_random_nat( max: number ): number {
		return Math.round( ( ( ( new Date() ).getTime() % 1000000 ) / 1000000 ) * Math.random() * max );
	}

}