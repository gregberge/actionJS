/**
 * Events test
 */
 
if(typeof ajTu == "undefined")
{
	ajTu = {};	
}

if(typeof ajTu.Event == "undefined")
{
	ajTu.Event = {};	
}

/**
 * Start allTest
 */
ajTu.Event.startAllTest = function()
{
	document.write('---------<br/>Start all event test<br/>');
	ajTu.Event.createEvent();
	ajTu.Event.createEventDispatcher();
	ajTu.Event.listenEvent();
	ajTu.Event.dispatchEvent();
	ajTu.Event.removeEventListener();
	ajTu.Event.hasEventListener();
	document.write('Finish event test<br/>---------<br/>');
};

/**
 * Create Event
 */
ajTu.Event.createEvent = function()
{
	var ev = new aj.Event(aj.Event.COMPLETE);
	if(ev.type == aj.Event.COMPLETE)
	{
		document.write('* OK createEvent<br/>');
	}
	else
	{
		document.write('* NOK createEvent<br/>');
	}
};

/**
 * Create EventDispatcher
 */
ajTu.Event.createEventDispatcher = function()
{
	var evDisp = new aj.EventDispatcher();
	if(typeof evDisp.eventListenerList == "object")
	{
		document.write('* OK createEventDispatcher<br/>');	
	}
	else
	{
		document.write('* NOK createEventDispatcher<br/>');	
	}
};

/**
 * Listen event
 */
ajTu.Event.listenEvent = function()
{
	var listener = function(){};
	var type = aj.Event.COMPLETE, listen;
	var evDisp = new aj.EventDispatcher();
	var ret = evDisp.addEventListener(type, listener);
	if(ret && evDisp.eventListenerList[0][0] == type && evDisp.eventListenerList[0][1] == listener)
	{
		document.write('* OK listenEvent<br/>');
	}
	else
	{
		document.write('* NOK listenEvent<br/>');
	}
};

/**
 * Dispatch event
 */
ajTu.Event.dispatchEvent = function()
{
	window.ajTu.Event.dispatchVar = 0;
	var listener = function(){ window.ajTu.Event.dispatchVar = 1; };
	var type = aj.Event.COMPLETE;
	var evDisp = new aj.EventDispatcher();
	evDisp.addEventListener(type, listener);
	var ret = evDisp.dispatchEvent(new aj.Event(aj.Event.COMPLETE));
	
	if(ret && window.ajTu.Event.dispatchVar == 1)
	{
		document.write('* OK dispatchEvent<br/>');
	}
	else
	{
		document.write('* NOK dispatchEvent<br/>');
	}
};

/**
 * Remove event listener
 */
ajTu.Event.removeEventListener = function()
{
	var listener = function(){ window.ajTu.Event.dispatchVar = 1; };
	var type = aj.Event.COMPLETE;
	var evDisp = new aj.EventDispatcher();
	evDisp.addEventListener(type, listener);
	var ret = evDisp.removeEventListener(type, listener);
	
	if(ret && evDisp.eventListenerList.length == 0)
	{
		document.write('* OK removeEventListener<br/>');
	}
	else
	{
		document.write('* NOK removeEventListener<br/>');
	}
};

/**
 * Remove event listener
 */
ajTu.Event.hasEventListener = function()
{
	var listener = function(){ window.ajTu.Event.dispatchVar = 1; };
	var type = aj.Event.COMPLETE;
	var evDisp = new aj.EventDispatcher();
	evDisp.addEventListener(type, listener);
	var ret = evDisp.hasEventListener(type);
	
	if(ret)
	{
		document.write('* OK hasEventListener<br/>');
	}
	else
	{
		document.write('* NOK hasEventListener<br/>');
	}
};