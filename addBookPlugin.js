$.fn.setBook = function (switchPageTimeout, startPage) {

    let childrens = this.find($(".preview-page"));
    let container = $('<div class="preview-container">');
    let _length = childrens.length;
    let _curentPage = 0;
    const _timeout = switchPageTimeout ? switchPageTimeout * 1000 : 50;
    let _page ;

    const btn = $('.button_n');
    const inp = $('.input_n').attr("placeholder", `${childrens.length } pages in the book`);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const createElement = (str, index) => {
        const image = $(str).attr('data-background-file');
        return $(str).addClass(index % 2 ? "back" : "front").append($('<div class="image-cont"/>').css('background', `url(${image})`))
    };

    const runMethod = () => {
        for (let i = 0; i < childrens.length; i += 2) {
            let select = $(`<section class="page ${!i ? "active" : ""}">`);
            select.append(createElement(childrens[i], i)).append(createElement(childrens[i + 1], i + 1));
            container.append(select)
        }
        changePage();
    };

    async function changePage() {
        let value = _page ? _page : Math.floor(inp.val() / 2);
        while (_curentPage !== value && (value >= 0 && value <= _length / 2)) {
            _curentPage > value ? prevPage() : nextPage();
            await sleep(_timeout);
        }
        inp.val("");
        _page = undefined;
    };

    runMethod();
    $('.preview-container').remove();
    this.append(container);

    container
        .on('click', '.active', nextPage)
        .on('click', '.flipped', prevPage);

    container.on("swipeleft", nextPage);
    container.on("swiperight", prevPage);

    btn.click(changePage);


    function prevPage() {
        _curentPage--;
        console.log(_curentPage)
        $('.flipped')
            .last()
            .removeClass('flipped')
            .addClass('active')
            .siblings('.page')
            .removeClass('active');
    }

    function nextPage() {
        _curentPage++;
        console.log(_curentPage)
        $('.active')
            .removeClass('active')
            .addClass('flipped')
            .next('.page')
            .addClass('active')
    }

};
