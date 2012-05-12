define(["jquery", "qunit"], function($, qunit)
{
   return {
      start : function()
      {
         require(["aj/events/Event"], function(Event)
         {
            module("events");
            
            test("aj/events/Event", function()
            {
               var eventType = "test_type",
                   event = new Event(eventType);
               ok(event instanceof Event, "instanciate");
               equal(event.type, eventType, "event type");
               
               event.preventDefault();
               ok(event.isDefaultPrevented(), "preventDefault()");
               
               event.stopPropagation();
               equal(event._active, false, "stopPropagation()");
               
               var eventClone = event.clone();
               equal(event.type, eventClone.type, "clone()");
            });
         });
         
         require(["aj/events/EventDispatcher", "aj/events/Event"], function(EventDispatcher, Event)
         {
            test("aj/events/EventDispatcher", function()
            {
               var eventDispatcher = new EventDispatcher();
               ok(eventDispatcher instanceof EventDispatcher, "instanciate");
               
               var eventType = "test_type",
                   event = new Event(eventType),
                   listenerCalled = false;
               
               function testListener(){
                  listenerCalled = true;
               };
               
               raises(function(){ 
                  eventDispatcher.addEventListener(1, testListener);
               }, "addEventListener() - check type");
               
               raises(function(){ 
                  eventDispatcher.addEventListener(eventType, "toto");
               }, "addEventListener() - check listener");
               
               eventDispatcher.addEventListener(eventType, testListener);
               
               equal(eventDispatcher._eventListeners[0][0], eventType, "addEventListener() - correct save type");
               equal(eventDispatcher._eventListeners[0][1], testListener, "addEventListener() - correct save listener");
               
               ok(eventDispatcher.hasEventListener(eventType), "hasEventListener() - true");
               equal(eventDispatcher.hasEventListener("toto"), false, "hasEventListener() - false");
               
               ok(eventDispatcher.dispatchEvent(event), "dispatchEvent() - return true");
               ok(listenerCalled, "dispatchEvent() - listener called");
               
               eventDispatcher.removeEventListener(eventType, testListener);
               equal(eventDispatcher._eventListeners.length, 0, "removeEventListener() - perform remove");
               
               
               var listener1Called = false,
                   listener2Called = false,
                   listener3Called = false,
                   event2Type = "event2",
                   event2 = new Event(event2Type);
               
               function listener1(event)
               {
                  listener1Called = true;
                  event.preventDefault();
               };
               
               function listener2()
               {
                  listener2Called = true;
                  event.stopPropagation();
               };
               
               function listener3()
               {
                  listener3Called = true;
               };
               
               eventDispatcher.addEventListener(event2Type, listener1);
               eventDispatcher.addEventListener(event2Type, listener2);
               
               eventDispatcher.dispatchEvent(event2);
               
               equal(listener2Called, false, "preventDefault() - stop propagation");
               
               eventDispatcher.removeEventListener(event2Type, listener1);
               
               eventDispatcher.dispatchEvent(event2);
               
               equal(listener3Called, false, "stopPropagation() - stop propagation");
               
            });
         });
      }
   };
});