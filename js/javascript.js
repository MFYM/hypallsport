// toogle class aktif //
const navbarNav = document.querySelector(".navbar-nav");
// ketika di klik //
document.querySelector("#menu").onclick = () => {
  navbarNav.classList.toggle("active");
  
};

//klik diluar sidebar utk menghilangkan nav

const menu = document.querySelector("#menu");
const sc = document.querySelector('#cart-button');
document.addEventListener("click", function (e) {
  if (!menu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

//toogle class aktif//
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#cart-button').onclick = () => {
  shoppingCart.classList.toggle('active');
  e.preventDefault();
}

const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');
form.addEventListener('keyup', function () {
    let allFilled = true;
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value.trim() === '') {
            allFilled = false;
            break;
        }
    }

    if (allFilled) {
        checkoutButton.disabled = false;
        checkoutButton.classList.remove('disabled');
    } else {
        checkoutButton.disabled = true;
        checkoutButton.classList.add('disabled');
    }
});


//konversi ke rupiah\
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
  minimumFractionDigits: 0,
}).format(number)
};
document.getElementById('checkoutForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Ambil data dari form
  const formData = new FormData(this);

  // Ambil nilai items dan ubah dari string JSON menjadi array objek
  const itemsString = formData.get('items');
  const items = JSON.parse(itemsString);

  // Buat pesan WhatsApp dengan format yang lebih rapih
  let message = "Pesanan baru:\n\n";
  message += "Items:\n";
  items.forEach((item, index) => {
      message += `(${index + 1}) ${item.name} - ${item.quantity} pcs\n`;
      message += `   Harga per item: Rp ${item.price.toLocaleString()}\n`;
      message += `   Total per item: Rp ${item.total.toLocaleString()}\n\n`;
  });

  // Tambahkan informasi pelanggan
  message += `Nama: ${formData.get('name')}\n`;
  message += `Email: ${formData.get('email')}\n`;
  message += `Phone: ${formData.get('phone')}\n`;

  // Kirim pesan ke WhatsApp menggunakan URL WhatsApp API
  const whatsappNumber = formData.get('whatsapp');
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

  // Buka link WhatsApp dalam tab baru
  window.open(whatsappUrl, '_blank');
});


