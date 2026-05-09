document.querySelectorAll(".gallery img"). forEach(img => {
    img.onclick = () => {
        big.src = img.src;
        desc.textContent = img.dataset.text;
        box.style.display = "block";
    };
});