/**
	Returns YYYY-MM-DD date string
	@param date Date
	@returns YYYY-MM-DD date string
*/
export function getDateString( date: Date ): string {
	return `${ date.getFullYear().toString() }` +
		`-${ ( date.getMonth() + 1 ).toString().padStart( 2, '0' ) }` +
		`-${ date.getDate().toString().padStart( 2, '0' ) }`;
}

/**
	Returns YYYY-MM-DD UTC date string
	@param date Date
	@returns YYYY-MM-DD date string
*/
export function getUtcDateString( date: Date ): string {
	return `${ date.getUTCFullYear().toString() }` +
		`-${ ( date.getUTCMonth() + 1 ).toString().padStart( 2, '0' ) }` +
		`-${ date.getUTCDate().toString().padStart( 2, '0' ) }`;
}

/**
	Returns HH:MM:SS time string
	@param date Date
	@returns HH:MM:SS time string
*/
export function getTimeString( date: Date ): string {
	return `${ date.getHours().toString().padStart( 2, '0' ) }` +
		`:${ date.getMinutes().toString().padStart( 2, '0' ) }` +
		`:${ date.getSeconds().toString().padStart( 2, '0' ) }`;
}

/**
	Returns HH:MM:SS UTC time string
	@param date Date
	@returns HH:MM:SS time string
*/
export function getUtcTimeString( date: Date ): string {
	return `${ date.getUTCHours().toString().padStart( 2, '0' ) }` +
		`:${ date.getUTCMinutes().toString().padStart( 2, '0' ) }` +
		`:${ date.getUTCSeconds().toString().padStart( 2, '0' ) }`;
}

/**
	Returns YYYY-MM-DD HH:MM:SS date-time string
	@param date Date
	@returns YYYY-MM-DD HH:MM:SS date-time string
*/
export function getDateTimeString( date: Date ): string {
	return `${ getDateString( date ) } ${ getTimeString( date ) }`;
}

/**
	Returns YYYY-MM-DD HH:MM:SS UTC date-time string
	@param date Date
	@returns YYYY-MM-DD HH:MM:SS date-time string
*/
export function getUtcDateTimeString( date: Date ): string {
	return `${ getUtcDateString( date ) } ${ getUtcTimeString( date ) }`;
}
