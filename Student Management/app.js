// DATA MAHASISWA
const tableBody = document.getElementById("studentTableBody");
const dataInfo = document.getElementById("dataInfo");
const dataPerPage = 5;
let currentPage = 1;

// FORM
const form = document.querySelector(".student-form");
const nimInput = document.getElementById("nim");
const namaInput = document.getElementById("nama");
const jurusanInput = document.getElementById("jurusan");
const emailInput = document.getElementById("email");
const cancelButton = document.getElementById("cancelButton");
const resetButton = document.getElementById("resetButton");

// SEARCH
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

// AMBIL DATA DARI HTML
let students = [];

const rows = tableBody.querySelectorAll("tr");

rows.forEach((row) => {
    const cells = row.querySelectorAll("td");

    if (cells.length >= 5) {
        students.push({
            nim: cells[1].textContent.trim(),
            nama: cells[2].textContent.trim(),
            jurusan: cells[3].textContent.trim(),
            email: cells[4].textContent.trim()
        });
    }
});

// TAMPILKAN DATA KE TABEL
function renderTable() {
    tableBody.innerHTML = "";

    students.forEach((student, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.nim}</td>
            <td>${student.nama}</td>
            <td>${student.jurusan}</td>
            <td>${student.email}</td>

            <td>
                <div class="actions">
                    <button
                        class="action edit"
                        type="button"
                    >
                        Edit
                    </button>

                    <button
                        class="action delete"
                        type="button"
                    >
                        Hapus
                    </button>
                </div>
            </td>
        `;

        // TOMBOL EDIT
        const editButton = row.querySelector(".edit");

        editButton.addEventListener("click", function () {
            nimInput.value = student.nim;
            namaInput.value = student.nama;
            jurusanInput.value = student.jurusan;
            emailInput.value = student.email;

            form.dataset.editIndex = index;
            form.querySelector(".btn-primary").textContent = "Update";
        });

        // TOMBOL HAPUS
        const deleteButton = row.querySelector(".delete");
        deleteButton.addEventListener("click", function () {
            const yakin = confirm(
                `Hapus mahasiswa ${student.nama}?`
            );

            if (!yakin) {
                return;
            }

            students.splice(index, 1);
            renderTable();
            displayData();
        });

        tableBody.appendChild(row);
    });
}

// TAMPILKAN DATA
function displayData() {

    const keyword = searchInput.value
        .toLowerCase()
        .trim();
    const rows = Array.from(
        tableBody.querySelectorAll("tr")
    );

    // FILTER
    const filteredRows = rows.filter((row) => {
        const text = row.textContent.toLowerCase();

        return text.includes(keyword);
    });

    const totalData = filteredRows.length;
    const totalPages = Math.max(
        1,
        Math.ceil(totalData / dataPerPage)
    );

    // CEK HALAMAN
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const start = (currentPage - 1) * dataPerPage;
    const end = start + dataPerPage;

    // SEMBUNYIKAN SEMUA DATA
    rows.forEach((row) => {
        row.style.display = "none";
    });

    // TAMPILKAN 5 DATA
    filteredRows.forEach((row, index) => {

        if (
            index >= start &&
            index < end
        ) {
            row.style.display = "";
        }
    });

    // INFO DATA
    if (totalData === 0) {
        dataInfo.textContent = "Menampilkan 0 data";
    } else {
        const firstData = start + 1;
        const lastData = Math.min(
            end,
            totalData
        );

        dataInfo.textContent =
            `Menampilkan ${firstData} - ${lastData} dari ${totalData} data`;
    }

    // PAGINATION
    updatePagination(totalPages);
}

// PAGINATION
function updatePagination(totalPages) {

    const pagination =
        document.querySelector(".pagination");
        
    pagination.innerHTML = "";

    // PREVIOUS
    const prevButton =
        document.createElement("button");
    prevButton.textContent = "«";
    prevButton.disabled =
        currentPage === 1;
    prevButton.addEventListener(
        "click",
        function () {

            if (currentPage > 1) {

                currentPage--;

                displayData();
            }
        }
    );

    pagination.appendChild(prevButton);

    // NOMOR HALAMAN
    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {

        const pageButton =
            document.createElement("button");

        pageButton.textContent = i;

        if (i === currentPage) {
            pageButton.classList.add("active");
        }

        pageButton.addEventListener(
            "click",
            function () {
                currentPage = i;

                displayData();
            }
        );

        pagination.appendChild(pageButton);
    }

    // NEXT
    const nextButton =
        document.createElement("button");
    nextButton.textContent = "»";
    nextButton.disabled =
        currentPage === totalPages;
    nextButton.addEventListener(
        "click",
        function () {

            if (currentPage < totalPages) {
                currentPage++;

                displayData();
            }
        }
    );
    pagination.appendChild(nextButton);
}

// SIMPAN / UPDATE MAHASISWA
form.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const nim =
            nimInput.value.trim();
        const nama =
            namaInput.value.trim();
        const jurusan =
            jurusanInput.value;
        const email =
            emailInput.value.trim();

        // CEK INPUT
        if (
            nim === "" ||
            nama === "" ||
            jurusan === "" ||
            email === ""
        ) {
            alert(
                "Semua data mahasiswa harus diisi!"
            );

            return;
        }

        // CEK MODE EDIT
        const editIndex =
            form.dataset.editIndex;

        if (editIndex !== undefined) {

            // CEK NIM DUPLIKAT
            const nimDuplikat =
                students.some(
                    (student, index) =>
                        student.nim === nim &&
                        index !== Number(editIndex)
                );

            if (nimDuplikat) {
                alert(
                    "NIM sudah digunakan mahasiswa lain!"
                );

                return;
            }

            // UPDATE DATA
            students[editIndex] = {
                nim: nim,
                nama: nama,
                jurusan: jurusan,
                email: email
            };

            alert(
                "Data mahasiswa berhasil diperbarui!"
            );

            // KELUAR DARI MODE EDIT
            delete form.dataset.editIndex;

            // KEMBALIKAN TOMBOL
            form.querySelector(
                ".btn-primary"
            ).textContent = "Simpan";

        } else {

            // CEK NIM DUPLIKAT
            const nimSudahAda =
                students.some(
                    (student) =>
                        student.nim === nim
                );

            if (nimSudahAda) {

                alert(
                    "NIM sudah terdaftar!"
                );

                return;
            }

            // TAMBAHKAN DATA
            students.push({
                nim: nim,
                nama: nama,
                jurusan: jurusan,
                email: email
            });

            alert(
                "Data mahasiswa berhasil disimpan!"
            );
        }

        // TAMPILKAN ULANG TABEL
        renderTable();

        // KEMBALI KE HALAMAN PERTAMA
        currentPage = 1;

        // KOSONGKAN FORM
        form.reset();

        // TAMPILKAN DATA
        displayData();
    }
);

// BATAL
cancelButton.addEventListener(
    "click",
    function () {

        // KOSONGKAN FORM
        form.reset();

        // KELUAR DARI MODE EDIT
        delete form.dataset.editIndex;

        // KEMBALIKAN TOMBOL
        form.querySelector(
            ".btn-primary"
        ).textContent = "Simpan";
    }
);

// RESET
resetButton.addEventListener(
    "click",
    function () {

        form.reset();
    }
);

// SEARCH
searchButton.addEventListener(
    "click",
    function () {

        currentPage = 1;

        displayData();
    }
);

// SEARCH DENGAN ENTER
searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            currentPage = 1;

            displayData();
        }
    }
);

// TAMPILKAN DATA AWAL
renderTable();
displayData();