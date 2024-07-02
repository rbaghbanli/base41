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
	Returns base41 encoded string.
	@param value Buffer to encode.
	@param littleEndian True if little end first.
	@returns Base41 encoded string.
*/
export function stringify(value: DataView | ArrayBufferLike | null | undefined, littleEndian?: boolean): string | null {
	if (!value) {
		return null;
	}
	const dv = value instanceof DataView ? value : new DataView(value);
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
	Returns byte sequence decoded from base41 encoded string.
	@param value Base41 encoded string.
	@param littleEndian True if little end first.
	@returns Decoded buffer.
*/
export function parse(value: string | null | undefined, littleEndian?: boolean): ArrayBuffer | null {
	if (value == null) {
		return null;
	}
	return parseInto(new DataView(new ArrayBuffer(byteLength(value))), value, littleEndian);
}

/**
	Writes byte sequence decoded from base41 string into destination buffer.
	@param data Destination buffer.
	@param value Base41 encoded string.
	@param littleEndian True if little end first.
	@returns Decoded buffer.
*/
export function parseInto(data: DataView | ArrayBufferLike, value: string | null | undefined, littleEndian?: boolean): ArrayBuffer {
	const dv = data instanceof DataView ? data : new DataView(data);
	if (value) {
		for (let li = value.length - 2, i = 0, pos = 0; i < value.length && pos < dv.byteLength; pos += 2) {
			if (i < li) {
				dv.setUint16(pos, _BASE41_WORD_DECODE_MAP.get(value.slice(i, i += 3)) ?? 0, littleEndian);
			}
			else {
				dv.setUint8(pos, _BASE41_BYTE_DECODE_MAP.get(value.slice(i++)) ?? 0);
			}
		}
	}
	return dv.buffer;
}

/**
	Returns base41 string for given code point.
	@param value Code point.
	@param byteLength Optional code point byte length, defaults to 2.
	@returns Base41 string for code point.
*/
export function stringifyCode(value: number | null | undefined, byteLength?: 2 | 1): string | null {
	if (value == null) {
		return null;
	}
	return byteLength === 1
		? _BASE41_BYTE_ENCODE_MAP.get(value) ?? null
		: _BASE41_WORD_ENCODE_MAP.get(value) ?? null;
}

/**
	Returns code point of base41 string.
	@param value Base41 string.
	@param byteLength Optional code point byte length, defaults to 2.
	@returns Code point of base41 string.
*/
export function parseCode(value: string | null | undefined, byteLength?: 2 | 1): number | null {
	if (!value) {
		return null;
	}
	return byteLength === 1
		? _BASE41_BYTE_DECODE_MAP.get(value) ?? null
		: _BASE41_WORD_DECODE_MAP.get(value) ?? null;
}

/**
	Returns the number of bytes to be parsed from base41 encoded string.
	@param value String of specified encoding.
	@returns Number of bytes.
*/
export function byteLength(value: string | null | undefined): number {
	return value ? Math.round(value.length * 2 / 3) : 0;
}
