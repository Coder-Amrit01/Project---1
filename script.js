document.addEventListener("DOMContentLoaded", () => {


    /* ================= MOBILE NAV ================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            mainNav.classList.toggle("open");

            const isOpen = mainNav.classList.contains("open");

            menuToggle.textContent = isOpen ? "✕" : "☰";

        });


        document.querySelectorAll(".main-nav a").forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.textContent = "☰";

            });

        });

    }


    /* ================= NEWSLETTER ================= */

    document.querySelectorAll(".newsletter-form").forEach(form => {

        form.addEventListener("submit", event => {

            event.preventDefault();

            const input = form.querySelector("input");

            if (!input || !input.value.trim()) {
                return;
            }

            const button = form.querySelector("button");

            if (button) {
                button.textContent = "✓";
            }

            input.value = "";
            input.placeholder = "You're subscribed!";

        });

    });


    /* ================= COUNTDOWN ================= */

    const countdown = document.querySelector(".countdown");

    if (countdown) {

        const target = countdown.dataset.target;

        const targetDate = new Date(target).getTime();


        function updateCountdown() {

            const now = new Date().getTime();

            let difference = targetDate - now;

            if (difference < 0) {
                difference = 0;
            }


            const days = Math.floor(
                difference / (1000 * 60 * 60 * 24)
            );

            const hours = Math.floor(
                (difference / (1000 * 60 * 60)) % 24
            );

            const minutes = Math.floor(
                (difference / (1000 * 60)) % 60
            );

            const seconds = Math.floor(
                (difference / 1000) % 60
            );


            const daysElement = document.getElementById("days");
            const hoursElement = document.getElementById("hours");
            const minutesElement = document.getElementById("minutes");
            const secondsElement = document.getElementById("seconds");


            if (daysElement) {
                daysElement.textContent = String(days).padStart(2, "0");
            }

            if (hoursElement) {
                hoursElement.textContent = String(hours).padStart(2, "0");
            }

            if (minutesElement) {
                minutesElement.textContent = String(minutes).padStart(2, "0");
            }

            if (secondsElement) {
                secondsElement.textContent = String(seconds).padStart(2, "0");
            }

        }


        updateCountdown();

        setInterval(updateCountdown, 1000);

    }


    /* ================= GALLERY LIGHTBOX ================= */

    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-img");
    const caption = document.getElementById("caption");
    const closeModal = document.getElementById("close-modal");

    const galleryImages = document.querySelectorAll(".gallery-image");


    if (modal && modalImage) {

        galleryImages.forEach(image => {

            image.addEventListener("click", () => {

                modalImage.src = image.src;

                modalImage.alt = image.alt;

                if (caption) {
                    caption.textContent =
                        image.dataset.caption || image.alt;
                }

                modal.classList.add("show");

                document.body.style.overflow = "hidden";

            });

        });


        function hideModal() {

            modal.classList.remove("show");

            document.body.style.overflow = "";

        }


        if (closeModal) {
            closeModal.addEventListener("click", hideModal);
        }


        modal.addEventListener("click", event => {

            if (event.target === modal) {
                hideModal();
            }

        });


        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                hideModal();
            }

        });

    }


    /* ================= CONTACT FORM ================= */

    const contactForm = document.getElementById("contact-form");
    const statusMessage = document.getElementById("status-message");


    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();


            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");


            if (
                !name ||
                !email ||
                !message ||
                !name.value.trim() ||
                !email.value.trim() ||
                !message.value.trim()
            ) {

                if (statusMessage) {

                    statusMessage.textContent =
                        "Please complete all fields.";

                    statusMessage.className =
                        "form-status error";

                }

                return;
            }


            if (statusMessage) {

                statusMessage.textContent =
                    `Thanks ${name.value.trim()} — your message has been received.`;

                statusMessage.className =
                    "form-status success";

            }


            contactForm.reset();

        });

    }


    /* ================= TICKET CALCULATOR ================= */

    const seatType = document.getElementById("seatType");
    const quantity = document.getElementById("quantity");
    const ticketTotal = document.getElementById("ticket-total");


    const seatPrices = {
        general: 30,
        premium: 100,
        vip: 200
    };


    function updateTicketTotal() {

        if (!seatType || !quantity || !ticketTotal) {
            return;
        }


        const type = seatType.value;

        let amount = parseInt(quantity.value, 10);

        if (isNaN(amount) || amount < 1) {
            amount = 1;
        }

        if (amount > 10) {
            amount = 10;
            quantity.value = 10;
        }


        const price = seatPrices[type] || 30;

        const total = price * amount;

        ticketTotal.textContent =
            `$${total.toFixed(2)}`;

    }


    if (seatType) {
        seatType.addEventListener("change", updateTicketTotal);
    }

    if (quantity) {
        quantity.addEventListener("input", updateTicketTotal);
    }

    updateTicketTotal();


    /* ================= JERSEY CALCULATOR ================= */

    const jerseyQuantity =
        document.getElementById("jersey-quantity");

    const jerseyTotal =
        document.getElementById("jersey-total");


    function updateJerseyTotal() {

        if (!jerseyQuantity || !jerseyTotal) {
            return;
        }


        let amount =
            parseInt(jerseyQuantity.value, 10);


        if (isNaN(amount) || amount < 1) {
            amount = 1;
        }


        if (amount > 10) {
            amount = 10;
            jerseyQuantity.value = 10;
        }


        const total = 49.99 * amount;

        jerseyTotal.textContent =
            `$${total.toFixed(2)}`;

    }


    if (jerseyQuantity) {
        jerseyQuantity.addEventListener(
            "input",
            updateJerseyTotal
        );
    }

    updateJerseyTotal();


    /* ================= DEMO PURCHASE ================= */

    document.querySelectorAll("[data-demo-purchase]").forEach(button => {

        button.addEventListener("click", () => {

            const form = button.closest("form");

            if (!form) {
                return;
            }


            const message =
                form.querySelector("#purchase-message");


            /* TICKETS */

            if (form.id === "ticket-form") {

                const match =
                    document.getElementById("match");

                if (!match || !match.value) {

                    if (message) {

                        message.textContent =
                            "Please select a match first.";

                        message.className =
                            "form-status error";

                    }

                    return;
                }

            }


            /* JERSEY */

            if (form.querySelector("#jersey-size")) {

                const size =
                    document.getElementById("jersey-size");

                if (!size || !size.value) {

                    if (message) {

                        message.textContent =
                            "Please select a jersey size.";

                        message.className =
                            "form-status error";

                    }

                    return;
                }

            }


            if (message) {

                message.textContent =
                    "Demo order created successfully. No real payment was processed.";

                message.className =
                    "form-status success";

            }

        });

    });


    /* ================= FAN CLUB ================= */

    const fanForm =
        document.getElementById("fan-form");

    const fanMessage =
        document.getElementById("fan-message");


    if (fanForm) {

        fanForm.addEventListener("submit", event => {

            event.preventDefault();


            const name =
                document.getElementById("fan-name");


            if (!name || !name.value.trim()) {

                if (fanMessage) {

                    fanMessage.textContent =
                        "Please enter your name.";

                    fanMessage.className =
                        "form-status error";

                }

                return;
            }


            if (fanMessage) {

                fanMessage.textContent =
                    `Welcome to the Singh FC Fan Club, ${name.value.trim()}!`;

                fanMessage.className =
                    "form-status success";

            }


            fanForm.reset();

        });

    }

});