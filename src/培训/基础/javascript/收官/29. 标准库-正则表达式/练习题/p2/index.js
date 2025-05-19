var container = document.querySelector('.content');
var text = container.innerHTML;
text.replace(/\s+.+/g, function (s) {
    s = s.replace(/\s/g, '');
    return '<p>' + s + '</p>';
})