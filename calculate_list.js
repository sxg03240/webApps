"use strict";
//$ is a name
//var $ = function(id){return document.getElementById(id);}

var $ = (id) => document.getElementById(id)

var calculateList = function(){
    var subTotal = $("subTotal").value
    var taxRate = $("taxRate").value
    var salesTax = $("salesTax")
    var total = $("total")
    var errorMessage = ""

     salesTax.value = (subTotal*taxRate)/100
     total.value = parseFloat(subTotal) + parseFloat(salesTax.value)

    salesTax.value = Math.round(salesTax.value)
    total.value = Math.round(total.value)


    console.log("salesTax",salesTax.value)
    console.log("total",total.value)



    if (subTotal == ""){
        errorMessage = "Subtotal is required"
    }
    else if (taxRate == ""){
        errorMessage = "Tax Rate is required"
    }
    
    if (errorMessage == ""){
        $("tax_calculator").onsubmit()
    }
     else
     alert(errorMessage)

}
onload = function(){
    $("calculate_list").onclick = calculateList
    }
