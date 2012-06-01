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
      
      _callStack : [],
      
      _canvas : null,
      
      initialize : function()
      {
         this._callStack = [];
         this._canvas = document.createElement('canvas');
         this._canvas.width = 40;
         this._canvas.height = 40;
         
         this._ctx = this._canvas.getContext('2d');
      },
      
      clearRect : function()
      {
         this._ctx.clearRect.apply(this._ctx, arguments);
      },
      
      fillRect : function()
      {
         this._ctx.fillRect.apply(this._ctx, arguments);
      },
      
      strokeRect : function()
      {
         this._ctx.strokeRect.apply(this._ctx, arguments);
      },
      
      render : function()
      {
         return this._canvas;
      }
      
   });
   
   var p = Graphics.prototype;
   
   return Graphics;
});