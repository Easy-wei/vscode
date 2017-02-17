 do {
     var v1 = math_tools.rand_int(2, 9);
     var v2 = math_tools.rand_int(-50, 50, [-1, 0, 1]);
     var v3 = math_tools.rand_int(-50, 50, [-1, 0, 1]);
     var v4 = math_tools.rand_int(-50, 50, [-1, 0, 1]);
     var root = math_tools.polynomial(1, 0, v3, v4); //一元多次方程求根
     root = Number(root.sort()[root.length - 1]);
     var range_start = Math.floor(root);
     var range_end = range_start + 1;
 }
 while (isNaN(root) || (range_start * range_end) === 0 || f(range_start) * f(range_end) === 0);
 var range_near = (math.abs(f(range_start)) > math.abs(f(range_end))) ? range_end : range_start;
 var range_far = (math.abs(f(range_start)) < math.abs(f(range_end))) ? range_end : range_start;

 function f(x) {
     var answer = math.pow(x, 3) + v3 * x + v4;
     return answer;
 }

 function g(x) {
     var answer = 3 * math.pow(x, 2) + v3;
     return answer;
 }
 var equation = `x^{3}` + v3.signed() + `x` + v4.signed();
 var equation1 = `3x^2` + v3.signed();

 self.ordered_answer = true;
 self.precision = 4;
 var ans;

 var a = Math.floor(root);
 var b = a + 1;
 var x = math_tools.round(root, 0);

 function diff_iteration(x) { //differential_interation
     var x1 = x;
     var arry = [
         [tex(`x`), tex(`f(x)`), tex(`f'(x)`), tex(`x^{}_n`)]
     ];
     for (var i = 0; i < 10; i++) {
         var arry1 = [];
         x1 = x - f(x) / g(x);
         arry1[0] = math.round(x, 4);
         arry1[1] = math.round(f(x), 4);
         arry1[2] = math.round(g(x), 4);
         arry1[3] = math.round(x1, 4);
         arry.push(arry1);
         if (math_tools.round(x, 2) == math_tools.round(x1, 2)) {
             ans = math_tools.round(x, 2);
             break;
         }
         x = x1;
     }
     return arry;
 }
 var arry = diff_iteration(x);
 var arry2 = [];
 for (var i = 1; i < arry.length; i++) {
     for (var j = 0; j < arry[i].length; j++) {
         arry2.push(arry[i][j]);
     }
 }

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

         `Show that the equation ` + tex(equation + `=0`) + ` has a root between ` + range_start + ` and ` + range_end +

         `<br>Find the root correct to two decimal places using the Newton-Raphson process.<br>` +

         `(if the input is irrational number,Keeping four decimal places)<br>` +

         `<p class="book_button" ontouchstart="touch_start(event)" onclick="add_row(4)">Add row</p> 
           <p id="remove_row_button" class="book_button" ontouchstart="touch_start(event)" onclick="remove_row(4)">Remove row</p>
          <table id="table" class='input_table'>
          <tr><td><b>` + tex(`x`) + `</b></td><td><b>` + tex(`f(x)`) + `</b></td><td><b>` + tex(`f'(x)`) +
         `</b></td><td><b>` + tex(`x^{}_n`) + `</b></td></tr>
          </table>`;

 };


 self.post_load = function () {
     add_row(4);
     // Hide the remove button since we only have 1 row
     $("#remove_row_button").hide();
 };
 c1 = (range_start * math.abs(f(range_end)) + range_end * math.abs(f(range_start))) / (math.abs(f(range_start)) + math.abs(f(range_end)));
 self.step = function (wrong_answer, step) {
     steps = [
         `Let ` + tex(`f(x)=` + equation),

         tex(`\\therefore\\,f(` + range_start + `)=` + f(range_start)) + tex(`\\,\\,\\,f(` + range_end + `)=` + f(range_end)),

         (f(range_start) > 0) ? tex(`f(` + range_start + `)` + `>0>` + `f(` + range_end + `)`) : tex(`f(` + range_start + `)` + `<0<` + `f(` + range_end + `)`),

         `Since there is a change of a sign between ` + tex(`f(` + range_start + `)`) + ` and ` + tex(`f(` + range_end + `)`),

         `equation ` + tex(equation + `=0`) + ` has a root in the interval[` + range_start + `,` + range_end + `]`,

         `then using the Newton-Raphson process to work out ` + tex(`x^{}_1`) + `<br>`,

         (math.abs(f(range_start)) > math.abs(f(range_end))) ? tex(`\\because\\,\\,` + `|f(` + range_start + `)|>|f(` + range_end + `)|`) + `<br>` +

         tex(`\\therefore\\,\\,` + range_end) + ` is closer to the correct answer` :
         tex(`\\because\\,\\,` + `|f(` + range_start + `)|<|f(` + range_end + `)|`) + `<br>` +
         tex(`\\therefore\\,\\,` + range_start) + ` is closer to the correct answer`,


         `Using ` + tex(`x^{}_0=` + range_near),

         tex(`x^{}_1=x^{}_0-\\dfrac{f(` + range_near + `)}{f'(` + range_near + `)}`),

         (f(range_near) * g(range_near) > 0) ? tex(`x^{}_1=` + range_near + `-`) + math_visuals.fraction.tex(f(range_near), g(range_near)) :
         tex(`x^{}_1=` + range_near + `+`) + math_visuals.fraction.tex(-f(range_near), g(range_near)),

         tex(`x^{}_1=` + arry[1][3]),

         `Then using the same way to make the table of values. Let the interval (a,b) be the interval in which the root lies. `,

         math_visuals.array_to_table(diff_iteration(x)),

         `Hence answer ` + ans + `<br>`,

     ];
     return steps[step];
 };

 self.misconception = function (answer) {
     return 0; // Default
 };

 self.correct_answers = function () {
     return arry2;
 };