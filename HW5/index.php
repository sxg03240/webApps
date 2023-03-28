<?php
// Include data and functions files
include "include/data.php";
include "include/functions.php";

// Set page title
$pageTitle = "Book Catalog";

// Initialize sorting variables
$sortBy    = "none";
$sortOrder = "asc";

// Check if form has been submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get selected sorting option
  $sortBy = $_POST["sort"];

  // Determine sort order based on selected option
  switch ($sortBy) {
    case "title":
      $pageTitle = "Book Catalog - Sorted by Title";
      usort($catalog, function ($a, $b) use ($sortBy, $sortOrder) {
        $result = strcasecmp($a["title"], $b["title"]);
        return ($sortOrder == "asc") ? $result : -$result;
      });
      break;
    case "publisher":
      $pageTitle = "Book Catalog - Sorted by Publisher";
      usort($catalog, function ($a, $b) use ($sortBy, $sortOrder) {
        $result = strcasecmp($a["publisher"], $b["publisher"]);
        return ($sortOrder == "asc") ? $result : -$result;
      });
      break;
    case "year":
      $pageTitle = "Book Catalog - Sorted by Year";
      $sortOrder = "desc";
      usort($catalog, function ($a, $b) use ($sortBy, $sortOrder) {
        $result = strcasecmp($a["year"], $b["year"]);
        return ($sortOrder == "desc") ? $result : -$result;
      });
      break;
    default:
      $pageTitle = "Book Catalog";
      $sortBy = "none";
      $sortOrder = "asc";
      break;
  }

}else {
  // Default sorting values for GET requests
  $pageTitle = "Book Catalog";
  $sortBy = "none";
  $sortOrder = "asc";
}

// Sort catalog based on selected option
if ($sortBy != "none") {
  usort($catalog, function ($a, $b) use ($sortBy, $sortOrder) {
    $result = strcasecmp($a[$sortBy], $b[$sortBy]);
    return ($sortOrder == "asc") ? $result : -$result;
  });
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>
    <?php echo $pageTitle; ?>
  </title>
  <link rel="stylesheet" href="main.css">
</head>

<body>
  <h1>
    <?php echo $pageTitle; ?>
  </h1>
  <form id="books" method="post">
    <select name="sort" id="sort">
      <option value="Sort By..." <?php if ($sortBy == "none")
        echo " selected"; ?>>Sort By...</option>
      <option value="title" <?php if ($sortBy == "title")
        echo " selected"; ?>>Title</option>
      <option value="year" <?php if ($sortBy == "year")
        echo " selected"; ?>>Year</option>
      <option value="publisher" <?php if ($sortBy == "publisher")
        echo " selected"; ?>>Publisher</option>
    </select>
    <input type="submit" name="submit" value="Submit">
  </form>
  <ul class="items">
    <?php
    foreach ($catalog as $id => $book) {
      echo get_item_html($id, $book);
    }
    ?>
  </ul>
</body>

</html>