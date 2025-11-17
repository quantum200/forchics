document.addEventListener('DOMContentLoaded', () => {
    const primaryAddToCartBtn = document.getElementById('add-to-cart-btn');
    const stickyAddToCartBtn = document.querySelector('.add-to-cart-btn');
    const loginIconContainer = document.getElementById('cart-icon-clickable');
    const cartModal = document.getElementById('cart-modal');
    const cartCountSpan = loginIconContainer.querySelector('.cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const itemTemplate = document.getElementById('cart-item-template');
    const closeBtn = document.querySelector('.close-btn');
    const oldTotalSpan = document.querySelector('.old-total');
    const currentTotalSpan = document.querySelector('.current-total');

    if (!loginIconContainer || !cartModal || !cartItemsContainer || !itemTemplate) {
        return;
    }

    let cartCount = 0;
    const itemPrice = 22;
    const itemOldPrice = 39;

    const openCartModal = () => {
        cartModal.style.display = 'flex';
        document.body.classList.add('no-scroll');
        document.documentElement.classList.add('no-scroll');
    };

    const closeCartModal = () => {
        cartModal.style.display = 'none';
        document.body.classList.remove('no-scroll');
        document.documentElement.classList.remove('no-scroll');
    };

    const updateCartTotal = (quantity) => {
        const newTotal = quantity * itemPrice;
        const newOldTotal = quantity * itemOldPrice;

        if (currentTotalSpan) currentTotalSpan.textContent = `$${newTotal}`;
        if (oldTotalSpan) oldTotalSpan.textContent = `$${newOldTotal}`;

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
            oldPrice.textContent = `$${quantity * itemOldPrice}`;
            currentPrice.textContent = `$${quantity * itemPrice}`;

            cartItemsContainer.appendChild(itemClone);
        }
    };

    const handleAddToCart = () => {
        cartCount++;
        updateCartTotal(cartCount);
        renderCartItem(cartCount);
        openCartModal();
    };

    if (primaryAddToCartBtn) {
        primaryAddToCartBtn.addEventListener('click', handleAddToCart);
    }

    if (stickyAddToCartBtn) {
        stickyAddToCartBtn.addEventListener('click', handleAddToCart);
    }


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
            closeCartModal();
        }
    });

    loginIconContainer.addEventListener('click', () => {
        openCartModal();
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeCartModal();
        });
    }

    cartModal.addEventListener('click', (e) => {
        if (e.target.id === 'cart-modal') {
            closeCartModal();
        }
    });

    updateCartTotal(0);
    renderCartItem(0);
});