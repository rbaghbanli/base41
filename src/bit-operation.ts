export class Bit_Operation {

	/**
		Returns the result of bit rotation of 32-bit natural number to left
		@param nat 32-bit natural number
		@param shift number of bits to rotate by
		@returns the result of bit rotation of 32-bit natural number to left
	*/
	static rotate_uint32_left( nat: number, shift: number ): number {
		return ( ( nat << shift ) | ( nat >>> ( 32 - shift ) ) ) >>> 0;
	}

	/**
		Returns the result of bit rotation of 32-bit natural number to right
		@param nat 32-bit natural number
		@param shift number of bits to rotate by
		@returns the result of bit rotation of 32-bit natural number to right
	*/
	static rotate_uint32_right( nat: number, shift: number ): number {
		return ( ( nat >>> shift ) | ( nat << ( 32 - shift ) ) ) >>> 0;
	}

}
