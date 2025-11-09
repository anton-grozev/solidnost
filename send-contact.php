<?php

// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');

// Set content type to JSON
header('Content-Type: application/json; charset=utf-8');

// CORS headers (adjust as needed)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Response array
$response = array(
    'success' => false,
    'message' => ''
);

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Invalid request method';
    echo json_encode($response);
    exit;
}

// Get POST data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate required fields
if (empty($email) || empty($phone)) {
    $response['message'] = 'Моля, попълнете всички задължителни полета.';
    echo json_encode($response);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['message'] = 'Невалиден имейл адрес.';
    echo json_encode($response);
    exit;
}

// Sanitize inputs
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$subject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Email configuration
$to = 'office@solidnost.com'; // Change to your email
$email_subject = 'Ново запитване от уебсайта - ' . ($subject ?: 'Общ въпрос');

// Email body
$email_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
        }
        .header {
            background: #002f4d;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 20px;
            background: #f9f9f9;
        }
        .field {
            margin-bottom: 15px;
            padding: 10px;
            background: white;
            border-left: 4px solid #0066cc;
        }
        .label {
            font-weight: bold;
            color: #002f4d;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Ново запитване от уебсайта</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Име:</div>
                <div>" . ($name ?: 'Не е посочено') . "</div>
            </div>
            <div class='field'>
                <div class='label'>Имейл:</div>
                <div>" . $email . "</div>
            </div>
            <div class='field'>
                <div class='label'>Телефон:</div>
                <div>" . $phone . "</div>
            </div>
            <div class='field'>
                <div class='label'>Относно:</div>
                <div>" . ($subject ?: 'Общ въпрос') . "</div>
            </div>
            <div class='field'>
                <div class='label'>Съобщение:</div>
                <div>" . nl2br($message ?: 'Няма съобщение') . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>Това съобщение е изпратено от контактната форма на www.solidnost.com</p>
            <p>Дата: " . date('d.m.Y H:i:s') . "</p>
        </div>
    </div>
</body>
</html>
";

// Email headers
$headers = array();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=utf-8';
$headers[] = 'From: Уебсайт Солидност <noreply@solidnost.com>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Send email
try {
    $mail_sent = mail($to, $email_subject, $email_body, implode("\r\n", $headers));
    
    if ($mail_sent) {
        $response['success'] = true;
        $response['message'] = 'Съобщението е изпратено успешно!';
        
        
    } else {
        $response['message'] = 'Грешка при изпращане на имейл. Моля, опитайте отново или се свържете с нас директно.';
    }
} catch (Exception $e) {
    $response['message'] = 'Възникна грешка: ' . $e->getMessage();
}

echo json_encode($response);

?>
