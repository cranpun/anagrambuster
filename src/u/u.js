const u = () => {};

// ライブラリ
u.removeChild = (cssid) => {
    const wrap = document.querySelector(cssid);
    while(wrap.firstChild) {
        wrap.removeChild(wrap.firstChild);
    }
}
module.exports = u;
