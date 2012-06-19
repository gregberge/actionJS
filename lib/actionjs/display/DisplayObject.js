/**
 * DisplayObject
 * The DisplayObject class is the base class for all objects
 * that can be placed on the display list.
 * @package aj.display
 */
define(["aj/events/EventDispatcher", "aj/geom/Point", "aj/geom/Rectangle", "aj/events/Event"],
function(EventDispatcher, Point, Rectangle, Event) {
   var DisplayObject = new JS.Class(EventDispatcher, {
      
      /**
       * Indicates the alpha transparency value of the object specified.
       * @type number
       */
      _alpha : 1,
      
      /**
       * Indicates the height of the display object, in pixels.
       * @type number
       */
      _height : 0,
      
      /**
       * [read-only] Indicates the DisplayObjectContainer object that contains this display object.
       * @type DisplayObjectContainer
       */
      _parent : null,
      
      /**
       * Indicates the horizontal scale (percentage) of the object
       * as applied from the registration point.
       * @type number
       */
      scaleX : 1,
      
      /**
       * Indicates the vertical scale (percentage) of the object
       * as applied from the registration point.
       * @type number
       */
      scaleY : 1,
      
      /**
       * Indicates the width of the display object, in pixels.
       * @type number
       */
      _width : 0,
      
      /**
       * Indicates the x coordinate of the DisplayObject instance relative
       * to the local coordinates of the parent DisplayObjectContainer.
       * @type number
       */
      _x : 0,
      
      /**
       * Indicates the x coordinate of the DisplayObject instance relative
       * to the local coordinates of the parent DisplayObjectContainer.
       * @type number
       */
      _y : 0,
      
      /**
       * Indicates the rotation of the DisplayObject instance,
       * in degrees, from its original orientation.
       * @type number
       */
      rotation : 0,
      
      /**
       * [read-only] The Stage of the display object.
       * @type Stage
       */
      _stage : null,
      
      /**
       * Whether or not the display object is visible.
       * @type boolean
       */
      visible : true,
      
      /**
       * Canvas
       * @type HTMLCanvasElement
       */
      _canvas : null,
      
      /**
       * Context
       * @type CanvasRenderingContext2D
       */
      _ctx : null,
      
      _setStage : function(stage)
      {
         this._stage = stage;
      },
      
      /**
       * Returns a rectangle that defines the boundary of the display object,
       * based on the coordinate system defined by the targetCoordinateSpace parameter,
       * excluding any strokes on shapes.
       * @param DisplayObject targetCoordinateSpace The display object that defines
       * the coordinate system to use.
       * @return Rectangle
       */
      getRect : function(targetCoordinateSpace) {
         if(targetCoordinateSpace instanceof DisplayObject === false)
            throw "wrong parameter";
         
         var coords = new Point(this.x, this.y),
             globalCoords = this.localToGlobal(coords),
             localCoords = targetCoordinateSpace.globalToLocal(globalCoords);
         
         return new Rectangle(localCoords.x, localCoords.y, this.width, this.height);
      },
      
      /**
       * Converts the point object from the Stage (global) coordinates
       * to the display object's (local) coordinates.
       * @param Point point An object created with the Point class.
       * The Point object specifies the x and y coordinates as properties.
       * @return Point A Point object with coordinates relative to the display object.
       */
      globalToLocal : function(point) {
         if(point instanceof Point === false)
            throw "wrong parameters";
         
         var localPoint = new Point(),
             parent = this;
         
         localPoint.x = point.x;
         localPoint.y = point.y;
         
         while(parent !== this.stage) {
            localPoint.x -= parent.x;
            localPoint.y -= parent.y;
            parent = parent.parent;
         }
         
         return localPoint;
      },
      
      /**
       * Evaluates the bounding box of the display object to see if it overlaps
       * or intersects with the bounding box of the obj display object.
       * @param {DisplayObject|Point} obj The display object to test against.
       * @return boolean true if the bounding boxes of the display objects intersect; 
       * false if not.
       */
      hitTest : function(obj) {
         if(obj instanceof Point) {
            var localPoint = this.globalToLocal(obj);
            return this.getRect(this).contains(localPoint);
         }
         else if(obj instanceof DisplayObject) {
            return this.getRect(this).intersects(obj.getRect(this));
         }
         
         throw "wrong parameter";
      },
      
      /**
       * Converts the point object from the display object's (local)
       * coordinates to the Stage (global) coordinates.
       * @param Point point An object created with the Point class.
       * @return Point A Point object with coordinates relative to the Stage.
       */
      localToGlobal : function(point) {
         if(point instanceof Point === false)
            throw "wrong parameters";
         
         
         var globalPoint = new Point(),
             parent = this.parent;
         
         globalPoint.x = point.x;
         globalPoint.y = point.y;
         
         while(parent !== this.stage) {
             globalPoint.x += parent.x;
             globalPoint.y += parent.y;
             parent = parent.parent;
         }
         
         return globalPoint;
      },
      
      _computeTranslate : function()
      {
         var obj = this, translate = {x : 0, y : 0, scaleX : 1, scaleY : 1, rotation : 0};
         
         while(obj !== this.stage && obj !== null)
         {
            translate.x += obj.x;
            translate.y += obj.y;
            translate.scaleX *= obj.scaleX;
            translate.scaleY *= obj.scaleY;
            translate.rotation += obj.rotation;
            obj = obj.parent;
         }
         
         return translate;
      },
      
      /**
       * Pre-render
       */
      _preRender : function()
      {
         if(!this.stage)
            return ;
         
         var translate = this._computeTranslate();
         
         if(translate.scaleX !== 1 || translate.scaleY !== 1)
            this.stage.ctx.scale(translate.scaleX, translate.scaleY);
         
         if(translate.x !== 0 && translate.y !== 0)
            this.stage.ctx.translate(~~(translate.x + 0.5), ~~(translate.y + 0.5));
         
         if(translate.rotation !== 0)
            this.stage.ctx.rotate(translate.rotation * Math.PI / 180);
      },
      
      /**
       * Render
       */
      _render : function()
      {
         this.dispatchEvent(new Event(Event.RENDER));
      },
      
      /**
       * Post-render
       */
      _postRender : function()
      {
         if(!this.stage)
            return ;
         
         this.stage.ctx.setTransform(1, 0, 0, 1, 0, 0);
      },
      
      _renderProcess : function()
      {
         this._preRender();
         this._render();
         this._postRender();
      },
      
      _drawImage : function(image, x, y)
      {
         if(!this.stage)
            return ;
         
         this.stage.ctx.drawImage(image, x, y);
      }
      
   });
   
   var p = DisplayObject.prototype;
   
   /**
    * [read-only] Canvas
    * @type HTMLCanvasElement
    */
   Object.defineProperty(p, "canvas", {
   get : function() {
      if(this._canvas === null)
         this._canvas = document.createElement('canvas');
      
      return this._canvas;
   }});
   
   /**
    * [read-only] Context
    * @type CanvasRenderingContext2D
    */
   Object.defineProperty(p, "ctx", {
   get : function() {
      if(this._ctx === null)
         this._ctx = this.canvas.getContext("2d");
      
      return this._ctx;
   }});
   
   /**
    * [read-only] Indicates the DisplayObjectContainer object that contains this display object.
    * @type DisplayObjectContainer
    */
   Object.defineProperty(p, "parent", {
   get : function() {
      return this._parent;
   }});
   
   /**
    * [read-only] The Stage of the display object.
    * @type Stage
    */
   Object.defineProperty(p, "stage", {
   get : function() {
      return this._stage;
   }});
   
   /**
    * [read-only] Indicates the x coordinate of the mouse or user input device position, in pixels.
    * @return number
    */
   Object.defineProperty(p, "mouseX", {
   get : function() {
      return 0;
   }});
   
   /**
    * [read-only] Indicates the y coordinate of the mouse or user input device position, in pixels.
    * @return number
    */
   Object.defineProperty(p, "mouseY", {
   get : function() {
      return 0;
   }});
   
   /**
    * Getter/Setter width
    * @return number
    */
   Object.defineProperty(p, "width", {
   get : function() {
      return this._width * this.scaleX;
   },
   set : function(val) {
      if(this._width > 0) this.scaleX = val / this._width;
   }});
   
   /**
    * Getter/Setter height
    * @return number
    */
   Object.defineProperty(p, "height", {
   get : function() {
      return this._height * this.scaleY;
   },
   set : function(val) {
      if(this._height > 0) this.scaleY = val / this._height;
   }});
   
   /**
    * Getter/Setter alpha
    * @return number
    */
   Object.defineProperty(p, "alpha", {
   get : function() {
       return this._alpha;
   },
   set : function(val){
      this._alpha = val;
      if(this._alpha < 0) this._alpha = 0;
   }});
   
   /**
    * Getter/Setter x
    * @return number
    */
   Object.defineProperty(p, "x", {
   get : function() {
       return this._x;
   },
   set : function(val){
      this._x = ~~(val + 0.5);
   }});
   
   /**
    * Getter/Setter y
    * @return number
    */
   Object.defineProperty(p, "y", {
   get : function() {
       return this._y;
   },
   set : function(val){
      this._y = ~~(val + 0.5);
   }});
   
   return DisplayObject;
});