import { parseCode, stringifyCode, parse, stringify, byteLength } from '../src/index.js';

describe('Base41 test to', ()=> {
	it('stringify and parse empty buffer', ()=> {
		const original = new Uint8Array(0).buffer;
		const computed = parse(stringify(original));
		expect(computed?.byteLength).toEqual(original.byteLength);
	});
	it('stringify and parse buffer big endian', ()=> {
		const original = new Uint8Array([ 0, 1, 2, 3, 4, 5, 255, 255 ]).buffer;
		const computed = parse(stringify(original));
		expect(computed?.byteLength).toEqual(original.byteLength);
	});
	it('stringify and parse buffer little endian', ()=> {
		const original = new Uint8Array([ 255, 255, 2, 3, 4, 5, 6, 7 ]).buffer;
		const computed = parse(stringify(original));
		expect(computed?.byteLength).toEqual(original.byteLength);
	});
	it('parse and stringify empty string', ()=> {
		const original = '';
		const computed = stringify(parse(original));
		expect(computed).toEqual(original);
	});
	it('parse and stringify 6-char string big endian', ()=> {
		const original = 'aaa22a';
		const computed = stringify(parse(original));
		expect(computed).toEqual(original);
	});
	it('parse and stringify 6-char string little endian', ()=> {
		const original = 'aaa22a';
		const computed = stringify(parse(original, true), true);
		expect(computed).toEqual(original);
	});
	it('parse and stringify 7-char string big endian', ()=> {
		const original = '10f22a5';
		const computed = stringify(parse(original));
		expect(computed).toEqual(original);
	});
	it('parse and stringify 7-char string little endian', ()=> {
		const original = '10f22a5';
		const computed = stringify(parse(original, true), true);
		expect(computed).toEqual(original);
	});
	it('parse and stringify 8-char string big endian', ()=> {
		const original = '10f22a5s';
		const computed = stringify(parse(original));
		expect(computed).toEqual(original);
	});
	it('parse and stringify 8-char string little endian', ()=> {
		const original = '10f22a69';
		const computed = stringify(parse(original, true), true);
		expect(computed).toEqual(original);
	});
	it('stringify and parse 1 byte long code point', ()=> {
		const original = 255;
		const computed = parseCode(stringifyCode(original, 1), 1);
		expect(computed).toEqual(original);
	});
	it('stringify and parse 2 byte long code point', ()=> {
		const original = 65535;
		const computed = parseCode(stringifyCode(original, 2), 2);
		expect(computed).toEqual(original);
	});
	it('byte length', ()=> {
		const original = new Uint8Array([ 10, 11, 12, 13, 14, 15, ]).buffer;
		const computed = byteLength(stringify(original));
		expect(computed).toEqual(original.byteLength);
	});
});
