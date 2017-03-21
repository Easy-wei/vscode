function bubble_sort(arry) {
    var len = arry.length;
    var a = 0;
    var k1 = 0;
    var k2 = 0;
    var k = len;
    for (var i = 0; i < len; i++) {
        k2 = 0;
        for (var j = 1; j < k; j++) {
            if (arry[j - 1] > arry[j]) {
                a = arry[j];
                arry[j] = arry[j - 1];
                arry[j - 1] = a;
                k2 = 1;
                k1 = j;
            }
        }
        k = k1;
        if (k2 === 0) {
            break;
        }
    }
    return arry;
}