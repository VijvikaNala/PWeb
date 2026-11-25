
<?php
session_start();
include("koneksi.php");

$error = "";

if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM admin WHERE username = ?";
    $stmt = mysqli_prepare($db, $sql);
    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);
    $admin = mysqli_fetch_assoc($result);

    if ($admin && password_verify($password, $admin['password'])) {
        session_regenerate_id(true);
        $_SESSION['admin'] = $admin['username'];

        header("Location: list-siswa.php");
        exit;
    } else {
        $error = "Username atau password salah!";
    }

    mysqli_stmt_close($stmt);
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Admin - SMK Coding</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<div class="form-page">
    <div class="form-container">
        <div class="form-heading">
            <h1>Login Admin</h1>
            <p>Masuk untuk mengelola data pendaftar SMK Coding.</p>
        </div>

        <?php if ($error != ""): ?>
            <p style="color: red;">
                <?php echo htmlspecialchars($error); ?>
            </p>
        <?php endif; ?>

        <form method="POST">
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username"
                       placeholder="Masukkan username"
                       required>
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password"
                       placeholder="Masukkan password"
                       required>
            </div>

            <div class="form-actions">
                <button type="submit" name="login">
                    Login
                </button>
            </div>
        </form>
    </div>
</div>

</body>
</html>
