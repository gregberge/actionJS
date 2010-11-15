/**
 * Action JS library
 * Display
 * Package managing display
 * Classes :
 * - aj.DisplayObject
 * @required core.js
 * @author Greg Bergé
 */


/**
 * Display object
 * @class Represents an object that can be displayed.
 * @extends aj.EventDispatcher
 */
aj.DisplayObject = aj.EventDispatcher.extend(
{
    /**
     * Constructor
     * @param {object} [params] The parameters links to the object
     * @returns {void}
     */
    init : function(params)
    {
        this._super();
        
        /**
         * The parent of the display object
         * @private
         * @type aj.DisplayObjectContainer
         */
        this._parent = null;
        
        /**
         * Getter parent
         * @returns {aj.DisplayObjectContainer} _parent
         */
        this.__defineGetter__("parent", function(){
            return this._parent;
        });
        
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
            return this._width * this._scaleX;
        });
        
        /**
         * Setter width
         */
        this.__defineSetter__("width", function(val)
        {
            this._scaleX = val / this._width;
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
            return this._height * this._scaleY;
        });
        
        /**
         * Setter height
         */
        this.__defineSetter__("height", function(val)
        {
            this._scaleY = val / this._height;
        });
        
        /**
         * The scale x of the object
         * @private
         * @default 1
         * @type number
         */
        this._scaleX = 1;
        
        /**
         * Getter scaleX
         * @returns {number} _scaleX
         */
        this.__defineGetter__("scaleX", function(){
            return this._scaleX;
        });
        
        /**
         * Setter scaleX
         */
        this.__defineSetter__("scaleX", function(val)
        {
            this._scaleX = Number(val);
        });
        
        
        /**
         * The scale y of the object
         * @private
         * @default 1
         * @type number
         */
        this._scaleY = 1;
        
        /**
         * Getter scaleY
         * @returns {number} _scaleY
         */
        this.__defineGetter__("scaleY", function(){
            return this._scaleY;
        });
        
        /**
         * Setter scaleY
         */
        this.__defineSetter__("scaleY", function(val)
        {
            this._scaleY = Number(val);
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
    },
    
    /**
     * Get the point with object coords
     * @public
     * @returns {aj.Point} The coord point
     */
    getCoordPoint : function()
    {
        return new aj.Point(this.x, this.y);
    },
    
    /**
     * Get the scale for render
     * @private
     * @param {string} type The type {x,y}
     * @returns {number} The computed scale
     */
    getComputedScale : function(type)
    {
    	var parent = this;
    	var computedScale = 1;
    	
    	if(type == "x")
    	{
    		while(parent != this.stage || !parent)
            {
                computedScale *= parent.scaleX;
                parent = parent.parent;
            }
    	}
    	else if(type == "y")
    	{
    		while(parent != this.stage || !parent)
            {
                computedScale *= parent.scaleY;
                parent = parent.parent;
            }
    	}
    	else
    	{
    		return false;
    	}
    	
    	return computedScale;
    },
    
    /**
     * Convert a point from local coords to stage coords
     * @public
     * @param {aj.Point} [localPoint=DisplayObject#getCoordPoint] The local point
     * @returns {aj.Point|boolean} The coord point or false if no parent
     */
    localToGlobal : function(localPoint)
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
    },
    
    /**
     * Check if the object hit a stage point
     * @public
     * @param {aj.Point} point The point to hit
     * @returns {boolean} true if the object hit the point, else false
     */
    hitTestPoint : function(point)
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
    },

	/**
	 * Check if the objet hit an other
	 * @public
	 * @param {aj.DisplayObject} object The object to hit
	 * @returns {boolean} true if the object hit the point, else false
	 */
	hitTestObject : function(object)
	{
		if(object instanceof aj.DisplayObject)
		{
			var tw = this.width;
			var th = this.height;
			var ow = object.width;
			var oh = object.height;
			
			var tPoint = this.localToGlobal();
			var oPoint = object.localToGlobal();
		
			var tx = tPoint.x;
			var ty = tPoint.y;
			var ox = oPoint.x;
			var oy = oPoint.y;
		
			ow = ow + ox;
			oh = oh + oy;
			tw = tw + tx;
			th = th + ty;
		
			if ((ow < ox || ow > tx) &&
			(oh < oy || oh > ty) &&
			(tw < tx || tw > ox) &&
			(th < ty || th > oy)) {
			return true;
			}
			
			return false;
		}
		
		return false;
	},
    
    /**
     * The mouse test call at mouse action on the stage
     * @private
     * @param {aj.Point} point The current mouse point
     * @param {aj.MouseEvent} mouseEvent The mouse event
     * @returns {boolean} true if point match object, else false
     */
    mouseTest : function(point, mouseEvent)
    {   
        //If object under mouse point, we dispatch the corresponding event
        if(this.hitTestPoint(point))
        {
            var lastParent = this;
            var i = 0;
            
            while(lastParent != this.stage && i != 10)
            {
                lastParent.dispatchEvent(mouseEvent);
                
                lastParent = lastParent.parent;
                
                i++;
            }
            
            return true;
        }
        
        return false;
    },

	/**
	 * Dispatch the enter frame event
	 * @protected
	 * @param {aj.Event} enterFrameEvent The enter frame event
	 * @returns {void}
	 */
	dispatchEnterFrame : function(enterFrameEvent)
	{
		this.dispatchEvent(enterFrameEvent);
	},
    
    /**
     * Draw the object on the stage
     * @private
     * @returns {void}
     */
    draw : function()
    {
        this.preDraw();
        this.drawBase();
        this.postDraw();
    },
    
    /**
     * Executed before the drawing
     * @private
     * @returns {void}
     */
    preDraw : function()
    {
        var computeAlpha = 1;
        var lastParent = this;
        var i = 0;
        
        while(lastParent != this.stage && i != 10)
        {
            computeAlpha *= lastParent.alpha;
            
            lastParent = lastParent.parent;
            
            i++;
        }
        
        this.stage.context2D.globalAlpha = computeAlpha;
    },
    
    /**
     * The drawing method
     * @returns {void}
     */
    drawBase : function()
    {
    },
    
    /**
     * Executed after the drawing
     * @returns {void}
     */
    postDraw : function()
    {
        this.stage.context2D.globalAlpha = 1;
    },
    
    /**
     * Compute the globalDepth of the object
     * @returns {string}
     */
    getGlobalDepth : function()
    {
        if(this.stage)
        {
            var finalDepth = false;
            var lastParent = this;
            var globalDepth = "";
            var reverseGlobalDepth = "";
            var i = 0;
            
            while(!finalDepth)
            {
                if(lastParent.parent)
                {
                    globalDepth += lastParent.parent.getChildIndex(lastParent) + "";
                    lastParent = lastParent.parent;
                    
                    if(lastParent == this.stage || i == 10)
                    {
                        finalDepth = true;
                    }
                }
                else
                {
                    finalDepth = true;
                }
                i++;
            }
            
            i = globalDepth.length - 1;
            
            for (var x = i; x >= 0; x--)
            {
                reverseGlobalDepth += globalDepth.charAt(x);
            }
            
            return Number(reverseGlobalDepth);
        }
        
        return "";
    },
});

