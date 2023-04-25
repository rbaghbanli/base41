import { RandomNumber } from '../RandomNumber';

export class RandomNumberTest {

	testRandomNumber(): number {
		let passed = 0, failed = 0;
		console.log( `RandomNumberTest.testRandomNumber started` );
		[
			[ 1 ],
			[ 2 ],
			[ 3 ],
		].forEach( prm => {
			const rnd: number = RandomNumber.getRandomUint( prm[ 0 ] );
			if ( rnd < prm[ 0 ] ) {
				++passed;
			}
			else {
				console.error( `test failed on ${ rnd } expected less than ${ prm[ 0 ] }` );
				++failed;
			}
		} );
		console.log( `RandomNumberTest.testRandomNumber finished: passed ${ passed } failed ${ failed }` );
		return failed;
	}

}
