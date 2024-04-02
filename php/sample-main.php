<?php
    header('Content-Type: application/json');
    $data = [
        "app" => "Dompet",
        "personal" => [
            "name" => "Maya Yuliani",
            "gender" => "Perempuan",
            "age" => "24",
            "address" => "Kp.Sukamaju, RT01/RW01"
        ],
    ];
    echo json_encode($data);
