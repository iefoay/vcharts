var version = "0.7.5";

var fs = require('fs');
var http = require('http');

var UglifyJS = require("uglify-js");

var combineList = require("./files");

function combine(beautify) {
    var srcList = [];
    for (var i = 0, l = combineList.length; i < l; ++i) {
        var content = fs.readFileSync(combineList[i], 'utf-8');
        srcList.push(content);
    }
    var orig_code = srcList.join('\r\n');//windows换行

    var ast = UglifyJS.parse(orig_code);
    ast.figure_out_scope();//审查

    var compressor = UglifyJS.Compressor({//Compressor options
        warnings: false,
    //    unsafe: true,
    //    sequences: false,
    //    loops: false,
    //    cascade: false,
    //    conditionals: false,
    //    booleans: false,
    //    'dead_code': false,
    //    'pure_getters': true,
    //    'hoist_funs':false,
    //    'hoist_vars':true,
    //    'if_return':false,
    //    'side_effects':false,
    //    'join_vars':false,
    	global_defs: {
            appVersion: version
    	}
    });
    ast = ast.transform(compressor);

    ast.compute_char_frequency();
    ast.mangle_names();

    var final_code = ast.print_to_string({//Beautifier options
        'beautify': beautify,
//        'semicolons': false,
        preamble: "/**\n * VCharts v" + version + "\n * license MIT (c) 2013 vcharts.cn/license\n */"
    });
//    console.log(final_code);
    return final_code;
}

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/x-javascript;charset=utf-8'});
    res.end(combine(true));
}).listen(8088, 'localhost');

console.log("OK 8088!");

var orig_code = combine(false);
fs.writeFileSync("../github/js/vcharts.js", orig_code);
