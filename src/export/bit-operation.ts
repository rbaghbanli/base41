export default class Bit_Operation {

	static rotate_nat32_left( nat: number, shift: number ): number {
		return ( ( nat << shift ) | ( nat >>> ( 32 - shift ) ) ) >>> 0;
	}

	static rotate_nat32_right( nat: number, shift: number ): number {
		return ( ( nat >>> shift ) | ( nat << ( 32 - shift ) ) ) >>> 0;
	}

}
