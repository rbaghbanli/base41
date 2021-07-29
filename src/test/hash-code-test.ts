import Hash_Code from '../export/hash-code';
import Data_Transformation from "../export/data-transformation";

class Hash_Code_Test {

	static test_sha256_hash_code(): number {
		let passed = 0, failed = 0;
		console.log( `test crypto.test_sha256_hashcode started` );
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
		].forEach( prm => {
			const hash: string = prm[ 0 ];
			const str: string = prm[ 1 ];
			const bin = Data_Transformation.get_buffer_from_string( str, 'ascii' );
			const hc = Hash_Code.get_sha256_hash_code( new DataView( bin ) );
			const v = Data_Transformation.get_string_from_binary( new DataView( hc ), 'base16' );
			if ( v === hash ) {
				++passed;
			}
			else {
				console.error( `test crypto.test_sha256_hashcode failed on ${ v } expected ${ hash } text length ${ str.length }` );
				++failed;
			}
		} );
		console.log( `test crypto.test_sha256_hashcode finished: passed ${ passed } failed ${ failed }` );
		return failed;
	}

}