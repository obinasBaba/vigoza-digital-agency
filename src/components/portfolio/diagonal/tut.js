const boo = {
    one: 1,
    luu: {
        get foo(){
            console.log('one: ', this.one)
        },
        set foo(value){

        }
    }
}

Object.setPrototypeOf(boo.luu, boo)

// boo.foo.get = boo.foo.get.bind(boo)


console.log( boo.luu.foo );
