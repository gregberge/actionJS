define(function()
{
   return new JS.Class({
      
      /**
       * Clone the object
       * @return Object An Object identical to the original.
       */
      clone : function()
      {
         return JS.extend({}, this);
      }
   
   });
});