/**
 * Action JS base object
 * @author Greg Bergé
 * @namespace The base namespace of actionJS library
 */
aj  = {};

/**
 * Point representation
 * @class Represents a point.
 * @param [x=0] {number} The absciss coord of the point
 * @param [y=0] {number} The ordonnee coord of the point
 */
aj.Point = function(x, y)
{
	/**
     * The absciss coord of the point
     * @type number
     */
	this.x = x;
	
	/**
     * The ordonnee coord of the point
     * @type number
     */
	this.y = y;
	
	if(this.x == null){ this.x = 0; }
	if(this.y == null){ this.y = 0; }
};


/**
 * Event base class
 * @class Represents an event.
 * @param {string} type Event type
 */
aj.Event = function(type)
{
	/**
     * The type of the event
     * @type string
     */
	this.type = type;
	
	/**
     * The target of the event
     * @type aj.EventDispatcher
     */
	this.target = {};
	
	/**
     * The current target of the event
     * @type aj.EventDispatcher
     */
	this.currentTarget = {};
};

/**
 * Enter frame event type
 * @public
 * @static
 * @type string
 */
aj.Event.ENTER_FRAME = "enter_frame";


/**
 * Event base class
 * @class Represents an event.
 * @extends aj.Event 
 * @param {string} type Event type
 */
aj.MouseEvent = function(type)
{
	this.super = aj.Event;
	this.super(type);
};

aj.MouseEvent.prototype = new aj.Event;

/**
 * Click event type
 * @public
 * @static
 * @type string
 */
aj.MouseEvent.CLICK = "click";


/**
 * Event dispatcher
 * @class Dispatch and listen events.
 */
aj.EventDispatcher = function()
{
	this.eventListenerList = [];
};

/**
 * Add a listener of an specific event type on the object
 * @public
 * @param {string} type The event type
 * @param {function} listener The function to call
 * @returns {boolean} true if correctly added, else false
 */
aj.EventDispatcher.prototype.addEventListener = function(type, listener)
{
	if(type && listener)
	{
		var eventListener = [type, listener];
		this.eventListenerList.push(eventListener);
		return true;
	}
	else
	{
		return false;
	}
};

/**
 * Dispatch a specific event on the object
 * @public
 * @param {aj.Event} event The event to dispatch
 * @returns {boolean} true if correctly dispatched, else false
 */
aj.EventDispatcher.prototype.dispatchEvent = function(event)
{	
	if(event)
	{
		for (var i=0, il=this.eventListenerList.length; i<il; i++)
		{
	    	var eventListener = this.eventListenerList[i];
	    	
	    	if(eventListener[0] == event.type)
	    	{
	    		eventListener[1].call(this, event);
	    	}
		}
		
		return true;
	}
	else
	{
		return false;
	}
};

/**
 * Test if the object listen a specific event type
 * @public
 * @param {string} type The event type
 * @returns {boolean} true if the object has the listener, else false
 */
aj.EventDispatcher.prototype.hasEventListener = function(type)
{
	for (var i=0, il=this.eventListenerList.length; i<il; i++)
	{
    	var eventLister = this.eventListenerList[i];
    	
    	if(eventListener[0] == type)
    	{
    		return true;
    	}
	}
	
	return false;
};

/**
 * Remove an event listener
 * @param {string} type The event type
 * @param {function} listener The event listener
 * @return {boolean} true if an event was removed, else false
 */
aj.EventDispatcher.prototype.removeEventListener = function(type, listener)
{
	var removed = false;
	
	for (var i=0, il=this.eventListenerList.length; i<il; i++)
	{
    	var eventLister = this.eventListenerList[i];
    	
    	if(eventListener[0] == type && eventListener[1] == listener)
    	{
    		this.eventListenerList.splice(i, 1);
    		removed = true;
    	}
	}
	
	return removed;
};

/**
 * The same function as hasEventListener
 * @see aj.EventDispatcher#hasEventListener
 * @param type
 * @return {boolean} true if the object has the listener, else false
 */
aj.EventDispatcher.prototype.willTriger = function(type)
{
	return this.hasEventListener(type);
};







