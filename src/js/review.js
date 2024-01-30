const g = document.querySelector('header')
const ratingSendBtn = document.querySelector('.rating-send-btn');
const ratingStars = document.querySelectorAll('.rating-stars-btn');

export function renderReview() {



    if (jsBox == null) {
        document.body.insertAdjacentHTML('beforeend', ` <div class="js-box"></div>`)
    }

    const jsBox = document.querySelector('.js-box');
    jsBox.insertAdjacentHTML('beforeend', `
    <div class="rating-backdrop">
    <div class="rating">

        <button type="button" class="rating-close-btn">
            <svg class="rating-close-btn-icon">
                <use href="./images/icons.svg#icon-close"></use>
            </svg>
        </button>

        <form action="post" class="rating-form">

            <p class="rating-stars-text">Rating</p>

            <div class="rating-stars-box">

                <p class="rating-number">0.0</p>

                <label class="rating-label">
                    <input class="rating-stars-btn visually-hidden" type="radio" value="1" name="rating" required>
                        <svg class="rating-icon-star">
                            <use href="./images/icons.svg#icon-star"></use>
                        </svg>
                </label>

                <label class="rating-label">
                    <input class="rating-stars-btn visually-hidden" type="radio" value="2" name="rating" required>
                        <svg class="rating-icon-star">
                            <use href="./images/icons.svg#icon-star"></use>
                        </svg>
                </label>

                <label class="rating-label">
                    <input class="rating-stars-btn visually-hidden" type="radio" value="3" name="rating" required>
                        <svg class="rating-icon-star">
                            <use href="./images/icons.svg#icon-star"></use>
                        </svg>
                </label>

                <label class="rating-label">
                    <input class="rating-stars-btn visually-hidden" type="radio" value="4" name="rating" required>
                        <svg class="rating-icon-star">
                            <use href="./images/icons.svg#icon-star"></use>
                        </svg>
                </label>

                <label class="rating-label">
                    <input class="rating-stars-btn visually-hidden" type="radio" value="5" name="rating" required>
                        <svg class="rating-icon-star">
                            <use href="./images/icons.svg#icon-star"></use>
                        </svg>
                </label>

            </div>

            <input class="rating-email" type="email" name="rating-email" placeholder="Email" required>

                <textarea class="rating-comment" name="rating-comment" placeholder="Your comment" required></textarea>

                <button class="rating-send-btn" type="submit">Send</button>
        </form>
    </div>
</div>`);

    const ratingCloseBtn = document.querySelector('.rating-close-btn');

    ratingCloseBtn.addEventListener('click', () => { jsBox.innerHTML = '' }, { once: true })
}



function closeReviewWindow() {

}



/* <div class="rating-backdrop">
    <div class="rating">

        <button type="button" class="rating-close-btn">
            <svg class="rating-close-btn-icon">
                <use href="./images/icons.svg#icon-close"></use>
            </svg>
        </button>

        <form action="post" class="rating-form">

            <p class="rating-stars-text">Rating</p>

            <div class="rating-stars-box">

                <p class="rating-number">0.0</p>

                <label class="rating-label">
                    <input class="rating-stars-btn visually-hidden" type="radio" value="1" name="rating" required>
                        <svg class="rating-icon-star">
                            <use href="./images/icons.svg#icon-star"></use>
                        </svg>
                </label>

                <label class="rating-label">
                    <input class="rating-stars-btn visually-hidden" type="radio" value="2" name="rating" required>
                        <svg class="rating-icon-star">
                            <use href="./images/icons.svg#icon-star"></use>
                        </svg>
                </label>

                <label class="rating-label">
                    <input class="rating-stars-btn visually-hidden" type="radio" value="3" name="rating" required>
                        <svg class="rating-icon-star">
                            <use href="./images/icons.svg#icon-star"></use>
                        </svg>
                </label>

                <label class="rating-label">
                    <input class="rating-stars-btn visually-hidden" type="radio" value="4" name="rating" required>
                        <svg class="rating-icon-star">
                            <use href="./images/icons.svg#icon-star"></use>
                        </svg>
                </label>

                <label class="rating-label">
                    <input class="rating-stars-btn visually-hidden" type="radio" value="5" name="rating" required>
                        <svg class="rating-icon-star">
                            <use href="./images/icons.svg#icon-star"></use>
                        </svg>
                </label>

            </div>

            <input class="rating-email" type="email" name="rating-email" placeholder="Email" required>

                <textarea class="rating-comment" name="rating-comment" placeholder="Your comment" required></textarea>

                <button class="rating-send-btn" type="submit">Send</button>
        </form>
    </div>
</div>*/