define(["aj/Obj"], function(Obj)
{
   return new JS.Class(Obj, {
      
      /**
       * [read-only] The type of event.
       * @type string
       */
      type : null,
      
      /**
       * The event is default prevented
       * @type boolean
       */
      _defaultPrevented : false,
      
      /**
       * The event is not active, if the method stopPropagation
       * has been called
       */
      _active : true,
      
      /**
       * Creates an Event object to pass as a parameter to event listeners.
       * @param string type The type of the event, accessible as Event.type.
       */
      initialize : function(type)
      {
         this.type = type;
      },
      
      /**
       * Cancels an event's default behavior if that behavior can be canceled.
       */
      preventDefault : function()
      {
         this._defaultPrevented = true;
      },
      
      /**
       * Checks whether the preventDefault() method has been called on the event.
       * @return boolean If preventDefault() has been called, returns true; 
       * otherwise, returns false.
       */
      isDefaultPrevented : function()
      {
         return this._defaultPrevented;
      },
      
      /**
       * Prevents processing of any event listeners in nodes subsequent 
       * to the current node in the event flow.
       */
      stopPropagation : function()
      {
         this._active = false;
      },
      
      /**
       * Duplicates an instance of an Event subclass.
       * @return Event A new Event object that is identical to the original.
       */
      clone : function()
      {
         return JS.extend({}, this);
      }
   });
});