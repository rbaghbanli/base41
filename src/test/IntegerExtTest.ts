import * as IntegerExt from '../IntegerExt';

export function testRotateUint32Bits(): number {
	let passed = 0, failed = 0;
	console.log( `testRotateUint32Bits started...` );
	[
		[ 0, 0 ],
		[ 1, 0 ],
		[ 45454, 18 ],
		[ 11, 0x500 ],
		[ 0xffffffff, 3 ],
		[ 0xf0000000, 5 ],
		[ 0xff00ff00, 10 ],
		[ 0xff00fa00, 31 ],
	].forEach( prm => {
		const num: number = prm[ 0 ];
		const shift: number = prm[ 1 ];
		const v = IntegerExt.rotateUint32BitsLeft( IntegerExt.rotateUint32BitsRight( num, shift ), shift );
		if ( v === num ) {
			++passed;
		}
		else {
			console.error( `test failed on ${ v } expected ${ num }` );
			++failed;
		}
	} );
	console.log( `result: passed ${ passed } failed ${ failed }` );
	return failed;
}

export function testReverseUint32Bytes(): number {
	let passed = 0, failed = 0;
	console.log( `testReverseUint32Bytes started...` );
	[
		[ 0 ],
		[ 1 ],
		[ 45454 ],
		[ 11 ],
		[ 0xffffffff ],
		[ 0xf0000000 ],
		[ 0xff00ff00 ],
		[ 0xff00fa00 ],
	].forEach( prm => {
		const num: number = prm[ 0 ];
		const v = IntegerExt.reverseUint32Bytes( IntegerExt.reverseUint32Bytes( num ) );
		if ( v === num ) {
			++passed;
		}
		else {
			console.error( `test failed on ${ v } expected ${ num }` );
			++failed;
		}
	} );
	console.log( `result: passed ${ passed } failed ${ failed }` );
	return failed;
}

export function testRandomNumber(): number {
	let passed = 0, failed = 0;
	console.log( `testRandomNumber started...` );
	[
		[ 1 ],
		[ 20 ],
		[ 300 ],
		[ 4000 ],
		[ 50000 ],
	].forEach( prm => {
		const rndUint: number = IntegerExt.randomizeUint( prm[ 0 ] );
		if ( rndUint < prm[ 0 ] ) {
			++passed;
		}
		else {
			console.error( `test failed on ${ rndUint } expected within [0, ${ prm[ 0 ] })` );
			++failed;
		}
		const rndInt: number = IntegerExt.randomizeInt( -prm[ 0 ], prm[ 0 ] );
		if ( rndInt >= -prm[ 0 ] && rndInt < prm[ 0 ] ) {
			++passed;
		}
		else {
			console.error( `test failed on ${ rndInt } expected within [${ -prm[ 0 ] }, ${ prm[ 0 ] }) }` );
			++failed;
		}
	} );
	console.log( `result: passed ${ passed } failed ${ failed }` );
	return failed;
}

export function testUuid(): number {
	let passed = 0, failed = 0;
	console.log( `testUuid started...` );
	let uuid = -1n;
	for ( let i = 0; i < 16; ++i ) {
		const uuid_ = IntegerExt.generateUuid();
		if ( uuid !== uuid_ ) {
			++passed;
		}
		else {
			++failed;
		}
		uuid = uuid_;
	}
	console.log( `result: passed ${ passed } failed ${ failed }` );
	return failed;
}
