$.fn.setBook = function () {

    let childrens = this.find($(".preview-page"));
    let container = $('<div>');

    createElement = (str, index) => {
        return $(str).addClass(index % 2 ? "back" : "front")
    };

    // let page = $('.page');
    // let cont = $('.cont');
    // childrens.map((index, element) => {
    //     console.log(element)
    //     index === 0 ? $(element).addClass('active') : null
    //     index % 2 ? $(element).addClass('back') && page.append(element) && cont.append(page) && $('.page') : $(element).addClass("front") && page.append(element);
    // });

    for (let i = 0; i < childrens.length; i += 2) {
        let select = $(`<section class="page ${!i ? "active" : ""}">`);
        select.append(createElement(childrens[i], i).append(createElement(childrens[i + 1], i + 1)));

        container.append(select)
    }

    console.log(container)


    container.on('click', '.active', nextPage)
        .on('click', '.flipped', prevPage)

    container.on("swipeleft", nextPage);
    container.on("swiperight", prevPage);



    function prevPage() {
        $('.flipped')
            .last()
            .removeClass('flipped')
            .addClass('active')
            .siblings('.normal-page')
            .removeClass('active');
    }

    function nextPage() {
        $('.active')
            .removeClass('active')
            .addClass('flipped')
            .next('.normal-page')
            .addClass('active')
    }

};
