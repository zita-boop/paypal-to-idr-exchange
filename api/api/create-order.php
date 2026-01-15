<?php
require 'config.php';

if (!isset($_POST['amount'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Amount is required']);
    exit;
}

$amount = number_format((float)$_POST['amount'], 2, '.', '');

$data = [
    'intent' => 'CAPTURE',
    'purchase_units' => [[
        'amount' => [
            'currency_code' => 'USD',
            'value' => $amount
        ]
    ]]
];

$ch = curl_init(PAYPAL_API_BASE . '/v2/checkout/orders');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_USERPWD => PAYPAL_CLIENT_ID . ':' . PAYPAL_SECRET,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode($data)
]);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
