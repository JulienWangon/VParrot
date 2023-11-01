<?php

//CORS configuration

//localhost:3000 access (accès autorisé à l'API)
header("Access-Control-Allow-Origin: http://localhost:3000");
//allowed HTTP methods (méthode autorisées)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
//Allowed headers (en-tête autorisés)
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");


//require controllers
require_once './vparrot-server/controllers/TestimoniesController.php';
require_once './vparrot-server/controllers/UsersController.php';

//require models
require_once './vparrot-server/models/Testimonies.php';
require_once './vparrot-server/models/Users.php';
require_once './vparrot-server/Validator/Validator.php';


if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

//Dependency Injection
$testimonies = new Testimonies();
$users = new Users();
$validator = new Validator();

//LOADING CONTROLLERS
$controllers = [
    'testimonies' => new TestimoniesController($validator, $testimonies),
    'users' => new UsersController($validator, $users),
];


//ROUTES DEFINITION
$routes = [
    'GET' => [
        '/vparrot/testimonies/all' => [$controllers['testimonies'], 'getAllTestimoniesList'],
        '/vparrot/users/all' => [$controllers['users'], 'getAllUsersList'],

    ],

    'POST' => [

    ],

    'PUT' => [

    ],

    'DELETE' => [

    ]

];


//EXTRACTING THE URI FROM THE REQUEST
$uri = str_replace($_SERVER['SCRIPT_NAME'], '', $_SERVER['REQUEST_URI']);


//ROUTING SYSTEM
$requestMethod = $_SERVER['REQUEST_METHOD'];

$foundRoute = false;

//Verification of Exact Routes
if(isset($routes[$requestMethod][$uri])) {
  $routes[$requestMethod][$uri]();
  $foundRoute = true;
}

//If no exact route is found, check the routes with regex
if (!$foundRoute) {

    foreach($routes[$requestMethod] as $pattern =>$function) {
        if (preg_match($pattern, $uri, $matches)) {
          $function($matches);
          $foundRoute = true;
          break;
        }

    }
}

//IF ROUTE NOTE FOUND RETURN 404 ERROR
if(!$foundRoute) {
  header('HTTP/1.1 404 Not Found');
  echo json_encode(['status' => 'error', 'message' => 'Route not found']);
}

