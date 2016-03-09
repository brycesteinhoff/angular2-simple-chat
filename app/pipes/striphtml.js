import { Pipe, PipeTransform } from 'angular2/core';

// TO-DO: This should probably be done server-side

@Pipe({
	name: 'stripHTML'
})
export class StripHtmlPipe implements PipeTransform {

	transform(value: string, args: string[])
	{	
		if (typeof value === 'string') {
			// Strip HTML tags except for line breaks
			value = value.replace(/<(?!br\s\/?)[^>]+>/g, '');
		}

		return value;
	}

}