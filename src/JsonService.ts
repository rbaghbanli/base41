import * as BufferExt from './BufferService';

/**
	Replaces bigint, date, set, map, DataView and ArrayBuffer values with wrapping objects.
	@param this Object being stringified.
	@param key Property name.
	@param value Property value.
	@returns JSON string.
*/
export function replaceJson( this: any, key: string, value: any ): any {
	if ( typeof value === 'bigint' ) {
		return { __json__bigint__: value.toString() };
	}
	if ( this[ key ] instanceof Date && value ) {
		return { __json__date__: value.toString() };
	}
	if ( this[ key ] instanceof Set && value ) {
		return { __json__set__: Array.from( value.keys() ) };
	}
	if ( this[ key ] instanceof Map && value ) {
		return { __json__map__: Array.from( value.entries() ) };
	}
	if ( this[ key ] instanceof DataView && value ) {
		return { __json__dataview__: BufferExt.toString( value, 'base41' ) };
	}
	if ( this[ key ] instanceof ArrayBuffer && value ) {
		return { __json__arraybuffer__: BufferExt.toString( value, 'base41' ) };
	}
	return value;
}

/**
	Revives bigint, date, set, map, DataView and ArrayBuffer values from wrapping objects.
	@param key Property name.
	@param value Property value.
	@returns Parsed value.
*/
export function reviveJson( key: string, value: any ): any {
	if ( value != null && typeof value === 'object' ) {
		if ( '__json__bigint__' in value && typeof value.__json__bigint__ === 'string' ) {
			return BigInt( value.__json__bigint__ );
		}
		if ( '__json__date__' in value && typeof value.__json__date__ === 'string' ) {
			return new Date( value.__json__date__ );
		}
		if ( '__json__set__' in value && typeof value.__json__set__ === 'object' ) {
			return new Set( value.__json__set__ );
		}
		if ( '__json__map__' in value && typeof value.__json__map__ === 'object' ) {
			return new Map( value.__json__map__ );
		}
		if ( '__json__dataview__' in value && typeof value.__json__dataview__ === 'string' ) {
			return new DataView( BufferExt.fromString( value.__json__dataview__, 'base41' ) );
		}
		if ( '__json__arraybuffer__' in value && typeof value.__json__arraybuffer__ === 'string' ) {
			return BufferExt.fromString( value.__json__arraybuffer__, 'base41' );
		}
	}
	return value;
}

/**
	Returns JSON string with bigint, date, set, map, DataView and ArrayBuffer values wrapped into objects.
	@param value Object to stringify.
	@param space Adds indentation, white space, and line break characters to the return-value.
	@returns JSON string.
*/
export function toString<T = any>( value: T, space?: number | string ): string {
	return JSON.stringify( value, replaceJson, space );
}

/**
	Returns object with bigint, date, set, map, DataView and ArrayBuffer values parsed from wrapper objects.
	@param value String to parse.
	@returns Parsed value.
*/
export function fromString<T = any>( value: string ): T {
	return JSON.parse( value, reviveJson ) as T;
}
