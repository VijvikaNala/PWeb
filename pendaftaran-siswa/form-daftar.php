<!DOCTYPE html>
<html>
<head>
    <title>Formulir Pendaftaran Siswa Baru</title>
</head>

<body>
    <header>
        <h3>Formulir Pendaftaran Siswa Baru</h3>
    </header>

    <form action="proses-pendaftaran.php" method="POST">

        <fieldset>
            <p>
                <label for="nama">Nama:</label>
                <input type="text" name="nama" placeholder="Nama lengkap" required>
            </p>

            <p>
                <label for="alamat">Alamat:</label>
                <textarea name="alamat" required></textarea>
            </p>

            <p>
                <label for="jenis_kelamin">Jenis Kelamin:</label>
                <label>
                    <input type="radio" name="jenis_kelamin" value="laki-laki" required>
                    Laki-laki
                </label>
                <label>
                    <input type="radio" name="jenis_kelamin" value="perempuan">
                    Perempuan
                </label>
            </p>

            <p>
                <label for="agama">Agama:</label>
                <select name="agama" required>
                    <option value="">Pilih Agama</option>
                    <option>Islam</option>
                    <option>Kristen</option>
                    <option>Katolik</option>
                    <option>Hindu</option>
                    <option>Budha</option>
                    <option>Konghucu</option>
                </select>
            </p>

            <p>
                <label for="sekolah_asal">Sekolah Asal:</label>
                <input type="text" name="sekolah_asal" placeholder="Nama sekolah" required>
            </p>

            <p>
                <input type="submit" value="Daftar" name="daftar">
            </p>
        </fieldset>

    </form>

</body>
</html>
