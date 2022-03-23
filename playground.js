const name = "yoshi";
const user = {
    name: 'paza',
    say(){
        console.log('hello ', this.name)
    }
}
const say = user.say;
say();
/*       OUTPUT        */
// 1, hello yoshi
// 2, hello paza
// 3, hello undefined
// 4, Throw TypeError


// noinspection SpellCheckingInspection
