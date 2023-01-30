"use script";

var $ = (id) => document.getElementById(id);




onload = function(){
  var toggle = function(){
    console.log("called")


    var h2 = this;
    var div = h2.nextElementSibling;

    if (h2.hasAttribute("class")){
        h2.removeAttribute("class");
    }
    else {
        h2.setAttribute("class","minus");
    }

    if (div.hasAttribute("class")) {
        div.removeAttribute("class");
    }
    else {
        div.setAttribute("class","open");
    }

}
    var faqs = $("faqs");

    var h2Elements = faqs.getElementsByTagName("h2");

          
    function accordionClick(){
      var h2;
      for(var i=0; i < h2Elements.length; i++){
        h2 = h2Elements[i]; 
        if(h2 == this){ // The item we clicked
          if(!h2.hasAttribute("class")){ // If it's open
            toggle(h2);
          } else{ // If not 
            toggle(h2); 
            }
        } else{ // Not the item we clicked so it should be closed
          toggle(h2);
        }
      }
    }
    for (let i =0; i<h2Elements.length;i++){
        h2Elements[i].onclick = accordionClick;
        toggle(h2Elements[i]);
        
    }

}