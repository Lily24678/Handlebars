/*-------------handlebars 之  basic usage-----------------------------start-----------*/
//1、获取模板
var source = document.getElementById("entry-template").innerHTML;
//2、预编译模板
var template = Handlebars.compile(source);

var context = {
	title: "My New Post",
	body: "This is my first post!",
	book:"handlebars.js是怎样炼成的",
	article: {
		author: "lishanyun",
		fax: "23432@smates.cn",
		address:"安徽在合肥市"
	},
	content: "<p>鹅鹅鹅,曲项向天歌.</p><p>白毛浮绿水,红掌拨清波.</p>"
};
//3、给模板变量赋值
var html = template(context);
//4、输出模板
document.getElementById("demo_1").innerHTML = html;
/*-----------------handlebars 之  basic usage--------------------------end-------------*/

/*-------------handlebars 之  helper-----------------------------start-----------*/
Handlebars.registerHelper('link', function(object) {
	var url = Handlebars.escapeExpression(object.url),
		text = Handlebars.escapeExpression(object.text);
	//handlebars不会编码Handlebars.SafeString.这里将会对传入的参数进行编码，返回值是“安全的”，所以就算你不使用{{{，handlebars也不会再次编码了。
	return new Handlebars.SafeString(
		"<a href='" + url + "'>" + text + "</a>"
	);
});

var source = document.getElementById("entry-template_2").innerHTML;
var template = Handlebars.compile(source);
var context = {
	network: {
		url: 'https://www.baidu.com',
		text: '百度'
	}
};
var html = template(context);
document.getElementById("demo_2").innerHTML = html;

/*-------------handlebars 之  helper-----------------------------end-------------*/


/*-------------handlebars 之  helper —— Block Expressions-----------------------start-----------------*/
//一
Handlebars.registerHelper('list', function(items, options) {
  var out = "<ul>";

  for(var i=0, l=items.length; i<l; i++) {
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }

  return out + "</ul>";
});

//二
Handlebars.registerHelper('noop', function(options) {
	console.log(options.fn(this));
    return options.fn(this);
});

//三、简单的迭代一
Handlebars.registerHelper('with', function(context, options) {
  return options.fn(context);
});

//简单迭代二
Handlebars.registerHelper('each', function(context, options) {
  var ret = "";

  for(var i=0, j=context.length; i<j; i++) {
    ret = ret + options.fn(context[i]);
  }

  return ret;
});
var source = document.getElementById("entry-template_3").innerHTML;
var template = Handlebars.compile(source);
var context = {
	people: [
		{firstName: "Yehuda", lastName: "Katz"},
		{firstName: "Carl", lastName: "Lerche"},
		{firstName: "Alan", lastName: "Johnson"}
	],
	declare:"块表达式",
    story: {
	    intro: "Before the jump",
	    body: "After the jump"
	},
    comments:[
    	{subject:"数学"},{subject:"语文"},{subject:"英语"},{subject:"美术"},
    ],
};
var html = template(context);
document.getElementById("demo_3").innerHTML = html;

/*-------------handlebars 之   helper —— Block Expressions-----------------------------end-------------*/



/*-------------handlebars 之  helper —— Conditionals-----------------------start-----------------*/
Handlebars.registerHelper('if', function(conditional, options) {
  if(conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

var source = document.getElementById("entry-template_4").innerHTML;
var template = Handlebars.compile(source);
var context = {
	isActive: false,
	isInactive:false,
};
var html = template(context);
document.getElementById("demo_4").innerHTML = html;

/*-------------handlebars 之   helper —— Conditionals-----------------------------end-------------*/


/*-------------handlebars 之  helper —— Hash Arguments-----------------------start-----------------*/
//一、参数
Handlebars.registerHelper('list', function(context, options) {
  var attrs = Object.keys(options.hash).map(function(key) {
    return key + '="' + options.hash[key] + '"';
  }).join(" ");

  return "<ul " + attrs + ">" + context.map(function(item) {
    return "<li>" + options.fn(item) + "</li>";
  }).join("\n") + "</ul>";
});


//二、私有变量
Handlebars.registerHelper('list-index', function(context, options) {
  var out = "<ul>", data;

  if (options.data) {
    data = Handlebars.createFrame(options.data);
  }

  for (var i=0; i<context.length; i++) {
    if (data) {
      data.index = i;
    }

    out += "<li>" + options.fn(context[i], { data: data }) + "</li>";
  }

  out += "</ul>";
  return out;
});


var source = document.getElementById("entry-template_5").innerHTML;
var template = Handlebars.compile(source);
var context = {
	nav:[
		{title: "baidu",
		url:"https://www.baidu.com",
		},
		{title: "Handlebars.js ",
		url:"handlebarsjs.com",
		},
		{title: "Handlebars.js 中文文档",
		url:"http://keenwon.com/992.html",
		},
	],
	array:[
		{title: "baidu",
		url:"https://www.baidu.com",
		},
		{title: "Handlebars.js ",
		url:"handlebarsjs.com",
		},
		{title: "Handlebars.js 中文文档",
		url:"http://keenwon.com/992.html",
		},
	]
	
};
var html = template(context);
document.getElementById("demo_5").innerHTML = html;

/*-------------handlebars 之   helper —— Hash Arguments-----------------------------end-------------*/
