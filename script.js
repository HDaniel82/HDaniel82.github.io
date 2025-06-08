document.addEventListener("DOMContentLoaded", function () {
    let batch = 0;
    const container = document.getElementById("infinite-content");

    function loadMoreContent() {
        for (let i = 0; i < 10; i++) {
            const card = document.createElement("div");
            card.className = "sub-block";
            card.innerHTML = `<h3>Card ${batch * 10 + i + 1}</h3><p>This is auto-loaded content.</p>`;
            container.appendChild(card);
        }
        batch++;
    }

    window.addEventListener("scroll", () => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
        ) {
            loadMoreContent();
        }
    });

    // Initial content load
    loadMoreContent();
    // This function just represents how the tabs for details close upon clicking another tab
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

