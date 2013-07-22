/**
 *	https://github.com/emiljohansson/event.js
 *
 *	@version	0.1.4
 *	@author		Emil Johansson <emiljohansson.se@gmail.com>
 *	@date		Aug 12, 2012
 */
(function() {

	var Event = window.Event || {};

	function addEventListenerToArray(elemList, type, listener) {
		for (var i = 0; i < elemList.length; i++) {
			var elem = elemList[i];
			Event.addEventListener(elem, type, listener);
		}
	};

	Event.addEventListener = function(elem, type, listener) {
		if (Object.prototype.toString.call( elem ) === '[object Array]') {
			addEventListenerToArray(elem, type, listener);
			return;
		}
		if (!elem) {
			return;
		}
		if (elem.addEventListener) {
			elem.addEventListener(type, listener, false);
		}
		else if (elem.attachEvent) {
			elem.attachEvent('on'+type, listener);
		}
		return elem;
	};

	Event.removeEventListener = function(elem, type, listener) {
		if (!elem || !listener) {
			return;
		}
		if (elem.removeEventListener) {
			elem.removeEventListener(type, listener, false);
		}
		else if (elem.detachEvent) {
			elem.detachEvent('on'+type, listener);
		}
		return elem;
	};

	Event.triggerEvent = function(elem, type) {
		if (!elem) {
			return;
		}
		var event;
		if (document.createEvent) {
			event = document.createEvent("HTMLEvents");
			event.initEvent(type, true, true);
		}
		else {
			event = document.createEventObject();
			event.eventType = type;
		}
		if (document.createEvent) {
			elem.dispatchEvent(event);
		}
		else {
			elem.fireEvent("on" + event.eventType, event);
		}
		return elem;
	};

	Event.currentTarget = function(event) {
		return !!event.currentTarget ? event.currentTarget : event.srcElement;
	};

	window.Event = Event;
}());