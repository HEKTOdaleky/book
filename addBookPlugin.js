/**
 * Plugin restructure existing html template, getting access to images throw attributes
 * Restructured structure - is book
 *
 * @param switchPageTimeout - time of page rolling, default 50ms
 * @param startPage - param for starting page, default is 0
 */
$.fn.setBook = function (switchPageTimeout, startPage) {

    //The contents of the container
    let childrens = this.find($('.preview-page'));
    let container = $('<div class="preview-container">');
    let _length = childrens.length;

    let _curentPage = 0;
    const _timeout = switchPageTimeout ? switchPageTimeout * 1000 : 50;
    let _page;

    const btn = $('.button_n');
    const inp = $('.input_n').attr('placeholder', `${childrens.length } pages in the book`);

    /**
     * Waiting while page roll over
     */
    sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };


    /**
     * Creating a list with front and back page part
     * @param str
     * @param index
     * @returns {void | jQuery}
     */
    const createElement = (str, index) => {
        const image = $(str).attr('data-background-file');
        return $(str).addClass(index % 2 ? 'back' : 'front').append($('<div class="image-cont"/>').addClass(index % 2 ? 'left-page' : 'right-page').css('background', `url(${image})`));
    };

    async function changePage() {
        let value = _page ? _page : Math.floor(inp.val() / 2);
        while (_curentPage !== value && (value >= 0 && value <= _length / 2)) {
            _curentPage > value ? prevPage() : nextPage();
            await sleep(_timeout);
        }
        inp.val("");
        _page = undefined;
    }

    /**
     * Start page generation method, calls at start
     * Building container with needed structure
     */
    const runMethod = () => {
        for (let i = 0; i < childrens.length; i += 2) {
            let firstActivePage = '';
            let firstClosedPage = '';

            if (!i) {
                firstActivePage = 'active';
            }

            if (i - 1 === 1) {
                firstClosedPage = 'closed';
            }

            let select = $(`<section class='page ${firstActivePage} ${firstClosedPage}'>`);
            select.append(createElement(childrens[i], i)).append(createElement(childrens[i + 1], i + 1));
            container.append(select)
        }

        changePage();
    };

    runMethod();
    $('.preview-container').remove();
    this.append(container);

    prevPage = () => {
        _curentPage--;
        $('.last_flipped')
            .removeClass('last_flipped');

        $('.closed')
            .removeClass('closed');

        $('.flipped')
            .last()
            .removeClass('flipped')
            .addClass('active')
            .siblings('.page')
            .removeClass('active');
        $('.flipped')
            .last()
            .addClass('last_flipped');

        $('.active')
            .next('.page')
            .addClass('closed')
    };

    nextPage = () => {
        _curentPage++;
        $('.last_flipped')
            .removeClass('last_flipped');

        $('.closed')
            .removeClass('closed');

        $('.active')
            .removeClass('active')
            .addClass('flipped')
            .addClass('last_flipped')
            .next('.page')
            .addClass('active')
            .next('.page')
            .addClass('closed')
    };

    container
        .on('click', '.active', nextPage)
        .on('click', '.flipped', prevPage);

    container.on('swipeleft', nextPage);
    container.on('swiperight', prevPage);

    btn.click(changePage);
};
