document.addEventListener('alpine:init', () => {
    Alpine.data('produk', () => ({
        items: [
            {
                id: 1,
                name: "Hyperspeed 2.0 IN",
                img: 'hyperspeed.heic',
                price: 500000
            },
            {
                id: 2,
                name: "Lightspeed Reborn Illuminate FG",
                img: 'iluminet fg.webp',
                price: 500000
            },
            {
                id: 3,
                name: "Lightspeed Reborn VanDousen IN",
                img: 'vandousen.webp',
                price: 500000
            },
            {
                id: 4,
                name: "Lightspeed Reborn Silver IN",
                img: 'silver.webp',
                price: 500000
            },
            {
                id: 5,
                name: "Lightspeed Reborn Diva Pink FG",
                img: 'pink.webp',
                price: 500000
            },
            {
                id: 6,
                name: "Ortuseight Unity SE FG",
                img: 'unity.webp',
                price: 500000
            },
            {
                id: 7,
                name: "Lightspeed Reborn Metacrush IN",
                img: 'ijo.webp',
                price: 500000
            }
        ]
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            const cartItem = this.items.find((item) => item.id === newItem.id);

            if (newItem.id === 1) {
                // Hyperspeed 2.0 IN can be added multiple times but max 2
                if (!cartItem) {
                    this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                    this.quantity++;
                    this.total += newItem.price;
                } else if (cartItem.quantity < 2) {
                    this.items = this.items.map((item) => {
                        if (item.id !== newItem.id) {
                            return item;
                        } else {
                            item.quantity++;
                            item.total = item.price * item.quantity;
                            this.quantity++;
                            this.total += item.price;
                            return item;
                        }
                    });
                } else {
                    alert('Item ini hanya bisa ditambahkan maksimal 2 kali.');
                }
            } else {
                // Other items can only be added once
                if (!cartItem) {
                    this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                    this.quantity++;
                    this.total += newItem.price;
                } else {
                    alert('Item ini hanya bisa ditambahkan sekali.');
                }
            }
        },
        remove(id) {
            const cartItem = this.items.find((item) => item.id === id);
            if (cartItem.quantity > 1) {
                this.items = this.items.map((item) => {
                    if (item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });
            } else if (cartItem.quantity === 1) {
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
    });
});
