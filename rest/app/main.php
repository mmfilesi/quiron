<?php

/* CACHEOS E-TAG
http://docs.slimframework.com/#HTTP-Caching-Overview
*/

if ( !defined("MAIN_ACCESS") ) {
	header('HTTP/1.1 403 Forbiden');
	echo "You shall not pass!";
	die();
}

$app->get("/config/", function() use($app) {

	try {
		/* Recogemos cabeceras... todo */
		//$contentType = $app->response->headers->get('Content-Type');

		$connection = getConnection();
		$db 		= $connection->prepare("SELECT * FROM config_basic_data");
		
		$db->execute();
		$result = $db->fetch(PDO::FETCH_OBJ);

		$response = [
			"title" 	=> $result->title,
			"subtitle" 	=> $result->subtitle,
			"lang" 		=> $result->lang
			];

		$app->response->headers->set("Content-type", "application/json");
		$app->response->status(200);
		$app->response->body(json_encode($response));

	} catch(PDOException $e) {
		$error['error'] = $e->getMessage();
		$app->halt( 500, json_encode($error['error']) );
	}

});

$app->put("/config/", function() use($app) {

	try {
		$request = $app->request();

		if ( $request->getMediaType() == 'application/json') {			
			$post 	= $request->getBody();
			$post 	= json_decode($post, true);
			$post 	= (array) $post;

			$conn	= getConnection();

			/* DEJAR PREPARADO PARA MÚLTIPLES, ENVIANDO Y RECOGIENDO EL ID ? */
			
			$sql	= "UPDATE config set `value` = :value WHERE `key` = :key";
			$prep 	= $conn->prepare($sql);

			foreach ( $post as $key=>$value ) {				
				//$prep->execute(array(':key'=>$key, ':value'=>$value));
			}
			
			$response['ok'] = "provisional"; /* TODO */
			$app->response->headers->set("Content-type", "application/json");
			$app->response->status(200);
			$app->response->body(json_encode($response));

		}		

	} catch(PDOException $e) {
		$error['error'] = $e->getMessage();
		$app->halt( 500, json_encode($error['error']) );
	}
});

$app->put("/errors/", function() use($app) {
	/* Cacheamos el body */
	$request = $app->request();
	$post = $request->getBody();
	$post = json_decode($post, true);
	$post = (array) $post;
	var_dump($post);	
});