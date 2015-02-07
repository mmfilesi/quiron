<?php 

if ( !defined("MAIN_ACCESS") ) {
	header('HTTP/1.1 403 Forbiden');
	echo "You shall not pass!";
	die();
}

$app->get("/pruebas/", function() use($app) {
});

$app->get("/config/", function() use($app) {
	try {
		$connection = getConnection();
		$dbh 		= $connection->prepare("SELECT `key`, `value` FROM config");
		
		$dbh->execute();
		$result = $dbh->fetchAll(PDO::FETCH_COLUMN|PDO::FETCH_GROUP);

		$response = array();
		if ( $result ) {		
			foreach ($result as $key=>$value) {
				$response[$key] = utf8_encode($value[0]);
			}

		}

		$app->response->headers->set("Content-type", "application/json");
		$app->response->status(200);
		$app->response->body(json_encode($response));

	} catch(PDOException $e) {

		/* Todo, response rest */
		echo "Error: " . $e->getMessage();
	}
});