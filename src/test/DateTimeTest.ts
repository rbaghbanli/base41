import * as DateTime from '../DateTime';

export function testDateTimeString(): number {
	let passed = 0, failed = 0;
	console.log( `DateTimeTest.testDateTimeString started` );
	[
		[ '2000-01-02 23:24:25' ],
		[ '1000-01-02 23:24:25' ],
		[ '1970-01-01 00:00:00' ],
	].forEach( prm => {
		const date: Date = new Date( prm[ 0 ] );
		const v: string = DateTime.getDateTimeString( date );
		if ( v === prm[ 0 ] ) {
			++passed;
		}
		else {
			console.error( `test failed on ${ v } expected ${ prm[ 0 ] }` );
			++failed;
		}
	} );
	console.log( `DateTimeTest.testDateTimeString stopped: passed ${ passed } failed ${ failed }` );
	return failed;
}
