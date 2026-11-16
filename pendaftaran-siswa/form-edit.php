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
<html>
<head>
    <title>Edit Data Siswa</title>
</head>

<body>
    <header>
        <h3>Formulir Edit Siswa</h3>
    </header>

    <form action="proses-edit.php" method="POST">
        <fieldset>
            <input type="hidden" name="id" value="<?php echo $siswa['id']; ?>">

            <p>
                <label>Nama:</label>
                <input type="text" name="nama"
                    value="<?php echo htmlspecialchars($siswa['nama']); ?>" required>
            </p>

            <p>
                <label>Alamat:</label>
                <textarea name="alamat" required><?php echo htmlspecialchars($siswa['alamat']); ?></textarea>
            </p>

            <p>
                <label>Jenis Kelamin:</label>

                <?php $jk = $siswa['jenis_kelamin']; ?>

                <label>
                    <input type="radio" name="jenis_kelamin"
                        value="laki-laki"
                        <?php echo ($jk == 'laki-laki') ? "checked" : ""; ?>>
                    Laki-laki
                </label>

                <label>
                    <input type="radio" name="jenis_kelamin"
                        value="perempuan"
                        <?php echo ($jk == 'perempuan') ? "checked" : ""; ?>>
                    Perempuan
                </label>
            </p>

            <p>
                <label>Agama:</label>
                <select name="agama" required>
                    <?php
                    $agama_list = ["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu"];

                    foreach ($agama_list as $agama) {
                        $selected = ($siswa['agama'] == $agama) ? "selected" : "";
                        echo "<option value='$agama' $selected>$agama</option>";
                    }
                    ?>
                </select>
            </p>

            <p>
                <label>Sekolah Asal:</label>
                <input type="text" name="sekolah_asal"
                    value="<?php echo htmlspecialchars($siswa['sekolah_asal']); ?>" required>
            </p>

            <p>
                <input type="submit" value="Simpan" name="simpan">
            </p>
        </fieldset>
    </form>
</body>
</html>
