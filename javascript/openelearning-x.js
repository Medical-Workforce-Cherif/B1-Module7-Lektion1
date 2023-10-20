
//t6m_markswords
/*
OPEN ELEARNING PLUGIN
Plugin for http://www.openelearning.org/
Authoring Tools for eLearning on Linux, Mac, and Windows
markswords
*/

var fillMarkswordsH1 = "Marks the Words";
var fillMarkswordsTxt = "A free based question type allowing *Creatives* to create *Challenges* ";
fillMarkswordsTxt += "where the user is to mark *specific* types of verbs in a text.";

var fillAppContain;
var fillAppIsOk = false;
var lockAppIsOk = false;

var markwAppId = 0;
var fillMarksWordsNb = 0;

function t6m_markswordsOnPaint(obj){
	
	var h = '';

	var colBtn = "#1a73d9";
	if(obj.fields[10]!=''){
		colBtn = obj.fields[10];
	}

	if(obj.fields[0]!=''){
		fillMarkswordsH1 = obj.fields[0];
	}
	if(obj.fields[1]!=''){
		fillMarkswordsTxt = obj.fields[1];
	}

	h += '<div style="position:absolute;border:solid 1px #F8F9F9;padding:5px;" ';
	h += ' id="bloct6m' + obj.id + '" class="bloct6m' + obj.id + ' " >';
	h += '<div class="fhvp-introduction fhvp-introduction' + obj.id + '">';
	h += '<p>' + fillMarkswordsH1 + '</p>';
	h += '</div>';

	var markswordsTxt = pregmMarkTheWords(fillMarkswordsTxt);
	h += '<div class="fhvp-question fhvp-question' + obj.id + '" >';
	h += markswordsTxt;
	h += '</div>';

	if(obj.fields[2]==1){
		h += '<button class="hvp-question-check-answer hvp-joubelui-button" ';
		h += ' style="background-color:'+colBtn+';" ';
		h += ' onClick="markwAppId='+obj.id+';processViewErrors(this);" ';
		h += 'title="Check" type="button" >'+obj.fields[5]+'</button>';
	}

	if(obj.fields[3]==1){

		var tFeedBack = obj.fields[7]
		tFeedBack = tFeedBack.replace("{0}",'<span class="scoreNubBase' + obj.id + '" >0</span>');
		tFeedBack = tFeedBack.replace("{1}",fillMarksWordsNb);
		
		h += '<div class="score-feedback' + obj.id + ' fhvp-question-feedback" ';
		h += ' style="display:none;" >';
		h += tFeedBack;
		h += '</div>';
		
		// <div class="fhvp-question" >
		// 	A free based <span class="hvp-missed" >question</span> type allowing <span class="hvp-select" >creatives</span> to create challenges 
		// 	where <span class="hvp-correct" >the<div class="plus-one"></div></span> user  is to mark <span class="hvp-incorrect" >specific<div class="minus-one"></div></span> types of verbs in a text.
		// </div>
	
		h += '<div class="score-bar' + obj.id + ' hvp-joubelui-score-bar" style="display:none;" >';
		h += '<div class="hvp-joubelui-score-bar-visuals">';
		h += '<div class="hvp-joubelui-score-bar-progress-wrapper">';
		h += '<div class="hvpScoreNubFull' + obj.id + ' hvp-joubelui-score-bar-progress"></div>';
		h += '</div>';
		h += '<div class="hvp-joubelui-score-bar-star">';
		h += '<img style="width:40px;height:32px;" src="data/star-win.png" />';
		h += '</div>';
		h += '</div>';
		h += '<div class="hvp-joubelui-score-numeric" aria-hidden="true">';
		h += '<span class="scoreNubBase' + obj.id + ' hvp-joubelui-score-number hvp-joubelui-score-number-counter">0</span>';
		h += '<span class="hvp-joubelui-score-number-separator">/</span>';
		h += '<span class="scoreNubFull' + obj.id + ' hvp-joubelui-score-number hvp-joubelui-score-max">';
		h += fillMarksWordsNb;
		h += '</span>';
		h += '</div>';
		h += '</div>';
	}
	
	if(obj.fields[8]==1){
		h += '<button class="hvp-question-retry hvp-joubelui-button" ';
		h += ' onClick="markwAppId='+obj.id+';resetObjResults(this)"; style="display:none;background-color:'+colBtn+';" ';
		h += 'title="Check" type="button" >'+obj.fields[9]+'</button>';
	}

	if(obj.fields[3]==1){
		h += '<button class="hvp-question-solut hvp-joubelui-button" ';
		h += ' onClick="markwAppId='+obj.id+';viewSolution(this)"; style="display:none;background-color:'+colBtn+';" ';
		h += ' title="Solution" type="button">'+obj.fields[6]+'</button>';
	}

	h += '</div>';

	setTimeout(function(){
		installMarksWords(obj.id );
	},400);
	
	return h;
	
}

