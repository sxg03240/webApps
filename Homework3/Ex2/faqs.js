"use script";

var $ = (id) => document.getElementById(id);

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


onload = function(){
    var faqs = $("faqs");

    var h2Elements = faqs.getElementsByTagName("h2");
  
    for (let i =0; i<h2Elements.length;i++){
        h2Elements[i].onclick = toggle;
        
    }

}