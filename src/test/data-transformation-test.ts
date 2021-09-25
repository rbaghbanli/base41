import Data_Transformation from "../export/data-transformation";

export class Data_Transformation_Test {

	test_buffer_string(): number {
		let passed = 0, failed = 0;
		console.log( `test binary.test_buffer_string started` );
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
		].forEach( prm => {
			const bin = new Uint8Array( prm[ 0 ] as number[] );
			const enc = prm[ 1 ] as 'base16'|'base41'|'ascii'|'ucs2';
			const lend: boolean = prm[ 2 ] as boolean;
			const str = Data_Transformation.get_string_from_binary( new DataView( bin.buffer ), enc, lend );
			const v = new Uint8Array( Data_Transformation.get_buffer_from_string( str, enc, lend ) );
			if ( Data_Transformation.equal_binary( new DataView( v.buffer ), new DataView( bin.buffer ) ) ) {
				++passed;
			}
			else {
				console.error( `test binary.test_buffer_string failed on ${ v } expected ${ bin } for ${ enc }` );
				++failed;
			}
		} );
		console.log( `test binary.test_buffer_string finished: passed ${ passed } failed ${ failed }` );
		return failed;
	}

}
