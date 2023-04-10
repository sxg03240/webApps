<?php
 function get_item_html($item) {
    $output = "<li><a href='details.php?id=" . $item["id"] . "'>";
    $output .= "<img src='" . $item["img"] . "' alt='" . $item["title"] . "'>";
    $output .= "</a></li>";
    return $output;
  }
  
?>