var topics = ["Dolphin", "lobster", "Octopus", "fish", "whale", "Seal", "snake", "Penguin", "jellyfish", "Walrus"];

$(document).ready(function(){
   
   for(var i=0;i<topics.length;i++){
       $("#button-collection").append("<button type='button' style='margin: 10px 10px 10px 10px;' class='btns1' value="+topics[i]+">"+topics[i]+"</button>");
   }

   $("#add-new-fish-btn").click(function(){
       var fishName = document.getElementById("fish-names-input").value;
       $("#button-collection").append("<button type='button' class='btns1' value="+fishName+" onclick='getGifs(event)'>"+fishName+"</button>");
   });

   $(".btns1").click(function(){
       var queryName = this.value;

       getGifsFromAPI(queryName);
   });
});

function getGifs(element){
   var clickedValue = element.target.value;    
   getGifsFromAPI(clickedValue);  
}

function getGifsFromAPI(clickedValue){
   $.ajax({
       url:  "https://api.giphy.com/v1/gifs/search?api_key=n4JidTIT4jfoYeLEZE8b778xZoBDZYvl&q= "+clickedValue+"&limit=10&offset=0&rating=G&lang=en",
       success: function(result){
           $("#gif-result").empty();
           for (var i =0; i < result.data.length; i++){
               $("#gif-result").append("<div style='margin:10px 10px 10px 10px; width:150px; height:150px; background-color:white; border:solid 1px;'><img onclick='displayGif(event)' height=150 width=150 id='"+result.data[i].id+"' data-state='still' data-animate='"+result.data[i].images.fixed_height_small.url+"' data-still='"+result.data[i].images.fixed_height_small_still.url+"' src='"+result.data[i].images.fixed_height_small_still.url+"'></div>")//original.url downsized_still.url
           }
       },
       error:function(error){
           console.log(error);
           alert("error occured !")
       }
     }); 
}

function displayGif(element){
   var clickedValue = element.target.getAttribute("id");
   var dataState = element.target.getAttribute("data-state");
   var animateUrl = element.target.getAttribute("data-animate");
   var stillUrl = element.target.getAttribute("data-still");

   if(dataState == 'still'){
       $("#"+clickedValue).attr("data-state",'animate');
       $("#"+clickedValue).attr("src",animateUrl);
   }else{
       $("#"+clickedValue).attr("data-state",'still');
       $("#"+clickedValue).attr("src",stillUrl);
   }
}