aj.DisplayObject = function()
{
	this.super = aj.EventDispatcher;
	this.super();
	
	this.parent = null;
	this._x = 0;
	this._y = 0;
	this.mouseX = 0;
	this.mouseY = 0;
	this._width = 0;
	this._height = 0;
	this._alpha = 1;
	this._visible = true;
	this.stage = null;
	
	this.name = "displayObject_" + aj.DisplayObject.Id;
	aj.DisplayObject.Id++;
	
	this.__defineGetter__("x", function(){
        return this._x;
    });
    
    this.__defineSetter__("x", function(val){
        this._x = val;
		//this.jqEl.css("left", Math.round(this._x));
    });
    
    this.__defineGetter__("y", function(){
        return this._y;
    });
    
    this.__defineSetter__("y", function(val){
        this._y = val;
		//this.jqEl.css("top", Math.round(this._y));
    });
    
    this.__defineGetter__("alpha", function(){
        return this._alpha;
    });
    
    this.__defineSetter__("alpha", function(val)
    {
        this._alpha = val;
        
        if(this._alpha < 0)
        {
        	this._alpha = 0;
        }
    });
    
    this.__defineGetter__("width", function(){
        return this._width;
    });
    
    this.__defineSetter__("width", function(val){
        this._width = val;
		//this.jqEl.css("width", this._width);
    });
    
    this.__defineGetter__("height", function(){
        return this._height;
    });
    
    this.__defineSetter__("height", function(val){
        this._height = val;
		//this.jqEl.css("height", this._height);
    });
    
    this.__defineGetter__("visible", function(){
        return this._visible;
    });
    
    this.__defineSetter__("visible", function(val){
        this._visible = val;
        
        
		if(val)
		{
			this.jqEl.hide();
		}
		else
		{
			this.jqEl.show();
		}
    });
    
    this.__defineGetter__("mouseEnabled", function(){
        return this._mouseEnabled;
    });
    
    this.__defineSetter__("mouseEnabled", function(val){
        this._mouseEnabled = val;
        
        
		if(val)
		{
			//this.jqEl.mousemove(jQuery.proxy(this, "updateMouse"));
		}
		else
		{
			//this.jqEl.unbind("mousemove", this.updateMouse);
		}
    });
};

aj.DisplayObject.prototype = new aj.EventDispatcher;

aj.DisplayObject.Id = 0;

aj.DisplayObject.prototype.name = "";

aj.DisplayObject.prototype.mouseX = 0;

aj.DisplayObject.prototype.mouseY = 0;

aj.DisplayObject.prototype._x = 0;

aj.DisplayObject.prototype._y = 0;

aj.DisplayObject.prototype._width = 0;

aj.DisplayObject.prototype._height = 0;

aj.DisplayObject.prototype._alpha = 1;

aj.DisplayObject.prototype._visible = true;

aj.DisplayObject.prototype._mouseEnabled = false;

aj.DisplayObject.prototype.stage = null;

aj.DisplayObject.prototype.parent = null;

aj.DisplayObject.prototype.jqEl = {};

aj.DisplayObject.prototype.getCoordPoint = function()
{
	return new aj.Point(this.x, this.y);
};

aj.DisplayObject.prototype.localToGlobal = function(localPoint)
{
	if(this.parent)
	{
		var globalPoint = new aj.Point();
		var parent = this.parent;
		
		globalPoint.x = this.x;
		globalPoint.y = this.y;
	
		while(parent != this.stage)
		{
			globalPoint.x += parent.x;
			globalPoint.y += parent.y;
			parent = parent.parent;
		}
		
		return globalPoint;
	}
	
	return false;
};

aj.DisplayObject.prototype.hitTestPoint = function(point)
{
	var globalPoint = this.localToGlobal(this.getCoordPoint());
	
	if(point.x > globalPoint.x && point.x < globalPoint.x + this.width)
	{
		if(point.y > globalPoint.y && point.y < globalPoint.y + this.height)
		{
			return true;
		}
	}
	
	return false;
};

