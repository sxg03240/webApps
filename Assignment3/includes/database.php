<?php

$username = "root";
$password = "";
class EmployeeDatabase {
    private $dsn = "mysql:host=localhost;dbname=employees";
    private static $instance = null;

    public static function getInstance (){
        return self :: $instance == null? new EmployeeDatabase(): self::$instance;
    }

    public function connect(){
        try {
            global $username;
            global $password;
            return new PDO($this->dsn, $username, $password);
        }
        catch (PDOException $e){
            $error = $e->getMessage();
            echo "<p>Error Message: $error </p>";
        }
    }
}
?>