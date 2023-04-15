export class DateTime {

	/**
		Returns YYYY-MM-DD date string
		@param date Date
		@returns YYYY-MM-DD date string
	*/
	static getDateString( date: Date ): string {
		return `${ date.getFullYear().toString() }` +
			`-${ ( date.getMonth() + 1 ).toString().padStart( 2, '0' ) }` +
			`-${ date.getDate().toString().padStart( 2, '0' ) }`;
	}

	/**
		Returns YYYY-MM-DD UTC date string
		@param date Date
		@returns YYYY-MM-DD date string
	*/
	static getUtcDateString( date: Date ): string {
		return `${ date.getUTCFullYear().toString() }` +
			`-${ ( date.getUTCMonth() + 1 ).toString().padStart( 2, '0' ) }` +
			`-${ date.getUTCDate().toString().padStart( 2, '0' ) }`;
	}

	/**
		Returns HH:MM:SS time string
		@param date Date
		@returns HH:MM:SS time string
	*/
	static getTimeString( date: Date ): string {
		return `${ date.getHours().toString().padStart( 2, '0' ) }` +
			`:${ date.getMinutes().toString().padStart( 2, '0' ) }` +
			`:${ date.getSeconds().toString().padStart( 2, '0' ) }`;
	}

	/**
		Returns HH:MM:SS UTC time string
		@param date Date
		@returns HH:MM:SS time string
	*/
	static getUtcTimeString( date: Date ): string {
		return `${ date.getUTCHours().toString().padStart( 2, '0' ) }` +
			`:${ date.getUTCMinutes().toString().padStart( 2, '0' ) }` +
			`:${ date.getUTCSeconds().toString().padStart( 2, '0' ) }`;
	}

	/**
		Returns YYYY-MM-DD HH:MM:SS date-time string
		@param date Date
		@returns YYYY-MM-DD HH:MM:SS date-time string
	*/
	static getDateTimeString( date: Date ): string {
		return `${ DateTime.getDateString( date ) } ${ DateTime.getTimeString( date ) }`;
	}

	/**
		Returns YYYY-MM-DD HH:MM:SS UTC date-time string
		@param date Date
		@returns YYYY-MM-DD HH:MM:SS date-time string
	*/
	static getUtcDateTimeString( date: Date ): string {
		return `${ DateTime.getUtcDateString( date ) } ${ DateTime.getUtcTimeString( date ) }`;
	}

}
