function Person() {
  var first;
  var last;
  Object.defineProperty(this, 'first', { configurable: true,
					 enumerable: true,
					 get: function() { return first; },
					 set: function(val) { first = val; } });

  Object.defineProperty(this, 'last', { configurable: true,
					enumerable: true,
					get: function() { return last; },
					set: function(val) { last = val; } });

  Object.defineProperty(this, 'fullName', { configurable: true,
					    enumerable: true,
					    get: function() {
					      return [this.first, this.last].join(' ');
					    }});

  Object.defineProperty(this, 'fullName',
			{ configurable: true,
			  enumerable: true,
			  get: function() {
			    return this.first + ' ' + this.last;
			  }
			});

  Flow.addPropertyDependencies(this, 'fullName', ['first', 'last']);
}




// describe('Flow', function() {
//   var person1, person2;
  
//   beforeEach(function() {
//     person1 = new Person();
//     person2 = new Person();
//   });

//   describe('addPropertyDependencies', function() {
//     it('tracks what a property influences', function() {
//       var deps = Flow.getDependants(person1, 'first');
//       expect(deps).toEqual(['fullName']);

//       deps = Flow.getDependants(person1, 'last');
//       expect(deps).toEqual(['fullName']);

//       deps = Flow.getDependants(person1, 'fullName');
//       expect(deps).toBeFalsy();
//     });

//     it('tracks what a property is influenced by', function() {
//       var deps = Flow.getDependancies(person1, 'fullName');
//       expect(deps).toEqual(['first', 'last']);
//     });
//   });

//   describe('ensureMetadata', function() {
//     it('adds a slot to bound objects which holds Flow metadata', function() {
//       var namespacePrefix = '__flow__';
//       var log = [];
//       var slotName;
//       var isNamespaceSlot = function(propName) {
// 	return propName.indexOf(namespacePrefix) === 0;;
//       };

//       Flow.ensureMetadata(person1);
//       console.log(person1);

//       for (slotName in person1) {
// 	if (isNamespaceSlot(slotName)) {
// 	  log.push(slotName.slice(0, namespacePrefix.length));
// 	}
//       }
      
//       expect(log).toEqual([namespacePrefix]);      
//     });
//   });


//   describe('watch', function() {
//     it('invokes a callback when a simple property changes', function() {
//       var log = [];
//       Flow.watch(person1, 'first', function() { log.push(person1.first);});
//       person1.first = 'joubert';
//       expect(log).toEqual(['joubert']);
//     });

//     it('invokes a callback when a computed property changes', function() {
//       var log = [];
//       Flow.watch(person1, 'fullName', function() { log.push(person1.fullName); });
//       person1.first = 'joubert';
//       person1.last = 'nel';
//       expect(log).toEqual(['joubert', 'joubert nel']);
//     });
//   });

//   describe('bind', function() {

//     it('watches for changes on a property', function() {
      
//     });
//   });

  
// });