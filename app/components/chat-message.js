import { Component } from 'angular2/core';

import { NewlinePipe } from '../pipes/newline';
import { StripHtmlPipe } from '../pipes/striphtml';

// Chat message component
// So we can play with the DynamicComponentLoader in the chat room

@Component({
	template: `
		<p class="chat-message"><span class="chat-message__nick">{{ nick }}:</span> <span class="chat-message__content" [innerHTML]="message | newline | stripHTML"></span></p>
	`,
	pipes: [NewlinePipe, StripHtmlPipe]
})
export class ChatMessageComponent {

	constructor() {}

	setContent(content)
	{
		this.nick = content.nick;
		this.message = content.message;
	}

}