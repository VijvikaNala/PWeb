<?php
include("koneksi.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $id = $_POST['id'];

    $sql = "DELETE FROM calon_siswa WHERE id = ?";
    $stmt = mysqli_prepare($db, $sql);

    mysqli_stmt_bind_param($stmt, "i", $id);

    if (mysqli_stmt_execute($stmt)) {
        header('Location: list-siswa.php');
        exit;
    } else {
        echo "Gagal menghapus data: " . mysqli_error($db);
    }

    mysqli_stmt_close($stmt);

} else {

    $id = $_GET['id'] ?? 0;

    if (!filter_var($id, FILTER_VALIDATE_INT) || $id < 1) {
        die("ID siswa tidak valid!");
    }
}
?>

<?php if ($_SERVER['REQUEST_METHOD'] != 'POST'): ?>

<!DOCTYPE html>
<html>
<head>
    <title>Hapus Data Siswa</title>
</head>
<body>

    <h3>Konfirmasi Hapus Data</h3>

    <p>Apakah kamu yakin ingin menghapus data siswa ini?</p>

    <form method="POST" action="hapus.php">
        <input type="hidden" name="id"
            value="<?php echo htmlspecialchars((string)$id); ?>">

        <button type="submit">Ya, Hapus</button>
        <a href="list-siswa.php">Batal</a>
    </form>

</body>
</html>

<?php endif; ?>
