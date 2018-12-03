document.write('<script language=javascript src="../comm/json2.js"></script>');
var g_ajaxVer = 0;			// ajaxͨ���汾

function  set_version(strAjaxVersion)
{
	g_ajaxVer = strAjaxVersion;
}

var g_uniqueid = "";		// ҳ�������м��ص�ҳ���Ψһ��ID
function set_uniqueid(strUniqueid)
{
	g_uniqueid = strUniqueid;
}

function get_uniqueid()
{
	return g_uniqueid;
}

function fn_request(arr_std,arr_ext,arr_local)
{
	var parameter = "";	
	if(g_ajaxVer == 1)
	{
		var jsonStr1 = window.JSON.stringify(arr_std);
		var jsonStr2 = window.JSON.stringify(arr_ext);
		var jsonStr3 = window.JSON.stringify(arr_local);
		parameter = '{"standard":'+ jsonStr1 +',"extra":'+ jsonStr2 +',"local":'+ jsonStr3 +'}';
	}else if(g_ajaxVer == 0)
	{
		
		for(var key in arr_std)
		{		
			parameter = key + '='+ arr_std[key] + '\n'+ parameter;
		}
		for(var key in arr_ext)
		{
			parameter = key + '=' + arr_ext[key] + '\n' + parameter;
		}
		for(var key in arr_local)
		{
			parameter = key + '='+ arr_local[key] + '\n' + parameter;
		}
		
		// ���������ֶ�
		if(arr_std['menuid'] != null)
		{
			var ext_data = 'setcode=' + arr_std['setcode'] + 'extradata=' + 'menuid|' + arr_ext['menuid'] + '|setcode|' + arr_std['setcode'] + '|scdm|' + arr_ext['scdm'] + '|';
			parameter = parameter + ext_data;
		}			
		// json�е����ָ��ϰ�����ֲ�һ����ת��������
		parameter = replaceKey(parameter,fn_getKeyMap());
	}
	fnRequest("", parameter);
}

// �°汾���ϰ汾֮��keyֵ��ӳ���ϵ
// �����Ҫ�����µ�keyֵӳ�䣬�����޸����е�ӳ�䣬
// ֻ��Ҫ�޸���������ڵ�����Ϳ�����
function fn_getKeyMap()
{
	var arr_keyMap = new Array();
	arr_keyMap["userkey"] 		= 	"user";
	arr_keyMap["stockcode"] 	= 	"code";
	arr_keyMap["entrustprice"] 	= 	"price";
	arr_keyMap["entrustamount"]	= 	"amount";
	arr_keyMap["html_callback"] = 	"callback";

	arr_keyMap["cx_webpehao"]   =   "cx_webph";
	arr_keyMap['Query_IPO']		=	"cx_zq";
	return arr_keyMap;
}

