
$(document).ready(function () {
    $('#magazine').turn({
        width: 900,
        height: 600,
        autoCenter: true,
        duration: 800,      
        display: 'double',
        gradients: true,        
        acceleration: true,   
        elevation: 50
    });

    $(window).bind('keydown', function(e){
        if (e.keyCode === 37) $('#magazine').turn('previous');
        else if (e.keyCode === 39) $('#magazine').turn('next');
    });
    
        $('#prevPage').on('click', function() {
        $('#magazine').turn('previous');
    });

    $('#nextPage').on('click', function() {
        $('#magazine').turn('next');
    });


    const getParagraphs = () => document.querySelectorAll('#magazine .page p');

    const resetHighlights = () => {
        const paragraphs = getParagraphs();
        paragraphs.forEach(p => p.innerHTML = p.textContent);
    };

    $('#searchText').on('input', function() {
        resetHighlights();
        const value = $(this).val().trim();
        if (!value) return;

        const paragraphs = getParagraphs();
        paragraphs.forEach(p => {
            const regex = new RegExp(`(${value})`, 'gi');
            p.innerHTML = p.innerHTML.replace(regex, `<span class="highlight">$1</span>`);
        });
    });

    $('#searchLength').on('input', function() {
        resetHighlights();
        const len = parseInt($(this).val());
        if (!len) return;

        const paragraphs = getParagraphs();
        paragraphs.forEach(p => {
            p.innerHTML = p.innerHTML.replace(/\b[\p{L}]+\b/gu, word => {
                return word.length === len ? `<span class="highlight">${word}</span>` : word;
            });
        });
    });
});
