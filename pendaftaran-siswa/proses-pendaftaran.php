<?php

include("koneksi.php");

if (isset($_POST['daftar'])) {

    $nama = $_POST['nama'];
    $alamat = $_POST['alamat'];
    $jenis_kelamin = $_POST['jenis_kelamin'];
    $agama = $_POST['agama'];
    $sekolah_asal = $_POST['sekolah_asal'];

    $sql = "INSERT INTO calon_siswa
            (nama, alamat, jenis_kelamin, agama, sekolah_asal)
            VALUES (?, ?, ?, ?, ?)";

    $stmt = mysqli_prepare($db, $sql);

    mysqli_stmt_bind_param(
        $stmt,
        "sssss",
        $nama,
        $alamat,
        $jenis_kelamin,
        $agama,
        $sekolah_asal
    );

    if (mysqli_stmt_execute($stmt)) {
        header('Location: list-siswa.php');
        exit;
    } else {
        echo "Pendaftaran gagal: " . mysqli_error($db);
    }

    mysqli_stmt_close($stmt);
}

?>
