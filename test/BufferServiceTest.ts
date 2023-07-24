import { BufferService } from '../src';

export function testStringBuffer(): number {
	let passed = 0, failed = 0;
	console.log( `testStringBuffer started...` );
	[
		[ [], 'base16' ],
		[ [ 0 ], 'base16' ],
		[ [ 16, 0, 10, 20, 40, 1, 3, 5, 7 ], 'base16' ],
		[ [ 16, 10, 20, 40, 1, 3, 5, 7, 122, 127, 202, 30, 4, 255, 120, 4, 1, 0, 0, 254, 16, 16, 156, 16, 2, 2, 1, 0, 0, 0, 143 ], 'base16' ],
		[ [], 'base41' ],
		[ [], 'base41', true ],
		[ [ 0 ], 'base41' ],
		[ [ 0 ], 'base41', true ],
		[ [ 41 ], 'base41' ],
		[ [ 41 ], 'base41', true ],
		[ [ 41, 2 ], 'base41' ],
		[ [ 41, 2 ], 'base41', true ],
		[ [ 41, 0, 255 ], 'base41' ],
		[ [ 41, 0, 255 ], 'base41', true ],
		[ [ 0, 41, 0, 254 ], 'base41' ],
		[ [ 0, 41, 0, 254 ], 'base41', true ],
		[ [ 0, 41, 0, 254, 0 ], 'base41' ],
		[ [ 0, 41, 0, 254, 0 ], 'base41', true ],
		[ [ 41, 10, 20, 40, 0, 3, 5, 7, 0 ], 'base41' ],
		[ [ 41, 10, 20, 40, 0, 3, 5, 7, 0 ], 'base41', true ],
		[ [ 0, 41, 10, 20, 40, 1, 3, 5, 7, 122, 127, 202, 30, 4, 255, 120, 4, 1, 0, 0, 254, 16, 16, 156, 16, 2, 2, 1, 0, 0, 0, 143, 0 ], 'base41' ],
		[ [ 0, 41, 10, 20, 40, 1, 3, 5, 7, 122, 127, 202, 30, 4, 255, 120, 4, 1, 0, 0, 254, 16, 16, 156, 16, 2, 2, 1, 0, 0, 0, 143, 0 ], 'base41', true ],
		[ [], 'ascii' ],
		[ [ 0 ], 'ascii' ],
		[ [ 10, 0, 0, 10, 20, 40, 1, 3, 5, 7, 0 ], 'ascii' ],
		[ [ 0, 0, 65, 10, 20, 40, 1, 3, 5, 7 ], 'ascii' ],
		[ [], 'ucs2' ],
		[ [], 'ucs2', true ],
		[ [ 0, 2 ], 'ucs2' ],
		[ [ 0, 2 ], 'ucs2', true ],
		[ [ 0, 66, 0, 60, 4, 16, 4, 17, 4, 18, 4, 48, 4, 49, 4, 50, 0, 70, 0, 73, 0, 66 ], 'ucs2' ],
		[ [ 0, 66, 0, 60, 4, 16, 4, 17, 4, 18, 4, 48, 4, 49, 4, 50, 0, 70, 0, 73, 0, 66 ], 'ucs2', true ],
	].forEach( ( prm, ix ) => {
		const bin = new Uint8Array( prm[ 0 ] as number[] );
		const enc = prm[ 1 ] as 'base16'|'base41'|'ascii'|'ucs2';
		const lend: boolean = prm[ 2 ] as boolean;
		const str = BufferService.toString( new DataView( bin.buffer ), enc, lend );
		const v = new Uint8Array( BufferService.fromString( str, enc, lend ) );
		if ( BufferService.equate( new DataView( v.buffer ), new DataView( bin.buffer ) ) ) {
			++passed;
		}
		else {
			console.error( `test ${ ix } failed on ${ v } expected ${ bin } for ${ enc }` );
			++failed;
		}
	} );
	console.log( `result: passed ${ passed } failed ${ failed }` );
	return failed;
}

