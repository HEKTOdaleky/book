$.fn.addBook = function () {
    let array = ["s-l300.jpg", "download.jpeg", "download.jpeg", "s-l300.jpg", "download.jpeg", "s-l300.jpg", "download.jpeg", "s-l300.jpg", "download.jpeg", "s-l300.jpg", "download.jpeg", "s-l300.jpg",];

    createElement = (str, index) => {
        return $(` <div class=${index % 2 ? "back" : "front"}>
                        <p>
                             <img src=${str}>
                        </p>
                    </div>`)
    };

    for (let i = 0; i < array.length; i += 2) {
        let select = $(`<section class="page ${!i ? "active" : ""}">`);
        select.append(createElement(array[i])).append(createElement(array[i + 1], i + 1));

        this.append(select)
    }


    this.on('click', '.active', nextPage)
        .on('click', '.flipped', prevPage)

    this.on("swipeleft", nextPage);
    this.on("swiperight", prevPage);

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
