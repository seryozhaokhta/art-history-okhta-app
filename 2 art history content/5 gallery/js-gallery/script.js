window.onload = function () {
    const images = document.querySelectorAll('.gallery-image');

    images.forEach(image => {

        image.style.top = `${Math.random() * (window.innerHeight - image.offsetHeight)}px`;
        image.style.left = `${Math.random() * (window.innerWidth - image.offsetWidth)}px`;

        setInterval(() => {
            image.style.top = `${Math.random() * (window.innerHeight - image.offsetHeight)}px`;
            image.style.left = `${Math.random() * (window.innerWidth - image.offsetWidth)}px`;
        }, 2000);
    });
}
