/**
 * Event
 * The Event class is used as the base class for the creation of Event objects,
 * which are passed as parameters to event listeners when an event occurs.
 * @package aj.events
 */
define(["aj/Obj"], function(Obj) {
   var Event = new JS.Class(Obj, {
      
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
       * @type boolean
       */
      _active : true,
      
      /**
       * [read-only] The object that is actively
       * processing the Event object with an event listener.
       * @type EventDispatcher
       */
      _currentTarget : null,
      
      /**
       * Creates an Event object to pass as a parameter to event listeners.
       * @param string type The type of the event, accessible as Event.type.
       */
      initialize : function(type) {
         this.type = type;
      },
      
      /**
       * Cancels an event's default behavior if that behavior can be canceled.
       */
      preventDefault : function() {
         this._defaultPrevented = true;
      },
      
      /**
       * Checks whether the preventDefault() method has been called on the event.
       * @return boolean If preventDefault() has been called, returns true; 
       * otherwise, returns false.
       */
      isDefaultPrevented : function() {
         return this._defaultPrevented;
      },
      
      /**
       * Prevents processing of any event listeners in nodes subsequent 
       * to the current node in the event flow.
       */
      stopPropagation : function() {
         this._active = false;
      }
   });
   
   var p = Event.prototype;
   
   /**
    * [read-only] The object that is actively processing the Event object with an event listener.
    * @type EventDispatcher
    */
   Object.defineProperty(p, "currentTarget", {
   get : function() {
      return this._currentTarget;
   }});
   
   /**
    * The Event.ADDED constant defines the value of
    * the type property of an added event object.
    * @type string
    */
   Event.ADDED = "added";
   
   /**
    * The Event.REMOVED_FROM_STAGE constant defines the value of
    * the type property of a removedFromStage event object.
    * @type string
    */
   Event.ADDED_TO_STAGE = "added_to_stage";
   
   /**
    * The Event.REMOVED constant defines the value of
    * the type property of a removed event object.
    * @type string
    */
   Event.REMOVED = "removed";
   
   /**
    * The Event.REMOVED_FROM_STAGE constant defines the value of
    * the type property of a removedFromStage event object.
    * @type string
    */
   Event.REMOVED_FROM_STAGE = "removed_from_stage";
   
   /**
    * The Event.ENTER_FRAME constant defines the value 
    * of the type property of an enterFrame event object.
    * @type string
    */
   Event.ENTER_FRAME = "enter_frame";
   
   /**
    * The Event.RENDER constant defines the value
    * of the type property of a render event object.
    * @type string
    */
   Event.RENDER = "render";
   
   return Event;
});