let mobileInit = (context) => {
    let childrens = context.find($('.preview-page'));
    let container = $('<div class="preview-container">');
    let mobileContainer = $('<div class="mobile-container">');
    let href = $('<a id="href" href ="">');
    const btn = $('.button_n');
    const inp = $('.input_n');

    $('.scene').css('margin', 0).css('width', '100%');
    for (let i = 0; i < childrens.length; i++) {
        const image = $(childrens[i]).attr('data-background-file');
        const comp = $('<div class="mobile-item"></div>').attr('id', 'page_' + i).css('background', `url(${image})`).append(childrens[i].childNodes);
        if (i === 0)
            comp.addClass('first-mobile');
        else if (i === childrens.length - 1)
            comp.addClass('last-mobile');
        else if (i % 2 !== 0)
            comp.addClass('list-page')
        mobileContainer.append(comp);
    }

    btn.click(function () {
        href.attr('href', `#page_${inp.val()}`);
        $('#href')[0].click();
    });

    $('.preview-container').remove();
    container.append(href)
    context.append(container.append(mobileContainer))
}