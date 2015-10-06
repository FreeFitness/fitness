var jason = $.getJSON( "example.json", function() {
console.log( "success" );
})
.done(function() {
console.log( "second success" );
})
.fail(function() {
console.log( "error" );
})
.always(function() {
console.log( "complete" );
});

