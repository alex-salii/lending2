<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';


$mail = new PHPMailer(true);
$mail -> CharSet = 'UTF-8';
$mail -> setLanguage('ru', 'phpmailer/language');
$mail -> isHTML (true);


$mail->setFrom('from@example.com', 'Mailer');
    
$mail->addAddress('ellen@example.com');

$mail->Subject = 'Here is the subject';

$body = '<h1>message</h1>';

if(trim(!empty($_POST['name']))){
  $body.='<><strong>Имя:</strong> ' .$_POST['name'].'</p>';
}
if (trim(!empty($_POST['phoneNumber']))) {
  $body .= '<><strong>Номер телефона:</strong> ' . $_POST['phoneNumber'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
  $body .= '<><strong>Email:</strong> ' . $_POST['email'] . '</p>';
}
if (trim(!empty($_POST['product']))) {
  $body .= '<><strong>Товар или услуги:</strong> ' . $_POST['product'] . '</p>';
}
if (trim(!empty($_POST['message']))) {
  $body .= '<><strong>Сообщение:</strong> ' . $_POST['message'] . '</p>';
}

$mail -> Body = $body;

if(!$mail -> send()) {
  $massage = 'Ошибка';
}else {
  $massage = 'Данные отправлены';
}
   
$response = ['message' => $massage];

header('Content-type: application/json');
echo json_encode($response);

?>