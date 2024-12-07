function Article() {
    this.title = 'fhjdkhashfjhdlsk';
    this.author = 'Jake'
};
let a1 = new Article();
let a2 = new Article();
a1.author = null;
console.log(a2)