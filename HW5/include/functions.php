<?php


function get_item_html($id, $item){

    $output = "<li><a href = 'details.php?id="
               . $id
               . "'><img src='"
               .$item["img"]
               ." ' alt = '"
               .$item["title"]
               ."'>"
               ."</li>";


               return $output;
}
?>