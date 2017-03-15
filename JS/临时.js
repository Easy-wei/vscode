function polynomial() {
    var array = Array.prototype.slice.call(arguments);
    var array_to_str;
    if (array[0] == 1) {
        array[0] = ``;
    }
    if (array[0] == 0) {
        array.splice(0, 1);
        i-=1;
        if (typeof (array[0])=='string'){
            array.splice(0, 1);
            i-=1;
        }
    }
    if (array[0]==-1){
        array[0]=`-`;
    }
    for (var i = 1; i < array.length - 1; i++) {
        if (typeof (array[i]) == 'number') {
            switch (array[i]) {
                case 1:
                    array[i] = `+`;
                    break;
                case -1:
                    array[i] = `-`;
                    break;
                case 0:
                    array[i] = ``;
                    array[i + 1] = ``;
                    break;
                default:
                    array[i] = array[i].signed();
            }
        }
    }
    if (array[array.length - 1] === 0) {
        array[array.length - 1] = ``;
    }
    if (typeof (array[array.length - 1]) == 'number') {
        array[array.length - 1] = array[array.length - 1].signed();
    }
    array_to_str = array.join(``);
    return array_to_str;
}

exponentials = {
    index:function(x='x'){
        return polynomial(x='x');
    },
    str: function(a='e',x='x'){
        return a+`^`+index(x);
    },
}


