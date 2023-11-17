<?php

require __DIR__ . '/vparrot-server/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/vparrot-server');
$dotenv->load();

require_once './vparrot-server/routes/routes.php';

