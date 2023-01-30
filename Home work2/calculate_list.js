"use strict";

var $ = (id) => document.getElementById(id)

var calculateList = function(){
    var subTotal = parseFloat($("subTotal").value)
    var taxRate = parseFloat($("taxRate").value)
    
    $("salesTax").value = "";
    $("total").value = "";

    if ( isNaN(subTotal) || subTotal < 0 ) {
        alert("Subtotal is required and it should be more than zero");
    } else if ( isNaN(taxRate) || taxRate < 0 ) {
        alert("Tax Rate is required");
    } else {
        var salesTax = subTotal * (taxRate / 100);
        salesTax = parseFloat( salesTax.toFixed(2) );
        var total = subTotal + salesTax;
        $("salesTax").value = salesTax;
        $("total").value = total.toFixed(2);
    }

}
onload = function(){
    $("calculate_list").onclick = calculateList
    $("subTotal").focus();
    }
