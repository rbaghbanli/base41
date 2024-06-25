const _BASE41_CHAR_ENCODE_STR = '0123456789abcdefghijkLmnopqrstuvwxyzABCDE';
const _BASE41_BYTE_ENCODE_MAP = new Map<number, string>();
const _BASE41_BYTE_DECODE_MAP = new Map<string, number>();
const _BASE41_WORD_ENCODE_MAP = new Map<number, string>();
const _BASE41_WORD_DECODE_MAP = new Map<string, number>();

for (let i = 0; i < 65536; ++i) {
	if (i < 41) {
		const char = _BASE41_CHAR_ENCODE_STR.charAt(i);
		_BASE41_BYTE_ENCODE_MAP.set(i, char);
		_BASE41_BYTE_DECODE_MAP.set(char, i);
	}
	else if (i < 256) {
		const diad = _BASE41_CHAR_ENCODE_STR.charAt(Math.trunc(i / 41))
			+ _BASE41_CHAR_ENCODE_STR.charAt(i % 41);
		_BASE41_BYTE_ENCODE_MAP.set(i, diad);
		_BASE41_BYTE_DECODE_MAP.set(diad, i);
	}
	const r = i % 1681;
	const triad = _BASE41_CHAR_ENCODE_STR.charAt(Math.trunc(i / 1681))
		+ _BASE41_CHAR_ENCODE_STR.charAt(Math.trunc(r / 41))
		+ _BASE41_CHAR_ENCODE_STR.charAt(r % 41);
	_BASE41_WORD_ENCODE_MAP.set(i, triad);
	_BASE41_WORD_DECODE_MAP.set(triad, i);
}

/**
	Returns base41 string for given byte value.
	@param code Byte value (0 - 255).
	@returns Base41 string for byte value.
*/
export function byteString(code: number): string | undefined {
	return _BASE41_BYTE_ENCODE_MAP.get(code);
}

/**
	Returns base41 string for given word value.
	@param code Word value (0 - 65535).
	@returns Base41 string for word value.
*/
export function wordString(code: number): string | undefined {
	return _BASE41_WORD_ENCODE_MAP.get(code);
}

/**
	Returns code point of base41 string.
	@param value Base41 string.
	@param ix Optional string index.
	@returns Code point of base41 string.
*/
export function codeAt(value: string, ix?: number): number | undefined {
	const i = ix ?? 0;
	if (i < 0 || value.length <= i) {
		return undefined;
	}
	const i3 = i + 3;
	return i3 < value.length
		? _BASE41_WORD_DECODE_MAP.get(value.slice(i, i3))
		: _BASE41_BYTE_DECODE_MAP.get(value.slice(i));
}

/**
	Returns the number of bytes to be parsed from base41 encoded string.
	@param value String of specified encoding.
	@returns Number of bytes.
*/
export function byteLength(value: string): number {
	return Math.round(value.length * 2 / 3);
}

/**
	Returns base41 encoded string.
	@param data Buffer to encode.
	@param littleEndian True if little end first.
	@returns Base41 encoded string.
*/
export function stringify(data: DataView | ArrayBufferLike, littleEndian?: boolean): string {
	const dv = data instanceof DataView ? data : new DataView(data);
	let str = '';
	for (let li = dv.byteLength - 1, i = 0; i < dv.byteLength; i += 2) {
		if (i < li) {
			str += _BASE41_WORD_ENCODE_MAP.get(dv.getUint16(i, littleEndian));
		}
		else {
			str += _BASE41_BYTE_ENCODE_MAP.get(dv.getUint8(i));
		}
	}
	return str;
}

/**
	Writes byte sequence decoded from base41 string into destination buffer.
	@param data Destination buffer.
	@param value Base41 encoded string.
	@param littleEndian True if little end first.
	@returns Decoded buffer.
*/
export function write(data: DataView | ArrayBufferLike, value: string, littleEndian?: boolean): ArrayBuffer {
	const dv = data instanceof DataView ? data : new DataView(data);
	for (let li = value.length - 2, i = 0, pos = 0; i < value.length && pos < dv.byteLength; pos += 2) {
		if (i < li) {
			dv.setUint16(pos, _BASE41_WORD_DECODE_MAP.get(value.slice(i, i += 3)) ?? 0, littleEndian);
		}
		else {
			dv.setUint8(pos, _BASE41_BYTE_DECODE_MAP.get(value.slice(i++)) ?? 0);
		}
	}
	return dv.buffer;
}

/**
	Returns byte sequence decoded from base41 encoded string.
	@param value Base41 encoded string.
	@param littleEndian True if little end first.
	@returns Decoded buffer.
*/
export function parse(value: string, littleEndian?: boolean): ArrayBuffer {
	return write(new DataView(new ArrayBuffer(byteLength(value))), value, littleEndian);
}
