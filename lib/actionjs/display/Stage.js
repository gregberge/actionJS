/**
 * Stage
 * The Stage class represents the main drawing area.
 * @package aj.display
 */
define(["aj/display/DisplayObjectContainer", "aj/events/Event", "aj/geom/Point", "aj/events/MouseEvent"],
      function(DisplayObjectContainer, Event, Point, MouseEvent) {
   var Stage = new JS.Class(DisplayObjectContainer, {
      
      /**
       * Animation
       * @type Animation
       */
      animation : null,
      
      /**
       * Create a stage
       */
      initialize : function(animation) {
         this.callSuper();
         
         this.animation = animation;
         
         this.addEventListener(Event.ENTER_FRAME, this._renderProcess);
         this.addEventListener(Event.ENTER_FRAME, this._broadcastEvent);
         
         this.canvas.addEventListener('click', this._clickHandler.bind(this), false);
      },
      
      /**
       * Handle click
       * @param evt MouseEvent HTML MouseEvent
       */
      _clickHandler : function(evt)
      {
         var point = new Point(evt.offsetX, evt.offsetY),
             objects = this.getObjectsUnderPoint(point),
             i,
             il = objects.length,
             mouseEvent,
             localPoint;
         
         for(i = 0; i < il; i++)
         {
            localPoint = objects[i].globalToLocal(point);
            
            mouseEvent = new MouseEvent(MouseEvent.CLICK);
            mouseEvent._altKey = evt.altKey;
            mouseEvent._commandKey = evt.metaKey;
            mouseEvent._shiftKey = evt.shiftKey;
            mouseEvent._controlKey = evt.ctrlKey;
            mouseEvent._stageX = evt.offsetX;
            mouseEvent._stageY = evt.offsetY;
            mouseEvent._localX = localPoint.x;
            mouseEvent._localY = localPoint.y;
            mouseEvent._currentTarget = objects[i];
            
            objects[i].dispatchEvent(mouseEvent);
         }
      },
      
      /**
       * Set the parent to the child
       * @param DisplayObject child Child
       */
      _setParent : function(child)
      {
         this.callSuper(child);
         child._setStage(this);
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
      
      /**
       * Render process
       */
      _renderProcess : function()
      {
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
         
         var i = 0, il = this.numChildren, child;
         
         for(i = 0; i < il; i++)
         {
            child = this.getChildAt(i);
            child._renderProcess();
         }
      },
      
      _drawImage : function(image, x, y, rendered)
      {
         this.ctx.drawImage(image, x, y);
      }
   });
   
   return Stage;
});