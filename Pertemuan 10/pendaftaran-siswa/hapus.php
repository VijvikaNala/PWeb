<?php
include("cek-login.php");
?>

<?php
include("cek-login.php");
?>

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
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Konfirmasi Hapus | SMK Coding</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

    <!-- Navbar -->
    <header class="navbar">
        <div class="navbar-content">
            <a href="index.php" class="logo">SMK Coding</a>

            <nav>
                <a href="index.php">Beranda</a>
                <a href="form-daftar.php">Pendaftaran</a>
                <a href="list-siswa.php" class="active">Daftar Pendaftar</a>
            </nav>
        </div>
    </header>

    <!-- Konfirmasi Hapus -->
    <main class="delete-page">

        <div class="delete-container">

            <span class="subtitle">DATA PENDAFTARAN</span>

            <h1>Konfirmasi Hapus Data</h1>

            <p>
                Apakah kamu yakin ingin menghapus data siswa ini?
            </p>

            <p class="delete-warning">
                Data yang sudah dihapus tidak dapat dikembalikan.
            </p>

            <form method="POST" action="hapus.php">

                <input type="hidden" name="id"
                    value="<?php echo htmlspecialchars((string)$id); ?>">

                <div class="delete-actions">

                    <button type="submit" class="btn-delete-confirm">
                        Ya, Hapus
                    </button>

                    <a href="list-siswa.php" class="btn-cancel">
                        Batal
                    </a>

                </div>

            </form>

        </div>

    </main>

    <!-- Footer -->
    <footer>
        <div class="footer-content">
            <h3>SMK Coding</h3>
            <p>Belajar, Berkembang, dan Berkarya.</p>
        </div>

        <div class="footer-bottom">
            <p>&copy; 2026 SMK Coding. Pendaftaran Siswa Baru.</p>
        </div>
    </footer>

</body>
</html>

<?php endif; ?>
