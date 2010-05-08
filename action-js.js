/**
 * Action JS base object
 * @author Greg Bergé
 * @namespace The base namespace of actionJS library
 */
aj  = {};

/**
 * Point representation
 * @class Represents a point.
 * @param [x=0] {number} The abscissa value of the point
 * @param [y=0] {number} The ordinate value of the point
 */
aj.Point = function(x, y)
{
	/**
     * The abscissa value of the point
     * @type number
     */
	this.x = x;
	
	/**
     * The ordinate value of the point
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
	this.target = null;
	
	/**
     * The current target of the event
     * @type aj.EventDispatcher
     */
	this.currentTarget = null;
};

/**
 * Enter frame event type
 * @public
 * @static
 * @type string
 */
aj.Event.ENTER_FRAME = "enter_frame";

/**
 * Complete event type
 * @public
 * @static
 * @type string
 */
aj.Event.COMPLETE = "complete";


/**
 * Event mouse class
 * @class Represents an event.
 * @extends aj.Event 
 * @param {string} type Event type
 */
aj.MouseEvent = function(type)
{
	this.sup = aj.Event;
	this.sup(type);
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
 * Event keyboard class
 * @class Represents an event.
 * @extends aj.Event 
 * @param {string} type Event type
 */
aj.KeyEvent = function(type)
{
	this.sup = aj.Event;
	this.sup(type);
	
	/**
	 * The key code
	 * @public
	 * @type integer
	 */
	this.keyCode = 0;
};

aj.KeyEvent.prototype = new aj.Event;

/**
 * Key down event type
 * @public
 * @static
 * @type string
 */
aj.KeyEvent.KEY_DOWN = "key_down";

/**
 * Key up event type
 * @public
 * @static
 * @type string
 */
aj.KeyEvent.KEY_UP = "key_up";


/**
 * Event progress class
 * @class Represents an event.
 * @extends aj.Event 
 * @param {string} type Event type
 */
aj.ProgressEvent = function(type)
{
	this.sup = aj.Event;
	this.sup(type);
	
	/**
	 * The amount number of data to load
	 * @public
	 * @type integer
	 */
	this.total = 0;
	
	/**
	 * The amount number of data loaded
	 * @public
	 * @type integer
	 */
	this.loaded = 0;
};

aj.ProgressEvent.prototype = new aj.Event;

/**
 * Progress event type
 * @public
 * @static
 * @type string
 */
aj.ProgressEvent.PROGRESS = "progress";


/**
 * Event dispatcher
 * @class Dispatch and listen events.
 */
aj.EventDispatcher = function()
{
	/**
	 * The event listeners list
	 * @private
	 * @type array
	 */
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
	    		event.target = this;
	    		
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
    	var eventListener = this.eventListenerList[i];
    	
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






/**
 * Display object
 * @class Represents an object that can be displayed.
 * @extends aj.EventDispatcher
 * @param {object} [params] The parameters links to the object
 */
aj.DisplayObject = function(params)
{
	this.sup = aj.EventDispatcher;
	this.sup();
	
	/**
	 * The parent of the display object
	 * @private
	 * @type aj.DisplayObjectContainer
	 */
	this._parent = null;
	
	/**
	 * The absciss coord of the object
	 * @private
	 * @default 0
	 * @type number
	 */
	this._x = 0;
	
	/**
	 * Getter x
	 * @returns {number} _x
	 */
	this.__defineGetter__("x", function(){
        return this._x;
    });
    
	/**
	 * Setter x
	 */
    this.__defineSetter__("x", function(val){
        this._x = Number(val);
    });
    
	
	/**
	 * The ordonnee of the object
	 * @private
	 * @default 0
	 * @type number
	 */
	this._y = 0;
	
	/**
	 * Getter y
	 * @returns {number} _y
	 */
	this.__defineGetter__("y", function(){
        return this._y;
    });
    
	/**
	 * Setter y
	 */
    this.__defineSetter__("y", function(val){
        this._y = Number(val);
    });
    
	
	/**
	 * The width of the object
	 * @private
	 * @default 0
	 * @type number
	 */
	this._width = 0;
	
	/**
	 * Getter width
	 * @returns {number} _width
	 */
	this.__defineGetter__("width", function(){
        return this._width;
    });
    
	/**
	 * Setter width
	 */
    this.__defineSetter__("width", function(val){
        this._width = Number(val);
        
        if(this._width < 0){ this._width = 0; }
    });
    
	
	/**
	 * The height of the object
	 * @private
	 * @default 0
	 * @type number
	 */
	this._height = 0;
	
	/**
	 * Getter height
	 * @returns {number} _height
	 */
	this.__defineGetter__("height", function(){
        return this._height;
    });
    
	/**
	 * Setter height
	 */
    this.__defineSetter__("height", function(val){
        this._height = Number(val);
        
        if(this._height < 0){ this._height = 0; }
    });
	
	/**
	 * The opacity of the object (0 to 1)
	 * @private
	 * @default 1
	 * @type number
	 */
	this._alpha = 1;
	
	/**
	 * Getter alpha
	 * @returns {number} _alpha
	 */
	this.__defineGetter__("alpha", function(){
        return this._alpha;
    });
    
	/**
	 * Setter alpha
	 */
    this.__defineSetter__("alpha", function(val)
    {
        this._alpha = Number(val);
        
        if(this._alpha < 0){ this._alpha = 0; }
    });
	
	/**
	 * Display the object of not
	 * @private
	 * @default true
	 * @type boolean
	 */
	this._visible = true;
	
	/**
	 * Getter visible
	 * @returns {number} _alpha
	 */
	this.__defineGetter__("visible", function(){
        return this._visible;
    });
    
	/**
	 * Setter visible
	 */
    this.__defineSetter__("visible", function(val)
    {
        this._visible = Boolean(val);
    });
	
	/**
	 * The stage of the object
	 * @private
	 * @default null
	 * @type aj.Stage
	 */
	this._stage = null;
	
	/**
	 * Getter stage
	 * @returns {aj.Stage} _stage
	 */
	this.__defineGetter__("stage", function(){
        return this._stage;
    });
    
	/**
	 * Setter stage
	 */
    this.__defineSetter__("stage", function(val)
    {
    	if(val instanceof aj.Stage)
    	{
    		this._stage = val;
    	}
    });
	
	/**
	 * The name of the object
	 * @private
	 * @default "displayObject_" + currentId
	 * @type string
	 */
	this._name = "displayObject_" + aj.DisplayObject.Id;
	
	/**
	 * Getter name
	 * @returns {string} _name
	 */
	this.__defineGetter__("name", function(){
        return this._name;
    });
    
	/**
	 * Setter name
	 */
    this.__defineSetter__("name", function(val)
    {
    	this._name = val + "";
    });
    
    //Increment static id
	aj.DisplayObject.Id++;
};

aj.DisplayObject.prototype = new aj.EventDispatcher;

/**
 * Id of each displayObject
 * @static
 * @type number
 */
aj.DisplayObject.Id = 0;

/**
 * Get the point with object coords
 * @public
 * @returns {aj.Point} The coord point
 */
aj.DisplayObject.prototype.getCoordPoint = function()
{
	return new aj.Point(this.x, this.y);
};

/**
 * Convert a point from local coords to stage coords
 * @public
 * @param {aj.Point} [localPoint=DisplayObject#getCoordPoint] The local point
 * @returns {aj.Point|boolean} The coord point or false if no parent
 */
aj.DisplayObject.prototype.localToGlobal = function(localPoint)
{
	//Check if there is a parent to the object
	if(this.parent instanceof aj.DisplayObjectContainer)
	{

		//Default value
		if(localPoint == null){ localPoint = this.getCoordPoint(); }
		
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

/**
 * Check if the object hit a stage point
 * @public
 * @param {aj.Point} point The point to hit
 * @returns {boolean} true if the object hit the point, else false
 */
aj.DisplayObject.prototype.hitTestPoint = function(point)
{
	var globalPoint = this.localToGlobal();

	if(point.x > globalPoint.x && point.x < globalPoint.x + this.width)
	{
		if(point.y > globalPoint.y && point.y < globalPoint.y + this.height)
		{
			return true;
		}
	}
	
	return false;
};

/**
 * The mouse test call at mouse action on the stage
 * @private
 * @param {aj.Point} point The current mouse point
 * @param {aj.MouseEvent} mouseEvent The mouse event
 * @returns {boolean} true if point match object, else false
 */
aj.DisplayObject.prototype.mouseTest = function(point, mouseEvent)
{	
	//If object under mouse point, we dispatch the corresponding event
	if(this.hitTestPoint(point))
	{
		this.dispatchEvent(mouseEvent);
		
		//If it's a displayObjectContainer with children
		if(this.children)
		{
			//Forward the function to children
			for (var i=0, il=this.children.length; i<il; i++)
			{
				this.children[i].mouseTest(point, mouseEvent);
			}
		}
		return true;
	}
	
	return false;
};

/**
 * Draw the object on the stage
 * @private
 * @returns {void}
 */
aj.DisplayObject.prototype.draw = function()
{
	this.preDraw();
	this.drawBase();
	this.postDraw();
};

/**
 * Executed before the drawing
 * @private
 * @returns {void}
 */
aj.DisplayObject.prototype.preDraw = function()
{
	this.stage.context2D.globalAlpha = this.alpha;
	
	if(this.parent.autoResize)
	{
		this.parent.autoResize(this);
	}
};

/**
 * The drawing method
 * @returns {void}
 */
aj.DisplayObject.prototype.drawBase = function()
{
};

/**
 * Executed after the drawing
 * @returns {void}
 */
aj.DisplayObject.prototype.postDraw = function()
{
	this.stage.context2D.globalAlpha = 1;
};




/**
 * Display Object Container
 * @extends aj.DisplayObject
 * @class Represents a display object that can contains others.
 */
aj.DisplayObjectContainer = function()
{
	this.sup = aj.DisplayObject;
	this.sup();
	
	/**
	 * The children
	 * @private
	 * @type array
	 */
	this.children = [];
	
	/**
	 * Getter numChildren
	 * @returns {number} children number
	 */
	this.__defineGetter__("numChildren", function(){
        return this.children.length;
    });
};

aj.DisplayObjectContainer.prototype = new aj.DisplayObject;

/**
 * Automatic resize of the container
 * @returns {void}
 */
aj.DisplayObjectContainer.prototype.autoResize = function(child)
{
	if(this.numChildren)
	{
		var left = this.children[0].x;
		var right = this.children[0].x + this.children[0].width;
		
		var top = this.children[0].y;
		var bottom = this.children[0].y + this.children[0].height;
		
		for (var i=0, il=this.children.length; i<il; i++)
		{
			if(this.children[i].x < left)
			{
				left = this.children[i].x;
			}
			
			if(this.children[i].x + this.children[i].width > right)
			{
				right = this.children[i].x + this.children[i].width;
			}
			
			if(this.children[i].y < top)
			{
				top = this.children[i].y;
			}
			
			if(this.children[i].y + this.children[i].height > bottom)
			{
				bottom = this.children[i].y + this.children[i].height;
			}
		}
		
		this._width = right;
		this._height = bottom;
	}
};

/**
 * Add a displayObject in the container
 * @public
 * @see aj.DisplayObjectContainer#addChildAt
 * @param {aj.DisplayObject} child
 * @returns {aj.DisplayObject|boolean} The display object or false if not a valid display object
 */
aj.DisplayObjectContainer.prototype.addChild = function(child)
{	
	return this.addChildAt(child, 0);
};

/**
 * Set the child for all children
 * @private
 * @returns {void}
 */
aj.DisplayObjectContainer.prototype.setAllChildStage = function()
{	
	for (var i=0, il=this.children.length; i<il; i++)
	{
		this.children[i].stage = this.stage;
		
		//If children, we forward
		if(this.children[i].children)
		{
    		this.children[i].setAllChildStage();
    	}
	}
};

/**
 * Add a child at a specific place
 * @public
 * @param {aj.DisplayObject} child The child
 * @param {number} index The index 
 * @returns {aj.DisplayObject|boolean} The display object or false if not a valid display object
 */
aj.DisplayObjectContainer.prototype.addChildAt = function(child, index)
{
	//If it's a valid display object
	if(child instanceof aj.DisplayObject && index == 0 || (index < this.numChildren && index >= 0))
	{
		//If the child not also in this container
		if(this.getChildIndex(child) !== index)
		{
			//If the child is in other container, we remove it
			if(child.parent != null)
			{
				child.parent.removeChild(child);
			}
			
			//Add in the children array
			this.children.splice(index, 0, child);
			
			//Set the parent and the stage
			child.parent = this;
			child.stage = this.stage;
			
			//For a stage we forward the parent
			if(this instanceof aj.Stage)
			{
				this.setChildStage(child);
			}
		}
		
		this.autoResize();
		
		return child;
	}
	
	return false;
};

/**
 * Test if a child is in the container
 * @public
 * @param {aj.DisplayObject} child The child to test
 * @returns {boolean} true if it contains the child, else false
 */
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

/**
 * Get a child at a specific index
 * @public
 * @param {number} index The child index
 * @returns {aj.DisplayObject|boolean} The child or false if index out of bounds
 */
aj.DisplayObjectContainer.prototype.getChildAt = function(index)
{
	if(index < this.numChildren && index >= 0)
	{
		return this.children[index];
	}
	
	return false;
};

/**
 * Get a child by his name
 * @deprecated
 * @public
 * @param {string} name The name of the child
 * @returns {aj.DisplayObject|boolean} The child if find else false
 */
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

/**
 * Get the index of a child
 * @public
 * @param {aj.DisplayObject} child The child to get the index
 * @return {number|boolean} The index or false if not find
 */
aj.DisplayObjectContainer.prototype.getChildIndex = function(child)
{
	for (var i=0, il=this.children.length; i<il; i++)
	{
    	if(this.children[i] == child)
    	{
    		return i;
    	}
	}
	
	return false;
};

/**
 * Remove a child from the container
 * @public
 * @param {aj.DisplayObject} child The child to remove
 * @returns {aj.DisplayObject} The child passed in param
 */
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

/**
 * Set the index of a child
 * @public
 * @param {aj.DisplayObject} child The child to swap
 * @param {number} index The new index of the child
 * @returns {aj.DisplayObject} The child passed in param
 */
aj.DisplayObjectContainer.prototype.setChildIndex = function(child, index)
{
	if(this.contains(child))
	{
		return this.addChildAt(child, index);
	}
	
	return false;
};

/**
 * Swap two children
 * @public
 * @param {aj.DisplayObject} child1 The first child
 * @param {aj.DisplayObject} child2 The second child
 * @returns {boolean} true if the swap is correctly done, else false
 */
aj.DisplayObjectContainer.prototype.swapChildren = function(child1, child2)
{
	if(this.contains(child1) && this.contains(child2))
	{
		var index1 = this.getChildIndex(child1);
		var index2 = this.getChildIndex(child2);
		
		this.children[index1] = child2;
		
		this.children[index2] = child1;
		
		return true;
	}
	
	return false;
};

/**
 * Swap children by index
 * @public
 * @param {number} index1 The index of the first child
 * @param {number} index2 The index of the second child
 * @returns {boolean} true if the swap is correctly done, else false
 */
aj.DisplayObjectContainer.prototype.swapChildrenAt = function(index1, index2)
{
	if(index1 < this.numChildren && index1 >= 0 && index2 < this.numChildren && index2 >= 0)
	{
		var child1 = this.children[index1];
		var child2 = this.children[index2];
		
		this.children[index1] = child2;
		
		this.children[index2] = child1;
		
		return true;
	}
	
	return false;
};

/**
 * The draw method extend
 * @returns {void}
 */
aj.DisplayObjectContainer.prototype.draw = function()
{
	this.preDraw();
	
	for (var i=0, il=this.children.length; i<il; i++)
	{
    	this.children[i].draw();
    }
    
    this.drawBase();
    
    this.postDraw();
};


/**
 * Stage
 * @extends aj.DisplayObjectContainer
 * @class Represents the stage class.
 * @param {string} stageId The DOM id of the canvas
 * @param {number} fps The FPS of the stage
 */
aj.Stage = function(stageId, fps)
{
	this.sup = aj.DisplayObjectContainer;
	this.sup();
	
	/**
	 * The jQuery element
	 * @private
	 * @type object
	 */
	this.jqEl = null;
	
	var canvas = '<canvas id="' + stageId + '" height="500" width="500"></canvas>';
	
	this.jqEl = jQuery(canvas);
	
	/**
	 * The 2D context of the canvas
	 * @private
	 * @type object
	 */
	this.context2D = null;
	
	/**
	 * The enter frame interval
	 * @private
	 * @type number
	 */
	this.enterFrameInterval = null;
	
	/**
	 * The frame per second
	 * @private
	 * @default 50
	 * @type number
	 */
	this._fps = 50;
	
	if(this._fps != null){ this.fps = fps; };
	
	/**
	 * Getter fps
	 * @returns {number}
	 */
	this.__defineGetter__("fps", function(){
		return this._fps;
	});

	/**
	 * Setter fps
	 */
	this.__defineSetter__("fps", function(val){
		this._fps = val;
		
		if(this._fps < 1){ this._fps = 1; }
		
		//this.initEnterFrame();
	});
	
	/**
	 * The true FPS value
	 * @private
	 * @type integer
	 */
	this.trueFps = 0;
	
	/**
	 * Show FPS on stage or not
	 * @public
	 * @default false
	 * @type boolean
	 */
	this.showFps = false;
	
	/**
	 * The last display FPS time
	 * @private
	 * @type integer
	 */
	this.lastDisplayFpsTime = 0;

	
	var date = new Date();
	
	/**
	 * The last ENTER_FRAME call time
	 * @private
	 * @type integer
	 */
	this.lastTime = date.getTime();
	
	/**
	 * The library
	 * @public
	 * @type aj.Library
	 */
	this.library = new aj.Library();
	
	/**
	 * The key manager
	 * @public
	 * @type aj.Key
	 */
	this.key = new aj.Key(this);
	
	this.name = stageId;
	this.stage = this;
	this.parent = 'basepage';
	
	this.jqEl[0].addEventListener("click", jQuery.proxy(this.clickListener, this), false);
	
	this.jqEl.css("outline", "none");
	this.jqEl.css("left", "100px");
	this.jqEl.css("top", "100px");
	//this.jqEl.css("border", "1px solid #000");
	this.jqEl.css("font-size", "1px");
	this.jqEl.css("border", "1px solid #000");
	this.jqEl.attr("contentEditable", "true");
};

aj.Stage.prototype = new aj.DisplayObjectContainer;

/**
 * The click listener
 * @private
 * @event
 * @param {event} event The event
 * @returns {void}
 */
aj.Stage.prototype.clickListener = function(event)
{
	var mouseEvent = new aj.MouseEvent(aj.MouseEvent.CLICK);
	
	var point = new aj.Point(event.clientX - this.jqEl.get(0).offsetLeft, event.clientY - this.jqEl.get(0).offsetTop);
	
	this.mouseTest(point, mouseEvent);
};

/**
 * Initialize enter frame
 * @private
 * @returns {void}
 */
aj.Stage.prototype.initEnterFrame = function()
{
	clearInterval(this.enterFrameInterval);
	
	this.enterFrameInterval = setInterval(jQuery.proxy(this, "enterFrame"), (1000/this._fps));
	this.context2D = this.stage.jqEl.get(0).getContext('2d');
};

/**
 * Stage forward
 * @private
 * @param {aj.DisplayObject} child The child
 * @return {void}
 */
aj.Stage.prototype.setChildStage = function(child)
{
	child.setAllChildStage();
};

/**
 * The main enterFrame function
 * @private
 * @event
 * @returns {void}
 */
aj.Stage.prototype.enterFrame = function()
{
	var event = new aj.Event(aj.Event.ENTER_FRAME);
	this.dispatchEvent(event);

	this.context2D.save();
	this.context2D.clearRect(0,0, 500, 500);
	
	this.draw();
	
	this.context2D.restore();
	
	if(this.showFps)
	{
		var date = new Date();
		var curTime = date.getTime();
		
		if(curTime - this.lastDisplayFpsTime > 400)
		{
			this.trueFps = Math.round(1000 / (curTime - this.lastTime));
			this.lastDisplayFpsTime = curTime;
		}
		
		this.lastTime = curTime;
		
		this.displayFps();
	}
};

/**
 * All points hit the stage
 */
aj.Stage.prototype.hitTestPoint = function(point)
{
	return true;
};

/**
 * Load the library and after, start the stage
 * @public
 * @returns {void}
 */
aj.Stage.prototype.load = function()
{
	$('body').append(this.jqEl);
	
	this.library.addEventListener(aj.Event.COMPLETE, jQuery.proxy(this.start, this));
	this.library.load();
};

/**
 * Start the animation
 * @public
 * @returns {void}
 */
aj.Stage.prototype.start = function()
{
	this.library.removeEventListener(aj.Event.COMPLETE, this.start);
	this.initEnterFrame();
};

/**
 * Display FPS on the stage
 * @private
 * @returns {void}
 */
aj.Stage.prototype.displayFps = function()
{
	this.context2D.fillStyle = '#000';
	this.context2D.font = 'normal 12px sans-serif';
	this.context2D.textBaseline = 'top';
	this.context2D.fillText("Fps: " + this.trueFps + " / " + this.fps, 0, 0);
};


/**
 * Key
 * @class Represents the key, manage keyboard events.
 */
aj.Key = function(stage)
{
	this.keysDown = [];
	this.stage = stage;
	
	this.stage.jqEl[0].onkeydown = jQuery.proxy(this.keyDownListener, this);
	this.stage.jqEl[0].onkeyup = jQuery.proxy(this.keyUpListener, this);
};

/**
 * The left key code
 * @static
 * @type integer
 */
aj.Key.LEFT = 37;

/**
 * The up key code
 * @static
 * @type integer
 */
aj.Key.UP = 38;

/**
 * The right key code
 * @static
 * @type integer
 */
aj.Key.RIGHT = 39;

/**
 * The down key code
 * @static
 * @type integer
 */
aj.Key.DOWN = 40;

/**
 * The listener of the event onkeydown
 * @private
 * @event
 * @param {event} event The event
 * @returns {boolean} false to stop propagation
 */
aj.Key.prototype.keyDownListener = function(event)
{
	event.preventDefault();
	
	if(this.isUp(event.keyCode))
	{
		this.keysDown.push(event.keyCode);
		
		var keyEvent = new aj.KeyEvent(aj.KeyEvent.KEY_DOWN);
		keyEvent.keyCode = event.keyCode;
		this.stage.dispatchEvent(keyEvent);
	}
	
	return false;
};

/**
 * The listener of the event onkeyup
 * @private
 * @event
 * @param {event} event The event
 * @returns {boolean} false to stop propagation
 */
aj.Key.prototype.keyUpListener = function(event)
{	
	for(var i=0, il=this.keysDown.length; i<il; i++)
	{
		if(this.keysDown[i] == event.keyCode)
		{
			this.keysDown.splice(i, 1);
			
			var keyEvent = new aj.KeyEvent(aj.KeyEvent.KEY_UP);
			keyEvent.keyCode = event.keyCode;
			this.stage.dispatchEvent(keyEvent);
		}
	}
	
	return false;
};

/**
 * Check if a key is down
 * @public
 * @param {integer} keyCode Key code to test
 * @returns {boolean} true if the key is down, else false
 */
aj.Key.prototype.isDown = function(keyCode)
{
	for(var i=0, il=this.keysDown.length; i<il; i++)
	{
		if(this.keysDown[i] == keyCode)
		{
			return true;
		}
	}
	
	return false;
};

/**
 * Check if a key is up
 * @public
 * @param {integer} keyCode Key code to test
 * @returns {boolean} true if the key is up, else false
 */
aj.Key.prototype.isUp = function(keyCode)
{
	var exist = false;
	
	for(var i=0, il=this.keysDown.length; i<il; i++)
	{
		if(this.keysDown[i] == keyCode)
		{
			exist = true;
		}
	}
	
	return !exist;
};


/**
 * Library
 * @extends aj.EventDispatcher
 * @class Represents a library to load image.
 */
aj.Library = function()
{
	this.sup = aj.EventDispatcher;
	this.sup();
	
	/**
	 * The library array
	 * @private
	 * @type Array
	 */
	this.library = [];
	
	/**
	 * The loading array
	 * @private
	 * @type Array
	 */
	this.loadingList = [];
	
	/**
	 * Total of objects to load
	 * @private
	 * @type integer
	 */
	this.totalToLoad = 0;
	
	/**
	 * Total of objects loaded
	 * @private
	 * @type integer
	 */
	this.totalLoaded = 0;
};

aj.Library.prototype = new aj.EventDispatcher();

/**
 * Add an image in the library
 * @public
 * @param {string} id Id of the image
 * @param {string} url Url of the object
 * @returns {Image} The image object created
 */
aj.Library.prototype.addImage = function(id, url)
{
	var image = new Image();
	image.src = url;
	
	this.library[id] = {};
	this.library[id].obj = image;
	
	this.loadingList.push(this.library[id]);
	
	return this.library[id].obj;
};

/**
 * Load the library
 * @public
 * @returns {void}
 */
aj.Library.prototype.load = function()
{
	this.totalToLoad = this.loadingList.length;
	this.totalLoaded = 0;
	
	for(var i=0, il=this.loadingList.length; i<il; i++)
	{
    	this.loadObject(this.loadingList[i]);
    }
};

/**
 * Load an object in the library
 * @private
 * @param {object} objToLoad Object to load
 * @returns {void}
 */
aj.Library.prototype.loadObject = function(objToLoad)
{
	objToLoad.obj.addEventListener("load", jQuery.proxy(this.increaseLoad, this), false);
};

/**
 * Increase the loading
 * @private
 * @returns {void}
 */
aj.Library.prototype.increaseLoad = function()
{
	this.totalLoaded ++;
	
	var progressEvent = new aj.ProgressEvent(aj.ProgressEvent.PROGRESS);
	progressEvent.total = this.totalToLoad;
	progressEvent.loaded = this.totalLoaded;
	this.dispatchEvent(progressEvent);
	
	if(this.totalLoaded == this.totalToLoad)
	{
		this.completeLoading();
	}
};

/**
 * Finish the loading
 * @private
 * @returns {void}
 */
aj.Library.prototype.completeLoading = function()
{
	var completeEvent = new aj.Event(aj.Event.COMPLETE);
	this.dispatchEvent(completeEvent);
	
	this.loadingList = [];
};

/**
 * Get an object in the library
 * @public
 * @param {string} id Id of the object
 * @returns {object} The object
 */
aj.Library.prototype.get = function(id)
{
	if(this.library[id])
	{
		return this.library[id].obj;
	}
	
	return null;
};


/**
 * Image
 * @extends aj.DisplayObject
 * @class Represents an image object
 * @param {Image} image The image dom object
 */
aj.Image = function(image)
{
	this.sup = aj.DisplayObject;
	this.sup();
	
	/**
	 * The image object
	 * @type Image
	 */
	this.image = image;
};

aj.Image.prototype = new aj.DisplayObject;

/**
 * The drawBase method extend
 */
aj.Image.prototype.drawBase = function()
{
	var globalPoint = this.localToGlobal(this.getCoordPoint());
	
	if(this.image != null)
	{
		this.stage.context2D.drawImage(this.image, globalPoint.x, globalPoint.y);
	}
};


/**
 * Sprite
 * @class Represents an common object with graphics support.
 * @extends aj.DisplayObjectContainer
 */
aj.Sprite = function()
{
	this.sup = aj.DisplayObjectContainer;
	this.sup();
	
	this.graphics = null;
};

aj.Sprite.prototype = new aj.DisplayObjectContainer;