aj.DisplayObject.prototype.mouseTest = function(point, mouseEvent)
{	
	if(this.hitTestPoint(point))
	{
		this.dispatchEvent(mouseEvent);
	}
	
	if(this.children)
	{
		for (var i=0, il=this.children.length; i<il; i++)
		{
			this.children[i].mouseTest(point, mouseEvent);
		}
	}
};

aj.DisplayObject.prototype.updateMouse = function(e)
{
	var offset = this.jqEl.offset();
	this.mouseX = e.pageX - offset.left;
	this.mouseY = e.pageY - offset.top;
};

aj.DisplayObject.prototype.draw = function()
{
	this.preDraw();
	this.drawBase();
	this.postDraw();
};

aj.DisplayObject.prototype.preDraw = function()
{
	this.stage.context2D.globalAlpha = this.alpha;
};

aj.DisplayObject.prototype.drawBase = function()
{
};

aj.DisplayObject.prototype.postDraw = function()
{
	this.stage.context2D.globalAlpha = 1;
};





aj.DisplayObjectContainer = function()
{
	this.super = aj.DisplayObject;
	this.super();
	
	this.children = [];
};

aj.DisplayObjectContainer.prototype = new aj.DisplayObject;

aj.DisplayObjectContainer.prototype.children = [];

aj.DisplayObjectContainer.prototype.numChildren = function()
{
	return this.children.length;
};

aj.DisplayObjectContainer.prototype.addChild = function(child)
{	
	if(!this.contains(child))
	{
		if(child.parent != null)
		{
			child.parent.removeChild(child);
		}
		
		//aj part
		this.children.push(child);
		child.parent = this;
		
		child.stage = this.stage;
		this.setChildStage(child);
	
		//jquery part
		//this.jqEl.append(child.jqEl);
		//child.jqEl.css("z-index", this.numChildren() - 1);
	}
	
	return child;
};

aj.DisplayObjectContainer.prototype.setChildStage = function(child)
{
};

aj.DisplayObjectContainer.prototype.setAllChildStage = function()
{	
	for (var i=0, il=this.children.length; i<il; i++)
	{
		this.children[i].stage = this.stage;
		
		if(this.children[i].children)
		{
    		this.children[i].setAllChildStage();
    	}
	}
};

aj.DisplayObjectContainer.prototype.addChildAt = function(child, index)
{
	if(this.getChildIndex(child) != index)
	{
		if(child.parent != null)
		{
			child.parent.removeChild(child);
		}
		
		//aj part
		this.children.splice(index, 0, child);
		child.parent = this;
		
		child.stage = this.stage;
		this.setChildStage(child);
	
		//jquery part
		this.jqEl.append(child.jqEl);
		//child.jqEl.css("z-index", index);
	}
	
	return child;
};

aj.DisplayObjectContainer.prototype.contains  = function(child)
{
	for (var i=0, il=this.children.length; i<il; i++)
	{
    	if(this.children[i] == child)
    	{
    		return true;
    	}
	}
	
	return false;
};

aj.DisplayObjectContainer.prototype.getChildAt = function(index)
{
	if(index < this.numChildren() && index >= 0)
	{
		return this.children[index];
	}
};

aj.DisplayObjectContainer.prototype.getChildByName = function(name)
{
	for (var i=0, il=this.children.length; i<il; i++)
	{
    	if(this.children[i].name == name)
    	{
    		return this.children[i];
    	}
	}
	
	return false;
};

aj.DisplayObjectContainer.prototype.getChildIndex = function(child)
{
	for (var i=0, il=this.children.length; i<il; i++)
	{
    	if(this.children[i] == child)
    	{
    		return i;
    	}
	}
	
	return -1;
};

aj.DisplayObjectContainer.prototype.removeChild = function(child)
{
	for (var i=0, il=this.children.length; i<il; i++)
	{
    	if(this.children[i] == child)
    	{
    		this.children.splice(i, 1);
    		this.jqEl.remove(child.jqEl);
    		child.stage = null;
    	}
	}
	
	return child;
};

