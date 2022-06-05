"use strict";

const msgContainer = document.querySelector(".chat__msg-container");
const msgTextBox = document.querySelector(".chat__msg-editor-text");
const msgBtn = document.querySelector(".chat__msg-editor-btn");

const buildMsgReceived = msg => {

	const msgElement = document.createElement("DIV");
	msgElement.textContent = msg;
	msgElement.classList.add("chat__msg","chat__msg--received");

	return msgElement;

}

const buildMsgSent = msg => {

	const msgElement = document.createElement("DIV");
	msgElement.textContent = msg;
	msgElement.classList.add("chat__msg","chat__msg--sent");

	return msgElement;
	
}

const buildAppMsg = msg => {

	const msgElement = document.createElement("DIV");
	msgElement.textContent = msg;
	msgElement.classList.add("chat__app-msg");

	return msgElement;
	
}

const sendMessage = evt => {

	const msgText = msgTextBox.value.trim()
	
	if ( msgText ) {
		const msgSent = buildMsgSent( msgText )
		msgContainer.appendChild( msgSent );
		msgTextBox.value = "";
		msgTextBox.focus();
		msgContainer.scrollTop = msgContainer.scrollHeight;

		pushMsgToSW({ msg: msgText });
	}

} 

const pushMsgToSW = msg => {
	sw.controller.postMessage( msg );
}



//////////////////////////////
// Service Worker
//////////////////////////////

if ( !navigator.serviceWorker ) console.warn("Objeto navigator.serviceWorker no sportado");

const sw = navigator.serviceWorker;

sw.register("sw.js");

while( sw.controller.state != "activated" ) continue;



//////////////////////////////
// Events Listeners
//////////////////////////////

msgBtn.addEventListener("click", sendMessage);

msgTextBox.addEventListener("keypress", evt => {
	
	if( evt.key === "Enter" ) {
		sendMessage();
		evt.preventDefault();
	}

})

sw.addEventListener("message", evt => {
	
	msgContainer.appendChild( buildMsgReceived( evt.data.msg ) )
	
})