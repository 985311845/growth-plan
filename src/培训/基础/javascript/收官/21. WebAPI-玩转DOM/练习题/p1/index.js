// 根据hero.js提供的数据heros，创建合适的元素，将英雄数据显示到页面上
/*<a
    href="https://pvp.qq.com/web201605/herodetail/528.shtml"
    target="_blank"
    class="item"
>
    <img
        src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/528/528.jpg"
        alt=""
    />
    <span>澜</span>
</a>*/
// const dom = document.querySelector('.container');
// const container = document.createElement('div');
// container.className = 'container';
// document.body.appendChild(container);
// for (let i = 0; i < heros.length; i++) {
//     createHero(heros[i]);
// }
// function createHero(h) {
//     const a = document.createElement('a');
//     a.href = "https://pvp.qq.com/web201605/herodetail/" + h.ename + ".shtml";
//     a.target = "_blank";
//     a.className = 'item';
//     const img = document.createElement('img');
//     img.src = "https://game.gtimg.cn/images/yxzj/img201606/heroimg/" + h.ename + "/" + h.ename + "/528.jpg";
//     a.appendChild(img);
//     const span = document.createElement('span');
//     span.innerText = h.cname;
//     a.appendChild(span);
//     dom.appendChild(a);
// }
// console.log(dom);
//以上写法报错
// 疑问？
// querySelector 和 querySelectorAll的静态性：如果HTML中本没有className为container
//的元素，而是在获取document.querySelector('.container')之后动态创建的container元素
//querySelector是识别不到的，但是getElementsByClassName可以识别到



const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);
const dom1 = document.querySelector('.container');//这行代码执行完，dom1就已经被冻结了
dom1.classList.add('warp');
console.log(dom1);
for (let i = 0; i < heros.length; i++) {
    createHero1(heros[i]);
}
function createHero1(h) {
    const a = document.createElement('a');
    a.href = "https://pvp.qq.com/web201605/herodetail/" + h.ename + ".shtml";
    a.target = "_blank";
    a.className = 'item';
    const img = document.createElement('img');
    img.src = "https://game.gtimg.cn/images/yxzj/img201606/heroimg/" + h.ename + "/" + h.ename + "/528.jpg";
    a.appendChild(img);
    const span = document.createElement('span');
    span.innerText = h.cname;
    a.appendChild(span);
    dom1.appendChild(a);
}
