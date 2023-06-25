/**
	Returns formatted date, time or date-time string.
	@param date Date to stringify.
	@param format 'YYYY-MM-DD', 'HH:MM', 'HH:MM:SS', 'HH:MM:SS.UUU', 'YYYY-MM-DD HH:MM:SS', 'YYYY-MM-DD HH:MM:SS.UUU'.
	@param utc True for UTC, false for local.
	@returns Formatted date or date-time string.
*/
export function toString( date: Date,
	format: 'YYYY-MM-DD' | 'HH:MM' | 'HH:MM:SS' | 'HH:MM:SS.UUU' | 'YYYY-MM-DD HH:MM' | 'YYYY-MM-DD HH:MM:SS' | 'YYYY-MM-DD HH:MM:SS.UUU',
	utc?: boolean ): string {
	if ( utc ) {
		switch ( format ) {
			case 'YYYY-MM-DD':
				return `${ date.getUTCFullYear().toString() }` +
					`-${ ( date.getUTCMonth() + 1 ).toString().padStart( 2, '0' ) }` +
					`-${ date.getUTCDate().toString().padStart( 2, '0' ) }`;
			case 'HH:MM':
				return `${ date.getUTCHours().toString().padStart( 2, '0' ) }` +
					`:${ date.getUTCMinutes().toString().padStart( 2, '0' ) }`;
			case 'HH:MM:SS':
				return `${ date.getUTCHours().toString().padStart( 2, '0' ) }` +
					`:${ date.getUTCMinutes().toString().padStart( 2, '0' ) }` +
					`:${ date.getUTCSeconds().toString().padStart( 2, '0' ) }`;
			case 'HH:MM:SS.UUU':
				return `${ date.getUTCHours().toString().padStart( 2, '0' ) }` +
					`:${ date.getUTCMinutes().toString().padStart( 2, '0' ) }` +
					`:${ date.getUTCSeconds().toString().padStart( 2, '0' ) }` +
					`.${ date.getUTCMilliseconds().toString().padStart( 3, '0' ) }`;
			case 'YYYY-MM-DD HH:MM':
				return `${ toString( date, 'YYYY-MM-DD', utc ) } ${ toString( date, 'HH:MM', utc ) }`;
			case 'YYYY-MM-DD HH:MM:SS':
				return `${ toString( date, 'YYYY-MM-DD', utc ) } ${ toString( date, 'HH:MM:SS', utc ) }`;
			default:
				return `${ toString( date, 'YYYY-MM-DD', utc ) } ${ toString( date, 'HH:MM:SS.UUU', utc ) }`;
		}
	}
	else {
		switch ( format ) {
			case 'YYYY-MM-DD':
				return `${ date.getFullYear().toString() }` +
					`-${ ( date.getMonth() + 1 ).toString().padStart( 2, '0' ) }` +
					`-${ date.getDate().toString().padStart( 2, '0' ) }`;
			case 'HH:MM':
				return `${ date.getHours().toString().padStart( 2, '0' ) }` +
					`:${ date.getMinutes().toString().padStart( 2, '0' ) }`;
			case 'HH:MM:SS':
				return `${ date.getHours().toString().padStart( 2, '0' ) }` +
					`:${ date.getMinutes().toString().padStart( 2, '0' ) }` +
					`:${ date.getSeconds().toString().padStart( 2, '0' ) }`;
			case 'HH:MM:SS.UUU':
				return `${ date.getHours().toString().padStart( 2, '0' ) }` +
					`:${ date.getMinutes().toString().padStart( 2, '0' ) }` +
					`:${ date.getSeconds().toString().padStart( 2, '0' ) }` +
					`.${ date.getMilliseconds().toString().padStart( 3, '0' ) }`;
			case 'YYYY-MM-DD HH:MM':
				return `${ toString( date, 'YYYY-MM-DD', utc ) } ${ toString( date, 'HH:MM', utc ) }`;
			case 'YYYY-MM-DD HH:MM:SS':
				return `${ toString( date, 'YYYY-MM-DD', utc ) } ${ toString( date, 'HH:MM:SS', utc ) }`;
			default:
				return `${ toString( date, 'YYYY-MM-DD', utc ) } ${ toString( date, 'HH:MM:SS.UUU', utc ) }`;
		}
	}
}

/**
	Returns Date from YYYY-MM-DD[ HH:MM[:SS[.UUU]]] formatted date or date-time string.
	@param value Date or date-time string in YYYY-MM-DD[ HH:MM[:SS[.UUU]]] format.
	@param utc True to parse string as UTC date or date-time, false to parse it as local.
	@returns Parsed Date, throws Error if invalid parameter format.
*/
export function fromString( value: string, utc?: boolean ): Date {
	if ( utc ) {
		switch ( value.length ) {
			case 10:
				return new Date( `${ value } 00:00:00.000Z` );
			case 16:
				return new Date( `${ value }:00.000Z` );
			case 19:
				return new Date( `${ value }.000Z` );
			default:
				if ( value.length > 22 ) {
					return new Date( `${ value.substring( 0, 23 ) }Z` );
				}
				throw new Error( `invalid parameter '${ value }'` );
		}
	}
	else {
		return new Date( value );
	}
}
