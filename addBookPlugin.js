/**
 * Plugin restructure existing html template, getting access to images throw attributes
 * Restructured structure - is book
 *
 * @param switchPageTimeout - time of page rolling, default 50ms
 * @param startPage - param for starting page, default is 0
 */
$.fn.setBook = function (switchPageTimeout, transition, startPage) {


    //The contents of the container
    let childrens = this.find($('.preview-page'));
    let container = $('<div class="preview-container">');
    let _length = childrens.length;

    let _curentPage = 0;
    const _timeout = switchPageTimeout ? switchPageTimeout * 1000 : 50;
    const _pageTransition = transition ? transition : 0.4;
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
     * @param pageIndex
     * @returns {void | jQuery}
     */
    const createElement = (str, index, pageIndex) => {
        const background = pageIndex === index || Math.abs(index - pageIndex) <= pageIndex - 2 || index + pageIndex <= pageIndex + 1;
        const image = $(str).attr('data-background-file');
        return $(str).attr('id', `page__${index}`).addClass(index % 2 ? 'back' : 'front').append($('<div class="image-cont"/>').addClass(index % 2 ? 'left-page' : 'right-page').css('background', background ? `url(${image})` : ''));
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

            let select = $(`<section class='page ${firstActivePage} ${firstClosedPage}'>`).css('transition', `${_pageTransition}s transform`);
            select.append(createElement(childrens[i], i, 3)).append(createElement(childrens[i + 1], i + 1, 4));
            container.append(select)
        }

        changePage();
    };

    runMethod();
    $('.preview-container').remove();
    this.append(container);

    prevPage = () => {
        _curentPage--;
        $('.superFlip').removeClass('superFlip');

        $('.last_flipped')
            .removeClass('last_flipped')
            .removeClass("left");

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
            .addClass('closed');

        const page = Math.floor(_curentPage * 2) - 4;
        let count = 0;

        while (count < 2) {
            let obj = $(`#page__${page - count}`);
            let child = $(`#page__${page - count} > .image-cont`);

            if (!$(child).css('background-image'))
                break;
            else if ($(child).css('background-image') === 'none') {
                $(child).css('background-image', `url(${obj.attr('data-background-file')})`);
            }
            count++;
        }
    };

    nextPage = () => {
        _curentPage++;

        $('.superFlip').removeClass('superFlip');
        $('.last_flipped')
            .removeClass('last_flipped');

        $('.closed')
            .removeClass('closed');


        $('.active')
            .removeClass('active')
            .removeClass("right")
            .addClass('flipped')
            .addClass('last_flipped')
            .addClass('superFlip')
            .next('.page')
            .addClass('active')
            .next('.page')
            .addClass('closed');


        const page = Math.floor(_curentPage * 2) + 4;
        let count = 0;

        while (count < 2) {
            let obj = $(`#page__${page + count}`);
            let child = $(`#page__${page + count} > .image-cont`);

            if (!$(child).css('background-image'))
                break;
            else if ($(child).css('background-image') === 'none') {
                $(child).css('background-image', `url(${obj.attr('data-background-file')})`);
            }
            count++;
        }
    };

    container
        .on('click', '.active', nextPage)
        .on('click', '.flipped', prevPage);

    $('.page>.front').mouseover(function () {
        $(".active").addClass('right');
    })
        .mouseleave(function () {
            $(".active").removeClass('right');
        });

    $('.page>.back').mouseover(function () {
        $(".last_flipped").addClass('left');
    })
        .mouseleave(function () {
            $(".last_flipped").removeClass('left');
        });

    container.on('swipeleft', nextPage);
    container.on('swiperight', prevPage);

    btn.click(changePage);
};
