<?php

namespace App\Controller;
use Nelmio\CorsBundle\NelmioCorsBundle;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use App\Entity\Ride;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
class UserController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = new User();
        $password = password_hash($data['password'], PASSWORD_DEFAULT);
        $user->setPassword($password);
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);
        $user->setEmail($data['email']);
        $user->setPhoneNumber($data['phoneNumber']);
        if (isset($data['pfp_path']))
        $user->setPfpPath($data['pfp_path']);
        $user->setIsAdmin(0);
        $user->setRating(0);
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'User registered successfully', 'user_id' => $user->getId()]);
    }

    #[Route('/users', name: 'get_all_users', methods: ['GET'])]
    public function getAllUsers(): JsonResponse
    {
        $userRepository = $this->entityManager->getRepository(User::class);
        $users = $userRepository->findAll();

        $response = [];
        foreach ($users as $user) {
            $response[] = [
                'id' => $user->getId(),
                'firstName' => $user->getFirstName(),
                'lastName' => $user->getLastName(),
                'email' => $user->getEmail(),
                'phoneNumber' => $user->getPhoneNumber(),
                'isAdmin' => $user->getIsAdmin(),
                'rating' => $user->getRating(),
            ];
        }

        return new JsonResponse($response);
    }

    #[Route('/user/{id}', name: 'delete_user', methods: ['DELETE'])]
    public function deleteUser(int $id): JsonResponse
    {
        $user = $this->entityManager->getRepository(User::class)->find($id);

        if (!$user) {
            return new JsonResponse(['message' => 'User not found']);
        }

        $this->entityManager->remove($user);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'User deleted successfully']);
    }

    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->findOneBy(['email' => $data['email']]);

        if (!$user) {
            return new JsonResponse(['message' => 'User not found']);
        }
        $hashedPassword = $user->getPassword();
        $password = $data['password'];

        if (password_verify($password, $hashedPassword)){
            return new JsonResponse([
                'message' => 'Login successful',
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'is_admin' => $user->getIsAdmin(),
                'firstName' => $user->getFirstName(),
                'lastName' => $user->getLastName(),
               // 'pfp' => base64_encode(file_get_contents($user->getPfpPath())),
            ]);
        } else {
            return new JsonResponse(['message' => 'Incorrect password'], JsonResponse::HTTP_UNAUTHORIZED);
        }
    }
    #[Route('/join-ride/{rideId}', name: 'join_ride', methods: ['POST'])]
    public function joinRide(Request $request, int $rideId, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
       $userId = $data['userId'];

       $userRepository = $entityManager->getRepository(User::class);
       $rideRepository = $entityManager->getRepository(Ride::class);

       $user = $userRepository->find($userId);
       $ride = $rideRepository->find($rideId);

        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        if (!$ride) {
            return new JsonResponse(['message' => 'Ride not found'], JsonResponse::HTTP_NOT_FOUND);
        }
        if(sizeOf($ride->getPassengers()) >= $ride->getPlaces()){
            return new JsonResponse(['message' => 'The driver cannot join'], JsonResponse::HTTP_BAD_REQUEST);
        }
        if($ride->getDriver()->getId() === $user->getId()){
            return new JsonResponse(['message' => 'Ride is full of users'], JsonResponse::HTTP_BAD_REQUEST);
        }
        $ride->addPassenger($user);
        $user->setJoined($ride);
        $entityManager->flush();

        return new JsonResponse(['message' => 'User joined the ride successfully']);
    }
    #[Route('/leave-ride/{rideId}', name: 'leave_ride', methods: ['POST'])]
        public function leaveRide(Request $request, int $rideId, EntityManagerInterface $entityManager): JsonResponse
            {
            $data = json_decode($request->getContent(), true);
                    $userId = $data['userId'];

                    $userRepository = $entityManager->getRepository(User::class);
                    $rideRepository = $entityManager->getRepository(Ride::class);

                    $user = $userRepository->find($userId);
                    $ride = $rideRepository->find($rideId);

            if (!$user) {
                return new JsonResponse(['message' => 'User not logged in'], Response::HTTP_UNAUTHORIZED);
            }

            if (!$ride) {
                return new JsonResponse(['message' => 'Ride not found'], Response::HTTP_NOT_FOUND);
            }

            if ($user->getJoined() !== $ride) {
                return new JsonResponse(['message' => 'User is not part of this ride'], Response::HTTP_BAD_REQUEST);
            }
            $ride->removePassenger($user);
            $user->setJoined(null);
            $this->entityManager->flush();

            return new JsonResponse(['message' => 'User left the ride successfully']);
        }
}
