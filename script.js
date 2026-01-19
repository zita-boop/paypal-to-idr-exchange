const usdInput = document.getElementById("usd");
const idrInput = document.getElementById("idr");
const warningText = document.getElementById("warning");
const waBtn = document.getElementById("waBtn");

const RATE = 16300;
const WA_NUMBER = "6281234567890"; // GANTI nomor admin

usdInput.addEventListener("input", () => {
  const usd = parseFloat(usdInput.value);

  // Reset
  waBtn.disabled = true;

  if (!usd || usd <= 0) {
    idrInput.value = "";
    warningText.style.display = "none";
    return;
  }

  if (usd < 5) {
    warningText.style.display = "block";
    idrInput.value = "—";
    return;
  }

  warningText.style.display = "none";

  const total = usd * RATE;
  idrInput.value = "Rp " + total.toLocaleString("id-ID");

  waBtn.disabled = false;
});

waBtn.addEventListener("click", () => {
  const usd = parseFloat(usdInput.value);
  if (usd < 5) return;

  const idr = usd * RATE;

  const message = `
Halo Admin PayRupiah 👋

Saya ingin melakukan penukaran saldo PayPal dengan detail:

• Nominal USD : $${usd}
• Kurs        : Rp 16.300
• Total IDR   : Rp ${idr.toLocaleString("id-ID")}

Mohon info langkah selanjutnya 🙏
  `.trim();

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});
