<?php
// ===============================
// PAYPAL CONFIG
// ===============================
define('PAYPAL_MODE', 'sandbox'); // sandbox | live

define('PAYPAL_CLIENT_ID', 'ISI_CLIENT_ID_KAMU');
define('PAYPAL_SECRET', 'ISI_SECRET_KAMU');

define('PAYPAL_API_BASE',
    PAYPAL_MODE === 'live'
        ? 'https://api-m.paypal.com'
        : 'https://api-m.sandbox.paypal.com'
);

// ===============================
// EXCHANGE CONFIG
// ===============================
define('EXCHANGE_FEE_PERCENT', 5); // fee 5%
