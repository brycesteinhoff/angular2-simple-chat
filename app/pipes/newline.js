import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
	name: 'newline'
})
export class NewlinePipe implements PipeTransform {

	transform(value: string, args: string[])
	{	
		if (typeof value === 'string') {
			// Replace new lines with HTML line breaks
			value = value.replace(/\n/g, '<br />');
		}

		return value;
	}

}