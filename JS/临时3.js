math_visuals['fraction'] = {
  str: function (a, b) {
    if (typeof a == number && typeof b == number) {
      var com = math_tools.gcd(math.abs(a), math.abs(b));
      if (b === 0) {
        throw "the denominator can not be 0";
      }
      a = a / com;
      b = b / com;
      var j = math.abs(a) % math.abs(b);
      var k = (math.abs(a) - math.abs(j)) / math.abs(b);
      return (a * b >= 0) ? (j === 0) ? `` + k : `\\dfrac{` + math.abs(a) + `}{` + math.abs(b) + `}` :
        (j === 0) ? `-` + k : `-\\dfrac{` + math.abs(a) + `}{` + math.abs(b) + `}`;
    } else {return `\\dfrac{`+a+`}{`+b+`}`;}
  },
  tex: function (a, b) {
    return tex(math_visuals.fraction.str(a, b));
  },
};