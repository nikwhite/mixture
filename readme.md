# Mixture 
## An object composition library

Mixture provides an easy, lightweight, declarative way to compose modules and mixins in your 
code to reduce boilerplate and improve readability. This method of prototypal object
composition is not intended for classical usage, which enforcess a tree-like inheritance model, but rather a web-like model common to multiple inheritance models. Classical 
inheritance is both inappropriate and constraining in a dynamic, prototypal language such
as JavaScript.

Mixins prefer last-in priority with regard to conflicting methods and properties. Usage of duck
typing is the preferred way (by me, at least) to get around the diamond problem.

By composing your mixable modules in small, specific parts, you can completely get around
the familiar gorilla/banana problem imposed by classical inheritance.

I created this mostly for myself to make mixins more easily read. If there are other use cases 
you think should be in this utility, let me know.

## Installation

Currently available via npm as the `object-mix` package:

```bash
$ npm install object-mix --save
```

## Usage

Composable types:

* Constructors: defined as using the [Constructor Pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#constructorpatternjavascript)
* Objects (of any kind)

### Composing modules

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
		     .into( { } ); // or some other module or object
		     

console.log( moduleC.getA() ); // 'a'
console.log( moduleC.getB() ); // 'b'
console.log( moduleC.getState() ); // 'bar' - last-in
```

### Composing modules into a constructor

```javascript
function ModuleA(injectedState) {
	// private members
	var a = injectedState.a;
	
	// public members
	this.getA = function getA() {
		return a;
	}
}

function ModuleB(injectedState) {
	
	mix( moduleA )
		.using( injectedState )
		.into( this )
	
	// private members
	var a = injectedState.b;
	
	// public members
	this.getB = function getA() {
		return a;
	}
}

var instanceB = new ModuleB( {a: 'a', b: 'b'} );
		     

console.log( instanceB.getA() ); // 'a'
console.log( instanceB.getB() ); // 'b'
```

