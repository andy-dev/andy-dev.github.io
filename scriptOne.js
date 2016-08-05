(function(){
  console.log("hi from script");
  
  function our_callback(json_data) {
    console.log(json_data)
  }
  
  our_callback( {"foo": 42, "bar": 23 } )

})();
