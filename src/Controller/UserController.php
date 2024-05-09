<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Service\MailerService;

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
            return new JsonResponse(['message' => 'User not found'], JsonResponse::HTTP_NOT_FOUND);
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
            return new JsonResponse(['message' => 'User not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        if (($user->getPassword()== $data['password'])) {
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

    #[Route('/report/{id}', name: 'report', methods: ['POST'])]
    public function report(int $id,MailerService $mailer): JsonResponse
    {
        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->find($id);

        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], JsonResponse::HTTP_NOT_FOUND);
        }
        
        // $mailer->sendEmail($user->getEmail(), 'You have been reported', 'You have been reported for inappropriate behavior on our platform. Please contact us for more information.');
        $res = $mailer->sendEmail("mkchfthnity@gmail.com", 'User '.$user->getFirstname().' '.$user->getLastname().'reported', 'User with email ' . $user->getEmail() . ' has been reported for inappropriate behavior on our platform.');
        // $res = $mailer->sendEmail("mkchfthnity@gmail.com", 'User reported', 'User with email has been reported for inappropriate behavior on our platform.');
        
        // $this->entityManager->flush();

        return new JsonResponse(['message' => 'User reported successfully', 'res' => $res]);
    }


}