export function testBigIntBuffer(): number {
	let passed = 0, failed = 0;
	console.log( `testBigIntBuffer started...` );
	[
		[ [ 0 ], true ],
		[ [ 0 ], false ],
		[ [ 1 ], true ],
		[ [ 1 ], false ],
		[ [ -1 ], true ],
		[ [ -1 ], false ],
		[ [ 0, 41, 0, 254, 20 ], true ],
		[ [ 20, 41, 0, 254, 0 ], false ],
		[ [ 16, 0, 10, 20, 40, 1, 3, 5, -7 ], true ],
		[ [ -16, 10, 20, 40, 1, 3, 5, 7, 122, 127, 202, 30, 4, 255, 120, 4, 1, 0, 0, 254, 16, 16, 156, 16, 2, 2, 1, 0, 0, 0, 143 ], false ],
		[ [ 0, 41, 10, 20, 40, 1, 3, 5, 7, 122, 127, 202, 30, 4, 255, 120, 4, 1, 0, 0, 254, 16, 16, 156, 16, 2, 2, 1, 0, 0, 0, 143, 90 ], true ],
		[ [ 90, 41, 10, 20, 40, 1, 3, 5, 7, 122, 127, 202, 30, 4, 255, 120, 4, 1, 0, 0, 254, 16, 16, 156, 16, 2, 2, 1, 0, 0, 0, 143, 0 ], false ],
	].forEach( ( prm, ix ) => {
		const bin = new Uint8Array( prm[ 0 ] as number[] );
		const lend: boolean = prm[ 1 ] as boolean;
		const val = BufferService.toBigInt( new DataView( bin.buffer ), lend );
		const v = new Uint8Array( BufferService.fromBigInt( val, lend ) );
		if ( BufferService.equate( new DataView( v.buffer ), new DataView( bin.buffer ) ) ) {
			++passed;
		}
		else {
			console.error( `test ${ ix } failed on ${ v } expected ${ bin }` );
			++failed;
		}
	} );
	console.log( `result: passed ${ passed } failed ${ failed }` );
	return failed;
}

export function testSha256HashCode(): number {
	let passed = 0, failed = 0;
	console.log( `testSha256HashCode started...` );
	[
		[ 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', '' ],
		[ 'fb460d2638d29a363b0ef6cdd75ae654f302611dcfe2556fb4612ff4fe85b127', 'Test String for SHA256' ],
		[ '7a1fdb8b8cbba4430197c2611b39326a63505e8b8c4af717ec0d86683943761c', 'Lorem ipsum dolor sit amet,' ],
		[ '07fe4d4a25718241af145a93f890eb5469052e251d199d173bd3bd50c3bb4da2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' ],
		[ '704faca85ceaa04676ce854b20823f85df799e6a345de89e058ccf243ef04675', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' ],
		[ '973153f86ec2da1748e63f0cf85b89835b42f8ee8018c549868a1308a19f6ca3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
			' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' ],
		[ '1c81c608a616183cc4a38c09ecc944eb77eaff465dd87aae0290177f2b70b6f8', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
			' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco' +
			' laboris nisi ut aliquip ex ea commodo consequat.' ],
		[ '88fe5616ccd902ee3a1c5f2d2000b0e5126342835238ab2ebda31257c6636fe1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
			' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco' +
			' laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
			' eu fugiat nulla pariatur.' ],
	].forEach( ( prm, ix ) => {
		const hash: string = prm[ 0 ];
		const str: string = prm[ 1 ];
		const bin = BufferService.fromString( str, 'ascii' );
		const hc = BufferService.getSha256HashCodeBuffer( new DataView( bin ) );
		const v = BufferService.toString( new DataView( hc ), 'base16' );
		if ( v === hash ) {
			++passed;
		}
		else {
			console.error( `test ${ ix } failed on ${ v } expected ${ hash } text length ${ str.length }` );
			++failed;
		}
	} );
	console.log( `result: passed ${ passed } failed ${ failed }` );
	return failed;
}
