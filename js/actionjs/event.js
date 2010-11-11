/**
 * Action JS library
 * Event
 * Package managing events
 * Classes :
 * - aj.Event
 * - aj.MouseEvent
 * - aj.KeyboardEvent
 * - aj.ProgressEvent
 * - aj.EventDispater
 * @required core.js
 * @author Greg Bergé
 */

/**
 * Event base class
 * @class Represents an event.
 */
aj.Event = Class.extend(
{
    
    /**
     * Constructor
     * @scope aj.Event
     * @constructor
     * @param {string} type Event type
     * @returns {void}
     */
    init : function(type)
    {
        /**
         * Event type
         * @private
         * @type string
         */
         this.type = type;
         
         /**
          * Event target
          * @private
          * @type aj.EventDispatcher
          */
         this.target = null;
    }
});

/**
 * Enter frame event type
 * @public
 * @static
 * @type string
 */
aj.Event.ENTER_FRAME = "enterFrame";

/**
 * Complete event type
 * @public
 * @static
 * @type string
 */
aj.Event.COMPLETE = "complete";

/**
 * Added to the stage
 * @public
 * @static
 * @type string
 */
aj.Event.ADDED_TO_STAGE = "addedToStage";


/**
 * Event mouse class
 * @class Represents an event.
 * @extends aj.Even
 */
aj.MouseEvent = aj.Event.extend(
{
    /**
     * Constructor
     * @constructor
     * @param {string} type Event type
     * @returns {void}
     */
    init : function(type)
    {
        this._super(type);
    }
});

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
 */
aj.KeyboardEvent = aj.Event.extend(
{
    /**
     * Constructor
     * @constructor
     * @param {string} type Event type
     * @returns {void}
     */
    init : function(type)
    {
        this._super(type);
        
        /**
         * The key code
         * @public
         * @type integer
         */
        this.keyCode = 0;
    }
});

/**
 * Key down event type
 * @public
 * @static
 * @type string
 */
aj.KeyboardEvent.KEY_DOWN = "keyDown";

/**
 * Key up event type
 * @public
 * @static
 * @type string
 */
aj.KeyboardEvent.KEY_UP = "keyUp";


/**
 * Event progress class
 * @class Represents an event.
 * @extends aj.Event 
 * @param {string} type Event type
 */
aj.ProgressEvent = aj.Event.extend(
{
    /**
     * Constructor
     * @constructor
     * @param {string} type Event type
     * @returns {void}
     */
    init : function(type)
    {
        this._super(type);
        
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
    }
});

/**
 * Progress event type
 * @public
 * @static
 * @type string
 */
aj.ProgressEvent.PROGRESS = "progress";


/**
 * Event dispatcher and listener
 * @class Dispatch and listen event
 */
aj.EventDispatcher = Class.extend(
{
    
    /**
     * Constructor
     * @scope aj.EventDispatcher
     * @constructor
     * @returns {void}
     */
    init : function()
    {
        /**
         * The event listener list
         * @private
         * @type array
         */
        this.eventListenerList = [];
    },
    
    /**
     * Ajoute un écouteur d'un évènement spécifique sur un objet
     * Add a specific listener on a specific object
     * @public
     * @param {string} type Event type
     * @param {function} listener The function to call
	 * @param {object} proxy The proxy
     * @returns {boolean} true if added, else false
     */
    addEventListener : function(type, listener, proxy)
    {
        if(typeof type != "undefined" && typeof listener == "function")
        {
            var eventListener = [type, listener, proxy];
            this.eventListenerList.push(eventListener);
            return true;
        }
        
        return false;
    },
    
    /**
     * Dispatch a specific event for the object
     * @public
     * @param {aj.Event} event The dispatch event
     * @returns {boolean} true if dispatched, else false
     */
    dispatchEvent : function(event)
    {
        if(typeof event != "undefined")
        {
            for (var i=0, il=this.eventListenerList.length; i<il; i++)
            {
                var eventListener = this.eventListenerList[i];
                
                if(typeof eventListener != "undefined" && eventListener[0] && eventListener[0] == event.type)
                {
                    event.target = this;
					var fn = eventListener[1];

					if(eventListener[2] != null)
					{
						fn = $.proxy(eventListener[1], eventListener[2]);
					}
					
                    fn.call(this, event);
                }
            }
            
            return true;
        }
        
        return false;
    },
    
    /**
     * Test if an object listen a event type
     * @public
     * @param {string} type Event type
     * @returns {boolean} true if the object listens, else false
     */
    hasEventListener : function(type)
    {
        for (var i=0, il=this.eventListenerList.length; i<il; i++)
        {
             var eventListener = this.eventListenerList[i];
            
             if(eventListener[0] && eventListener[0] == type)
             {
                 return true;
             }
        }
        
        return false;
    },
    
    /**
     * Remove a event listener
     * @param {string} type Event type
     * @param {function} listener The event listener
	 * @param {object} proxy The proxy
     * @return {boolean} true if the listener was removed, else false
     */
    removeEventListener : function(type, listener, proxy)
    {
        var removed = false;

        for (var i=0, il=this.eventListenerList.length; i<il; i++)
        {
             var eventListener = this.eventListenerList[i];
            
             if(typeof eventListener != "undefined" && eventListener[0] && eventListener[0] == type && eventListener[1] && eventListener[1] == listener && (typeof eventListener[2] == "undefined" || typeof proxy == "undefined" || eventListener[2] == proxy))
             {
                 this.eventListenerList.splice(i, 1);
                 removed = true;
             }
        }
        
        return removed;
    },
    
    /**
     * Same as hasEventListener
     * @see hasEventListener
     * @public
     * @param {string} type Event type
     * @returns {boolean} true if the object listens, else false
     */
    willTriger : function(type)
    {
        return this.hasEventListener(type);
    }
});