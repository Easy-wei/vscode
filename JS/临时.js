math.fraction = function (a, b) {
    var com = math_tools.gcd(math.abs(a), math.abs(b));
    if (b === 0) {
        throw "the denominator can not be 0";
    }
    a = a / com;
    b = b / com;
    var j = math.abs(a) % math.abs(b);
    var k = (math.abs(a) - math.abs(j)) / math.abs(b);
    return (a * b >= 0) ? (j === 0) ? k : `\\frac{` + math.abs(a) + `}{` + math.abs(b) + `}` :
        (j === 0) ? -k : `-\\frac{` + math.abs(a) + `}{` + math.abs(b) + `}`;
}