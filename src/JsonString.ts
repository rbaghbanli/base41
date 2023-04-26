import { BinaryData } from './BinaryData';

export class JsonString {

	protected static replace( this: any, key: string, value: any ): any {
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
			return { __json__dataview__: BinaryData.getString( value, 'base41' ) };
		}
		if ( this[ key ] instanceof ArrayBuffer && value ) {
			return { __json__arraybuffer__: BinaryData.getString( value, 'base41' ) };
		}
		return value;
	}

	protected static revive( key: string, value: any ): any {
		if ( value != null && typeof value === 'object' ) {
			if ( '__json__bigint__' in value && typeof value.__json__bigint__ === 'string' ) {
				return BigInt( value.__json__bigint__ );
			}
			if ( '__json__date__' in value && typeof value.__json__date__ === 'string' ) {
				return new Date( value.__json__date__ );
			}
			if ( '__json__set__' in value && typeof value.__json__set__ === 'string' ) {
				return new Set( value.__json__set__ );
			}
			if ( '__json__map__' in value && typeof value.__json__map__ === 'string' ) {
				return new Map( value.__json__map__ );
			}
			if ( '__json__dataview__' in value && typeof value.__json__dataview__ === 'string' ) {
				return new DataView( BinaryData.getStringBuffer( value.__json__dataview__, 'base41' ) );
			}
			if ( '__json__arraybuffer__' in value && typeof value.__json__arraybuffer__ === 'string' ) {
				return BinaryData.getStringBuffer( value.__json__arraybuffer__, 'base41' );
			}
		}
		return value;
	}

	/**
		Returns JSON string with bigint, date, set, map, DataView and ArrayBuffer values wrapped into objects
		@param value object to stringify
		@param space adds indentation, white space, and line break characters to the return-value
		@returns JSON string
	*/
	static getString<T = any>( value: T, space?: number | string ): string {
		return JSON.stringify( value, JsonString.replace, space );
	}

	/**
		Returns object with bigint, date, set, map, DataView and ArrayBuffer values parsed from wrapper objects
		@param value string to parse
		@returns parsed object
	*/
	static getObject<T = any>( value: string ): T {
		return JSON.parse( value, JsonString.revive ) as T;
	}

}
