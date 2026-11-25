<?php
include("cek-login.php");
?>

<?php
include("koneksi.php");

if (!isset($_GET['id'])) {
    header('Location: list-siswa.php');
    exit;
}

$id = $_GET['id'];

$sql = "SELECT * FROM calon_siswa WHERE id = ?";
$stmt = mysqli_prepare($db, $sql);
mysqli_stmt_bind_param($stmt, "i", $id);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);
$siswa = mysqli_fetch_assoc($result);

if (!$siswa) {
    die("Data siswa tidak ditemukan!");
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Data Siswa | SMK Coding</title>
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

    <!-- Form Edit -->
    <main class="form-page">

        <div class="form-container">

            <div class="form-heading">
                <span class="subtitle">DATA PENDAFTARAN</span>
                <h1>Edit Data Siswa</h1>
                <p>
                    Silakan perbarui data siswa pada formulir berikut.
                </p>
            </div>

            <form action="proses-edit.php" method="POST">

                <input type="hidden" name="id"
                    value="<?php echo htmlspecialchars($siswa['id']); ?>">

                <div class="form-group">
                    <label for="nama">Nama Lengkap</label>
                    <input
                        type="text"
                        name="nama"
                        id="nama"
                        value="<?php echo htmlspecialchars($siswa['nama']); ?>"
                        placeholder="Nama lengkap"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="alamat">Alamat</label>
                    <textarea
                        name="alamat"
                        id="alamat"
                        rows="3"
                        placeholder="Masukkan alamat lengkap"
                        required
                    ><?php echo htmlspecialchars($siswa['alamat']); ?></textarea>
                </div>

                <div class="form-group">
                    <label>Jenis Kelamin</label>

                    <?php $jk = $siswa['jenis_kelamin']; ?>

                    <div class="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="jenis_kelamin"
                                value="laki-laki"
                                <?php echo ($jk == 'laki-laki') ? "checked" : ""; ?>
                                required
                            >
                            Laki-laki
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="jenis_kelamin"
                                value="perempuan"
                                <?php echo ($jk == 'perempuan') ? "checked" : ""; ?>
                            >
                            Perempuan
                        </label>
                    </div>
                </div>

                <div class="form-group">
                    <label for="agama">Agama</label>

                    <select name="agama" id="agama" required>
                        <option value="">Pilih Agama</option>

                        <?php
                        $agama_list = [
                            "Islam",
                            "Kristen",
                            "Katolik",
                            "Hindu",
                            "Budha",
                            "Konghucu"
                        ];

                        foreach ($agama_list as $agama) {
                            $selected = ($siswa['agama'] == $agama)
                                ? "selected"
                                : "";

                            echo "<option value='$agama' $selected>$agama</option>";
                        }
                        ?>
                    </select>
                </div>

                <div class="form-group">
                    <label for="sekolah_asal">Sekolah Asal</label>

                    <input
                        type="text"
                        name="sekolah_asal"
                        id="sekolah_asal"
                        value="<?php echo htmlspecialchars($siswa['sekolah_asal']); ?>"
                        placeholder="Nama sekolah"
                        required
                    >
                </div>

                <div class="form-actions">
                    <button
                        type="submit"
                        name="simpan"
                        value="simpan"
                        class="btn-primary"
                    >
                        Simpan Perubahan
                    </button>

                    <a href="list-siswa.php" class="btn-outline">
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
