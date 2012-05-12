/**
 * DisplayObject
 * The DisplayObject class is the base class for all objects
 * that can be placed on the display list.
 * @package aj.display
 */
define(["aj/events/EventDispatcher"], function(EventDispatcher)
{
   return new JS.Class(EventDispatcher, {
      
      /**
       * Indicates the alpha transparency value of the object specified.
       * @type number
       */
      alpha : 1,
      
      /**
       * Indicates the height of the display object, in pixels.
       * @type number
       */
      height : 0,
      
      /**
       * [read-only] Indicates the DisplayObjectContainer object that contains this display object.
       * @type DisplayObjectContainer
       */
      parent : null,
      
      /**
       * Indicates the width of the display object, in pixels.
       * @type number
       */
      width : 0,
      
      /**
       * Indicates the x coordinate of the DisplayObject instance relative
       * to the local coordinates of the parent DisplayObjectContainer.
       * @type number
       */
      x : 0,
      
      /**
       * Indicates the x coordinate of the DisplayObject instance relative
       * to the local coordinates of the parent DisplayObjectContainer.
       * @type number
       */
      y : 0,
      
      /**
       * [read-only] Indicates the x coordinate of the mouse or user input device position, in pixels.
       * @return number
       */
      mouseX : null,
      
      /**
       * [read-only] Indicates the y coordinate of the mouse or user input device position, in pixels.
       * @return number
       */
      mouseY : null,
      
      /**
       * [read-only] The Stage of the display object.
       * @type Stage
       */
      stage : null,
      
      /**
       * Whether or not the display object is visible.
       * @type boolean
       */
      visible : true,
      
      /**
       * Returns a rectangle that defines the boundary of the display object,
       * based on the coordinate system defined by the targetCoordinateSpace parameter,
       * excluding any strokes on shapes.
       * @return Rectangle
       */
      getRect : function()
      {
         
      },
      
      /**
       * Converts the point object from the Stage (global) coordinates
       * to the display object's (local) coordinates.
       * @param Point point An object created with the Point class.
       * The Point object specifies the x and y coordinates as properties.
       * @return Point A Point object with coordinates relative to the display object.
       */
      globalToLocal : function(point)
      {
         
      },
      
      /**
       * Evaluates the bounding box of the display object to see if it overlaps
       * or intersects with the bounding box of the obj display object.
       * @param DisplayObject obj The display object to test against.
       * @return boolean true if the bounding boxes of the display objects intersect; 
       * false if not.
       */
      hitTestObject : function(obj)
      {
         
      },
      
      /**
       * Evaluates the display object to see if it overlaps or intersects 
       * with the point specified by the x and y parameters.
       * @param Point point An object created with the Point class.
       * @return boolean true if the display object overlaps or intersects
       * with the specified point; false otherwise.
       */
      hitTestPoint : function(point)
      {
         
      },
      
      /**
       * Converts the point object from the display object's (local)
       * coordinates to the Stage (global) coordinates.
       * @param Point point An object created with the Point class.
       * @return Point A Point object with coordinates relative to the Stage.
       */
      localToGlobal : function(point)
      {
         
      }
      
   });
});