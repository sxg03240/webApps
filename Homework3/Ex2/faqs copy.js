"use strict";
    var $ = function(id) { return document.getElementById(id); };

    // the event handler for the click event of each h2 element

    window.onload = function() {
        // get the h2 tags
        var faqs = $("faqs");
        var h2Elements = faqs.getElementsByTagName("h2");
      
        function accordionClick(){
           var h2;
           for(var i=0; i < h2Elements.length; i++){
             h2 = h2Elements[i]; 
             if(h2 == this){ // The item we clicked
               if(!h2.hasAttribute("class")){ // If it's open
                 closeItem(h2);
               } else{ // If not 
                 openItem(h2); 
                 }
             } else{ // Not the item we clicked so it should be closed
               closeItem(h2);
             }
           }
        }
      
        function openItem(h2){
            var div = h2.nextElementSibling;
            h2.removeAttribute("class")
            div.setAttribute("class", "open");
        }
      
        function closeItem(h2){
            var div = h2.nextElementSibling;
            h2.setAttribute("class", "minus")
            div.removeAttribute("class");
        }
      
        // attach event handler for each h2 tag and init classes     
        for (var i = 0; i < h2Elements.length; i++ ) {
            h2Elements[i].onclick = accordionClick;
            closeItem(h2Elements[i]);
        }

        // set focus on first h2 tag's <a> tag
        h2Elements[0].firstChild.focus();       
    };