aj.DisplayObjectContainer.prototype.setChildIndex = function(child, index)
{
	if(this.contains(child) && index < this.numChildren() && index >= 0)
	{
		this.removeChild(child);
		
		//aj part
		this.children.splice(index, 0, child);
	
		//jquery part
		this.jqEl.append(child.jqEl);
		//child.jqEl.css("z-index", index);
	}
	
	return child;
};

aj.DisplayObjectContainer.prototype.swapChildren = function(child1, child2)
{
	if(this.contains(child1) && this.contains(child2))
	{
		var index1 = this.getChildIndex(child1);
		var index2 = this.getChildIndex(child2);
		
		this.children[index1] = child2;
		//child2.jqEl.css("z-index", index1);
		
		this.children[index2] = child1;
		//child1.jqEl.css("z-index", index2);
	}
};

aj.DisplayObjectContainer.prototype.swapChildrenAt = function(index1, index2)
{
	if(index1 < this.numChildren() && index1 >= 0 && index2 < this.numChildren() && index2 >= 0)
	{
		var child1 = this.children[index1];
		var child2 = this.children[index2];
		
		this.children[index1] = child2;
		//child2.jqEl.css("z-index", index1);
		
		this.children[index2] = child1;
		//child1.jqEl.css("z-index", index2);
	}
};

aj.DisplayObjectContainer.prototype.draw = function()
{
	for (var i=0, il=this.children.length; i<il; i++)
	{
    	this.children[i].draw();
    }
    
    this.drawBase();
};



aj.Stage = function(stageId, fps)
{
	this.super = aj.DisplayObjectContainer;
	this.super();
	
	this.jqEl = jQuery("#" + stageId);
	this.name = stageId;
	
	this.stage = this;
	
	this.context2D = null;
	
	if(fps != undefined)
	{
		this._fps = fps;
	}
	
	this.jqEl.get(0).addEventListener("click", jQuery.proxy(this.clickListener, this), false);
		
	this.initEnterFrame();
	
	this.__defineGetter__("fps", function(){
		return this._fps;
	});

	this.__defineSetter__("fps", function(val){
		this._fps = val;
		this.initEnterFrame();
	});
};

aj.Stage.prototype = new aj.DisplayObjectContainer;

aj.Stage.prototype.context2D = null;

aj.Stage.prototype.enterFrameInterval = 0;

aj.Stage.prototype._fps = 150;

aj.Stage.prototype.clickListener = function(event)
{
	var mouseEvent = new aj.MouseEvent(aj.MouseEvent.CLICK);
	
	var point = new aj.Point(event.clientX - this.jqEl.get(0).offsetLeft, event.clientY - this.jqEl.get(0).offsetTop);
	
	this.mouseTest(point, mouseEvent);
};

aj.Stage.prototype.initEnterFrame = function()
{
	clearInterval(this.enterFrameInterval);
	
	this.enterFrameInterval = setInterval(jQuery.proxy(this, "enterFrame"), (1000/this._fps));
	this.context2D = this.stage.jqEl.get(0).getContext('2d');
};

aj.Stage.prototype.setChildStage = function(child)
{
	child.setAllChildStage();
};

aj.Stage.prototype.enterFrame = function()
{
	var event = new aj.Event(aj.Event.ENTER_FRAME);
	this.dispatchEvent(event);

	this.context2D.save();
	this.context2D.clearRect(0,0, 500, 500);
	
	this.draw();
	
	this.context2D.restore();
};



aj.Image = function(imageUrl)
{
	this.super = aj.DisplayObject;
	this.super();
	
	this.image = new Image();
	this.image.src = imageUrl;
};

aj.Image.prototype = new aj.DisplayObject;
aj.Image.prototype.image = null;

aj.Image.prototype.drawBase = function()
{
	var globalPoint = this.localToGlobal(this.getCoordPoint());
	
	if(this.image != null)
	{
		this.stage.context2D.drawImage(this.image, globalPoint.x, globalPoint.y);
	}
};



aj.Sprite = function(){
	this.super = aj.DisplayObjectContainer;
	this.super();
	
	this.graphics = null;
};

aj.Sprite.prototype = new aj.DisplayObjectContainer;
aj.Sprite.prototype.graphics = null;