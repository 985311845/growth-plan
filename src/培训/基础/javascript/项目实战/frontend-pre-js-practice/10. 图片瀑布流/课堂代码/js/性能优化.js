
const imgWidth = 220;
const divContainer = document.querySelector('.container');
let cachedColumns = 0, cachedSpaceWidth = 0;

// 通用防抖函数
function debounce(fn, delay) {
    let timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, arguments), delay);
    };
}

// 计算列和间隙（带缓存）
function getCal() {
    const containerWidth = divContainer.clientWidth;
    const columns = Math.floor(containerWidth / imgWidth);
    const spaceWidth = (containerWidth - columns * imgWidth) / (columns + 1);
    cachedColumns = columns;
    cachedSpaceWidth = spaceWidth;
    return { columns, spaceWidth };
}

// 合并最小值查找和索引获取
function getMinColumn(arr) {
    let min = arr[0], index = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
            index = i;
        }
    }
    return { min, index };
}

// 批量设置位置（减少重排）
function setPosition() {
    const { columns, spaceWidth } = cachedColumns ?
        { columns: cachedColumns, spaceWidth: cachedSpaceWidth } : getCal();
    const columnHeights = new Array(columns).fill(0);

    // 使用 requestAnimationFrame 优化渲染
    requestAnimationFrame(() => {
        for (let i = 0; i < divContainer.children.length; i++) {
            const img = divContainer.children[i];
            const { min, index } = getMinColumn(columnHeights);
            const x = index * imgWidth + (index + 1) * spaceWidth;
            const y = min;

            img.style.transform = `translate(${x}px, ${y}px)`;
            columnHeights[index] = y + img.clientHeight + spaceWidth;
        }
    });
}

// 批量创建图片（使用 DocumentFragment）
async function createImg() {
    const fragment = document.createDocumentFragment();
    const loadPromises = [];

    for (let i = 0; i <= 40; i++) {
        const img = new Image();
        img.src = `../img/${i}.jpg`;
        img.style.width = `${imgWidth}px`;
        fragment.appendChild(img);
        loadPromises.push(new Promise(resolve => img.onload = resolve));
    }

    divContainer.appendChild(fragment);
    await Promise.all(loadPromises); // 等待所有图片加载完成
    setPosition();
}

function main() {
    createImg();
    window.addEventListener('resize', debounce(setPosition, 500));
}

main();
