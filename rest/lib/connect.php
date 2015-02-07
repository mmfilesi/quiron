<?php 

if ( !defined("MAIN_ACCESS") ) {
	header('HTTP/1.1 403 Forbiden');
	echo "You shall not pass!";
	die();
}

function getConnection() {
	try {
		$db_host 		= "localhost";
		$db_database 	= "quiron";
		$db_username 	= "root";
		$db_password 	= "";
		
		$connection = new PDO("mysql:host=".$db_host."; dbname=".$db_database."", $db_username, $db_password);
		
		$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	} catch (PDOException $error) {
		
		header('HTTP/1.1 501 Internal Server Error');
		$msgError = array();
		$msgError['status'] = "error";
		$msgError['type'] = "database conexion";
		$msgError['longDesc'] = $error->getMessage();
		echo json_encode($msgError);
		die();
	}

	return $connection;
}