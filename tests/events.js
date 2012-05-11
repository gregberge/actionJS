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
               var type = "test";
               
               var event = new Event(type);
               ok(event instanceof Event, "instanciate Event");
               equal(event.type, type, "event type");
               
               event.preventDefault();
               equal(event.isDefaultPrevented(), true, "preventDefault");
               
               event.stopPropagation();
               equal(event._active, false, "stopPropagation");
            });
         });
         
         require(["aj/events/EventDispatcher"], function(EventDispatcher)
         {
            test("aj/events/EventDispatcher", function()
            {
               var eventDispatcher = new EventDispatcher();
               ok(eventDispatcher instanceof EventDispatcher, "instanciate EventDispatcher");
            });
         });
      }
   };
});