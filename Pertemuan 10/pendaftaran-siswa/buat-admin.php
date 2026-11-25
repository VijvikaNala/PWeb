<?php
include("koneksi.php");

$username = "admin";
$password = password_hash("admin123", PASSWORD_DEFAULT);

$sql = "INSERT INTO admin (username, password) VALUES (?, ?)";
$stmt = mysqli_prepare($db, $sql);

mysqli_stmt_bind_param($stmt, "ss", $username, $password);

if (mysqli_stmt_execute($stmt)) {
    echo "Akun admin berhasil dibuat!";
} else {
    echo "Gagal membuat akun admin: " . mysqli_error($db);
}

mysqli_stmt_close($stmt);
mysqli_close($db);
?>
