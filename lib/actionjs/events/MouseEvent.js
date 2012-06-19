/**
 * MouseEvent
 * A MouseEvent object is dispatched into the event flow whenever mouse events occur.
 * @package aj.events
 */
define(["aj/events/Event"], function(Event) {
   var MouseEvent = new JS.Class(Event, {
      
      /**
       * Indicates whether the Alt key is active (true) or inactive (false).
       * @type boolean
       */
      _altKey : false,
      
      /**
       * Indicates whether the command key is activated (Mac only.)
       * The value of property commandKey will have the same value as property ctrlKey on the Mac.
       * @type boolean
       */
      _commandKey : false,
      
      /**
       * Indicates whether the Control key is activated on Mac and whether the
       * Ctrl key is activated on Windows or Linux.
       * @type boolean
       */
      _controlKey : false,
      
      /**
       * When mouse locking is disabled, the horizontal coordinate at which
       * the event occurred relative to the containing sprite.
       * @type number
       */
      _localX : 0,
      
      /**
       * When mouse locking is disabled, the vertical coordinate at which
       * the event occurred relative to the containing sprite.
       * @type number
       */
      _localY : 0,
      
      /**
       * [read-only] The horizontal coordinate at which the event occurred in global Stage coordinates.
       * @type number
       */
      _stageX : 0,
      
      /**
       * [read-only] The vertical coordinate at which the event occurred in global Stage coordinates.
       * @type number
       */
      _stageY : 0,
      
      /**
       * Indicates whether the Shift key is active (true) or inactive (false).
       * @type boolean
       */
      _shiftKey : false
      
   });
   
   var p = MouseEvent.prototype;
   
   /**
    * Indicates whether the Alt key is active (true) or inactive (false).
    * @type boolean 
    */
   Object.defineProperty(p, "altKey", {
   get : function() {
      return this._altKey;
   }});
   
   /**
    * Indicates whether the command key is activated (Mac only.)
    * The value of property commandKey will have the same value as property ctrlKey on the Mac.
    * @type boolean 
    */
   Object.defineProperty(p, "commandKey", {
   get : function() {
      return this._commandKey;
   }});
   
   /**
    * Indicates whether the Control key is activated on Mac and whether the
    * Ctrl key is activated on Windows or Linux.
    * @type boolean 
    */
   Object.defineProperty(p, "controlKey", {
   get : function() {
      return this._controlKey;
   }});
   
   /**
    * When mouse locking is disabled, the horizontal coordinate at which
    * the event occurred relative to the containing sprite.
    * @type number 
    */
   Object.defineProperty(p, "localX", {
   get : function() {
      return this._localX;
   }});
   
   /**
    * When mouse locking is disabled, the vertical coordinate at which
    * the event occurred relative to the containing sprite.
    * @type number 
    */
   Object.defineProperty(p, "localY", {
   get : function() {
      return this._localY;
   }});
   
   /**
    * [read-only] The horizontal coordinate at which the event occurred in global Stage coordinates.
    * @type number 
    */
   Object.defineProperty(p, "stageX", {
   get : function() {
      return this._stageX;
   }});
   
   /**
    * [read-only] The vertical coordinate at which the event occurred in global Stage coordinates.
    * @type number 
    */
   Object.defineProperty(p, "stageY", {
   get : function() {
      return this._stageY;
   }});
   
   /**
    * Indicates whether the Shift key is active (true) or inactive (false).
    * @type number 
    */
   Object.defineProperty(p, "shiftKey", {
   get : function() {
      return this._shiftKey;
   }});
   
   /**
    * Defines the value of the type property of a click event object.
    * @type string
    */
   MouseEvent.CLICK = "click";
   
   return MouseEvent;
});