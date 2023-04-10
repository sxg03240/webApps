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
  <nav class="navbar bg-primary navbar-light">
    <div class="container">
      <h1 class="navbar-brand">
        Department of <?php echo $dept_name; ?>
 
      </h1>
    </div>
  </nav>
   
  <div class="container">
  <div class="row justify-content-center">
    <div class="col-md-10">
      <table class="table table-bordered table-striped table-hover text-center">
        <thead class="bg-primary text-white">
          <tr>
            <th>Employee Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Hire Date</th>
          </tr>
        </thead>
        <tbody>
          <?php
            $dept_id = $_GET['id'];
            $employees = getDeptTableData($dept_id);
            foreach ($employees as $employee): 
          ?>
            <tr>
              <td><?php echo $employee['emp_no'];?></td>
              <td><?php echo $employee['first_name'];?></td>
              <td><?php echo $employee['last_name'];?></td>
              <td><?php echo $employee['gender'];?></td>
              <td><?php echo $employee['hire_date'];?></td>
            </tr>
          <?php
            endforeach;
          ?>
        </tbody>
      </table>
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