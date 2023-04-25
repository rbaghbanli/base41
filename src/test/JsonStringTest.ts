import { JsonString } from '../JsonString';

export class JsonStringTest {

	testJsonString(): number {
		let passed = 0, failed = 0;
		console.log( `JsonStringTest.testJsonString started` );
		[
			[ { date: new Date() } ],
			[ { inner: { date_: new Date() } } ],
			[ { bigint: 1n } ],
			[ { inner: { bigint_: 1n } } ],
			[ { date: new Date(), bigint: 100n } ],
			[ { tbuf: new Uint8Array( [ 255, 1, 1, 1, 1, 1, 1, 1, 22, 33, 44, 44 ] ).buffer, tbuf0: new Uint8Array().buffer } ],
			[ { inner1: { inner2: { tbuf1: new Uint8Array( [ 255, 255, 1, 22, 22, 22, 22, 33, 44, 44 ] ).buffer, tbuf2: new Uint8Array().buffer } } } ],
			[ { tdata: new DataView( new Uint8Array( [ 2, 3, 5 ] ).buffer ), tdata0: new DataView( new Uint8Array().buffer ) } ],
			[ { tset: new Set( [ 'a', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'c', 'c', 'c', 'c', 'c' ] ), tset0: new Set() } ],
			[ { inner: { tmap: new Map( [ [ 123n, 'abc ' ], [ 456n, 'def' ], [ 456n, 'def' ], [ 456n, 'def' ], [ 456n, 'def' ] ] ), tmap0: new Map() } } ],
		].forEach( prm => {
			const str: string = JsonString.getString( prm[ 0 ] );
			const v: string = JsonString.getString( JsonString.getObject( str ) );
			if ( str === v ) {
				++passed;
			}
			else {
				console.error( `test failed on ${ v } expected ${ str }` );
				++failed;
			}
		} );
		console.log( `JsonStringTest.testJsonString finished: passed ${ passed } failed ${ failed }` );
		return failed;
	}

}
