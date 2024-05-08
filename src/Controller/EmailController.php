<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\BrowserKit\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @Route("/email")
 */
class EmailController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/send-report-email", name="send_report_email", methods={"POST"})
     */
    public function sendReportEmail(MailerInterface $mailer, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $id = $data['id'];
        $user = $this->entityManager->getRepository(User::class)->find($id);
        $email = (new Email())
            ->from('alaadnzaw@gmail.com')
            ->to('mkchfthnity@gmail.com')
            ->subject('Report Email')
            ->text("User {$user->getFirstName()} {$user->getLastName()} has been reported.");

        $mailer->send($email);

        return new JsonResponse(['message' => 'Email sent']);
    }
}