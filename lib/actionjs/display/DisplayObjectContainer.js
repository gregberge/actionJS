/**
 * DisplayObjectContainer
 * The DisplayObjectContainer class is the base class
 * for all objects that can serve as display object containers
 * on the display list.
 * @package aj.display
 */
define(["aj/display/InteractiveObject", "aj/display/DisplayObject", "aj/events/Event"],
function(InteractiveObject, DisplayObject, Event) {
   var DisplayObjectContainer = new JS.Class(InteractiveObject, {
      
      /**
       * Children
       * @type array
       */
      _children : [],
      
      initialize : function()
      {
         this.callSuper();
         this._children = [];
         this.addEventListener(Event.ADDED_TO_STAGE, this._broadcastEvent);
         this.addEventListener(Event.REMOVED_FROM_STAGE, this._broadcastEvent);
      },
      
      /**
       * Broadcast event to every children
       * @param Event event Event type
       */
      _broadcastEvent : function(event)
      {
         this._broadcast("dispatchEvent", [event]);
         this._broadcast("_broadcastEvent", [event]);
      },
      
      _broadcast : function(fc, args)
      {
         var i = 0, il = this.numChildren, child;
         
         for(i = 0; i < il; i++)
         {
            child = this.getChildAt(i);
            
            if(typeof child[fc] !== "undefined")
               child[fc].apply(child, args);
         }
      },
      
      _setStage : function(stage)
      {
         this.callSuper();
         
         var i = 0, il = this.numChildren, child;
         
         for(i = 0; i < il; i++)
         {
            child = this.getChildAt(i);
            child._setStage(stage);
         }
      },
      
      _renderProcess : function()
      {
         this._broadcast("_renderProcess");
         this.callSuper();
      },
      
      /**
       * Adds a child DisplayObject instance to this DisplayObjectContainer instance.
       * @param DisplayObject child The DisplayObject instance
       * to add as a child of this DisplayObjectContainer instance.
       * @return DisplayObject The DisplayObject instance that you pass in the child parameter.
       */
      addChild : function(child)
      {
         return this.addChildAt(child, this._children.length);
      },
      
      /**
       * Determines whether the specified display object is a child
       * of the DisplayObjectContainer instance or the instance itself.
       * @param DisplayObject child The child object to test.
       * @return boolean true if the child object is a child of the DisplayObjectContainer
       * or the container itself; otherwise false.
       */
      contains : function(child)
      {
         return typeof this.getChildIndex(child) === "number";
      },
      
      /**
       * Adds a child DisplayObject instance to this DisplayObjectContainer instance.
       * @param DisplayObject child The DisplayObject instance to add as a child
       * of this DisplayObjectContainer instance.
       * @param int index The index position to which the child is added.
       * If you specify a currently occupied index position, the child object that exists
       * at that position and all higher positions are moved up one position in the child list.
       * @return DisplayObject The DisplayObject instance that you pass in the child parameter.
       */
      addChildAt : function(child, index)
      {
         if(child instanceof DisplayObject === false || typeof index !== "number")
            throw "wrong parameters";
         
         if(this.getChildIndex(child) !== index)
         {
            if(child.parent !== null)
            {
               child.parent.removeChild(child);
            }
            
            this._children.splice(index, 0, child);
            this._setParent(child);
         }
         
         return child;
      },
      
      /**
       * Set the parent to the child
       * @param DisplayObject child
       */
      _setParent : function(child)
      {
         child._parent = this;
         child.dispatchEvent(new Event(Event.ADDED));
      },
      
      /**
       * Returns the child display object instance that exists at the specified index.
       * @param int index The index position of the child object.
       * @return DisplayObject The child display object at the specified index position.
       */
      getChildAt : function(index)
      {
         if(typeof index !== "number")
            throw "wrong parameters";
         
         var child = this._children[index];
         
         if(typeof child === "undefined")
            return false;
         
         return child;
      },
      
      /**
       * Returns the index position of a child DisplayObject instance.
       * @param DisplayObject child The DisplayObject instance to identify.
       * @return The index position of the child display object to identify.
       */
      getChildIndex : function(child)
      {
         if(child instanceof DisplayObject === false)
            throw "wrong parameters";
         
         var index = this._children.indexOf(child);
         
         if(index === -1)
            return false;
         
         return index;
      },
      
      /**
       * Returns an array of objects that lie under the specified point and are
       * children (or grandchildren, and so on) of this DisplayObjectContainer instance.
       * @param Point point The point under which to look.
       * @return array An array of objects that lie under the specified point
       * and are children (or grandchildren, and so on)
       * of this DisplayObjectContainer instance.
       */
      getObjectsUnderPoint : function(point)
      {
         var i, il = this.numChildren, child, childs = [], globPoint = this.localToGlobal(point);
         
         for(i = 0; i < il; i++)
         {
            child = this.getChildAt(i);
            
            if(child.hitTest(globPoint))
            {
               childs.push(child);
            }
            
            if(child instanceof DisplayObjectContainer)
            {
               childs = childs.concat(child.getObjectsUnderPoint(child.globalToLocal(globPoint)));
            }
         }
         
         return childs;
      },
      
      /**
       * Removes the specified child DisplayObject instance from the child list
       * of the DisplayObjectContainer instance.
       * @param DisplayObject child The DisplayObject instance to remove.
       * @return DisplayObject The DisplayObject instance that you pass in the child parameter.
       */
      removeChild : function(child)
      {
         var index = this.getChildIndex(child);
         
         if(index === -1)
            return false;
         
         this._children.splice(index, 1);
         this._unsetParent(child);
         
         return child;
      },
      
      /**
       * Unset the parent
       * @param DisplayObject child Child
       */
      _unsetParent : function(child)
      {
         child._parent = null;
         child.dispatchEvent(new Event(Event.REMOVED));
      },
      
      /**
       * Removes a child DisplayObject from the specified index position in the child list of the DisplayObjectContainer.
       * @param int index The child index of the DisplayObject to remove.
       * @return The DisplayObject instance that was removed.
       */
      removeChildAt : function(index)
      {
         if(typeof index !== "number")
            throw "wrong parameters";
         
         var child = this.getChildAt(index);
         
         if(child === false)
            return false;
         
         return this.removeChild(child);
      },
      
      /**
       * Changes the position of an existing child in the display object container.
       * @param DisplayObject child The child DisplayObject instance
       * for which you want to change the index number.
       * @param int index The resulting index number for the child display object.
       * @return The DisplayObject instance.
       */
      setChildIndex : function(child, index)
      {
         if(child instanceof DisplayObject === false || typeof index !== "number")
            throw "wrong parameters";
         
         if(this.contains(child) === false)
            return false;
         
         return this.addChildAt(child, index);
      },
      
      /**
       * Swaps the z-order (front-to-back order) of the two specified child objects.
       * @param DisplayObject child1 The first child object.
       * @param DisplayObject child2 The second child object.
       */
      swapChildren : function(child1, child2)
      {
         if(child1 instanceof DisplayObject === false || child2 instanceof DisplayObject === false)
            throw "wrong parameters";
         
         if(this.contains(child1) === false || this.contains(child2) === false)
            return false;
         
         var index1 = this.getChildIndex(child1);
         var index2 = this.getChildIndex(child2);
         
         this._children[index1] = child2;
         this._children[index2] = child1;
         
         return true;
      },
      
      /**
       * Swaps the z-order (front-to-back order)
       * of the child objects at the two specified index positions in the child list.
       * @param int index1  The index position of the first child object.
       * @param int index2  The index position of the second child object.
       */
      swapChildrenAt : function(index1, index2)
      {
         if(this.getChildAt(index1) === false || this.getChildAt(index2))
            return false;
         
         this._children[index1] = this._children[index2];
         this._children[index2] = this._children[index1];
         
         return true;
      }
   });
   
   var p = DisplayObjectContainer.prototype;
   
   /**
    * [read-only] Returns the number of children of this object.
    * @return number
    */
   Object.defineProperty(p, "numChildren", {
   get : function() {
      return this._children.length;
   }});
   
   return DisplayObjectContainer;
});