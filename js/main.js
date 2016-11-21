$(function(){
	//搜索切换
	(function(){
		var aLi=$('#menu li');
		var oText=$('.form').find('.text');
		var arrText=['例如：荷棠鱼坊烤鱼 或 樱花日本料理','例如：昌平区龙旗广场2号楼','例如：万达影院情侣双人券','例如：雾霾天气严重，治理刻不容缓','例如：北京天气变幻莫测'];
		var iNow=0;
		oText.val(arrText[0]);
		aLi.each(function(index){
			$(this).click(function(){
				//console.log(index);
				aLi.attr('class','gradient');
				$(this).attr('class','active');
				iNow=index;
				oText.val(arrText[iNow]);
			});
		});

        oText.focus(function(){
        	if($(this).val()==arrText[iNow]){
                 $(this).val('');
        	}
        });

        oText.blur(function(){
        	if($(this).val()==''){
                 $(this).val(arrText[iNow]);
        	}
        });
	})();
    // 文字滚动
    (function(){
    	var oDiv=$('.article');
    	var oUl=$('.article ul');
        var iH=0;
        var arrData=[{'name':'洋洋','time':'2','title':'那些灿烂还没得瞬间','url':'#'},
                     {'name':'洋洋','time':'3','title':'那些灿烂还没得瞬间','url':'#'},
                     {'name':'洋洋','time':'4','title':'那些灿烂还没得瞬间','url':'#'},
                     {'name':'洋洋','time':'5','title':'那些灿烂还没得瞬间','url':'#'},
                     {'name':'洋洋','time':'6','title':'那些灿烂还没得瞬间','url':'#'},
                     {'name':'洋洋','time':'7','title':'那些灿烂还没得瞬间','url':'#'},
                     {'name':'洋洋','time':'8','title':'那些灿烂还没得瞬间','url':'#'}];
        var str='';  
        var oBtnUp=$('#upBtn');  
        var oBtnDown=$('#downBtn');  
        var iNow=0;
        for(var i=0;i<arrData.length;i++){
            str+='<li><a class="update" href="#"></a><a class="name" href="#">'+arrData[i].name+'</a><a class="time" href="#">'+arrData[i].time+'分钟前</a><a class="articl" href="#">写了一篇新文章：</a><a class="articl_con" href="arrData[i].url">'+arrData[i].title+'…</a></li>';
        }
        oUl.html(str);
        iH= oUl.find('li').height();
        
        oBtnUp.click(function(){
        	doMove(-1);
        });
        oBtnDown.click(function(){
        	doMove(1);
        }); 
        oDiv.hover(function(){
        	clearInterval(timer);
        },autoMove);

        function doMove(num){
        	iNow+=num;
        	if (Math.abs(iNow)>arrData.length-1) {
        		iNow = 0;
        	}
        	if(iNow>0){
        		iNow = -(arrData.length-1);
        	} 
        	oUl.stop().animate({'top':iH*iNow},1500);
        }
        function autoMove(){
        	timer=setInterval(function(){
        		doMove(-1);
        	},2000)
        };
        autoMove();
    })();
    //选项卡 点击/鼠标移入 切换 
    (function(){
        fnTab($('.tabBar1'),$('.tabBar1_con'));
        fnTab($('.tabBar2'),$('.tabBar2_con'));
        fnTabMouse($('.tabBar3'),$('.tabBar3_con'));
        fnTabMouse($('.tabBar4'),$('.tabBar4_con'));

    	function fnTab(oTab,aCon){
            var aElem = oTab.children();
            aCon.hide().eq(0).show();

            aElem.each(function(index){
                $(this).click(function(){
	            	aElem.removeClass('active').addClass('gradient');
	            	$(this).removeClass('gradient').addClass('active');
	            	aElem.find('a').attr('class','triangle_down_gray');
	            	$(this).find('a').attr('class','triangle_down_red');
	            	aCon.hide().eq(index).show();
	            });
            });  
    	}
    	function fnTabMouse(oTab,aCon){
            var aElem = oTab.children();
            aCon.hide().eq(0).show();

            aElem.each(function(index){
                $(this).mouseover(function(){
	            	aElem.removeClass('active').addClass('gradient');
	            	$(this).removeClass('gradient').addClass('active');
	            	aElem.find('a').attr('class','triangle_down_gray');
	            	$(this).find('a').attr('class','triangle_down_red');
	            	aCon.hide().eq(index).show();
	            });
            });  
    	}
    })();
    // 焦点图播放
    (function(){
    	var aImg=$('.rec_img img');
    	var aUlli=$('.side_img li');
    	var oP=$('.change p');
    	var arr=['爸爸去哪儿','人像摄影中的光影感','娇柔妩媚，美艳大方']
    	var iNow=0;
        //初始化加点图
        fnFade();
        //点击小图片切换
        aUlli.click(function(){
            iNow=$(this).index();
            fnFade();
        });
        //自动播放
        function autoPlay(){
            timer=setInterval(function(){
            	iNow++;
            	iNow%=arr.length;
            	fnFade();
            },2000);
        }
        autoPlay();
        //鼠标移入停止播放，移出自动播放
        aImg.hover(function(){
            clearInterval(timer);
        },autoPlay);
        // 动画函数
    	function fnFade(){
    		aImg.each(function(i){
    			if(i!=iNow){
    				aImg.eq(i).fadeOut().css('zIndex','1');
    				aUlli.eq(i).removeClass('active');
    			}
    			else{
    				aImg.eq(i).fadeIn().css('zIndex','2');
    				aUlli.eq(i).addClass('active');
    			}
    		});
    		oP.text(arr[iNow]);
    	}
    })();
    //日历 
    (function(){
    	var aSpan=$('.calendar h3 span');
    	var aImg=$('.calendar .img');
    	var oPrompt=$('.today_info');
    	var oImg=oPrompt.find('img');
    	var oStrong=oPrompt.find('strong');
    	var oP=oPrompt.find('p');

    	aImg.hover(function(){
    		var iTop=$(this).parent().position().top-36;
    		var iLeft=$(this).parent().position().left+48;
            var oIndex=$(this).parent().index()%7;

    		oPrompt.show().css({'top':iTop,'left':iLeft});
    		oImg.attr('src',$(this).attr('src'));
    		oP.html($(this).attr('info'));
            oStrong.text(aSpan.eq(oIndex).html());

    	},function(){
    		oPrompt.hide();
    	});
    })();
    //  BBS论坛
    (function(){
    	var oUl=$('.bbs_list');
    	var aLi=$('.bbs_list li');
    	aLi.each(function(){
        	aLi.mouseover(function(){
                aLi.removeClass('active');
                $(this).addClass('active');
        	});
    	});
    })();
    //红人烧客 鼠标提示效果
    (function(){
    	var aLi = $('.hot_list li');
    	var arr=['',
    	         '用户1<br/>人气1',
    	         '用户名：性感宝贝<br/>区域：朝阳CBD<br/>人气：124978',
    	         '用户3<br/>人气3',
    	         '用户4<br/>人气4',
    	         '用户5<br/>人气5',
    	         '用户6<br/>人气6',
    	         '用户7<br/>人气7',
    	         '用户8<br/>人气8',
    	         '用户9<br/>人气9',
    	         '用户10<br/>人气10']
        aLi.mouseover(function(){
        	var iWidth=$(this).width()-12;
        	var iHeight=$(this).height()-12;
        	aLi.find('p').remove();
        	if($(this).index()==0){
        		return ;
        	}
        	$(this).append('<p style="width:'+iWidth+'px;height:'+iHeight+'px;"></p>');
            $(this).find('p').html(arr[$(this).index()]);
        });
    })();
})