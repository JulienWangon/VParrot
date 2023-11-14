<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class EmailService  {

    private $mailer;

    public function __construct() {
        
        $this->mailer = new PHPMailer(true);

        $this->mailer->isSMTP();
        $this->mailer->Host = $_ENV['SMTP_HOST'];
        $this->mailer->SMTPAuth = true;
        $this->mailer->Username = $_ENV['SMTP_USER'];
        $this->mailer->Password = $_ENV['SMTP_PASSWORD'];
        $this->mailer->SMTPSecure = $_ENV['SMTP_SECURE'];
        $this->mailer->Port = $_ENV['SMTP_PORT'];

        $this->mailer->setFrom($_ENV['MAIL_FROM_ADDRESS'], $_ENV['MAIL_FROM_NAME']);

    }

    public function sendEmail($to, $subject, $body, $isHTML = true) {

        try {

            $this->mailer->addAddress($to);

            $this->mailer->isHTML($isHTML);
            $this->mailer->Subject = $subject;
            $this->mailer->Body = $body;

            if(!$isHTML) {

                $this->mailer->AltBody = strip_tags($body);
            }

            $this->mailer->send();
        } catch (Exception $e) {

            throw new Exception("Erreur lors de l'envoi de l'email" . $this->mailer->ErrorInfo);

        }
    }
}