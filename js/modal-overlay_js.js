document.addEventListener('DOMContentLoaded', () => {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const loginIconContainer = document.getElementById('cart-icon-clickable');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close-btn');
    const cartCountSpan = loginIconContainer.querySelector('.cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const itemTemplate = document.getElementById('cart-item-template');
    const oldTotalSpan = document.querySelector('.old-total');
    const currentTotalSpan = document.querySelector('.current-total');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutBtn = document.querySelector('.close-checkout-btn');
    const orderForm = document.getElementById('order-form');

    if (!addToCartBtn || !loginIconContainer || !cartModal || !checkoutModal || !itemTemplate) {
        return;
    }

    let cartCount = 0;
    const itemPrice = 795;
    const itemOldPrice = 1145;

    const closeAllModals = () => {
        cartModal.style.display = 'none';
        checkoutModal.style.display = 'none';
        document.body.classList.remove('no-scroll');
        document.documentElement.classList.remove('no-scroll');
    };

    const openCartModal = () => {
        closeAllModals();
        cartModal.style.display = 'flex';
        document.body.classList.add('no-scroll');
        document.documentElement.classList.add('no-scroll');
    };

    const openCheckoutModal = () => {
        closeAllModals();
        checkoutModal.style.display = 'flex';
        document.body.classList.add('no-scroll');
        document.documentElement.classList.add('no-scroll');
    };

    const updateCartTotal = (quantity) => {
        const newTotal = quantity * itemPrice;
        const newOldTotal = quantity * itemOldPrice;

        if (currentTotalSpan) currentTotalSpan.textContent = `${newTotal} грн`;
        if (oldTotalSpan) oldTotalSpan.textContent = `${newOldTotal} грн`;

        if (cartCountSpan) cartCountSpan.textContent = quantity;

        if (cartCountSpan) {
            cartCountSpan.style.display = quantity > 0 ? 'block' : 'none';
        }

        cartItemsContainer.style.display = quantity > 0 ? 'block' : 'none';
    };

    const renderCartItem = (quantity) => {
        cartItemsContainer.innerHTML = '';

        if (quantity > 0) {
            const itemClone = itemTemplate.content.cloneNode(true);
            const qtyInput = itemClone.querySelector('.qty-input');
            const oldPrice = itemClone.querySelector('.old-price');
            const currentPrice = itemClone.querySelector('.current-price');

            qtyInput.value = quantity;
            oldPrice.textContent = `${quantity * itemOldPrice} грн`;
            currentPrice.textContent = `${quantity * itemPrice} грн`;

            cartItemsContainer.appendChild(itemClone);
        }
    };

    addToCartBtn.addEventListener('click', () => {
        cartCount++;
        updateCartTotal(cartCount);
        renderCartItem(cartCount);
        openCartModal();
    });

    cartItemsContainer.addEventListener('click', (e) => {
        const itemElement = e.target.closest('.cart-item');
        if (!itemElement) return;

        if (e.target.classList.contains('plus-btn')) {
            cartCount++;
            updateCartTotal(cartCount);
            renderCartItem(cartCount);
        } else if (e.target.classList.contains('minus-btn')) {
            if (cartCount > 1) {
                cartCount--;
                updateCartTotal(cartCount);
                renderCartItem(cartCount);
            }
        } else if (e.target.classList.contains('remove-btn')) {
            cartCount = 0;
            updateCartTotal(cartCount);
            renderCartItem(cartCount);
            closeAllModals();
        }
    });

    loginIconContainer.addEventListener('click', () => {
        openCartModal();
    });

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            openCheckoutModal();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeAllModals);
    }

    if (closeCheckoutBtn) {
        closeCheckoutBtn.addEventListener('click', closeAllModals);
    }

    document.addEventListener('click', (e) => {
        if (e.target.id === 'cart-modal' || e.target.id === 'checkout-modal') {
            closeAllModals();
        }
    });

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Дані не відправляються. Це лише демонстрація виду!");
            closeAllModals();
        });
    }

    updateCartTotal(0);
    renderCartItem(0);
});