<?php
/** 
 * api rest Quiron
 * add your new urls in app/main.php
 */
require_once('Slim/Slim.php');

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

//$_ENV['SLIM_MODE'] = 'production';

$_ENV['SLIM_MODE'] = 'develop';
$app->configureMode('development', function () use ($app) {
    $app->config(array(
        'log.enable' => false,
        'debug' => true
    ));
});

define("MAIN_ACCESS", true);

require_once('lib/connect.php');
require_once('app/main.php');

$app->run();
