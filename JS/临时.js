math_tools["points_to_equation"] = function (points) {
    var matrix_rows = [];
    for (var key in points) {
        var i = points.length - 1;
        var row = [];
        while (i >= 0) {
            row.push(Math.pow(points[key][0], i));
            i += -1;
        }
        row.push(points[key][1]);
        matrix_rows.push(row);
    }

    var i = 0;
    var swap = false;
    while (i < matrix_rows.length - 1) {
        var i2 = i + 1;

        if (matrix_rows[i][i] !== 0 || swap) {
            swap = false;
            while (i2 < matrix_rows.length) {
                var ratio = matrix_rows[i2][i] / matrix_rows[i][i];
                for (var key in matrix_rows[i2]) {
                    matrix_rows[i2][key] += -ratio * matrix_rows[i][key];
                }
                i2 += 1;
            }
            i += 1;

        } else {
            var temp = JSON.stringify(matrix_rows[i]);
            matrix_rows[i] = JSON.parse(JSON.stringify(matrix_rows[i + 1]));
            matrix_rows[i + 1] = JSON.parse(temp);
            swap = true;
        }
    }

    var results = [];
    i = 0;
    while (i < matrix_rows.length) {
        var k = matrix_rows.length - 1 - i;
        var last = matrix_rows.length;
        var res = 0;
        for (var key in results) {
            key = parseInt(key);
            res += matrix_rows[k][last - key - 1] * results[key];
        }
        results.push((matrix_rows[k][last] - res) / matrix_rows[k][k]);
        matrix_rows[matrix_rows.length - 1 - i];
        i += 1;

    }
    return results;
}

math_tools["points_to_equation.function"] = function (ponits, x) {
    var array = math_tools.points_to_equation(points);
    var sum = 0;
    for (key in array) {
        sum += array[key] * math.pow(x, key)
    }
    return sum
}