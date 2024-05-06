// src/Controller/HomeController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController
{
/**
* @Route("/", name="app_homepage")
*/
public function index(): Response
{
return new Response('Welcome to the homepage!');
}
}
