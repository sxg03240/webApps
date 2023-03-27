<?php

include "include/data.php";

if(isset($_GET["id"])) {
    $id = $_GET["id"];
    if (isset($catalog[$id])){
        $item = $catalog[$id];

    }
   
}

?>
 <link rel="stylesheet" href="main.css">

 <div>
    <div class = "wrapper">
        <br>
        <div class = "media-picture">
            <span>
                <img src = "<?php echo $item["img"];?>"
                     alt = "<?php echo $item["title"];?>">
            </span>
        </div>

        <div class = "media-details">
            <h1><?php echo $item["title"]; ?></h1>

            <table>

            <tr>
                <th>Year</th>
                <td><?php echo $item["year"]; ?></td>
            </tr>

            <tr>
                <th>Authors</th>
                <td><?php echo implode("," , $item["authors"]); ?></td>
            </tr>

            <tr>
                <th>Publisher</th>
                <td><?php echo $item["publisher"]; ?></td>
            </tr>
            <tr>
                <th>ISBN</th>
                <td><?php echo $item["isbn"]; ?></td>
            </tr>
            </table>
        </div>
    </div>
 </div>