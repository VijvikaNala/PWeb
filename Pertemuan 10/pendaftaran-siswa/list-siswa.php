<?php
include("cek-login.php");
?>

<?php include("koneksi.php"); ?>

<?php
$sql = "SELECT * FROM calon_siswa";
$query = mysqli_query($db, $sql);
$total = mysqli_num_rows($query);
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Pendaftar | SMK Coding</title>
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
                <a href="logout.php" class="login-link">Logout</a>
            </nav>
        </div>
    </header>

    <!-- Daftar Pendaftar -->
    <main class="list-page">

        <div class="list-container">

            <div class="list-heading">
                <div>
                    <span class="subtitle">DATA PENDAFTARAN</span>
                    <h1>Siswa yang Sudah Mendaftar</h1>
                    <p>
                        Berikut adalah daftar siswa yang telah mengisi
                        formulir pendaftaran.
                    </p>
                </div>

                <a href="form-daftar.php" class="btn-primary">
                    + Tambah Pendaftar
                </a>
            </div>

            <!-- Total Pendaftar -->
            <div class="total-card">
                <span>Total Pendaftar</span>
                <h2><?php echo $total; ?></h2>
            </div>

            <!-- Tabel Siswa -->
            <div class="table-wrapper">

                <table class="student-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Jenis Kelamin</th>
                            <th>Agama</th>
                            <th>Sekolah Asal</th>
                            <th>Tindakan</th>
                        </tr>
                    </thead>

                    <tbody>
                        <?php
                        $no = 1;

                        while ($siswa = mysqli_fetch_array($query)) {
                            echo "<tr>";

                            echo "<td>".$no++."</td>";
                            echo "<td>".htmlspecialchars($siswa['nama'])."</td>";
                            echo "<td>".htmlspecialchars($siswa['alamat'])."</td>";
                            echo "<td>".htmlspecialchars($siswa['jenis_kelamin'])."</td>";
                            echo "<td>".htmlspecialchars($siswa['agama'])."</td>";
                            echo "<td>".htmlspecialchars($siswa['sekolah_asal'])."</td>";

                            echo "<td class='action-buttons'>";
                            echo "<a class='btn-edit' href='form-edit.php?id=".$siswa['id']."'>Edit</a>";
                            echo "<a class='btn-delete' href='hapus.php?id=".$siswa['id']."'>Hapus</a>";
                            echo "</td>";

                            echo "</tr>";
                        }

                        if ($total == 0) {
                            echo "<tr>";
                            echo "<td colspan='7' class='empty-data'>";
                            echo "Belum ada siswa yang mendaftar.";
                            echo "</td>";
                            echo "</tr>";
                        }
                        ?>
                    </tbody>
                </table>

            </div>

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
