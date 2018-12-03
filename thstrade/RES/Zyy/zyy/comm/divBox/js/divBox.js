/*////////////////////////////////
 * JQuery ģ̬�Ի���
 * Author: dongchengang@myhexin.com
 * Date: 2011-07-18
*/

$(document).ready(function(){
	// �������ֲ�
	maskDiv = document.createElement("div");
	maskDiv.id = "mask_OverLay";
	$(maskDiv).addClass("mask_layer");
	
	$.ShowModalWindow = function(p){
		p = $.extend({
			caption : "��ʾ",				// �Ի�����ʾ����
			bodyHTML : '',					// �ڲ���ʾ���ݵ�HTML����
			width : 400,
			height : 300,
			bindCheckbox : false,		// �Ƿ���������checkbox�Ͱ�ť��
			bindCheckboxLabel : false,	// ������checkbox��ʾ������
			buttons : [{
				name : "ȷ��",
				bindCheckbox : false,	// �ð�ť�Ƿ���checkbox��
				onPress : divBox_close	// ���°�ť��ִ�е��¼���Ĭ�Ϲرմ���
			}]
		}, p);
		// ����ModalWidnow
		var modalLayer = document.createElement("div");
		modalLayer.id = "modalLayer";
		modalLayer.style.display="none";
		
		// ����dialog����
		var modalDialog = document.createElement("div");
		modalDialog.id = "modal_dialog";
		$(modalDialog).addClass("modal_dialog");
		// ����λ�þ���
		$(modalDialog).css('left', (window.innerWidth - p.width) / 2).css('top', (window.innerHeight - p.height) / 2);
		
		var win_caption = document.createElement('div');	// ����
		var win_body = document.createElement('div');		// ����
		var win_button = document.createElement('div');		// ��ť
		var win_bottom = document.createElement('div');		// �ױ�
		
		// ���ñ���
		var innerCaption = document.createElement('div');
		innerCaption.innerText = p.caption;
		$(innerCaption).css('width', p.width - 30);
		$(win_caption).append(innerCaption).addClass("win_caption"); // �趨����������ʾ�Ŀ��
		
		// ��������
		win_body.innerHTML = p.bodyHTML;
		$(win_body).addClass("win_body").css('height', p.height - 68); // �趨���ݲ��ֵĸ߶�
		// ���� checkbox ��ť����
		if (p.bindCheckbox === true)
		{
			// ���һ��checkbox
			var checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			
			$(checkbox).change(function(){
				var bbtn = $('.bindCheckBtn');
				if (this.checked == true)
					bbtn.removeAttr('disabled');
				else
					bbtn.attr('disabled', 'disabled');
			});
			// ����һ�� label
			var lbl = document.createElement('label');
			$(lbl).append(checkbox).append(p.bindCheckboxLabel);
			
			var bcb = document.createElement('p');
			$(bcb).css('text-align', 'center').append(lbl);
			$(win_body).append(bcb);
		}
		
		// ���ð�ť
		$(win_button).addClass('win_buttons').css('text-align', 'center');
		if (p.buttons && p.buttons.length > 0)
		{
			var op_btns = p.buttons;
			// ���ɰ�ť
			var len = op_btns.length;
			for (i=0;i<len;i++)
			{
				var btn_dom = document.createElement('input');
				btn_dom.type = "button";
				btn_dom.value = op_btns[i].name;
				
				var btn = $(btn_dom);
				btn.click(op_btns[i].onPress || divBox_close);
				// ���ð󶨹���
				if (p.bindCheckbox === true && op_btns[i].bindCheckbox === true)
				{
					btn.addClass('bindCheckBtn').attr('disabled', 'disabled');
				}
				// �����Զ��尴ť���
				if (op_btns[i].addClass)
				{
					btn.addClass(op_btns[i].addClass);
				}
				$(win_button).append(btn_dom);
			}
		}
		else
		{
			// ����һ����ť
			var btn = document.createElement('input');
			btn.value = "ȷ��";
			btn.type = "button";
			$(btn).click(divBox_close);
			$(win_button).append(btn);
		}
		
		// ����bottom
		$(win_bottom).addClass('win_bottom');
		
		// ��ӵ� modalDialog
		$(modalDialog).css('width', p.width).css('height', p.height);
		$(modalDialog).append(win_caption).append(win_body).append(win_button).append(win_bottom);
		
		// ���ӵ�DOM
		$(modalLayer).append(modalDialog).append(maskDiv);
		
		$("body").append(modalLayer);
		modalLayer.style.display="block";
		
		// ��̬�ƶԻ����λ��
		$(window).resize(function(){$(modalDialog).css('left', (window.innerWidth - p.width) / 2).css('top', (window.innerHeight - p.height) / 2);});
	}
});

// �Ƴ�����
function divBox_close()
{
	// �Ƴ�����dom�ڵ�
	$("#modalLayer").remove();
}