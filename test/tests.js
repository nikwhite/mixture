function module(){
	var id = 1;
	this.getId = function(){
		return id;
	}
}

function moduleA(injectedState) {
	// private members
	var a = 'a';
	var state = injectedState;
	
	// public members
	this.getA = function getA() {
		return a;
	}
	this.lastIn = function lastIn(){
		return 'moduleA';
	}
}

function moduleB(injectedState) {
	// private members
	var a = 'b';
	var state = injectedState;
	
	// public members
	this.getB = function getB() {
		return a;
	}
	this.getState = function getState() {
		return state;
	}
	this.lastIn = function lastIn(){
		return 'moduleB';
	}
}
var state = {state1: 'foo', state2: 'bar'};
var moduleC = mix( moduleA, moduleB )
			 .using( state )
		     .into( { } ); // or some other module or object

var moduleD = mix( moduleC, module ).using( state ).into( {} );

test( 'is function', function(){
	strictEqual( typeof mix, 'function', 'mix is a function');
});

test( 'mixed module is an object', function(){
	strictEqual( typeof moduleC, 'object', 'mixed module is an object' );
});

test( 'properties and methods added to prototype', function(){
	var A = new moduleA();
	ok( !moduleC.hasOwnProperty(A.getA), 'methods not on object instance' );
	strictEqual( Object.getPrototypeOf(moduleC).getA(), A.getA(), 'methods added to prototype');
});

test( 'private members', function(){
	strictEqual( moduleC.getA(), 'a', 'moduleA private members retained' );
	strictEqual( moduleC.getB(), 'b', 'moduleB private members retained' );
});

test( 'last-in priority', function(){
	strictEqual( moduleC.lastIn(), 'moduleB', 'conflicting property/method is last-in');
});

test( 'state injection', function(){
	strictEqual( moduleC.getState(), state, 'state injected successfully');
});

test( 'mix premixed object with constructor', function(){
	strictEqual( moduleD.getA(), 'a', 'moduleA private members retained' );
	strictEqual( moduleD.getB(), 'b', 'moduleB private members retained' );
	strictEqual( moduleD.getId(), 1, 'added module private members retained');
});

test( 'mix module into object', function(){
	var mod = mix(moduleA).using().into({id:'id'});
	strictEqual( mod.getA(), 'a', 'moduleA private members retained' );
	strictEqual( mod.id, 'id', 'object properties retained');
});

test( 'mix object into module', function(){
	var mod = mix({id:'id'}).using().into(moduleA);
	strictEqual( mod.getA(), 'a', 'moduleA private members retained' );
	strictEqual( mod.id, 'id', 'object properties retained');
});


