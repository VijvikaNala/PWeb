
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulir Pendaftaran | SMK Coding</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

    <!-- Navbar -->
    <header class="navbar">
        <div class="navbar-content">
            <a href="index.php" class="logo">SMK Coding</a>

            <nav>
                <a href="index.php">Beranda</a>
                <a href="form-daftar.php" class="active">Pendaftaran</a>
                <a href="list-siswa.php">Daftar Pendaftar</a>
            </nav>
        </div>
    </header>

    <!-- Formulir -->
    <main class="form-page">

        <div class="form-container">

            <div class="form-heading">
                <span class="subtitle">PENERIMAAN SISWA BARU</span>
                <h1>Formulir Pendaftaran</h1>
                <p>
                    Silakan lengkapi data diri berikut untuk
                    melakukan pendaftaran di SMK Coding.
                </p>
            </div>

            <form action="proses-pendaftaran.php" method="POST">

                <div class="form-group">
                    <label for="nama">Nama Lengkap</label>
                    <input
                        type="text"
                        name="nama"
                        id="nama"
                        placeholder="Nama lengkap"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="alamat">Alamat</label>
                    <textarea
                        name="alamat"
                        id="alamat"
                        placeholder="Masukkan alamat lengkap"
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div class="form-group">
                    <label>Jenis Kelamin</label>

                    <div class="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="jenis_kelamin"
                                value="laki-laki"
                                required
                            >
                            Laki-laki
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="jenis_kelamin"
                                value="perempuan"
                            >
                            Perempuan
                        </label>
                    </div>
                </div>

                <div class="form-group">
                    <label for="agama">Agama</label>

                    <select name="agama" id="agama" required>
                        <option value="">Pilih Agama</option>
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Budha">Budha</option>
                        <option value="Konghucu">Konghucu</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="sekolah_asal">Sekolah Asal</label>

                    <input
                        type="text"
                        name="sekolah_asal"
                        id="sekolah_asal"
                        placeholder="Nama sekolah"
                        required
                    >
                </div>

                <div class="form-actions">
                    <button
                        type="submit"
                        value="daftar"
                        name="daftar"
                        class="btn-primary"
                    >
                        Kirim Pendaftaran
                    </button>

                    <a href="index.php" class="btn-outline">
                        Kembali
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
