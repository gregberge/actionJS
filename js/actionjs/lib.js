/**
 * Action JS library
 * Library
 * Package managing library
 * Classes :
 * - aj.Library
 * @required core.js
 * @author Greg Bergé
 */

/**
 * Library
 * @extends aj.EventDispatcher
 * @class Represents a library to load image.
 */
aj.Library = aj.EventDispatcher.extend(
{
    /**
     * Constructor
     * @returns {void}
     */
    init : function()
    {
        this._super();
        
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
    },
    
    /**
     * Add an image in the library
     * @public
     * @param {string} id Id of the image
     * @param {string} url Url of the object
     * @returns {Image} The image object created
     */
    addImage : function(id, url)
    {
        var image = new Image();
        image.src = url;
        
        this.library[id] = {};
        this.library[id].obj = image;
        
        this.loadingList.push(this.library[id]);
        
        return this.library[id].obj;
    },
    
    /**
     * Load the library
     * @public
     * @returns {void}
     */
    load : function()
    {
        this.totalToLoad = this.loadingList.length;
        this.totalLoaded = 0;
        
        for(var i=0, il=this.loadingList.length; i<il; i++)
        {
            this.loadObject(this.loadingList[i]);
        }
    },
    
    /**
     * Load an object in the library
     * @private
     * @param {object} objToLoad Object to load
     * @returns {void}
     */
    loadObject : function(objToLoad)
    {
        objToLoad.obj.addEventListener("load", jQuery.proxy(this.increaseLoad, this), false);
    },
    
    /**
     * Increase the loading
     * @private
     * @returns {void}
     */
    increaseLoad : function()
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
    },
    
    /**
     * Finish the loading
     * @private
     * @returns {void}
     */
    completeLoading : function()
    {
        var completeEvent = new aj.Event(aj.Event.COMPLETE);
        this.dispatchEvent(completeEvent);
        
        this.loadingList = [];
    },
    
    /**
     * Get an object in the library
     * @public
     * @param {string} id Id of the object
     * @returns {object} The object
     */
    get : function(id)
    {
        if(this.library[id])
        {
            return this.library[id].obj;
        }
        
        return null;
    }
});