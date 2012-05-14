/**
 * Rectangle
 * A Rectangle object is an area defined by its position,
 * as indicated by its top-left corner point (x, y) and by its width and its height.
 * @package aj.geom
 */
define(["aj/Obj", "aj/geom/Point"], function(Obj, Point) {
   var Rectangle = new JS.Class(Obj, {
      
      /**
       * The height of the rectangle, in pixels.
       * @type number
       */
      height : 0,
      
      /**
       * The width of the rectangle, in pixels.
       * @type number
       */
      width : 0,
      
      /**
       * The x coordinate of the top-left corner of the rectangle.
       * @type number
       */
      x : 0,
      
      /**
       * The y coordinate of the top-left corner of the rectangle.
       * @type number
       */
      y : 0,
      
      /**
       * Creates a new Rectangle object with the top-left corner specified by the x and y
       * parameters and with the specified width and height parameters.
       * @param number x (default = 0) — The x coordinate of the top-left corner of the rectangle.
       * @param number y (default = 0) — The y coordinate of the top-left corner of the rectangle.
       * @param number width (default = 0) — The width of the rectangle, in pixels.
       * @param number height (default = 0) — The height of the rectangle, in pixels.
       */
      initialize : function(x, y, width, height) {
         if(typeof x === "number") this.x = x;
         if(typeof y === "number") this.y = y;
         if(typeof width === "number") this.width = width;
         if(typeof height === "number") this.height = height;
      },
      
      /**
       * Determines whether the specified point or rectangle is contained within the rectangular
       * region defined by this Rectangle object.
       * @return boolean A value of true if the Rectangle object contains
       * the specified point or rectangle; otherwise false.
       */
      contains : function(another, y) {
         if(another instanceof Rectangle)
            return this.left <= another.left &&
                   this.left + this.width >= another.left + another.width &&
                   this.top <= another.top &&
                   this.top + this.height >= another.top + another.height;
         
         if(typeof another === "number" && typeof y === "number")
            another = new Point(another, y);
         
         if (another instanceof Point)
            return another.x >= this.left &&
                   another.x <= this.left + this.width &&
                   another.y >= this.top &&
                   another.y <= this.top + this.height;
         
         throw "wrong parameters";
      },
      
      /**
       * Copies all of rectangle data from the source Rectangle object
       * into the calling Rectangle object.
       * @param Rectangle sourceRect The Rectangle object from which to copy the data.
       */
      copyFrom : function(sourceRect) {
         if(typeof sourceRect === "undefined" || sourceRect instanceof Rectangle === false)
            throw "the first parameter must be a Rectangle";
         
         this.x = sourceRect.x;
         this.y = sourceRect.y;
         this.width = sourceRect.width;
         this.height = sourceRect.height;
      },
      
      /**
       * Determines whether the object specified in the toCompare parameter
       * is equal to this Rectangle object. This method compares the x, y, width,
       * and height properties of an object against the same properties of
       * this Rectangle object.
       * @param Rectangle toCompare The rectangle to compare to this Rectangle object.
       * @return boolean A value of true if the object has exactly the same values
       * for the x, y, width, and height properties as this Rectangle object; otherwise false.
       */
      equals : function(toCompare) {
         if(typeof toCompare === "undefined" || toCompare instanceof Rectangle === false)
            throw "the first parameter must be a Rectangle";
         
         return toCompare.x === this.x &&
         toCompare.y === this.y &&
         toCompare.width === this.width &&
         toCompare.height === this.height;
      },
      
      /**
       * Increases the size of the Rectangle object by the specified amounts, in pixels.
       * The center point of the Rectangle object stays the same, and its size increases
       * to the left and right by the dx value, and to the top and the bottom by the dy value.
       * @param number dx The value to be added to the left and the right of the Rectangle object.
       * or the Point object.
       * @param number dy The value to be added to the top and the bottom of the Rectangle.
       */
      inflate : function(dx, dy) {
         if(dx instanceof Point) {
            dy = dx.y;
            dx = dx.x;
         }
         else if(typeof dx !== "number" || typeof dy !== "number")
            throw "wrong parameters";
         
         this.x -= dx;
         this.width += 2 * dx;
         
         this.y -= dy;
         this.height += 2 * dy;
      },
      
      /**
       * If the Rectangle object specified in the toIntersect parameter intersects
       * with this Rectangle object, returns the area of intersection as a Rectangle object.
       * @param Rectangle toIntersect The Rectangle object to compare against 
       * to see if it intersects with this Rectangle object.
       * @return Rectangle A Rectangle object that equals the area of intersection. 
       * If the rectangles do not intersect, this method returns null;
       * that is, a rectangle with its x, y, width, and height properties set to 0.
       */
      intersection : function(toIntersect) {
         if(typeof toIntersect === "undefined" || toIntersect instanceof Rectangle === false)
            throw "the first parameter must be a Rectangle";
         
         var a = this,
             b = toIntersect,
             x0 = Math.max(a.left, b.left),
             x1 = Math.min(a.left + a.width, b.left + b.width);

         if (x0 <= x1) {
           var y0 = Math.max(a.top, b.top),
               y1 = Math.min(a.top + a.height, b.top + b.height);

           if (y0 <= y1)
             return new Rectangle(x0, y0, x1 - x0, y1 - y0);
         }
         
         return null;
      },
      
      /**
       * Determines whether the object specified in the toIntersect parameter
       * intersects with this Rectangle object.
       * @param Rectangle toIntersect The Rectangle object to compare against
       * this Rectangle object.
       * @return boolean A value of true if the specified object
       * intersects with this Rectangle object; otherwise false.
       */
      intersects : function(toIntersect) {
         if(typeof toIntersect === "undefined" || toIntersect instanceof Rectangle === false)
            throw "the first parameter must be a Rectangle";
         
         var a = this,
             b = toIntersect;
         
         return (a.left <= b.left + b.width && b.left <= a.left + a.width &&
               a.top <= b.top + b.height && b.top <= a.top + a.height);
      },
      
      /**
       * Adjusts the location of the Rectangle object,
       * as determined by its top-left corner, by the specified amounts.
       * @param number dx Moves the x value of the Rectangle object by this amount.
       * @param number dy Moves the y value of the Rectangle object by this amount.
       */
      offset : function(dx, dy) {
         if(dx instanceof Point) {
            dy = dx.y;
            dx = dx.x;
         }
         
         if(typeof dx !== "number" || typeof dx !== "number")
            throw "wrong parameters";
         
         this.x += dx;
         this.y += dy;
      },
      
      /**
       * Adds two rectangles together to create a new Rectangle object,
       * by filling in the horizontal and vertical space between the two rectangles.
       * @param Rectangle toUnion A Rectangle object to add to this Rectangle object.
       * @return Rectangle A new Rectangle object that is the union of the two rectangles.
       */
      union : function(toUnion) {
         if(typeof toUnion === "undefined" || toUnion instanceof Rectangle === false)
            throw "the first parameter must be a Rectangle";
         
         var right = Math.max(this.x + this.width, toUnion.x + toUnion.width);
         var bottom = Math.max(this.y + this.height, toUnion.y + toUnion.height);

         this.x = Math.min(this.x, toUnion.x);
         this.y = Math.min(this.y, toUnion.y);

         this.width = right - this.x;
         this.height = bottom - this.y;
      }
   });
   
   /**
    * The sum of the y and height properties.
    * @type number
    */
   Object.defineProperty(Rectangle.prototype, "bottom", {
   get : function() {
      return this.y + this.height;
   }});
   
   /**
    * The location of the Rectangle object's bottom-right corner,
    * determined by the values of the right and bottom properties.
    * @type Point 
    */
   Object.defineProperty(Rectangle.prototype, "bottomRight", {
   get : function() {
      return new Point(this.right, this.bottom);
   }});
   
   /**
    * The x coordinate of the top-left corner of the rectangle.
    * @type number 
    */
   Object.defineProperty(Rectangle.prototype, "left", {
   get : function() {
      return this.x;
   }});
   
   /**
    * The sum of the x and width properties.
    * @type number 
    */
   Object.defineProperty(Rectangle.prototype, "right", {
   get: function() {
      return this.x + this.width;
   }});
   
   /**
    * The size of the Rectangle object,
    * expressed as a Point object with the values of the width and height properties.
    * @type Point 
    */
   Object.defineProperty(Rectangle.prototype, "size", {
   get : function() {
      return new Point(this.width, this.height);
   }});
   
   /**
    * The y coordinate of the top-left corner of the rectangle.
    * @type number 
    */
   Object.defineProperty(Rectangle.prototype, "top", {
   get : function() {
      return this.y;
   }});
   
   /**
    * The location of the Rectangle object's top-left corner,
    * determined by the x and y coordinates of the point.
    * @type Point 
    */
   Object.defineProperty(Rectangle.prototype, "topLeft", {
   get : function() {
      return new Point(this.left, this.top);
   }});
   
   return Rectangle;
});