 function linear_interpolation(x, y) { //linear interpolation
     var a = x;
     var b = y;
     var c;
     var arry = [
         [tex(`a`), tex(`f(a)`), tex(`b`), tex(`f(b)`), tex(`x^{}_n`), tex(`f(x^{}_n)`)]
     ];
     for (var i = 0; i < 10; i++) {
         c = (a * math.abs(f(b)) + b * math.abs(f(a))) / (math.abs(f(a)) + math.abs(f(b)));
         var arry1 = [];
         arry1[0] = math.round(a, 3);
         arry1[1] = math.round(f(a), 3);
         arry1[2] = math.round(b, 3);
         arry1[3] = math.round(f(b), 3);
         arry1[4] = math.round(c, 3);
         arry1[5] = math.round(f(c), 3);
         arry.push(arry1);
         if (f(a) * f(c) < 0) {
             if (math.round(b, 1) == math.round(c, 1)) {
                 ans = math.round(c, 1);
                 break;
             }
             a = a;
             b = c;
         }
         if (f(b) * f(c) < 0) {
             if (math.round(a, 1) == math.round(c, 1)) {
                 ans = math.round(c, 1);
                 break;
             }
             a = c;
             b = b;
         }
     }
     ans = math.round(c, 1);
     return arry;
 }

 function f(x) {
     answer = e * math.pow(x, 3) + q * x * x + h;
     return answer;
 }
 do {
     do {
         var e = math_tools.rand_int(2, 9);
         var q = math_tools.rand_int(-50, 50, [-1, 0, 1]);
         var g = math_tools.rand_int(-50, 50, [-1, 0, 1]);
         var h = math_tools.rand_int(-50, 50, [-1, 0, 1]);
         var root = math_tools.polynomial(e, q, 0, h); //一元多次方程求根
         root = Number(root[0]);
         var range_start = Math.floor(root);
         var range_end = range_start + 1;
     }
     while (isNaN(root) || (range_start * range_end) === 0 || f(range_start) * f(range_end) === 0);


     var equation = e + `x^{3}` + q.signed() + `x^2` + h.signed();

     self.ordered_answer = true;
     self.precision = 4;
     var ans;
     var arry = [];
     var arry = linear_interpolation(range_start, (range_start + 1));
     var arry2 = [];
     arry2.push(ans);
     for (var i = 1; i < arry.length; i++) {
         for (var j = 0; j < arry[i].length; j++) {
             arry2.push(arry[i][j]);
         }

     }
 }
 while (arry.length <= 2);

 var rows = 0;
 input_change = function () {

     module_0_input_complete();
 };

 add_row = function (cell_count) {

     var table = document.getElementById("table");

     var row = table.insertRow(-1);

     var i = 0;

     while (i < cell_count) {

         var cell = row.insertCell(i);

         cell.innerHTML = '<span id="i_' + rows + '_' + i + '" class="book_math_input"></span>';

         var input = new math_input({
             input_div: 'i_' + rows + '_' + i,
             keyboard_div: "keyboard",
             "change_callback": input_change,
         });

         answer_keyboards.push(input);

         i += 1;
     }
     rows += 1;
     if (rows > 1) {
         // Show the remove button if rows > 1
         $("#remove_row_button").show();
     }
     module_0_input_complete();
 };

 remove_row = function (cell_count) {
     var i = 0;
     while (i < cell_count) {
         delete answer_keyboards[answer_keyboards.length - i - 1];
         i += 1;
     }
     document.getElementById("table").deleteRow(-1);
     rows += -1;

     // Hide the remove button if we only have one row or less
     if (rows <= 1) {
         $("#remove_row_button").hide();
     }
     module_0_input_complete();
 };


 self.text = function () {
     return `<style media="screen" type="text/css"> table.input_table, table.input_table td {border: 1px solid #444;border-collapse: collapse;} .input_table .book_math_input {border: none;}</style>` +

         `One root of the equation ` + tex(equation) + ` lie in the interval[` + range_start + `,` + range_end + `] ` +

         `<br>Use linear interpolation to find the root of to 1 decimal place.<br>` +

         `(Tabulate your intermediate steps[exercise_only] as shown[/exercise_only].  Input values to ` + tex(`3`) + ` decimal places when required)<br>` +

         `<p class="book_button" ontouchstart="touch_start(event)" onclick="add_row(6)">Add row</p> 
           <p id="remove_row_button" class="book_button" ontouchstart="touch_start(event)" onclick="remove_row(6)">Remove row</p>
          <table id="table" class='input_table'>
          <tr><td><b>` + tex(`a`) + `</b></td><td><b>` + tex(`f(a)`) + `</b></td><td><b>` + tex(`b`) +
         `</b></td><td><b>` + tex(`f(b)`) + `</b></td><td><b>` + tex(`x^{}_n`) + `</b></td><td><b>` + tex(`f(x^{}_n)`) + `</b></td></tr>
          </table>` + `<br>[answer] `;

 };


 self.post_load = function () {
     add_row(6);
     // Hide the remove button since we only have 1 row
     $("#remove_row_button").hide();
 };
 c1 = (range_start * math.abs(f(range_end)) + range_end * math.abs(f(range_start))) / (math.abs(f(range_start)) + math.abs(f(range_end)));
 self.step = function (wrong_answer, step) {
     steps = [
         `Let ` + tex(`f(x)=` + equation),

         `First we will check that there is a root of the equation ` + tex(equation) + ` between ` + tex(`x=` + range_start) + ` and ` + tex(`x=` + range_end),

         tex(`f(` + range_start + `)=` + f(range_start)) + tex(`\\,\\,\\,f(` + range_end + `)=` + f(range_end)),

         (f(range_start) > 0) ? tex(`f(` + range_start + `)` + `>0>` + `f(` + range_end + `)`) : tex(`f(` + range_start + `)` + `<0<` + `f(` + range_end + `)`),

         `There is a change of sign and the equation is continuous in this range, so there must be a root between ` + tex(`` + range_start) + ` and ` + tex(`` + range_end),

         `We will label these bounds as ` + tex(`a=` + range_start) + ` and ` + tex(`b=` + range_end),

         `To obtain a more accurate estimate of the value of this root, we need to reduce the size of the interval that it is within`,

         `Following the method of linear interpolation, then using similar triangles to work out ` + tex(`x^{}_1`),

         tex(`\\dfrac{` + range_end + `-x^{}_1}{x^{}_1` + (-range_start).signed() + `}=|\\dfrac{f(` + range_end + `)}{f(` + range_start + `)}|`),

         tex(`\\therefore\\,\\,x^{}_1=\\,` + arry[1][4]),

         tex(`f(` + arry[1][4] + `)=` + arry[1][5]),

         `Using the interval [` + math_tools.round(arry[1][4], 4) + ` , ` + range_end + `]`,

         `Make the table of values. Let the interval (a,b) be the interval in which the root lies. `,

         math_visuals.array_to_table(arry),

         `Having followed the method ` + tex(`` + (arry.length - 1)) + ` times, we know that there is a root within the range ` +

         tex((arry[(arry.length - 1)][5] > 0 ? ((arry[(arry.length - 1)][1] > 0) ? `[` + (arry[(arry.length - 1)][4]) + `,` + arry[(arry.length - 1)][2] + `]` : `[` + arry[(arry.length - 1)][0] + `,` + arry[(arry.length - 1)][4] + `]`) :
             ((arry[(arry.length - 1)][1] > 0) ? `[` + arry[(arry.length - 1)][0] + `,` + arry[(arry.length - 1)][4] + `]` : `[` + arry[(arry.length - 1)][4] + `,` + arry[(arry.length - 1)][2] + `]`))),

         tex(`\\because\\,` + arry[arry.length - 1][4] + ` \\thickapprox ` + math.round(arry[arry.length - 1][4], 1)) + ` and ` + tex(arry[arry.length - 2][4] + `\\thickapprox` + math.round(arry[arry.length - 1][4], 1)),

         `if ` + tex(arry[arry.length - 1][4] + ``) + ` to ` + tex(`1`) + ` decimal place equals ` + tex(`` + arry[arry.length - 2][4]) + ` to ` + tex(`1`) + ` decimal place `,

         `so there must be a root of ` + tex(equation) + ` equal to ` + tex(`` + ans) + ` to ` + tex(`1`) + ` decimal place`,
     ];
     return steps[step];
 };

 self.misconception = function (answer) {
     return 0; // Default
 };

 self.correct_answers = function () {
     return arry2;
 };