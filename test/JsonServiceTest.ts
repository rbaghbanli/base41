import { JsonService } from '../src';

export function testJsonString(): number {
	let passed = 0, failed = 0;
	console.log( `testJsonString started...` );
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
		const str: string = JsonService.toString( prm[ 0 ] );
		const v: string = JsonService.toString( JsonService.fromString( str ) );
		if ( str === v ) {
			++passed;
		}
		else {
			console.error( `test failed on ${ v } expected ${ str }` );
			++failed;
		}
	} );
	console.log( `result: passed ${ passed } failed ${ failed }` );
	return failed;
}

export function testJsonValues(): number {
	let passed = 0, failed = 0;
	console.log( `testJsonValues started...` );
	const tobj = {
		number_: 123,
		string_: 'abc',
		bigint_: 1234n,
		date_: new Date(),
		buffer_: new Uint8Array( [ 1, 2, 3, 5, 88, 67 ] ).buffer,
		set_: new Set<number>( [ 10, 1, 2, 3, 4, 5 ] ),
		set0: new Set(),
		map_: new Map<number, string>( [ [ 1, 'a' ], [ 2, 'b' ], [ 3, 'c' ] ] ),
		map0: new Map(),
		map1: new Map<number, Set<number>>( [ [ 1, new Set<number>( [ 1 ] ) ], [ 2, new Set<number>( [ 2 ] ) ] ] )
	};
	const str = JsonService.toString( tobj );
	const robj = JsonService.fromString( str );
	if ( tobj.number_ === robj.number_ ) {
		++passed;
	}
	else {
		console.error( `test failed on ${ robj.number_ } expected ${ tobj.number_ }` );
		++failed;
	}
	if ( tobj.string_ === robj.string_ ) {
		++passed;
	}
	else {
		console.error( `test failed on ${ robj.string_ } expected ${ tobj.string_ }` );
		++failed;
	}
	if ( tobj.bigint_ === robj.bigint_ ) {
		++passed;
	}
	else {
		console.error( `test failed on ${ robj.bigint_ } expected ${ tobj.bigint_ }` );
		++failed;
	}
	if ( tobj.date_.getTime() === robj.date_.getTime() ) {
		++passed;
	}
	else {
		console.error( `test failed on ${ robj.date_ } expected ${ tobj.date_ }` );
		++failed;
	}
	if ( tobj.buffer_.byteLength === robj.buffer_.byteLength ) {
		++passed;
	}
	else {
		console.error( `test failed on ${ robj.buffer_ } expected ${ tobj.buffer_ }` );
		++failed;
	}
	if ( tobj.set_.size === robj.set_.size ) {
		++passed;
	}
	else {
		console.error( `test failed on ${ robj.set_ } expected ${ tobj.set_ }` );
		++failed;
	}
	if ( tobj.set0.size === robj.set0.size ) {
		++passed;
	}
	else {
		console.error( `test failed on ${ robj.set0 } expected ${ tobj.set0 }` );
		++failed;
	}
	if ( tobj.map_.size === robj.map_.size ) {
		++passed;
	}
	else {
		console.error( `test failed on ${ robj.map_ } expected ${ tobj.map_ }` );
		++failed;
	}
	if ( tobj.map0.size === robj.map0.size ) {
		++passed;
	}
	else {
		console.error( `test failed on ${ robj.map0 } expected ${ tobj.map0 }` );
		++failed;
	}
	if ( tobj.map1.size === robj.map1.size ) {
		++passed;
	}
	else {
		console.error( `test failed on ${ robj.map1 } expected ${ tobj.map1 }` );
		++failed;
	}
	console.log( `result: passed ${ passed } failed ${ failed }` );
	return failed;
}
