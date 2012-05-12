define(["jquery", "qunit"], function($, qunit)
{
   return {
      start : function()
      {
         require(["aj/geom/Point"], function(Point)
         {
            module("geom");
            
            test("aj/geom/Point", function()
            {
               var x = 5,
                   y = 5,
                   point = new Point(x, y);
               ok(point instanceof Point, "instanciate");
               
               equal(point.x, x, "x coord");
               equal(point.y, y, "y coord");
               
               equal(point.length(), 7.0710678118654755, "length()");
            });
         });
      }
   };
});