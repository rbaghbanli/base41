import * as DateExt from '../DateExt';

export function testDateTimeString(): number {
	let passed = 0, failed = 0;
	console.log( `testDateTimeString started...` );
	[
		[ '2000-01-02 23:24:25' ],
		[ '1000-01-02 23:24:25' ],
		[ '1970-01-01 00:00:00' ],
	].forEach( prm => {
		const date: Date = new Date( prm[ 0 ] );
		const v: string = DateExt.toDateTimeString( date );
		if ( v === prm[ 0 ] ) {
			++passed;
		}
		else {
			console.error( `test failed on ${ v } expected ${ prm[ 0 ] }` );
			++failed;
		}
	} );
	console.log( `result: passed ${ passed } failed ${ failed }` );
	return failed;
}

export function testDateTimeStrings(): number {
	let passed = 0, failed = 0;
	console.log( `DateTimeStringTest.testDateTimeStrings started` );
	[
		new Date( 0 ),
		new Date( '2020-01-01' ),
		new Date( '2020-12-12 06:06' ),
		new Date( '2020-12-12 06:06:45' ),
		new Date( '1980-11-30 21:59:59.999' ),
		new Date( '1980-11-30 21:59:59.999Z' ),
	].forEach( ( prm, ix ) => {
		const str: string = Conv.toDateTimeString( prm );
		const v: string = Conv.toDateTimeString( Conv.fromDateTimeString( str ) );
		if ( str === v ) {
			++passed;
		}
		else {
			console.error( `test ${ ix } failed on ${ v } expected ${ str }` );
			++failed;
		}
	} );
	console.log( `DateTimeStringTest.testDateTimeStrings stopped: passed ${ passed } failed ${ failed }` );
	return failed;
}

export function testUtcDateTimeStrings(): number {
	let passed = 0, failed = 0;
	console.log( `DateTimeStringTest.testUtcDateTimeStrings started` );
	[
		new Date( 0 ),
		new Date( '2020-01-01' ),
		new Date( '2020-12-12 06:06' ),
		new Date( '2020-12-12 06:06:45' ),
		new Date( '1980-11-30 21:59:59.999' ),
		new Date( '1980-11-30 21:59:59.999Z' ),
	].forEach( ( prm, ix ) => {
		const str: string = Conv.toUtcDateTimeString( prm );
		const v: string = Conv.toUtcDateTimeString( Conv.fromUtcDateTimeString( str ) );
		if ( str === v ) {
			++passed;
		}
		else {
			console.error( `test ${ ix } failed on ${ v } expected ${ str }` );
			++failed;
		}
	} );
	console.log( `DateTimeStringTest.testUtcDateTimeStrings stopped: passed ${ passed } failed ${ failed }` );
	return failed;
}

export function testDateTimeValues(): number {
	let passed = 0, failed = 0;
	console.log( `DateTimeStringTest.testDateTimeValues started` );
	[
		[ '1920-12-31 22:22:22.999', new Date( '1920-12-31 22:22:22.999' ), true ],
		[ '2020-01-01 22:22:22.999', new Date( '2020-01-01 22:22:22.999' ), true ],
		[ '1980-12-31 22:22:22', new Date( '1980-12-31 22:22:22' ), false ],
		[ '2020-01-01 22:22:22', new Date( '2020-01-01 22:22:22' ), false ],
	].forEach( ( prm, ix ) => {
		const str: string = Conv.toDateTimeString( prm[ 1 ] as Date, prm[ 2 ] as boolean );
		const v: string = prm[ 0 ] as string;
		if ( str === v ) {
			++passed;
		}
		else {
			console.error( `test ${ ix } failed on ${ v } expected ${ str }` );
			++failed;
		}
	} );
	console.log( `DateTimeStringTest.testDateTimeValues stopped: passed ${ passed } failed ${ failed }` );
	return failed;
}

export function testUtcDateTimeValues(): number {
	let passed = 0, failed = 0;
	console.log( `DateTimeStringTest.testUtcDateTimeValues started` );
	[
		[ '1920-12-31 22:22:22.999', new Date( '1920-12-31 22:22:22.999Z' ), true ],
		[ '2020-01-01 22:22:22.999', new Date( '2020-01-01 22:22:22.999Z' ), true ],
		[ '1980-12-31 22:22:22', new Date( '1980-12-31 22:22:22.000Z' ), false ],
		[ '2020-01-01 22:22:22', new Date( '2020-01-01 22:22:22.000Z' ), false ],
	].forEach( ( prm, ix ) => {
		const str: string = Conv.toUtcDateTimeString( prm[ 1 ] as Date, prm[ 2 ] as boolean );
		const v: string = prm[ 0 ] as string;
		if ( str === v ) {
			++passed;
		}
		else {
			console.error( `test ${ ix } failed on ${ v } expected ${ str }` );
			++failed;
		}
	} );
	console.log( `DateTimeStringTest.testUtcDateTimeValues stopped: passed ${ passed } failed ${ failed }` );
	return failed;
}
