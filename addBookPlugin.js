$.fn.setBook = function () {

    let childrens = this.find($(".preview-page"));
    let container = $('<div class="preview-container">');

    createElement = (str, index) => {
        const image = $(str).attr('data-background-file');
        return $(str).addClass(index % 2 ? "back" : "front").append($('<div class="image-cont"/>').css('background', `url(${image})`))
    };

    for (let i = 0; i < childrens.length; i += 2) {
        let select = $(`<section class="page ${!i ? "active" : ""}">`);
        select.append(createElement(childrens[i], i)).append(createElement(childrens[i + 1], i + 1));
        container.append(select)
    }

    $('.preview-container').remove();
    this.append(container);

    container
        .on('click', '.active', nextPage)
        .on('click', '.flipped', prevPage)

    container.on("swipeleft", nextPage);
    container.on("swiperight", prevPage);


    function prevPage() {
        $('.flipped')
            .last()
            .removeClass('flipped')
            .addClass('active')
            .siblings('.page')
            .removeClass('active');
    }

    function nextPage() {
        $('.active')
            .removeClass('active')
            .addClass('flipped')
            .next('.page')
            .addClass('active')
    }

};
