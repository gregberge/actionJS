/**
 * Graphics
 * The Graphics class contains a set of methods that you can use
 * to create a vector shape. Display objects that support drawing
 * include Sprite and Shape objects. Each of these classes includes
 * a graphics property that is a Graphics object. The following are
 * among those helper functions provided for ease of use: drawRect(),
 * drawRoundRect(), drawCircle(), and drawEllipse().
 * @package aj.display
 */
define(["aj/Obj"],
function(Obj) {
   var Graphics = new JS.Class(Obj, {
      
      /**
       * @type HTMLCanvasElement
       */
      _canvas : null,
      
      /**
       * @type CanvasRenderingContext2D
       */
      _ctx : null,
      
      /**
       * Rendered
       * @type boolean
       */
      rendered : false,
      
      initialize : function()
      {
         this._canvas = document.createElement("canvas");
         this._canvas.width = 1;
         this._canvas.height = 1;
         this._ctx = this._canvas.getContext("2d");
      },
      
      clearRect : function()
      {
         this._ctx.clearRect.apply(this._ctx, arguments);
         this.rendered = false;
      },
      
      fillRect : function()
      {
         this._ctx.fillRect.apply(this._ctx, arguments);
         this.rendered = false;
      },
      
      strokeRect : function()
      {
         this._ctx.strokeRect.apply(this._ctx, arguments);
         this.rendered = false;
      }
      
   });
   
   var p = Graphics.prototype;
   
   /**
    * Getter/Setter canvas
    * @return HTMLCanvasElement
    */
   Object.defineProperty(p, "canvas", {
   get : function() {
      return this._canvas;
   }});
   
   /**
    * Getter/Setter width
    * @return int
    */
   Object.defineProperty(p, "width", {
   get : function() {
      return this._canvas.width;
   },
   set : function(val) {
      this._canvas.width = val;
   }});
   
   /**
    * Getter/Setter height
    * @return int
    */
   Object.defineProperty(p, "height", {
   get : function() {
      return this._canvas.height;
   },
   set : function(val) {
      this._canvas.height = val;
   }});
   
   return Graphics;
});