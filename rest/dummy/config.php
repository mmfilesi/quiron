<?php
//var_dump(apache_request_headers());
header('Content-Type: application/json');
$datos = [
	'title' => 'Título',
	'subtitle' => 'subtítulo'/*,
	'navBar' => [('url': 'foo', 'value': 'foo'}, {'url': 'bar', 'value': 'bar'})  */
];

echo json_encode($datos);