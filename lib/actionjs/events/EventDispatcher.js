/**
 * EventDispatcher
 * The EventDispatcher class is the base class for all runtime 
 * classes that dispatch events.
 * @package aj.events
 */
define(["aj/Obj", "aj/events/Event"], function(Obj, Event)
{
   return new JS.Class(Obj, {
      
      /**
       * Listeners
       * @type array
       */
      _eventListeners : [],
      
      /**
       * Check type and throws an exception if it's not a string
       * or if it's empty
       * @param string type
       * @throw Exception
       */
      _checkType : function(type)
      {
         if(typeof type !== "string")
         {
            throw "type is not a string";
         }
         else if(type.length === 0)
         {
            throw "type is empty";
         }
      },
      
      /**
       * Check listener and throws an exception if it's not a function
       * @param function listener
       * @throw Exception
       */
      _checkListener : function(listener)
      {
         if(typeof listener !== "function")
         {
            throw "listener is not a function";
         }
      },
      
      /**
       * Check listener and throws an exception if it's not a function
       * @param Event event
       * @throw Exception
       */
      _checkEvent : function(event)
      {
         if(typeof event === "undefined" || event instanceof Event === false)
         {
            throw "event is not an Event";
         }
      },

      /**
       * Registers an event listener object with an EventDispatcher object 
       * so that the listener receives notification of an event.
       * @param string type
       * @param function listener
       */
      addEventListener : function(type, listener)
      {
         this._checkType(type);
         this._checkListener(listener);
         
         var eventListener = [type, listener];
         
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
         this._checkEvent(event);
         
         event = event.clone();
         
         var i,
         il = this._eventListeners.length,
         eventListener;
         
         for(i = 0; i < il; i++)
         {
            if(event.isDefaultPrevented())
            {
               return false;
            }
            
            if(event._active === false)
            {
               break;
            }
            
            eventListener = this._eventListeners[i];
            
            if(eventListener[0] === event.type)
            {
               eventListener[1].call(this, event);
            }
         }
         
         return true;
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
         this._checkType(type);
         
         var i,
             il = this._eventListeners.length,
             eventListener;
         
         for(i = 0; i < il; i++)
         {
            eventListener = this._eventListeners[i];
            
            if(eventListener[0] === type)
            {
               return true;
            }
         }
         
         return false;
      },
      
      /**
       * Removes a listener from the EventDispatcher object.
       * @param string type The type of event.
       * @param function listener The listener object to remove.
       */
      removeEventListener : function(type, listener)
      {
         this._checkType(type);
         this._checkListener(listener);
         
         var i,
             il = this._eventListeners.length,
             eventListener;

         for(i = 0; i < il; i++)
         {
            eventListener = this._eventListeners[i];
            
            if(eventListener[0] === type && eventListener[1] === listener)
            {
               this._eventListeners.splice(i, 1);
               break;
            }
         }
      }
   });
});