function installMarksWords(id){

	fillAppContain = $('.bloct6m' + id);

	$( ".t6m-sel" ).click(function() {
		if (lockAppIsOk==false) {
			if ( $(this).hasClass("hvp-select") ) {
				$(this).removeClass("hvp-select");
			} else {
				$(this).addClass("hvp-select");
			}
		}
	});

	$( ".t6m-nos" ).click(function() {
		if (lockAppIsOk==false) {
			if ( $(this).hasClass("hvp-select") ) {
				$(this).removeClass("hvp-select");
			} else {
				$(this).addClass("hvp-select");
			}
		}
	});

}

function transformSrcMarkTheWords(str){

	var offSt = str.indexOf("*");
	if ( offSt!=-1 ) {
		str = str.replace("*","[");
		offSt = str.indexOf("*");
		if ( offSt!=-1 ) {
			str = str.replace("*","]");
		}
	}
	offSt = str.indexOf("*");
	if ( offSt!=-1 ) {
		str = transformSrcMarkTheWords(str)
	}
	return str;

}

function pregmMarkTheWords(str){

	str = transformSrcMarkTheWords(str);
	
	var off = str.indexOf("[");
	fillMarksWordsNb = 0;

	if(off!=-1)
	{
		returnStr = "";
		str = str.split('[').join('@[');
		str = str.split(']').join(']@');

		var allPart = str.split("@");
		var i = 0;

		for (i = 0; i < allPart.length; i++) {
			var partCtr = allPart[i];
			if ( partCtr.indexOf("[")!=-1 ) {
				fillMarksWordsNb++;
				partCtr = partCtr.replace("[","");
				partCtr = partCtr.replace("]","");
				returnStr += '<span class="t6m-sel" >'+partCtr+'</span>';
			} else {
				var allPart2 = partCtr.split(" ");
				var j = 0;
				
				for (j = 0; j < allPart2.length; j++) {
					
					var partCtr2 = allPart2[j];

					partCtr2 = partCtr2.replace(/!br!/g,"#");

					if ( partCtr2.indexOf("#")!=-1 ) {

						var allPart3 = partCtr2.split("#");
						var k = 0;
						
						for (k = 0; k < allPart3.length; k++) {
							var partCtr3 = allPart3[k];
							returnStr += '<span class="t6m-nos" >'+partCtr3+'</span>';
							if (k<allPart3.length-1) {
								returnStr += '#';
							}
						}

						returnStr = returnStr.replace(/#/g,"!br!");

					} else {
						returnStr += '<span class="t6m-nos" >'+partCtr2+'</span>';
						returnStr += '<span> </span>';
					}

				}
			}
			

		}
	}

	returnStr = returnStr.replace(/!br!/g,"<br/>");

	return returnStr;
	
}

function t6m_markswordsOnZoom(obj){
	
	var xb = parseInt(obj.x * zoom);
	var yb = parseInt(obj.y * zoom);
	
	var wb = parseInt(obj.w * zoom);
	var hb = parseInt(obj.h * zoom);
	
	var cmqobj = $('.bloct6m'+obj.id);
	cmqobj.css("position","absolute");
	cmqobj.css("width",wb + "px").css("height",hb + "px");
	cmqobj.css("left",xb + "px").css("top",yb + "px");
	
	var htitle = parseInt((obj.fontsize + 2) * zoom);
	$('.fhvp-introduction'+obj.id).css("font-size",htitle + 'px');

	var htext = parseInt(obj.fontsize * zoom);
	$('.fhvp-question'+obj.id).css("font-size",htext + 'px');
	
}

function t6m_markswordsIsOK(obj){

	fillAppIsOk = true;

	$( ".t6m-sel" ).each(function( index ) {
		if ( !$(this).hasClass("hvp-select") ) {
			fillAppIsOk = false;
		}
	});
	$( ".t6m-nos" ).each(function( index ) {
		if ( $(this).hasClass("hvp-select") ) {
			fillAppIsOk = false;
		}
	});
	return fillAppIsOk;

}

function t6m_markswordsViewResults(obj){

	viewSolution(obj);

}

function resetObjResults(obj){

	lockAppIsOk = false;

	$( ".hvp-question-check-answer" ).css("display","");
	$( ".hvp-question-retry" ).css("display","none");
	$( ".hvp-question-solut" ).css("display","none");

	$( ".scoreNubBase" + markwAppId ).html("0");
	$( ".hvpScoreNubFull" + markwAppId ).css("width","0%");
	$( ".score-bar" + markwAppId ).css("display","none");
	$( ".score-feedback" + markwAppId ).css("display","none");

	$( ".t6m-sel" ).each(function( index ) {
		$(this).removeClass("hvp-correct");
		$(this).removeClass("hvp-incorrect");
		$(this).removeClass("hvp-select");
		$(this).removeClass("hvp-missed");
	});
	$( ".t6m-nos" ).each(function( index ) {
		$(this).removeClass("hvp-correct");
		$(this).removeClass("hvp-incorrect");
		$(this).removeClass("hvp-select");
		$(this).removeClass("hvp-missed");
	});

}

function viewSolution(obj){
	
	processViewErrors(obj);
	
	$( ".t6m-sel" ).each(function( index ) {
		if ( !$(this).hasClass("hvp-select") ) {
			$(this).addClass("hvp-missed");
		}
	});

}

function processViewErrors(obj){

	if (typeof window['t6m_markswordsViewErrors'] === "function") {
		t6m_markswordsViewErrors(obj);
	} else {
		if (typeof viewErrors === "function") { 
			viewErrors(obj);
		}
	}
}

function t6m_markswordsViewErrors(obj){

	lockAppIsOk = true;

	$( ".hvp-question-check-answer" ).css("display","none");
	$( ".hvp-question-retry" ).css("display","");

	$( ".score-bar" + markwAppId ).css("display","");
	$( ".score-feedback" + markwAppId ).css("display","");

	var pointsBar = 0;
	var pointsFullBar = $( ".scoreNubFull" + markwAppId ).html();

	$( ".t6m-sel" ).each(function( index ) {
		if ( $(this).hasClass("hvp-select") ) {
			$(this).addClass("hvp-correct");
			pointsBar = pointsBar + 1;
		}
	});
	$( ".t6m-nos" ).each(function( index ) {
		if ( $(this).hasClass("hvp-select") ) {
			$(this).addClass("hvp-incorrect");
			pointsBar = pointsBar - 1;
		}
	});

	if (pointsBar<0||pointsBar==0) {
		pointsBar = 0;
	}

	$( ".scoreNubBase" + markwAppId ).html(pointsBar);

	if (pointsFullBar>0) {
		var pourC = 0;
		if (pointsBar>0) {
			pourC = parseInt((pointsBar/pointsFullBar) * 100);
		}
		$( ".hvpScoreNubFull" + markwAppId ).animate({
			width: pourC + "%"
		}, 400, function() {
		});
		if (pourC==100) {
			$( ".hvp-question-check-answer" ).css("display","none");
			$( ".hvp-question-solut" ).css("display","none");
		} else {
			$( ".hvp-question-solut" ).css("display","");
		}
	}

}

function t6m_markswordsSendObjMemory(obj){
	
	var mem = $('.switchboule'+ obj.id).attr("data-val");
	return mem;
	
}

function t6m_markswordsRetrieveObjMemory(obj,mem){

	if(parseInt(mem)==1){
		//clickSwitchGreen(obj.id);
	}

}

