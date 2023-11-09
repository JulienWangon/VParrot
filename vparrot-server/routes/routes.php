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
require_once './vparrot-server/controllers/CarsController.php';
require_once './vparrot-server/controllers/ServicesController.php';
require_once './vparrot-server/controllers/SchedulesController.php';
require_once './vparrot-server/controllers/TestimoniesController.php';
require_once './vparrot-server/controllers/UsersController.php';
require_once './vparrot-server/controllers/AuthController.php';

require_once './vparrot-server/repository/ServicesRepository.php';
require_once './vparrot-server/repository/CarsRepository.php';

//require models
require_once './vparrot-server/models/Schedules.php';
require_once './vparrot-server/models/Testimonies.php';
require_once './vparrot-server/models/Users.php';
require_once './vparrot-server/models/AuthModel.php';
require_once './vparrot-server/Validator/Validator.php';


if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


$servicesRepo = new ServicesRepository();
$carRepo = new CarsRepository();
//Dependency Injection;

$schedules = new Schedules();
$testimonies = new Testimonies();
$usersModel = new Users();
$authModel = new AuthModel();
$validator = new Validator();


//LOADING CONTROLLERS
$controllers = [

    'cars' => new CarsController($carRepo),
    'services' => new ServicesController($servicesRepo, $validator),
    'schedules' => new SchedulesController($validator, $schedules),
    'testimonies' => new TestimoniesController($validator, $testimonies),
    'users' => new UsersController($validator, $usersModel),
    'auth' => new AuthController($validator, $authModel, $usersModel),
];


//ROUTES DEFINITION
$routes = [
    'GET' => [
        '/vparrot/cars/briefs' => [$controllers['cars'], 'getCarBriefDetails'],
        '/vparrot/services' => [$controllers['services'], 'getAllServicesList' ],
        '/vparrot/schedules' => [$controllers['schedules'], 'getSchedulesList'],
        '/vparrot/testimonies' => [$controllers['testimonies'], 'getAllTestimoniesList'],
        '/vparrot/testimonies/moderated' => [$controllers['testimonies'], 'getModeratedTestimoniesList'],
        '/vparrot/users' => [$controllers['users'], 'getAllUsersList'],
        '/vparrot/check-session' => [$controllers['auth'], 'checkSession'],

    ],

    'POST' => [
        '/vparrot/testimonies' => [$controllers['testimonies'], 'createTestimony'],
        '/vparrot/users' => [$controllers['users'], 'addThisUser'],
        '/vparrot/login' => [$controllers['auth'], "login"],
        '/vparrot/logout' => [$controllers['auth'], "logout"],

    ],

    'PUT' => [
      '#^/vparrot/users/(\d+)$#' => [$controllers['users'], 'updateThisUser'],
      '#^/vparrot/testimonies/(\d+)/\approve$#' => [$controllers['testimonies'], 'approveThisTestimony'],
      '#^/vparrot/testimonies/(\d+)/\reject$#' => [$controllers['testimonies'], 'rejectThisTestimony'],
      '#^/vparrot/schedules/(\d+)$#' => [$controllers['schedules'], 'updateSchedule'],

    ],

    'DELETE' => [
      '#^/vparrot/testimonies/(\d+)$#' => [$controllers['testimonies'], 'deleteTestimony'],

    ]

];


//EXTRACTING THE URI FROM THE REQUEST
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);


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
      echo "Attempting to match: $uri with pattern: $pattern <br>";    
        if (preg_match($pattern, $uri, $matches)) {
   
            array_shift($matches); 
            $function(...$matches);
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

