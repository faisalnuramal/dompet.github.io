<?php
header("Content-Type: application/json");
http_response_code(202);
$data = file_get_contents('php://input');
echo json_encode(json_decode($data, TRUE));