/**
 * Id of each displayObject
 * @static
 * @type number
 */
aj.DisplayObject.Id = 0;






/**
 * Display Object Container
 * @extends aj.DisplayObject
 * @class Represents a display object that can contains others.
 */
aj.DisplayObjectContainer = aj.DisplayObject.extend(
{
    /**
     * Constructor
     * @returns {void}
     */
    init : function()
    {
        this._super();
        
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




		/**
         * Getter width
         * @returns {number} _width
         */
        this.__defineGetter__("width", function(){
			var minX = 0, maxX = 0, tMinX = 0, tMaxX = 0;
			for(var i=0,il=this.numChildren;i<il;i++)
			{
				tMinX = this.children[i].x;
				tMaxX = this.children[i].x + this.children[i].width;
				
				minX = tMinX < minX ? tMinX : minX;
				maxX = tMaxX > maxX ? tMaxX : maxX;
			}
            return (maxX - minX) * this._scaleX;
        });
        
        /**
         * Setter width
         */
        this.__defineSetter__("width", function(val)
        {
            this._scaleX = val / this.width;
        });


        
        /**
         * Getter height
         * @returns {number} _height
         */
        this.__defineGetter__("height", function(){
            var minY = 0, maxY = 0, tMinY = 0, tMaxY = 0;
			for(var i=0,il=this.numChildren;i<il;i++)
			{
				tMinY = this.children[i].y;
				tMaxY = this.children[i].y + this.children[i].height;
				
				minY = tMinY < minY ? tMinY : minY;
				maxY = tMaxY > maxY ? tMaxY : maxY;
			}
            return (maxY - minY) * this._scaleY;
        });
        
        /**
         * Setter height
         */
        this.__defineSetter__("height", function(val)
        {
            this._scaleY = val / this.height;
        });
    },
    
    /**
     * Add a displayObject in the container
     * @public
     * @see aj.DisplayObjectContainer#addChildAt
     * @param {aj.DisplayObject} child
     * @returns {aj.DisplayObject|boolean} The display object or false if not a valid display object
     */
    addChild : function(child)
    {   
        return this.addChildAt(child, 0);
    },
    
    /**
     * Set the child for all children
     * @private
     * @returns {void}
     */
    forwardStage : function()
    {   
        for (var i=0, il=this.children.length; i<il; i++)
        {
            this.initStage(this.children[i]);
        }
    },
    
    /**
     * Init the stage
     * @private
     * @param {DisplayObject} child The child
     * @returns {void}
     */
    initStage : function(child)
    {
        child._stage = this.stage;
        
        //Add in the map
        this.stage.addToMap(child);

		//Dispatch the ADDED_TO_STAGE event
		child.dispatchEvent(new aj.Event(aj.Event.ADDED_TO_STAGE));
        
        //If children, we forward
        if(child instanceof aj.DisplayObjectContainer)
        {
            child.forwardStage();
        }
    },
    
    /**
     * Add a child at a specific place
     * @public
     * @param {aj.DisplayObject} child The child
     * @param {number} index The index 
     * @returns {aj.DisplayObject|boolean} The display object or false if not a valid display object
     */
    addChildAt : function(child, index)
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
                child._parent = this;
                
                //Set stage if there is one
                if(this.stage != null)
                {
                    this.initStage(child);
                }
            }
            
            return child;
        }
        
        return false;
    },
    
    /**
     * Test if a child is in the container
     * @public
     * @param {aj.DisplayObject} child The child to test
     * @returns {boolean} true if it contains the child, else false
     */
    contains : function(child)
    {
        for (var i=0, il=this.children.length; i<il; i++)
        {
            if(this.children[i] == child)
            {
                return true;
            }
        }
        
        return false;
    },
    
    /**
     * Get a child at a specific index
     * @public
     * @param {number} index The child index
     * @returns {aj.DisplayObject|boolean} The child or false if index out of bounds
     */
    getChildAt : function(index)
    {
        if(index < this.numChildren && index >= 0)
        {
            return this.children[index];
        }
        
        return false;
    },
    
    /**
     * Get a child by his name
     * @deprecated
     * @public
     * @param {string} name The name of the child
     * @returns {aj.DisplayObject|boolean} The child if find else false
     */
    getChildByName : function(name)
    {
        for (var i=0, il=this.children.length; i<il; i++)
        {
            if(this.children[i].name == name)
            {
                return this.children[i];
            }
        }
        
        return false;
    },
    
    /**
     * Get the index of a child
     * @public
     * @param {aj.DisplayObject} child The child to get the index
     * @return {number|boolean} The index or false if not find
     */
    getChildIndex : function(child)
    {
        for (var i=0, il=this.children.length; i<il; i++)
        {
            if(this.children[i] == child)
            {
                return i;
            }
        }
        
        return false;
    },
    
    /**
     * Remove a child from the container
     * @public
     * @param {aj.DisplayObject} child The child to remove
     * @returns {aj.DisplayObject} The child passed in param
     */
    removeChild : function(child)
    {
        for (var i=0, il=this.children.length; i<il; i++)
        {
            if(this.children[i] == child)
            {
                this.children.splice(i, 1);
                child._stage = null;
            }
        }
        
        return child;
    },
    
    /**
     * Set the index of a child
     * @public
     * @param {aj.DisplayObject} child The child to swap
     * @param {number} index The new index of the child
     * @returns {aj.DisplayObject} The child passed in param
     */
    setChildIndex : function(child, index)
    {
        if(this.contains(child))
        {
            return this.addChildAt(child, index);
        }
        
        return false;
    },
    
    /**
     * Swap two children
     * @public
     * @param {aj.DisplayObject} child1 The first child
     * @param {aj.DisplayObject} child2 The second child
     * @returns {boolean} true if the swap is correctly done, else false
     */
    swapChildren : function(child1, child2)
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
    },
    
    /**
     * Swap children by index
     * @public
     * @param {number} index1 The index of the first child
     * @param {number} index2 The index of the second child
     * @returns {boolean} true if the swap is correctly done, else false
     */
    swapChildrenAt : function(index1, index2)
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
    },

	/**
	 * Dispatch the enter frame event
	 * @protected
	 * @param {aj.Event} enterFrameEvent The enter frame event
	 * @returns {void}
	 */
	dispatchEnterFrame : function(enterFrameEvent)
	{
		this._super(enterFrameEvent);
		
		for (var i=this.children.length - 1; i>=0; i--)
        {
			if(this.children[i] instanceof aj.DisplayObject)
			{
				this.children[i].dispatchEnterFrame(enterFrameEvent);
			}
		}
	},
    
    /**
     * The draw method extend
     * @returns {void}
     */
    draw : function()
    {
        this.preDraw();
        
        for (var i=0, il=this.children.length; i<il; i++)
        {
            this.children[i].draw();
        }
        
        this.drawBase();
        
        this.postDraw();
    }

});

