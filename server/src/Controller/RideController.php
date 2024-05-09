<?php

namespace App\Controller;
use Nelmio\CorsBundle\NelmioCorsBundle;
use App\Entity\Ride;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class RideController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/api/rides", name="app_api_rides_get", methods={"GET"})
     */
    public function getAll(): JsonResponse
    {
        $rides = $this->entityManager->getRepository(Ride::class)->findAll();

        $response = [];
        foreach ($rides as $ride) {
            $response[] = [
                'id' => $ride->getId(),
                'departure' => $ride->getDeparture(),
                'arrival' => $ride->getArrival(),
                'departure_date' => $ride->getDepartureDate()->format('Y-m-d'),
                'departure_time' => $ride->getDepartureTime()->format('H:i:s'),
                'price' => $ride->getPrice(),
                'places' => $ride->getPlaces(),
                'description' => $ride->getDescription(),
                'driver' => [
                    'id' => $ride->getDriver()->getId(),
                    'firstname' => $ride->getDriver()->getFirstname(),
                    'lastname' => $ride->getDriver()->getLastname(),
                    'email' => $ride->getDriver()->getEmail(),
                    'phonenumber' => $ride->getDriver()->getPhonenumber(),
                    'pfp_path' => $ride->getDriver()->getPfpPath(),
                    'rating' => $ride->getDriver()->getRating(),
                ],
                'user_count' => count($ride->getPassengers())
            ];
        }

        return new JsonResponse($response);
    }

    /**
     * @Route("/api/createRide", name="app_api_rides_post", methods={"POST"})
     */
    public function createRide(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $this->entityManager->getRepository(User::class)->find($data['driver']);
        if ($user === null) {
            return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }
        if ($user->getDriving() !== null) {
            return new JsonResponse(['message' => 'User is already driving'], Response::HTTP_BAD_REQUEST);
        }

        $ride = new Ride();
        $ride->setDeparture($data['departure']);
        $ride->setArrival($data['arrival']);
        $ride->setDepartureDate(new \DateTime($data['date']));
        $ride->setDepartureTime(new \DateTime($data['time']));
        $ride->setPrice($data['price']);
        $ride->places = $data['places'];
        $ride->setDescription($data['description']);
        $ride->setDriver($user);
        $this->entityManager->persist($ride);
        $this->entityManager->flush();
        $user->setDriving($ride->getId());
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Ride created successfully', 'ride_id' => $ride->getId()]);
    }



    /**
     * @Route("/api/deleteRide", name="app_api_rides_delete", methods={"DELETE"})
     */
    public function delete(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $id= $data['id'];
        $ride = $this->entityManager->getRepository(Ride::class)->find($id);

        if (!$ride) {
            return new JsonResponse(['message' => 'Ride not found'], Response::HTTP_NOT_FOUND);
        }
        $driver = $ride->getDriver();
        $driver->setDriving(null);
        $passengers = $ride->getPassengers();
        foreach ($passengers as $passenger) {
            $passenger->setJoined(null);
        }
        $this->entityManager->remove($ride);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Ride deleted successfully']);
    }
}
