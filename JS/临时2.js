function test(a, b) {
	var x, y, z;
	y = z = b = Math.pow(10, b);
	x = a = a * b;
	while (x > 0) {
		z = x;
		x = y % z;
		y = z
	};
	return (a / z + "/" + b / z);
}
alert(test(0.75, 2));