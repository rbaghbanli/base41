export class JsonString {

	protected static replace( this: any, key: string, value: any ): any {
		if ( typeof value === 'bigint' ) {
			return { __bigint__: value.toString() };
		}
		if ( this[ key ] instanceof Date && value ) {
			return { __datetime__: value.toString() };
		}
		return value;
	}

	protected static revive( key: string, value: any ): any {
		if ( value != null && typeof value === 'object' ) {
			if ( '__bigint__' in value ) {
				return BigInt( value.__bigint__ );
			}
			if ( '__datetime__' in value ) {
				return new Date( value.__datetime__ );
			}
		}
		return value;
	}

	/**
		Returns JSON string with bigint and date values wrapped into objects
		@param value object to stringify
		@param space adds indentation, white space, and line break characters to the return-valueks
		@returns JSON string
	*/
	static getString<T = any>( value: T, space?: number | string ): string {
		return JSON.stringify( value, JsonString.replace, space );
	}

	/**
		Returns object with bigint and date values parsed from wrapping objects
		@param value string to parse
		@returns parsed object
	*/
	static getObject<T = any>( value: string ): T {
		return JSON.parse( value, JsonString.revive ) as T;
	}

}
