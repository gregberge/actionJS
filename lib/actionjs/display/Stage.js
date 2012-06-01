/**
 * Stage
 * The Stage class represents the main drawing area.
 * @package aj.display
 */
define(["aj/display/DisplayObjectContainer", "aj/events/Event"], function(DisplayObjectContainer, Event) {
   var Stage = new JS.Class(DisplayObjectContainer, {
      
      /**
       * DOM Element
       * @type object
       */
      _domElement : null,
      
      /**
       * Context
       * @return CanvasRenderingContext2D
       */
      _ctx : null,
      
      
      /**
       * Create a stage
       */
      initialize : function(width, height) {
         this.callSuper();
         
         if(typeof width !== "number" || typeof height !== "number")
            throw "you must specify width and height";
         
         this._domElement = document.createElement('canvas');
         this._domElement.width = width;
         this._domElement.height = height;
         
         this._ctx = this._domElement.getContext("2d");
         
         this.addEventListener(Event.ENTER_FRAME, this._broadcastEvent);
         
         this.setFps(60);
      },
      
      /**
       * Set the parent to the child
       * @param DisplayObject child Child
       */
      _setParent : function(child)
      {
         this.callSuper(child);
         child._stage = this;
         child.dispatchEvent(new Event(Event.ADDED_TO_STAGE));
      },
      
      /**
       * Unset the parent
       * @param DisplayObject child Child
       */
      _unsetParent : function(child)
      {
         this.callSuper(child);
         child._stage = null;
         child.dispatchEvent(new Event(Event.REMOVED_FROM_STAGE));
      },
      
      _preRender : function()
      {
         this._ctx.clearRect(0, 0, this._domElement.width, this._domElement.height);
      },
      
      _postRender : function()
      {
      },
      
      start : function()
      {
         this._animationCycle();
      },
      
      _animationCycle : function()
      {
         this._preRender();
         this._renderProcess();
         this.dispatchEvent(new Event(Event.ENTER_FRAME));
         
         window.requestAnimationFrame(this._animationCycle.bind(this), this._domElement);
      },
      
      /**
       * Set FPS of the animation
       * @param number FPS Frame per seconds
       */
      setFps : function(fps)
      {
         if(this._enterFrameInterval !== null)
            clearInterval(this._enterFrameInterval);
         
         this._fps = fps;
      },
      
      /**
       * Attach the element to the DOM
       * @param string domRootElementId The id of the root element
       */
      attachTo : function(domRootElementId) {
         var domRootElement = document.getElementById(domRootElementId);
         
         if(domRootElement === null) {
            throw new Exception("root element id doesn't exist");
         }
         
         domRootElement.appendChild(this._domElement);
      }
      
   });
   
   var p = Stage.prototype;
   
   /**
    * Getter/Setter context2d
    * @return CanvasRenderingContext2D
    */
   Object.defineProperty(p, "context2d", {
   get : function() {
       return this._ctx;
   }});
   
   return Stage;
});