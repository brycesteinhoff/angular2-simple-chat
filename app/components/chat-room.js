import { Component, DynamicComponentLoader, ElementRef } from 'angular2/core';
import { Router, RouteParams, CanDeactivate, ComponentInstruction } from 'angular2/router';

import { tokenPresent } from '../services/jwt';
import { WebsocketService } from '../services/websocket';
import { ChatMessageComponent } from './chat-message';

// Chat room component

@Component({
	template: `
		<h2 class="page-header">Chat Room: <span class="chat-room-name">{{ room }}</span></h2>

		<div id="chat-history" class="chat-history">
			<div #history></div>
		</div>

		<div class="form-group">
			<textarea id="chat-message-box" class="form-control" rows="1" (keyup)="onKeyUp($event)" [(ngModel)]="message"></textarea>
		</div>

		<button type="submit" class="btn btn-default pull-right" (click)="sendMessage()">Send Message</button>
	`,
	providers: [WebsocketService]
})
export class ChatRoomComponent implements CanDeactivate {

	constructor(
		_websocketService: WebsocketService,
		_router: Router,
		_routeParams: RouteParams,
		_dynamicComponentLoader: DynamicComponentLoader,
		_elementRef: ElementRef
	)
	{
		this._websocketService = _websocketService;

		this._router = _router;

		this._routeParams = _routeParams;

		this._dynamicComponentLoader = _dynamicComponentLoader;

		this._elementRef = _elementRef;

		this.room = undefined;

		this.el_history = undefined;
	}

	ngOnInit()
	{
		// TO-DO: Maybe move to a decorator?
		if (!tokenPresent()) {
			this._router.navigate(['Welcome']);
			return false;
		}

		// Probably a better way to do this
		this.el_history = document.getElementById('chat-history');

		this.identifyRoom();

		this.connect();
	}

	identifyRoom()
	{
		this.room = this._routeParams.get('room');
	}

	connect()
	{
		// Connect to websocket
		this._websocketService.connect()
		.subscribe(
			res => {
				// Request to join room
				this._websocketService.emit('room-join', { room: this.room });

				// Listen for new incoming messages
				this._websocketService.on('chat-message', this.receiveMessage.bind(this));
			},
			error => {
				// Show error to user
				// Redirect back to chat select?
			}
		);
	}

	onKeyUp(event: any)
	{
		// Key code 13 == Enter
		if (event.which === 13 && event.shiftKey === false) {
			// Remove enter character at end
			this.message = this.message.slice(0, -1);

			this.sendMessage();
		}
	}

	sendMessage()
	{
		if (this.message.trim()) {
			// Send message on websocket
			// Nickname is securely decoded from jwt on server, so not necessary to send here (neato-frito!)
			this._websocketService.emit('chat-message', {
				message: this.message,
				room: this.room
			});

			// Clear message field
			this.message = '';
		}
	}

	receiveMessage(data)
	{
		if (data.room !== this.room) {
			return false;
		}

		// Load new message component into chat history element
		this._dynamicComponentLoader
		.loadIntoLocation(ChatMessageComponent, this._elementRef, 'history')
		.then((res) =>
		{
			res.instance.setContent(data);

			this.scrollHistory();
		});
	}

	scrollHistory()
	{
		// Scroll to bottom
		this.el_history.scrollTop = this.el_history.scrollHeight;
	}

	routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction)
	{
		// Notify that we're leaving
		this._websocketService.emit('room-leave', { room: this.room });
	}

}