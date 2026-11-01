```javascript
let cart = [];

function addToCart(name, price) {
    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    alert(name + " added to cart!");
}

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");
    let cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;

        total += itemTotal;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h3>${escapeHTML(item.name)}</h3>
                    <p>Price: ₹${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Subtotal: ₹${itemTotal}</p>
                </div>

                <div>
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                    <button onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        `;
    });

    cartCount.innerText = count;
    cartTotal.innerText = total.toFixed(2);
}

function changeQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function openCart() {
    document.getElementById("cart-section").scrollIntoView({
        behavior: "smooth"
    });
}

function showBilling() {
    if (cart.length === 0) {
        alert("Please add books to your cart first!");
        return;
    }

    document.getElementById("billing-section").style.display = "block";

    document.getElementById("billing-section").scrollIntoView({
        behavior: "smooth"
    });
}

function searchBooks() {
    let input = document.getElementById("searchInput").value.toLowerCase().trim();

    let books = document.querySelectorAll(".book-card");

    let found = 0;

    books.forEach(book => {
        let text = book.innerText.toLowerCase();

        if (text.includes(input)) {
            book.style.display = "block";
            found++;
        } else {
            book.style.display = "none";
        }
    });

    if (found === 0) {
        alert("No books found!");
    }
}

document.getElementById("searchInput").addEventListener("input", searchBooks);

function generateBill() {
    let name = document.getElementById("customer-name").value.trim();
    let phone = document.getElementById("customer-phone").value.trim();
    let address = document.getElementById("customer-address").value.trim();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    if (name === "") {
        alert("Please enter customer name!");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Enter valid 10 digit mobile number!");
        return;
    }

    if (address === "") {
        alert("Please enter customer address!");
        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    let discount = subtotal * 0.20;
    let afterDiscount = subtotal - discount;
    let gst = afterDiscount * 0.05;
    let grandTotal = afterDiscount + gst;

    let date = new Date().toLocaleDateString("en-IN");

    document.getElementById("invoice-details").innerHTML = `
        <p><b>Customer Name:</b> ${escapeHTML(name)}</p>
        <p><b>Mobile Number:</b> ${escapeHTML(phone)}</p>
        <p><b>Address:</b> ${escapeHTML(address)}</p>
        <p><b>Invoice Date:</b> ${date}</p>
        <p><b>Invoice Number:</b> BW${Date.now()}</p>
    `;

    let table = `
        <table>
            <tr>
                <th>Book Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
            </tr>
    `;

    cart.forEach(item => {
        table += `
            <tr>
                <td>${escapeHTML(item.name)}</td>
                <td>₹${item.price}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price * item.quantity}</td>
            </tr>
        `;
    });

    table += "</table>";

    document.getElementById("invoice-items").innerHTML = table;

    document.getElementById("invoice-total").innerHTML = `
        <p>Subtotal: ₹${subtotal.toFixed(2)}</p>
        <p>Discount (20%): - ₹${discount.toFixed(2)}</p>
        <p>GST (5%): ₹${gst.toFixed(2)}</p>
        <h2>Grand Total: ₹${grandTotal.toFixed(2)}</h2>
        <h3>Thank You For Shopping With BookWorld!</h3>
    `;

    document.getElementById("invoice").style.display = "block";

    document.getElementById("invoice").scrollIntoView({
        behavior: "smooth"
    });
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function(char) {
        return {
```