/**
 * Sprite
 * @extends aj.DisplayObjectContainer
 * @class Represent the base class container
 */
aj.Sprite = aj.DisplayObjectContainer.extend(
{
	/**
	 * Constructor
	 */
	init : function()
	{
		this._super();
	}
});


/**
 * Stage
 * @extends aj.DisplayObjectContainer
 * @class Represents the stage class.
 */
aj.Stage = aj.DisplayObjectContainer.extend(
{
    /**
     * Constructor
     * @param {string} stageId The DOM id of the canvas
     * @param {number} fps The FPS of the stage
     * @returns {void}
     */
    init : function(stageId, fps)
    {
        this._super();

		/**
         * The width of the object
         * @private
         * @type number
         */
        this._width = 500;
        
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
        this.__defineSetter__("width", function(val)
        {
        });
        
        
        /**
         * The height of the object
         * @private
         * @default 0
         * @type number
         */
        this._height = 500;
        
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
        this.__defineSetter__("height", function(val)
        {
        });
        
        /**
         * The jQuery element
         * @private
         * @type object
         */
        this.jqEl = null;
        
        var canvas = '<canvas id="' + stageId + '" width="' + this._width + '" height="' + this._height + '" tabIndex="1"></canvas>';
        
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
        
        /**
         * Children map
         * @private
         * @type array
         */
        this._childrenMap = [];
        
        /**
         * Getter childrenMap
         * @returns {array}
         */
        this.__defineGetter__("childrenMap", function(){
            return this._childrenMap;
        });
        
        
        
        this.name = stageId;
        this._parent = 'basepage';
        this._stage = this;
        
        this.jqEl[0].addEventListener("click", jQuery.proxy(this.clickListener, this), false);
        
        this.jqEl.css("outline", "none");
        this.jqEl.css("left", "100px");
        this.jqEl.css("top", "100px");
        this.jqEl.css("font-size", "1px");
		this.jqEl.css("tabindex", "1");
    },
    
    /**
     * Add to the map
     * @param {DisplayObject} child The child
     * @returns {void}
     */
    addToMap : function(child)
    {
        this._childrenMap[child.name] = child;
    },
    
    /**
     * Sort the map
     */
    sortMap : function()
    {
        for (i in this._childrenMap)
        {
            if(!(this._childrenMap[i] instanceof aj.DisplayObject))
            {
                this._childrenMap[i] = null;
            }
        }
        
        this._childrenMap = this._childrenMap.sort(sortByGlobalDepth)

        function sortByGlobalDepth(a, b){
            return a.getGlobalDepth() > b.getGlobalDepth();
        }
    },
    
    /**
     * The click listener
     * @private
     * @event
     * @param {event} event The event
     * @returns {void}
     */
    clickListener : function(event)
    {
        var mouseEvent = new aj.MouseEvent(aj.MouseEvent.CLICK);
        
        var point = new aj.Point(event.clientX - this.jqEl.get(0).offsetLeft, event.clientY - this.jqEl.get(0).offsetTop);

		this.dispatchEvent(mouseEvent);
        
        this.sortMap();
        
        for (i in this._childrenMap)
        {
            if(this._childrenMap[i].mouseTest(point, mouseEvent))
            {
                break;
            }
        }
    },
    
    /**
     * Initialize enter frame
     * @private
     * @returns {void}
     */
    initEnterFrame : function()
    {
        clearInterval(this.enterFrameInterval);
        
        this.enterFrameInterval = setInterval(jQuery.proxy(this, "enterFrame"), (1000/this._fps));
        this.context2D = this.jqEl.get(0).getContext('2d');
    },
    
    /**
     * The main enterFrame function
     * @private
     * @event
     * @returns {void}
     */
    enterFrame : function()
    {
        var event = new aj.Event(aj.Event.ENTER_FRAME);
		this.dispatchEnterFrame(event);
    
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
    },
    
    /**
     * All points hit the stage
     */
    hitTestPoint : function(point)
    {
        return true;
    },
    
    /**
     * Load the library and after, start the stage
     * @public
     * @returns {void}
     */
    load : function()
    {
		$($.proxy(function()
		{
			var previousDiv = $('#' + this.jqEl.attr('id')).eq(0);

			if($('#' + this.jqEl.attr('id')).length)
			{
				previousDiv.attr('id', 'temp-' + this.jqEl.attr('id'));
				this.jqEl.insertBefore(previousDiv);
				previousDiv.remove();
			}

			this.library.addEventListener(aj.Event.COMPLETE, jQuery.proxy(this.start, this));
			this.library.load();

		}, this));
    },
    
    /**
     * Start the animation
     * @public
     * @returns {void}
     */
    start : function()
    {
        this.library.removeEventListener(aj.Event.COMPLETE, this.start);
		this.dispatchEvent(new aj.Event(aj.Event.COMPLETE));
        this.initEnterFrame();
    },
    
    /**
     * Display FPS on the stage
     * @private
     * @returns {void}
     */
    displayFps : function()
    {
        this.context2D.fillStyle = '#000';
        this.context2D.font = 'normal 12px sans-serif';
        this.context2D.textBaseline = 'top';
        this.context2D.fillText("Fps: " + this.trueFps + " / " + this.fps, 0, 0);
    },

    /**
     * Stop all events
     */
	stop : function()
	{
		clearInterval(this.enterFrameInterval);
	}
});


/**
 * Image
 * @extends aj.DisplayObject
 * @class Represents an image object
 * 
 */
aj.Image = aj.DisplayObject.extend(
{    
    
    /**
     * Constructor
     * @contructor
     * @param {Image} image The image dom object
     * @returns {void}
     */
    init : function(image)
    {
        this._super();
        
        /**
         * The image object
         * @type Image
         */
        this.image = image;
        this._height = image.height;
        this._width = image.width;
    },
    
    /**
     * The drawBase method extend
     */
    drawBase : function()
    {
        var globalPoint = this.localToGlobal(this.getCoordPoint());
        
        if(this.image != null)
        {
        	var scaleX = this.getComputedScale("x");
        	var scaleY = this.getComputedScale("y");
            this.stage.context2D.drawImage(this.image, 0, 0, this.image.width, this.image.height, globalPoint.x, globalPoint.y, this.image.width * scaleX, this.image.height * scaleY);
        }
    }
});