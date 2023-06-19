/**
	Returns YYYY-MM-DD date string.
	@param date Date.
	@returns YYYY-MM-DD date string.
*/
export function toDateString( date: Date ): string {
	return `${ date.getFullYear().toString() }` +
		`-${ ( date.getMonth() + 1 ).toString().padStart( 2, '0' ) }` +
		`-${ date.getDate().toString().padStart( 2, '0' ) }`;
}

/**
	Returns YYYY-MM-DD UTC date string.
	@param date Date.
	@returns YYYY-MM-DD date string.
*/
export function toUtcDateString( date: Date ): string {
	return `${ date.getUTCFullYear().toString() }` +
		`-${ ( date.getUTCMonth() + 1 ).toString().padStart( 2, '0' ) }` +
		`-${ date.getUTCDate().toString().padStart( 2, '0' ) }`;
}

/**
	Returns HH:MM:SS time string.
	@param date Date.
	@param appendMilliseconds Append milliseconds.
	@returns HH:MM:SS[.UUU] time string.
*/
export function toTimeString( date: Date, appendMilliseconds?: boolean ): string {
	return `${ date.getHours().toString().padStart( 2, '0' ) }` +
		`:${ date.getMinutes().toString().padStart( 2, '0' ) }` +
		`:${ date.getSeconds().toString().padStart( 2, '0' ) }` +
		( appendMilliseconds ? `.${ date.getMilliseconds().toString().padStart( 3, '0' ) }` : '' );
}

/**
	Returns HH:MM:SS UTC time string.
	@param date Date.
	@param appendMilliseconds Append milliseconds.
	@returns HH:MM:SS[.UUU] time string.
*/
export function toUtcTimeString( date: Date, appendMilliseconds?: boolean ): string {
	return `${ date.getUTCHours().toString().padStart( 2, '0' ) }` +
		`:${ date.getUTCMinutes().toString().padStart( 2, '0' ) }` +
		`:${ date.getUTCSeconds().toString().padStart( 2, '0' ) }` +
		( appendMilliseconds ? `.${ date.getUTCMilliseconds().toString().padStart( 3, '0' ) }` : '' );
}

/**
	Returns YYYY-MM-DD HH:MM:SS[.UUU] date-time string.
	@param date Date.
	@param appendMilliseconds Append milliseconds.
	@returns YYYY-MM-DD HH:MM:SS[.UUU] date-time string.
*/
export function toDateTimeString( date: Date, appendMilliseconds?: boolean ): string {
	return `${ toDateString( date ) } ${ toTimeString( date, appendMilliseconds ) }`;
}

/**
	Returns YYYY-MM-DD HH:MM:SS[.UUU] UTC date-time string.
	@param date Date.
	@param appendMilliseconds Append milliseconds.
	@returns YYYY-MM-DD HH:MM:SS[.UUU] date-time string.
*/
export function toUtcDateTimeString( date: Date, appendMilliseconds?: boolean ): string {
	return `${ toUtcDateString( date ) } ${ toUtcTimeString( date, appendMilliseconds ) }`;
}
