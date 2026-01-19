const usdInput = document.getElementById("usd");
const idrInput = document.getElementById("idr");
const feeInput = document.getElementById("fee");
const warningText = document.getElementById("warning");
const waBtn = document.getElementById("waBtn");

const RATE = 16300;                  // Kurs USD → IDR
const WA_NUMBER = "6281234567890";   // Ganti nomor admin

usdInput.addEventListener("input", () => {
  const usd = parseFloat(usdInput.value);

  waBtn.disabled = true; // Tombol WA default mati

  if (!usd || usd <= 0) {
    idrInput.value = "";
    feeInput.value = "";
    warningText.style.display = "none";
    return;
  }

  // Warning minimal USD 5
  if (usd < 5) {
    warningText.style.display = "block";
    idrInput.value = "—";
    feeInput.value = "—";
    return;
  }

  warningText.style.display = "none";

  // HITUNG FEE OTOMATIS
  let feeUSD = 0;
  if (usd < 10) feeUSD = 1;
  else if (usd <= 50) feeUSD = 1.7;
  else if (usd <= 100) feeUSD = 2;
  else if (usd <= 150) feeUSD = 2.5;
  else if (usd <= 200) feeUSD = 3;
  else feeUSD = 3;

  feeInput.value = `$${feeUSD}`;

  // TOTAL IDR = (USD + Fee) * RATE
  const totalIDR = (usd + feeUSD) * RATE;
  idrInput.value = "Rp " + totalIDR.toLocaleString("id-ID");

  waBtn.disabled = false; // Tombol WA aktif
});

// Tombol WhatsApp
waBtn.addEventListener("click", () => {
  const usd = parseFloat(usdInput.value);
  if (usd < 5) return;

  const feeUSD = parseFloat(feeInput.value.replace("$","")) || 0;
  const totalIDR = (usd + feeUSD) * RATE;

  const message = `
Halo Admin PayRupiah 👋

Saya ingin melakukan penukaran saldo PayPal:

• Nominal USD : $${usd}
• Fee         : $${feeUSD}
• Total IDR   : Rp ${totalIDR.toLocaleString("id-ID")}

Mohon info langkah selanjutnya 🙏
  `.trim();

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});
