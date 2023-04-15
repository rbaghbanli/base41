import { JsonString } from '../json-string';

export class JsonStringTest {

	testJsonString(): number {
		let passed = 0, failed = 0;
		console.log( `testJsonString started` );
		[
			[ { date: new Date() } ],
			[ { inner: { date: new Date() } } ],
			[ { bigint: 1n } ],
			[ { inner: { bigint: 1n } } ],
			[ { date: new Date(), bigint: 100n } ],
		].forEach( prm => {
			const str: string = JsonString.getString( prm[ 0 ] );
			const v: string = JsonString.getString( JsonString.getObject( str ) );
			if ( str === v ) {
				++passed;
			}
			else {
				console.error( `testJsonString failed on ${ v } expected ${ str }` );
				++failed;
			}
		} );
		console.log( `testJsonString finished: passed ${ passed } failed ${ failed }` );
		return failed;
	}

}
