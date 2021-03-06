angular.module('inputMask', [])
	.directive('inputMask', function ()
						 {
							 return {
								 link : function (scope, element, attrs)
								 {
									 var inputMask = attrs.inputMask;

									 var match9 = /[0-9]/;
									 var matchA = /[a-zA-Z]/;

									 element.on('keydown', function (event)
									 {
									 });

									 element.on('keyup', function (event)
									 {
										 if ([8, 46].indexOf(event.which) !== -1) {
											 return;
										 }

										 var currentPosition = this.selectionStart;
										 if (['a', '9'].indexOf(inputMask[currentPosition]) === -1 && inputMask[currentPosition] !== undefined) {
											 this.value = this.value + inputMask[currentPosition];
										 }
									 });

									 element.on('paste', function (event)
									 {
										 var clipboardData = event.clipboardData || window.clipboardData;
										 if (!clipboardData) return;

										 var value = "";
										 if (event.clipboardData) {
											 value = clipboardData.getData('text/plain').trim();
										 } else {
											 if (window.clipboardData) {
												 value = clipboardData.getData('Text').trim();
											 }
										 }
										 var inputMaskMatcher = "^" + inputMask.replace(/[^a9]/g, '\\$&').replace(/a/g, '[a-zA-Z]').replace(/9/g, '[0-9]') + "$";

										 var inputMaskRegexp = new RegExp(inputMaskMatcher);

										 if (!inputMaskRegexp.test(value)) {
											 event.preventDefault();
										 }

									 })
									 element.on('keypress', function (event)
									 {

										 var currentPosition = this.selectionStart;
										 var nextChar = String.fromCharCode(event.which);
										 if (['a', '9'].indexOf(inputMask[currentPosition]) === -1 && inputMask[currentPosition] !== undefined) {
											 this.value = this.value + inputMask[currentPosition];
											 currentPosition++;
										 }
										 if (inputMask[currentPosition] === 'a') {
											 if (!matchA.test(nextChar)) {
												 event.preventDefault();
											 }
										 } else {
											 if (inputMask[currentPosition] === '9') {
												 if (!match9.test(nextChar)) {
													 event.preventDefault();
												 }
											 }
										 }

										 if (inputMask[currentPosition] === undefined) {
											 event.preventDefault();
										 }

									 });
									 element.on('input', function (event)
									 {
										 event.preventDefault();
									 })
								 }
							 }
						 });