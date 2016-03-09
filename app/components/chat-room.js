import { Component, DynamicComponentLoader } from 'angular2/core';

import { AuthService } from '../services/auth';
import { WebsocketService } from '../services/websocket';

// Chat room component

@Component({
	template: `
		<h2>Chat Room</h2>
		<div class="chat-history"></div>
		<textarea class="form-control" rows="3" (keyup)="onKeyUp($event)" [(ngModel)]="message"></textarea>
		<div class="chat-status">Status: <span>Idle</span></div>

		<button type="submit" class="btn btn-default" (click)="sendMessage()">Send Message</button>
	`,
	providers: [AuthService, WebsocketService]
})
export class ChatRoomComponent {

	constructor(_websocketService: WebsocketService)
	{
		this._websocketService = _websocketService;
	}

	ngOnInit()
	{
		// Auth check and redirect to welcome
		// Decorator???

		// Connect to websocket
		this._websocketService.connect()
		.subscribe(
			res => {
				console.log('in chat room: socket connected');

				// Send room auth message over websocket?
				// For room security & open room tracking?

				// Listen for new incoming messages
				this._websocketService.on('chat-message', this.receiveMessage);
			},
			error => {
				console.log('in chat room: socket error');
				// Show error to user
				// Redirect back to chat select?
			}
		);
	}

	onKeyUp(event: any)
	{
		if (event.key === 'Enter' && event.shiftKey === false) {
			// Remove enter character at end
			this.message = this.message.slice(0, -1);

			this.sendMessage();
		}
	}

	sendMessage()
	{
		if (this.message.trim()) {
			console.log('sending message:', this.message);
			
			// Send message on websocket
			this._websocketService.emit('chat-message', { message: this.message });

			// Clear message field
			this.message = '';
		}
	}

	receiveMessage(data)
	{
		console.log('message received:', data);


	}

}