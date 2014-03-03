# Mixture - Object Composition Nano-framework

Mix provides an easy, lightweight, declarative way to compose modules and mixins in your 
code to reduce boilerplate and improve readability. This method of prototypal object
composition is intended to completely replace classical inheritance. Classical 
inheritance is both inappropriate and constraining in a dynamic, prototypal language such
as JavaScript. As such, this framework is extremely lightweight, as the language does much
of the heavy lifting for us.

Mixins prefer last-in priority with regard to conflicting methods and properties. Use duck
typing.

## Usage

```javascript
function moduleA(injectedState) {
	// private members
	var a = 'a';
	var state = injectedState;
	
	// public members
	this.getA = function getA() {
		return a;
	}
	this.getState = function getState() {
		return state.state1;
	}
}

function moduleB(injectedState) {
	// private members
	var a = 'b';
	var state = injectedState;
	
	// public members
	this.getB = function getA() {
		return a;
	}
	this.getState = function getState() {
		return state.state2;
	}
}

var moduleC = mix( moduleA, moduleB )
			 .using( {state1: 'foo', state2: 'bar'} )
		     .into( { } /* or some other module object */ );

console.log( moduleC.getA() ); // 'a'
console.log( moduleC.getB() ); // 'b'
console.log( moduleC.getState() ); // 'bar'
```