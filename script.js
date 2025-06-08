document.addEventListener("DOMContentLoaded", function () {
    // Accordion-style toggle: Only one <details> open at a time
    const allDetails = document.querySelectorAll("details");
    allDetails.forEach((detail) => {
        detail.addEventListener("toggle", function () {
            if (detail.open) {
                allDetails.forEach((otherDetail) => {
                    if (otherDetail !== detail) {
                        otherDetail.open = false;
                    }
                });
            }
        });
    });
});
