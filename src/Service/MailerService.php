<?php

namespace App\Service;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Symfony\Bundle\MakerBundle\Str;

class MailerService
{
    public function sendEmail(string $email, string $subject, string $body): String
    {
        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'alaadnzaw@gmail.com';
            /**
             * @todo insert your password here
              */
            $mail->Password = 'INSERT_YOUR_PASSWORD_HERE';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Recipients
            $mail->setFrom('$alaadnzaw@gmail.com', 'me');
            $mail->addAddress($email);

            // Content
            $mail->isHTML(false);
            $mail->Subject = $subject;
            $mail->Body = $body;

            if(! $mail->send()){
                return 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo;
            };
            return 'Message has been sent';
        } catch (Exception $e) {
            // Log or handle the exception as needed
            return 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo;
        }
    }
}
