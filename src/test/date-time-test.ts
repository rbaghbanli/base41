import { DateTime } from '../date-time';

export class DateTimeTest {

	testDateTimeString(): number {
		let passed = 0, failed = 0;
		console.log( `testDateTimeString started` );
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
				console.error( `testDateTimeString failed on ${ v } expected ${ prm[ 0 ] }` );
				++failed;
			}
		} );
		console.log( `testDateTimeString finished: passed ${ passed } failed ${ failed }` );
		return failed;
	}

}
