import { RandomNumber } from '../RandomNumber';

export class RandomNumberTest {

	static testRandomNumber(): number {
		let passed = 0, failed = 0;
		console.log( `RandomNumberTest.testRandomNumber started` );
		[
			[ 1 ],
			[ 20 ],
			[ 300 ],
			[ 4000 ],
			[ 50000 ],
		].forEach( prm => {
			const rndUint: number = RandomNumber.getRandomUint( prm[ 0 ] );
			if ( rndUint < prm[ 0 ] ) {
				++passed;
			}
			else {
				console.error( `test failed on ${ rndUint } expected within [0, ${ prm[ 0 ] })` );
				++failed;
			}
			const rndInt: number = RandomNumber.getRandomInt( -prm[ 0 ], prm[ 0 ] );
			if ( rndInt >= -prm[ 0 ] && rndInt < prm[ 0 ] ) {
				++passed;
			}
			else {
				console.error( `test failed on ${ rndInt } expected within [${ -prm[ 0 ] }, ${ prm[ 0 ] }) }` );
				++failed;
			}
		} );
		console.log( `RandomNumberTest.testRandomNumber finished: passed ${ passed } failed ${ failed }` );
		return failed;
	}

	static testUuid(): number {
		let passed = 0, failed = 0;
		console.log( `RandomNumberTest.testUuid started` );
		let uuid = -1n;
		for ( let i = 0; i < 16; ++i ) {
			const uuid_ = RandomNumber.getUuid();
			if ( uuid !== uuid_ ) {
				++passed;
			}
			else {
				++failed;
			}
			uuid = uuid_;
		}
		console.log( `RandomNumberTest.testUuid finished: passed ${ passed } failed ${ failed }` );
		return failed;
	}

}
