let mobileInit = (context) => {
    let childrens = context.find($('.preview-page'));
    let container = $('<div class="preview-container">');
    let mobileContainer = $('<div class="mobile-container">');
    let _length = childrens.length;
    $('.scene').css('margin', 0).css('width','100%');
    for (let i = 0; i < childrens.length; i++) {
        const image = $(childrens[i]).attr('data-background-file');
        const comp=$('<div class="mobile-item"></div>').css('background', `url(${image})`);
        if(i===0)
            comp.addClass('first-mobile')
        if(i===childrens.length-1)
            comp.addClass('last-mobile')
        mobileContainer.append(comp);
        console.log(childrens[i])
    }
    $('.preview-container').remove();
    context.append(mobileContainer)
}