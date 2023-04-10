<?php
require 'includes/database.php';
require 'includes/dao.php';
require 'data.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css">
  <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.3.6/css/buttons.dataTables.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
  <link rel="stylesheet" href="main.css">
</head>
<body>
  <nav class="navbar bg-primary navbar-dark">
    <div class="container">
      <h1 class="navbar-brand">
        <i class="bi bi-people-fill fs-1"></i>
        Departments
      </h1>
    </div>
  </nav>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-9">
        <div class="list-group-flush text-start">
        <?php foreach ($depts as $dept_name => $dept_id) { ?>
            <a href="#" id="<?php echo $dept_name; ?>" class="list-group-item list-group-item-action fs-4 fw-bold" data-dept-id="<?php echo $dept_id; ?>"><?php echo $dept_name; ?></a>
          <?php } ?>
        </div>
      </div>
      <div class="col-md-3">
        <img class="w-100" src="images/welcome-cat.gif" alt="image">
      </div>
    </div>
  </div>
  
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <!-- Add content here -->
      </div>
    </div>
  </div>

  <script src="https://code.jquery.com/jquery-3.6.4.min.js" integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=" crossorigin="anonymous"></script>
  <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
  <script src="https://cdn.datatables.net/buttons/2.3.6/js/dataTables.buttons.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js"></script>
  <script src="app.js"></script>
</body>

</html>