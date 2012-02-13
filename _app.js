
/** Source: lib/core.js **/ 
 (function() {
/**
   Create a namespace to contain Flow's functionality.
**/

if ('undefined' === typeof Flow) {
  Flow = {}
}

})();
/** Source: lib/runloop.js **/ 
 (function() {
Flow.runloop = {
  go: function() {
        
  }

};})();
/** Source: lib/bindings.js **/ 
 (function() {
var makeGuid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

var propagateChange = function(idOfFromObject, fromObject, fromPropertyName,
			       idOfToObject, toObject, toPropertyName) {
};

var namespaceID = '__flow__' + makeGuid();


Flow.bindings = {
  addPropertyDependencies: function(o, prop, deps) {
    var meta = Flow.ensureMetadata(o);

    if (!meta.toFrom) {
      meta.toFrom = {};
    }

    meta.toFrom[prop] = deps;
    
    if (!meta.fromTo) {
      meta.fromTo = {};
    }

    deps.forEach(function(d) {
      if (!meta.fromTo[d]) meta.fromTo[d] = [];
      meta.fromTo[d].push(prop);
    });

  },

  bind: function(fromObj, fromProp, toObj, toProp) {
    var idOfFromObj = Flow.ensureMetadata(fromObj)['id'];
    var idOfToObj = Flow.ensureMetadata(toObj)['id'];

    this.watch(fromObj, fromProp, function() {
      propagateChange(idOfFromObj, fromObj, fromProp, idOfToObj, toObj, toProp);
    });
  },

  ensureMetadata: function(o) {
    var oid = o[namespaceID] ? o[namespaceID].id : undefined;
    if (!oid) {
      oid = makeGuid();
      o[namespaceID] = { id: oid };
    }
    return o[namespaceID];
  },

  getDependancies: function(o, prop) {
    var meta = Flow.ensureMetadata(o);
    var allDependancies = meta.toFrom;
    var deps;
    if (allDependancies) {
      deps = allDependancies[prop];
    }
    return deps;
  },

  getDependants: function(o, prop) {
    var meta = Flow.ensureMetadata(o);
    var allDependants = meta.fromTo;
    var deps;
    if (allDependants) {
      deps = allDependants[prop];
    }
    return deps;
  },

  watch: function(o, propName, handler) {
    var prop = o[propName];
    var dependancies = Flow.getDependancies(o, propName);
    if (dependancies) {

    }
    
    Object.defineProperty(o, propName, {
      get: function() { return prop; },
      set: function(val) {
	prop = val;
	handler();	
      }
    });
  }
}})();