console.log("script start");

let wrapper = document.querySelector('.wrapper');

let pageSlider = new Swiper('.page', {
    //свои классы
    wrapperClass: "page__wrapper",
    slideClass: "page__screen",

    //Вертикальный слайдер
    direction: "vertical" ,

    //Количество слайдов для показа
    slidesPerView: "auto",

    //Включаем параллакс
    parallax: true,

    //Управление клавиатурой
    keyboard: {
        //включить/выключить
        enabled: true,
        //Включить/выключить только когда слайдер в пределах вьюпорта
        onlyInViewport: true,
        //Включить/выключить управление клавишами PageUp и PageDown
        pageUpDown: true,
    },

    //Управление колесом мыши
    mousewheel: {
        //Чувствительность колеса
        sensitivity: 1,
    },

    //Отключение функционала, если слайдов меньше, чем нужно
    watchOverflow: true,

    //Скорость
    speed: 800,

    //Обновить свайпер при изменении родительских элементов слайдера
    observeParents: true,

    //Обновить свайпер при изменении дочерних элементов слайдера
    observeSlideChildren: true,

    //Навигация
    //Буллеты, текущее положениеб прогресс-бар
    pagination: {
        el: ".page__pagination",
        type: "bullets",
        clickable: true,
        bulletClass: "page__bullet",
        bulletActiveClass: "page__bullet_active",
    },

    //Скролл
    scrollbar: {
        el: "page__scroll",
        dragClass: "page__drag-scroll",
        //Возможность перетаскивать скролл
        draggable: true,
    },

    //отключаем автоинициализацию
    init: false,

    // //События
    on: {
        //Событие инициализации
        init: function () {
            console.log("On");
            menuSlider();
            setScrollType();
            wrapper.classList.add('_loaded');
        },

        //Событие смены слайда
        slideChange: function () {
            console.log("Change");
            menuSliderRemove();
            menuLinks[pageSlider.realIndex].classList.add('_active');
        },
        resize: function () {
            setScrollType();
        }
    },
})

let menuLinks = document.querySelectorAll(".menu__link");

function menuSlider() {
    console.log("menuSlider");
    if (menuLinks.length > 0) {
        menuLinks[pageSlider.realIndex].classList.add('_active');
        for (let index = 0; index < menuLinks.length; index++){
            const menuLink = menuLinks[index];
            menuLink.addEventListener("click", function(e){
                menuSliderRemove() //обнуляется активная ссылка
                pageSlider.slideTo(index, 800);  //перелистываем к слайду по индексу со скоростью 800
                menuLink.classList.add('_active'); //присваиваем ссылке статус активной
                e.preventDefault();
            })
        }
    }
}

function menuSliderRemove() {
    console.log("menuSliderRemove");
    let menuLinkActive = document.querySelector(".menu__link._active");
    if (menuLinkActive) {
        menuLinkActive.classList.remove('_active');
    }
}

//если контента больше чем на страницу, то убираем видимость буллетов и делаем свободный скролл
function setScrollType() {
    if (wrapper.classList.contains('_free')) {
        wrapper.classList.remove('_free');
        pageSlider.params.freeMode = false;
    }
    for (let index = 0; index < pageSlider.slides.length; index++) {
        const pageSlide = pageSlider.slides[index];
        const pageSlideContent = pageSlide.querySelector('.screen__content');
        if (pageSlideContent) {
            const pageSlideContentHeight = pageSlideContent.offsetHeight;
            if (pageSlideContentHeight > window.innerHeight) {
                wrapper.classList.add('_free');
                pageSlider.params.freeMode = true; 
                break;
            }
        }
    }
}

pageSlider.init();