/**
 * Stage
 * The Stage class represents the main drawing area.
 * @package aj.display
 */
define(["aj/display/DisplayObjectContainer"], function(DisplayObjectContainer)
{
   return new JS.Class(DisplayObjectContainer, {
      
      /**
       * DOM Element
       */
      _domElement : null,
      
      /**
       * Create a stage
       */
      initialize : function(width, height)
      {
         if(typeof width !== "number" || typeof height !== "number")
         {
            throw "you must specify width and height";
         }
         
         this._domElement = document.createElement('canvas');
         this._domElement.width = width;
         this._domElement.height = height;
      },
      
      /**
       * Attach the element to the DOM
       * @param string domRootElementId The id of the root element
       */
      attachTo : function(domRootElementId)
      {
         var domRootElement = document.getElementById(domRootElementId);
         
         if(domRootElement === null)
         {
            throw new Exception("racine element id doesn't exist");
         }
         
         domRootElement.appendChild(this._domElement);
      }
      
   });
});