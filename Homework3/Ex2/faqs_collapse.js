"use strict";
    var $ = function(id) { return document.getElementById(id); };
    var faqs = $("faqs");
    var h2Elements = faqs.getElementsByTagName("h2");
    var h2Length = h2Elements.length
    window.onload = function() {
        
    function displayFaq(h2){
            var div = h2.nextElementSibling;
            h2.removeAttribute("class")
            div.setAttribute("class", "open")
        }
      
    function collapseFaq(h2){
            var div = h2.nextElementSibling;
            h2.setAttribute("class", "minus")
            div.removeAttribute("class")
        }
      
    function displayOnClick(){
           for(var i=0; i < h2Length; i++){
            var h2 = h2Elements[i]; 
             if(h2 == this){  
               if(!h2.hasAttribute("class")){  
                collapseFaq(h2);
               } else{  
                displayFaq(h2); 
                 }
             } else{  
              collapseFaq(h2);
             }
           }
        }

    for (var i = 0; i < h2Length; i++ ) {
            h2Elements[i].onclick = displayOnClick
            collapseFaq(h2Elements[i])
        }     
    }