//�ַ����滻
function replaceKey(str,arr)
{
	var arrKey = new Array();
	var j = 0;
	for (key in arr) 
	{
		arrKey[j] = key;
		j++
	}
	for(var i = 0; i<arrKey.length; i++)
	{
		str = str.replace(arrKey[i],arr[arrKey[i]]);
	}
	
	return str;
}
function fn_reply(obj, fn_name)
{
	if(g_ajaxVer == 0)
	{
		return obj;
	}
	else if(g_ajaxVer == 1)
	{
		var parse_array ={};
		parse_array['code'] = obj.reply.ret_code;
		parse_array['msg']  = obj.reply.ret_msg;
		switch(fn_name)
		{
			case 'parse_sglist':
			var tableArray = [];
			parse_array.data = {};
			parse_array.data.table = [];
			if(!obj.reply.table)
			{
				return window.JSON.stringify(parse_array);
			}
			if(!obj.reply.table.body)
			{
				return window.JSON.stringify(parse_array);
			}
			for(var i = 0; i < obj.reply.table.body.length; i++)//����2171 �г������ֶ� 2003 ���еͼ��ֶ�20170331
			{	
				var arrBody =  obj.reply.table.body[i];
				tableArray.push({"2102":arrBody.xd_2102,
								 "2103":arrBody.xd_2103,
								 "2108":arrBody.xd_2108,
								 "2197":arrBody.xd_2197,
								 "3697":arrBody.xd_3697,
								 "3016":arrBody.xd_3016,
								 "3788":arrBody.xd_3788,
								 "3789":arrBody.xd_3789,
								 "2009":arrBody.xd_2009,
								 "3685":arrBody.xd_3685,
								 "2127":arrBody.xd_2127,
								 "3018":arrBody.xd_3018,
								 "2171":arrBody.xd_2171,
								 "2003":arrBody.xd_2003
								 });
			}
			parse_array.data.table = tableArray;
			var ret_str = window.JSON.stringify(parse_array);
			return ret_str;		
			break;
			case 'parse_ksgsl':
				if(g_loginType == 1)
				{
					var objstr = {"zqdm":obj.reply.zqdm,"valvol":obj.reply.wtsl};	
				}
				else
				{
					var objstr = {"zqdm":obj.reply.zqdm,"valvol":obj.reply.valvol,"push_reply":obj.reply.push_reply};	
				}
				
				parse_array['data'] = objstr;
				var ret_str = window.JSON.stringify(parse_array);
				return ret_str;
			break;
			case 'parse_ywtsl':
				if(!obj.reply.table)
				{	
					parse_array['data'] = {"is_empty":"1","table":[]};
					var ret_str = window.JSON.stringify(parse_array);				
					return ret_str;
				}
				else
				{				
					var tableArray = [];
					parse_array.data = {};
					parse_array.data.table = [];
					for(var i = 0; i < obj.reply.table.body.length; i++)
					{	
						var arrBody =  obj.reply.table.body[i];
						tableArray.push({	"2139":arrBody.xd_2139,
											"2140":arrBody.xd_2140,
											"2135":arrBody.xd_2135,
											"2102":arrBody.xd_2102,
											"2103":arrBody.xd_2103,
											"2109":arrBody.xd_2109,
											"2127":arrBody.xd_2127,
											"2126":arrBody.xd_2126,
											"2128":arrBody.xd_2128,
											"2129":arrBody.xd_2129,
											"2120":arrBody.xd_2120,
											"2113":arrBody.xd_2113,
											"2105":arrBody.xd_2105,
											"3680":arrBody.xd_3680,
											"2108":arrBody.xd_2108,
											"2106":arrBody.xd_2106,
											"2219":arrBody.xd_2219,
											"3772":arrBody.xd_3772,
											"3749":arrBody.xd_3749,
											"FCOLOR":arrBody.FCOLOR,
											"BCOLOR":arrBody.BCOLOR
										});
					}
					parse_array.data.table = tableArray;
					var ret_str = window.JSON.stringify(parse_array);			
					return ret_str;	
				}
			break;
			case 'parse_zqmx':
				if(!obj.reply.table)
				{
					parse_array['data'] = {"is_empty":"1","table":[]};
					var ret_str = window.JSON.stringify(parse_array);			
					return ret_str;
				}
				else
				{	
					var tableArray = [];
					parse_array.data = {};
					parse_array.data.table = [];
					for(var i = 0; i < obj.reply.table.body.length; i++)
					{	
						var arrBody =  obj.reply.table.body[i];
						tableArray.push({
											"2102":arrBody.xd_2102,					
											"2103":arrBody.xd_2103,					
											"2199":arrBody.xd_2199				
										});
					}
					parse_array.data.table = tableArray;
					var ret_str = window.JSON.stringify(parse_array);				
					return ret_str;	
				}
			break;
			case 'parse_yijiansg':
				parse_array['data'] = {"callback":"cx_xgwt"};
				var ret_str = window.JSON.stringify(parse_array);			
				return ret_str;
			break;
			case 'parse_webxgph':
				var arrBody =  obj.reply.data;				
				var ObjBody = new Function("return" + arrBody)();
				var tableArray = [];
				parse_array.data = {};
				parse_array.data.webph = "";
				for(var i = 0; i < ObjBody.length; i++)
				{
					var JsonStr={};
					JsonStr['STOCKCODE']=ObjBody[i]['STOCKCODE'];
					JsonStr['STOCKNAME']=ObjBody[i]['STOCKNAME'];
					JsonStr['SGCODE']=ObjBody[i]['SGCODE'];
					JsonStr['FXJG']=ObjBody[i]['FXJG'];
					JsonStr['SGDATE']=ObjBody[i]['SGDATE'];
					JsonStr['ZQH']=ObjBody[i]['ZQH'];
					JsonStr['WSZQJGGGR']=ObjBody[i]['WSZQJGGGR'];
					tableArray.push(JsonStr);
				}
				parse_array.data.webph = tableArray;
				parse_array.data.webph = window.JSON.stringify(parse_array.data.webph);
				var ret_str = window.JSON.stringify(parse_array);
				 var re = new RegExp("\\\\","g");
				ret_str = ret_str.replace(re,"");
				return ret_str;
			break;
			case 'parse_xgph':
				if((!obj.reply.table) || (!obj.reply.table.body))
				{
					parse_array['data'] = {"is_empty":"1","table":[]};
					var ret_str = window.JSON.stringify(parse_array);				
					return ret_str;
				}
				else
				{
					var tableArray = [];
					parse_array.data = {};
					parse_array.data.table = [];
					for(var i = 0; i < obj.reply.table.body.length; i++)
					{	
						var arrBody =  obj.reply.table.body[i];
						tableArray.push({
											"999":arrBody.xd_999,			
											"2141":arrBody.xd_2141,			
											"2102":arrBody.xd_2102,			
											"2106":arrBody.xd_2106,			
											"2103":arrBody.xd_2103,			
											"2163":arrBody.xd_2163,			
											"2128":arrBody.xd_2128,		
											"2108":arrBody.xd_2108,
											"2157":arrBody.xd_2157,
											"2130":arrBody.xd_2130,
											"2164":arrBody.xd_2164
										});
					}
					parse_array.data.table = tableArray;
					var ret_str = window.JSON.stringify(parse_array);
					return ret_str;			
					
				}
			break;
		}
	}
}