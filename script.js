const addItemBtn = document.getElementById("addItemBtn");
const payBtn = document.getElementById("payBtn");
const clearBtn = document.getElementById("clearBtn");
const itemsTableBody = document.getElementById("itemsTableBody");
const subtotalEl = document.getElementById("subtotal");
const itemCountEl = document.getElementById("itemCount");
const receiptItems = document.getElementById("receiptItems");
const receiptTotal = document.getElementById("receiptTotal");
const paymentInput = document.getElementById("payment");
const changeText = document.getElementById("changeText");
const currentDate = document.getElementById("currentDate");
const receiptTime = document.getElementById("receiptTime");

let items = [];

updateDateTime();
renderItems();

addItemBtn.addEventListener("click", () => {
  const name = document.getElementById("itemName").value.trim();
  const price = Number(document.getElementById("price").value);
  const quantity = Number(document.getElementById("quantity").value);

  if (!name || price <= 0 || quantity <= 0) {
    alert("Silakan isi nama barang, harga, dan jumlah dengan benar.");
    return;
  }

  items.push({ name, price, quantity, total: price * quantity });
  renderItems();
  paymentInput.value = "";
  changeText.textContent = "";
});

payBtn.addEventListener("click", () => {
  if (items.length === 0) {
    alert("Tambahkan minimal satu barang sebelum melakukan pembayaran.");
    return;
  }

  const payment = Number(paymentInput.value);
  const subtotal = calculateSubtotal();

  if (payment <= 0 || Number.isNaN(payment)) {
    alert("Masukkan jumlah uang bayar yang valid.");
    return;
  }

  if (payment < subtotal) {
    changeText.style.color = "var(--danger)";
    changeText.textContent = "Uang bayar kurang. Tambahkan uang atau kurangi jumlah barang.";
    return;
  }

  const change = payment - subtotal;
  changeText.style.color = "var(--success)";
  changeText.textContent = `Kembalian: ${formatRupiah(change)}`;
});

clearBtn.addEventListener("click", () => {
  if (!confirm("Yakin ingin membatalkan transaksi? Semua data akan dihapus.")) {
    return;
  }

  items = [];
  document.getElementById("itemName").value = "";
  document.getElementById("price").value = "0";
  document.getElementById("quantity").value = "1";
  paymentInput.value = "";
  changeText.textContent = "";
  renderItems();
});

function renderItems() {
  const subtotal = calculateSubtotal();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  subtotalEl.textContent = formatRupiah(subtotal);
  itemCountEl.textContent = count;
  receiptTotal.textContent = formatRupiah(subtotal);

  if (items.length === 0) {
    itemsTableBody.innerHTML = `<tr><td colspan="3" class="empty">Belum ada barang</td></tr>`;
    receiptItems.innerHTML = `<p>Tambahkan barang untuk membuat nota.</p>`;
    return;
  }

  itemsTableBody.innerHTML = items
    .map(
      (item) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${formatRupiah(item.total)}</td>
      </tr>`
    )
    .join("");

  receiptItems.innerHTML = items
    .map(
      (item) => `
      <div class="receipt-item">
        <div>
          <strong>${item.name}</strong>
          <span>${item.quantity} x ${formatRupiah(item.price)}</span>
        </div>
        <strong>${formatRupiah(item.total)}</strong>
      </div>`
    )
    .join("");
}

function calculateSubtotal() {
  return items.reduce((sum, item) => sum + item.total, 0);
}

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(number);
}

function updateDateTime() {
  const now = new Date();
  currentDate.textContent = now.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  receiptTime.textContent = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
