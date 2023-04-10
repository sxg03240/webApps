<?php

    function getTableData() {
        $database = EmployeeDatabase:: getInstance() ;
        $db = $database->connect() ;
        $query = "SELECT * FROM employees LIMIT 100";
        $statement = $db->prepare($query);
        $statement->execute();
        $rows = $statement->fetchAll();
        $statement->closeCursor();
        return $rows;
}
function getDeptTableData($dept_id) {
    $database = EmployeeDatabase::getInstance();
    $db = $database->connect();
    $query = "SELECT emp.emp_no, emp.first_name, emp.last_name, emp.gender, emp.hire_date FROM employees AS emp, dept_emp AS dept WHERE dept.dept_no=:dept_id AND emp.emp_no=dept.emp_no LIMIT 100";
    $statement = $db->prepare($query);
    $statement->bindValue(':dept_id', $dept_id);
    $statement->execute();
    $rows = $statement->fetchAll();
    $statement->closeCursor();
    return $rows;
}
?>