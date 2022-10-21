class Test {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    init(){
        return 'test!!!'
    }
}

const test = new Test(10,20)
module.exports = test;