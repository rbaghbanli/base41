import { DateService } from '../src/index.js';

export function testDateTimeString(): number {
	let passed = 0, failed = 0;
	console.log( `testDateTimeString started...` );
	[
		[ new Date( 0 ), 'YYYY-MM-DD HH:MM:SS.UUU', true ],
		[ new Date( 0 ), 'YYYY-MM-DD HH:MM:SS.UUU', false ],
		[ new Date( '2020-01-01' ), 'YYYY-MM-DD HH:MM:SS', true ],
		[ new Date( '2020-01-01' ), 'YYYY-MM-DD HH:MM:SS', false ],
		[ new Date( '2020-12-12 06:06' ), 'YYYY-MM-DD HH:MM:SS', true ],
		[ new Date( '2020-12-12 06:06:45' ), 'YYYY-MM-DD HH:MM:SS', false ],
		[ new Date( '1980-11-30 21:59:59.999' ), 'YYYY-MM-DD HH:MM:SS.UUU', true ],
		[ new Date( '1980-11-30 21:59:59.999Z' ), 'YYYY-MM-DD HH:MM:SS.UUU', false ],
	].forEach( ( prm, ix ) => {
		const str: string = DateService.toString( prm[ 0 ] as Date, prm[ 1 ] as any, prm[ 2 ] as boolean );
		const v: string = DateService.toString( DateService.fromString( str, prm[ 2 ] as boolean ), prm[ 1 ] as any, prm[ 2 ] as boolean );
		if ( str === v ) {
			++passed;
		}
		else {
			console.error( `test ${ ix } failed on ${ v } expected ${ str }` );
			++failed;
		}
	} );
	console.log( `result: passed ${ passed } failed ${ failed }` );
	return failed;
}

export function testDateTimeValues(): number {
	let passed = 0, failed = 0;
	console.log( `testDateTimeValues started...` );
	[
		[ '1975-12-31', new Date( '1975-12-31 00:00:00.000Z' ), 'YYYY-MM-DD', true ],
		[ '2011-01-01', new Date( '2011-01-01' ), 'YYYY-MM-DD', true ],
		[ '1980-12-31 22:22:22', new Date( '1980-12-31 22:22:22.000Z' ), 'YYYY-MM-DD HH:MM:SS', true ],
		[ '2021-01-01 22:22:22', new Date( '2021-01-01 22:22:22.000' ), 'YYYY-MM-DD HH:MM:SS', false ],
		[ '1920-12-31 22:22:22.999', new Date( '1920-12-31 22:22:22.999Z' ), 'YYYY-MM-DD HH:MM:SS.UUU', true ],
		[ '2020-01-01 22:22:22.999', new Date( '2020-01-01 22:22:22.999' ), 'YYYY-MM-DD HH:MM:SS.UUU', false ],
	].forEach( ( prm, ix ) => {
		const str: string = prm[ 0 ] as string;
		const v: string = DateService.toString( prm[ 1 ] as Date, prm[ 2 ] as any, prm[ 3 ] as boolean );
		if ( str === v ) {
			++passed;
		}
		else {
			console.error( `test ${ ix } failed on ${ v } expected ${ str }` );
			++failed;
		}
	} );
	console.log( `result: passed ${ passed } failed ${ failed }` );
	return failed;
}
