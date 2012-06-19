/**
 * DisplayObjectContainer
 * The DisplayObjectContainer class is the base class
 * for all objects that can serve as display object containers
 * on the display list.
 * @package aj.display
 */
define(["aj/display/DisplayObjectContainer", "aj/display/Graphics", "aj/events/Event"],
function(DisplayObjectContainer, Graphics, Event) {
   var Sprite = new JS.Class(DisplayObjectContainer, {
      
      /**
       * [read-only] Specifies the Graphics object that
       * belongs to this sprite where vector drawing commands can occur.
       * @type Graphics
       */
      _graphics : null,
      
      initialize : function()
      {
         this.callSuper();
      },
      
      /**
       * Render
       */
      _render : function()
      {
         if(this._graphics !== null)
         {
            var canvas = this.graphics.canvas;
            this._drawImage(canvas, 0, 0);
            
            if(this._width < canvas.width)
               this._width = canvas.width;
            
            if(this._height < canvas.height)
               this._height = canvas.height;
         }
         
         this.callSuper();
      }
   });
   
   var p = Sprite.prototype;
   
   /**
    * [read-only] Specifies the Graphics object that belongs
    * to this sprite where vector drawing commands can occur.
    * @return Graphics
    */
   Object.defineProperty(p, "graphics", {
   get : function() {
      if(this._graphics === null)
         this._graphics = new Graphics();
      
      return this._graphics;
   }});
   
   return Sprite;
});