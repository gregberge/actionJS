/**
 * Point
 * The Point object represents a location in a two-dimensional coordinate system,
 * where x represents the horizontal axis and y represents the vertical axis.
 * @package aj.geom
 */
define(["aj/Obj"], function(Obj)
{
   return new JS.Class(Obj, {
      
      /**
       * The horizontal coordinate of the point.
       * @type number
       */
      x : 0,
      
      /**
       * The vertical coordinate of the point.
       * @type number
       */
      y : 0,
      
      /**
       * Creates a new point.
       * @param number x (default = 0) — The horizontal coordinate.
       * @param number y (default = 0) — The vertical coordinate.
       */
      initialize : function(x, y)
      {
         if(typeof x === "number") this.x = x;
         if(typeof y === "number") this.y = y;
      },
      
      /**
       * Return the length of the line segment from (0,0) to this point.
       * @return number
       */
      length : function()
      {
         return Math.sqrt(this.x*this.x + this.y*this.y);
      },
      
      /**
       * Adds the coordinates of another point to the coordinates
       * of this point to create a new point.
       * @param Point point The point to be added.
       * @return Point  The new Point object.
       */
      add : function(point)
      {
         
      },
      
      /**
       * Returns the distance between pt1 and pt2.
       * @param Point pt1 The first point.
       * @param Point pt2 The second point.
       * @return number The distance between the first and second points.
       */
      distance : function()
      {
         
      }
      
   });
});