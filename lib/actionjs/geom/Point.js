/**
 * Point
 * The Point object represents a location in a two-dimensional coordinate system,
 * where x represents the horizontal axis and y represents the vertical axis.
 * @package aj.geom
 */
define(["aj/Obj"], function(Obj)
{
   var Point = new JS.Class(Obj, {
      
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
       * Adds the coordinates of another point to the coordinates
       * of this point to create a new point.
       * @param Point point The point to be added.
       * @return Point  The new Point object.
       */
      add : function(point)
      {
         if(typeof point === "undefined" || point instanceof Point === false)
         {
            throw "the first parameter must be a point";
         }
         
         return new Point(point.x + this.x, point.y + this.y);
      },
      
      /**
       * Copies all of the point data from the source Point object
       * into the calling Point object.
       * @param Point sourcePoint The Point object from which to copy the data.
       */
      copyFrom : function(sourcePoint)
      {
         if(typeof sourcePoint === "undefined" || sourcePoint instanceof Point === false)
         {
            throw "the first parameter must be a point";
         }
         
         this.x = sourcePoint.x;
         this.y = sourcePoint.y;
      },
      
      /**
       * Offsets the Point object by the specified amount.
       * @param number dx The amount by which to offset the horizontal coordinate, x.
       * @param number dy The amount by which to offset the vertical coordinate, y.
       */
      offset : function(dx, dy)
      {
         this.x += dx;
         this.y += dy;
      },
      
      /**
       * Determines whether two points are equal.
       * @param Point toCompare The point to be compared.
       * @return boolean A value of true if the object 
       * is equal to this Point object; false if it is not equal.
       */
      equals : function(toCompare)
      {
         if(typeof toCompare === "undefined" || toCompare instanceof Point === false)
         {
            throw "you must pass a point";
         }
         
         return toCompare.x === this.x && toCompare.y === this.y;
      },
      
      /**
       * Scales the line segment between (0,0) and the current point to a set length.
       * @param number thickness The scaling value. For example, 
       * if the current point is (0,5), and you normalize it to 1,
       * the point returned is at (0,1).
       */
      normalize : function(thickness)
      {
         if(typeof thickness !== "number")
         {
            throw "thickness must be a number";
         }
         
         var l = this.length;
         
         if(l !== 0)
         {
           this.x = thickness * this.x / l;
           this.y = thickness * this.y / l;
         }
      },
      
      /**
       * Subtracts the coordinates of another point from
       * the coordinates of this point to create a new point.
       * @param Point point The point to be subtracted.
       * @return Point The new point.
       */
      substract : function(point)
      {
         if(typeof point === "undefined" || point instanceof Point === false)
         {
            throw "first parameter must be a point";
         }
         
         return new Point(this.x - point.x, this.y - point.y);
      },
      
      extend :
      {
         /**
          * Returns the distance between pt1 and pt2.
          * @param Point pt1 The first point.
          * @param Point pt2 The second point.
          * @return number The distance between the first and second points.
          */
         distance : function(pt1, pt2)
         {
            if(typeof pt1 === "undefined" || pt1 instanceof Point === false
            || typeof pt2 === "undefined" || pt2 instanceof Point === false)
            {
               throw "pt1 or pt2 is not a Point";
            }
            
            var x = pt1.x - pt2.x,
                y = pt1.y - pt2.y;
            
            return Math.sqrt(x*x + y*y);
         },
         
         /**
          * Determines a point between two specified points.
          * @param Point pt1 The first point.
          * @param Point pt2 The second point
          * @param number f The level of interpolation between the two points.
          * Indicates where the new point will be, along the line between 
          * pt1 and pt2. If f=1, pt1 is returned; if f=0, pt2 is returned.
          * @return Point The new, interpolated point.
          */
         interpolate : function(pt1, pt2, f)
         {
            if(typeof pt1 === "undefined" || pt1 instanceof Point === false
            || typeof pt2 === "undefined" || pt2 instanceof Point === false)
            {
               throw "pt1 or pt2 is not a Point";
            }
            
            if(typeof f !== "number")
            {
               throw "f is not a number";
            }
            
            var x = pt2.x + (pt1.x - pt2.x) * f,
                y = pt2.x + (pt1.y - pt2.y) * f;
            
            return new Point(x, y);
         }
      }
   });
   
   /**
    * Return the length of the line segment from (0,0) to this point.
    * @return number
    */
   Point.prototype.__defineGetter__("length", function()
   {
      var pt0 = new Point();
      return Point.distance(this, pt0);
   });
   
   return Point;
});