
const productSelect = document.getElementById("product");
const brandSelect = document.getElementById("brand");
const resetButton = document.getElementById("resetButton");
const result = document.getElementById("result");
const brandHelp = document.getElementById("brandHelp");

// Daftar merek berdasarkan jenis produk
const productBrands = {
    Desktop: ["ASUS", "Acer", "Lenovo"],
    Laptop: ["ASUS", "HP", "Lenovo"],
    Smartphone: ["Samsung", "Xiaomi", "OPPO", "Iphone"]
};

// Membuat pilihan dropdown merek
function updateBrands(product) {
    brandSelect.replaceChildren();

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = product
        ? "Pilih Merek"
        : "Pilih jenis produk terlebih dahulu";

    brandSelect.appendChild(placeholder);

    if (!product || !productBrands[product]) {
        brandSelect.disabled = true;
        brandHelp.textContent =
            "Pilihan merek akan muncul setelah jenis produk dipilih.";
        return;
    }

    productBrands[product].forEach(function (brand) {
        const option = document.createElement("option");
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
    });

    brandSelect.disabled = false;
    brandHelp.textContent =
        "Pilih merek yang sesuai dengan jenis produk.";
}

// Menampilkan ringkasan pilihan
function showResult(product, brand) {
    result.replaceChildren();

    if (!product || !brand) {
        const message = document.createElement("p");
        message.className = "empty-message";
        message.textContent =
            "Pilih jenis produk dan merek untuk melihat ringkasan.";

        result.appendChild(message);
        return;
    }

    const productLabel = document.createElement("p");
    productLabel.className = "result-label";
    productLabel.textContent = "Jenis Produk";

    const productName = document.createElement("p");
    productName.className = "result-product";
    productName.textContent = product;

    const brandLabel = document.createElement("p");
    brandLabel.className = "result-label";
    brandLabel.textContent = "Merek Terpilih";

    const brandName = document.createElement("span");
    brandName.className = "result-brand";
    brandName.textContent = brand;

    result.append(
        productLabel,
        productName,
        brandLabel,
        brandName
    );
}

// Ketika jenis produk berubah
productSelect.addEventListener("change", function () {
    updateBrands(productSelect.value);
    showResult("", "");
});

// Ketika merek dipilih
brandSelect.addEventListener("change", function () {
    showResult(productSelect.value, brandSelect.value);
});

// Mengembalikan semua pilihan ke kondisi awal
resetButton.addEventListener("click", function () {
    productSelect.value = "";
    updateBrands("");
    showResult("", "");
});

updateBrands("");
