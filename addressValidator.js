$(document).ready(function(){

  bindValidationButton();

  var getFormElements = function(formID){
    var url = "";
    var form = $("#"+formID)

      form.on("submit", function(event) {
      event.preventDefault();
      var data = ( $( this ).serializeArray() );

      if(data[0].value===""){
        console.log("no Street given")
        $(".myMod2").click()
        return
      }
      if(data[2].value===""){
        console.log("No City Given")
        $(".myMod2").click()
        return
      }
      if(data[3].value===""){
        console.log("No State Given")
        $(".myMod2").click()
        return
      }

      var streetAddress = encodeURIComponent(data[0].value);
      var street2 = encodeURIComponent(data[1].value);
      var city = encodeURIComponent(data[2].value);
      var state = encodeURIComponent(data[3].value);
      var postCode = encodeURIComponent(data[4].value);
      url = "https://api.smartystreets.com/street-address?auth-id=4da43564-5c4c-b573-46ab-efbdf8877a2a&auth-token=jdnUWEK0RZ52bArZZciW&street="+streetAddress+"&street2="+street2+"&city="+city+"&state="+state+"&zipcode="+postCode+"&candidates=5"
      return url;
    });
    form.submit();
    return url;
  };

  var makeSeverRequest = function(myUrl){
    if(myUrl===""){
      console.log("You Shall NOT PASS")
      return
    }

    var modal = $(".mmodal");
    $(".mmodal").on("click", function(event) {
      event.preventDefault();

    $.ajax({
      url: myUrl,
      type: 'GET',
      dataType: 'json'
     })
    .done(function(response){
      console.log("success");
      console.log(response.length)
      if(response.length ===1){
        var html = $("#address_template").html();
        var templatingFunction = Handlebars.compile(html);
        var data = response[0];
        $(".modal-body").empty().append(templatingFunction({data}));
      }
      if(response.length === 0){
        console.log("no address found")
        var url = "notfound.html"
        $.ajax(url,{ dataType: "text" })
        .then(function(contents){
          $(".modal-body").empty().append(contents);
        });
      }
      if(response.length > 2){
        var html = $("#multiple_address_template").html();
        var templatingFunction = Handlebars.compile(html);
        $(".modal-body").empty().append(templatingFunction({apiData: response}));
        populateForm();
      }
    })
    .fail(function(){
      console.log("fail")
    });

    // var html = $("#address_template").html();
    // var templatingFunction = Handlebars.compile(html);
    // var data = data[0];
    // $(".modal-body").append(templatingFunction({data}));


    // var html = $("#multiple_address_template").html();
    // var templatingFunction = Handlebars.compile(html);
    // $(".modal-body").empty().append(templatingFunction({apiData: multipleCandidates}));
    // populateForm();

    });
    modal.click();
  };

  $.fn.superValidate = function(){
    var myid = $(this).attr("id")
    var myUrl = getFormElements(myid);
    makeSeverRequest(myUrl)
    return this;
  }

})

  var bindValidationButton = function(){
    $(".validateButton").on("click", validateForm);
  }

  var validateForm = function(e){
    e.preventDefault()
    $("#myForm").superValidate()
  }

  var populateForm = function(){
    $("[rel=useAddress]").on("click",function(evt){
      evt.preventDefault();
      evt.stopPropagation();
      evt.stopImmediatePropagation();
      $('#myModal').modal('hide');

      var addressChosen = $(evt.target);
      var streetFromChosen = $(addressChosen.next()[0]).text();
      var cityFromChosen = $(addressChosen.next().next()[0]).text();
      var stateFromChosen = $(addressChosen.next().next().next()[0]).text();
      var zipFromChosen = $(addressChosen.next().next().next().next()[0]).text();

      $(".streetAddress").val(streetFromChosen)
      $(".city").val(cityFromChosen)
      $(".state").val(stateFromChosen)
      $(".postCode").val(zipFromChosen)
    })
  }



