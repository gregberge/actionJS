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
         this._graphics = new Graphics();
      },
      
      /**
       * Render
       */
      _render : function()
      {
         this.callSuper();
         
         var canvas = this.graphics.render();
         
         this.stage.context2d.drawImage(canvas, 0, 0);
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
      return this._graphics;
   }});
   
   return Sprite;
});