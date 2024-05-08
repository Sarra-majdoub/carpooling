<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class EmailController extends AbstractController
{
    /**
     * @Route("/send-report-email", name="send_report_email")
     */
    public function sendReportEmail(MailerInterface $mailer, User $user): Response
    {
        $email = (new Email())
            ->from('alaadnzaw@gmail.com')
            ->to('mkchfthnity@gmail.com')
            ->subject('Report Email')
            ->text("User {$user->getFirstName()} {$user->getLastName()} has been reported.");

        $mailer->send($email);

        return new Response('Report email sent successfully.');
    }
}