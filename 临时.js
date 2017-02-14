        [tex(`a`), tex(`f(a)`), tex(`b`), tex(`f(b)`), tex(`x^{}_n`), tex(`f(x^{}_n)`)]
    
    
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
	   
   	   tex(`\\because\\,`+arry[arry.length-1][4]+` \\thickapprox `+math.round(arry[arry.length-1][4],1))+` and `+tex(`\\,\\,\\,`+arry[arry.length-2][4]+`\\thickapprox`+math.round(arry[arry.length-1][4],1)),

         `if `+tex(arry[arry.length-1][4]+``)+` to `+tex(`1`)+` decimal place equals `+tex(``+arry[arry.length-2][4])+` to `+tex(`1`)+` decimal place `,
	   
         `so there must be a root of ` + tex(equation) + ` equal to ` + tex(`` + ans) + ` to ` + tex(`1`) + ` decimal place`,