/*
 * CAROUSEL.JS
 * ===========
 * Handles horizontal carousel/slider functionality for movie sections.
 * Shows N movies at a time with arrow navigation between pages.
 *
 * Architecture:
 * - Each carousel is identified by the ID on its .carousel-track element
 * - Arrow buttons use data-carousel="<trackId>" to link to their carousel
 * - Shows 4/3/2/1 slides per view at desktop/small/tablet/mobile
 * - Movement via CSS transform: translateX() on the track
 */

document.addEventListener('DOMContentLoaded', function () {

    // =========================================
    // CONFIGURATION
    // =========================================

    function getSlidesPerView() {
        var width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        if (width <= 1024) return 3;
        return 4;
    }

    // =========================================
    // CAROUSEL STATE
    // =========================================

    var carousels = {};

    // =========================================
    // INITIALIZE ALL CAROUSELS
    // =========================================

    function initCarousels() {
        var tracks = document.querySelectorAll('.carousel-track');

        tracks.forEach(function (track) {
            var id = track.id;
            var slides = track.querySelectorAll('.carousel-slide');
            var slidesPerView = getSlidesPerView();
            var totalPages = Math.ceil(slides.length / slidesPerView);

            carousels[id] = {
                currentPage: 0,
                totalPages: totalPages,
                slidesPerView: slidesPerView,
                track: track,
                slides: slides
            };

            updateCarouselPosition(id);
            updateArrowStates(id);
        });
    }

    // =========================================
    // UPDATE CAROUSEL POSITION
    // =========================================

    function updateCarouselPosition(id) {
        var state = carousels[id];
        if (!state) return;

        var track = state.track;
        var slides = state.slides;
        if (slides.length === 0) return;

        var firstSlide = slides[0];
        var slideWidth = firstSlide.getBoundingClientRect().width;

        var trackStyle = window.getComputedStyle(track);
        var gap = parseFloat(trackStyle.gap) || 0;

        var offset = state.currentPage * state.slidesPerView * (slideWidth + gap);

        track.style.transform = 'translateX(-' + offset + 'px)';
    }

    // =========================================
    // UPDATE ARROW DISABLED STATES
    // =========================================

    function updateArrowStates(id) {
        var state = carousels[id];
        if (!state) return;

        var leftArrows = document.querySelectorAll(
            '.carousel-arrow-left[data-carousel="' + id + '"]'
        );
        var rightArrows = document.querySelectorAll(
            '.carousel-arrow-right[data-carousel="' + id + '"]'
        );

        leftArrows.forEach(function (btn) {
            if (state.currentPage <= 0) {
                btn.classList.add('disabled');
            } else {
                btn.classList.remove('disabled');
            }
        });

        rightArrows.forEach(function (btn) {
            if (state.currentPage >= state.totalPages - 1) {
                btn.classList.add('disabled');
            } else {
                btn.classList.remove('disabled');
            }
        });
    }

    // =========================================
    // ARROW CLICK HANDLERS
    // =========================================

    function handleArrowClick(event) {
        var btn = event.currentTarget;
        var carouselId = btn.getAttribute('data-carousel');
        var state = carousels[carouselId];
        if (!state) return;

        if (btn.classList.contains('carousel-arrow-left')) {
            if (state.currentPage > 0) {
                state.currentPage--;
            }
        } else if (btn.classList.contains('carousel-arrow-right')) {
            if (state.currentPage < state.totalPages - 1) {
                state.currentPage++;
            }
        }

        updateCarouselPosition(carouselId);
        updateArrowStates(carouselId);
    }

    document.querySelectorAll('.carousel-arrow').forEach(function (btn) {
        btn.addEventListener('click', handleArrowClick);
    });

    // =========================================
    // RESPONSIVE: RECALCULATE ON RESIZE
    // =========================================

    var resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            Object.keys(carousels).forEach(function (id) {
                var state = carousels[id];
                var newSlidesPerView = getSlidesPerView();

                state.slidesPerView = newSlidesPerView;
                state.totalPages = Math.ceil(state.slides.length / newSlidesPerView);
                state.currentPage = 0;

                updateCarouselPosition(id);
                updateArrowStates(id);
            });
        }, 250);
    });

    // =========================================
    // INITIALIZE
    // =========================================
    initCarousels();

});
