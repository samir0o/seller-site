document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  const cartCount = document.getElementById("cart-count");
  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
  const cartBox = document.getElementById("cart-box");
  const cartBtn = document.getElementById("cart-btn");
  const cartItemsUl = document.getElementById("cart-items");
  const clearCartBtn = document.getElementById("clear-cart");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  cartBtn.addEventListener("click", () => {
    cartBox.style.display = cartBox.style.display === "block" ? "none" : "block";
  });

  function loadCart() {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItemsUl.innerHTML = "";
    items.forEach((title, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${title}</span>
        <button onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button>
      `;
      cartItemsUl.appendChild(li);
    });
    cartCount.textContent = items.length;
  }

  addToCartBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.dataset.title;
      const items = JSON.parse(localStorage.getItem("cartItems")) || [];
      items.push(title);
      localStorage.setItem("cartItems", JSON.stringify(items));
      loadCart();
    });
  });

  clearCartBtn.addEventListener("click", () => {
    localStorage.removeItem("cartItems");
    loadCart();
  });

  loadCart();

  window.removeFromCart = function(index) {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    items.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(items));
    loadCart();
  };

  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");

  if (nextButton && prevButton) {
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);
  }

  showSlide(currentSlide);

  setInterval(() => {
    nextSlide();
  }, 3000);

});
