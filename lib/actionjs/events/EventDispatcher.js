define(["aj/Obj"], function(Obj)
{
   return new JS.Class(Obj, {
      
      /**
       * Listeners
       * @type array
       */
      _eventListeners : [],

      /**
       * Registers an event listener object with an EventDispatcher object 
       * so that the listener receives notification of an event.
       * @param string type
       * @param function listener
       */
      addEventListener : function(type, listener)
      {
         var eventListener = {};
         eventListener.type = type;
         eventListener.listener = listener;
         
         this._eventListeners.push(eventListener);
      },

      /**
       * Dispatches an event into the event flow.
       * @param Event event
       * @return A value of true if the event was successfully dispatched. 
       * A value of false indicates failure or that preventDefault() was called on the event.
       */
      dispatchEvent : function(event)
      {
         
      },
      
      /**
       * Checks whether the EventDispatcher object has any listeners 
       * registered for a specific type of event.
       * @param string type The type of event.
       * @return boolean A value of true if a listener of the specified type is registered; 
       * false otherwise.
       */
      hasEventListener : function(type)
      {
         
      },
      
      /**
       * Removes a listener from the EventDispatcher object.
       * @param string type The type of event.
       * @param function listener The listener object to remove.
       */
      removeEventListener : function(type, listener)
      {
         
      }
   });
});