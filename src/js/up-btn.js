const upBtnContainer = document.querySelector(".scroll-container");
const upBtn = document.querySelector(".scroll-btn");

addEventListener('scroll', checkScrolling, { once: true });
upBtn.addEventListener('click', scrollUp);

function checkScrolling() {
    if (window.scrollY > 0) {
        upBtnContainer.style.transform = 'translateY(0)';
    } else {
        if (window.innerWidth < 768) {
            upBtnContainer.style.transform = 'translateY(60px)';
        } else {
            upBtnContainer.style.transform = 'translateY(120px)';
        }
    }
}

function scrollUp() {
    window.scroll({
        top: 0,
        behavior: 'smooth',
    });

    if (window.innerWidth < 768) {
        upBtnContainer.style.transform = 'translateY(60px)';
    } else {
        upBtnContainer.style.transform = 'translateY(120px)';
    }

    removeEventListener('scroll', checkScrolling);

    setTimeout(() => {
        addEventListener('scroll', checkScrolling, { once: true });
    }, 1000);
}