<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="main.css">


</head>
<body>
    

<?php

include "include/data.php";
include "include/functions.php";

$pageTitle = "Book Catalog";


?>



<h1><?php echo $pageTitle; ?></h1>

<!-- <form id="books" method="post">
   <select name="sort" id = "cars">
   <option value="Sort By...">Sort By...</option>
   <option value="Title">Title</option>
    <option value="Year">Year</option>
    <option value="Publisher">Publisher</option>
   
  </select>
<input type="submit" name="Submit" value="Submit">
</form> -->

<form id="books" method="post">
  <select name="sort" id="cars">
    <option value="Sort By...">Sort By...</option>
    <option value="Title">Title</option>
    <option value="Year">Year</option>
    <option value="Publisher">Publisher</option>
  </select>
  <!-- Add up and down arrows -->
  <input type="submit" name="Submit" value="Submit">
  <div class="arrow-up"></div>
  <div class="arrow-down"></div>
  
</form>








<ul class = "items">
<?php
    for ($id=0; $id<sizeof($catalog); $id++){
        echo get_item_html($id, $catalog[$id]);
    }
    ?>
</ul>

</body>
</html>