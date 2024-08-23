document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('slider');
    const slides = slider.getElementsByTagName('img');
    const totalSlides = slides.length;
    let currentIndex = 0;
    let isAnimating = false;
    const slideDuration = 800; 
    const frameRate = 60; 
    const intervalTime = 1000 / frameRate;

    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    const navDotsContainer = document.querySelector('.nav-dots');


    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('data-index', i);
        navDotsContainer.appendChild(dot);
    }

    navDotsContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dot') && !isAnimating) {
            const index = parseInt(e.target.getAttribute('data-index'), 10);
            if (index !== currentIndex) {
                goToSlide(index);
            }
        }
    });

    function goToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        const currentSlide = slides[currentIndex];
        const nextSlide = slides[index];

        fadeSlide(currentSlide, nextSlide, function () {
            currentSlide.style.display = 'none';
            nextSlide.style.display = 'block';
            currentIndex = index;
            updateDots();
            isAnimating = false; 
        });
    }

    function updateDots() {
        const dots = navDotsContainer.getElementsByClassName('dot');
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        dots[currentIndex].classList.add('active');
    }

    function fadeSlide(fromSlide, toSlide, callback) {
        const totalFrames = Math.round((slideDuration / 1000) * frameRate);
        let currentFrame = 0;

        toSlide.style.display = 'block';
        toSlide.style.opacity = 0;

        const interval = setInterval(function () {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            const easeProgress = easeOutQuad(progress);

            fromSlide.style.opacity = 1 - easeProgress;
            toSlide.style.opacity = easeProgress;

            if (currentFrame >= totalFrames) {
                clearInterval(interval);
                fromSlide.style.opacity = 1;
                toSlide.style.opacity = 1;
                callback();
            }
        }, intervalTime);
    }

    function easeOutQuad(t) {
        return t * (2 - t);
    }

    nextButton.addEventListener('click', function () {
        if (isAnimating) return;
        let nextIndex = (currentIndex + 1) % totalSlides;
        goToSlide(nextIndex);
    });

    prevButton.addEventListener('click', function () {
        if (isAnimating) return;
        let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(prevIndex);
    });
});
