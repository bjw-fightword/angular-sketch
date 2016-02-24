var sketch=angular.module("sketch",[]);
sketch.controller('skectController', ['$scope', function($scope){


	var current;
	var canvas=document.querySelector('#canvas');
	var ctx=canvas.getContext('2d');
	$scope.canvasWH={width:940,height:638}
	$scope.tool="rect";
	$scope.tools={
				'直线工具':'line',
				'圆形工具':'arc',
				'矩形工具':'rect',
				'橡皮工具':'erase',
				'铅笔工具':'pen',
			};
	$scope.settool=function(s){
		$scope.tool=s;
	}
	$scope.csState={
		fillStyle:'#000000',
		strokeStyle:'#000000',
		lineWidth:1,
		style:'stroke'
	};
	$scope.setStyle=function(s){
		$scope.csState.style=s;
	}
	$scope.save=function(ev){
		if(current){
			ev.srcElement.href=canvas.toDataURL();
			ev.srcElement.download='mypic.png';
		}else{
			alert('空画布')
		}
	}
	$scope.newSketch=function(){
		if(current){
			if(confirm('是否保存')){
				location.href=canvas.toDataURL();
			}
			clearCanvas();
			current=null;
		}
		
	}
	var clearCanvas=function(){
		ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
	}
	var setmousemove={
		line:function(e){
			canvas.onmousemove=function(ev){
			clearCanvas();
			if(current){
				ctx.putImageData(current,0,0);
				}
			ctx.beginPath();
			ctx.moveTo(e.offsetX,e.offsetY);
			ctx.lineTo(ev.offsetX-0.5,ev.offsetY-0.5);
			ctx.stroke();
			}
		},
		arc:function(e){
			canvas.onmousemove=function(ev){
			clearCanvas();
			if(current){
				ctx.putImageData(current,0,0);
				}
			ctx.beginPath();
			var r= Math.abs(ev.offsetX-e.offsetX);
			ctx.arc(e.offsetX-0.5,e.offsetY-0.5,r,0,Math.PI*2);
				if($scope.csState.style=='fill'){
				ctx.fill();
				}else{
				ctx.stroke();
				}
			}
		},
		rect:function(e){
			canvas.onmousemove=function(ev){
			clearCanvas();
			if(current){
				ctx.putImageData(current,0,0);
				}
			ctx.beginPath();
			var w =Math.abs(ev.offsetX-e.offsetX);
			var h =Math.abs(ev.offsetY-e.offsetY);
			if($scope.csState.style=='fill'){
				ctx.fillRect(e.offsetX-0.5,e.offsetY-0.5,w,h);
			}else{
				ctx.strokeRect(e.offsetX-0.5,e.offsetY-0.5,w,h);
			}
		}
	},
	erase:function(e){
		canvas.onmousemove=function(ev){
			ctx.clearRect(ev.offsetX,ev.offsetY,20,20);
		}
	},
	pen:function(e){
			ctx.beginPath();
			ctx.moveTo(e.offsetX,e.offsetY);
			canvas.onmousemove=function(ev){
			clearCanvas();
			if(current){
				ctx.putImageData(current,0,0);
				}
			ctx.lineTo(ev.offsetX-0.5,ev.offsetY-0.5);
			ctx.stroke();
		}
	},
}
	canvas.onmousedown=function(e){
		ctx.strokeStyle=$scope.csState.strokeStyle;
		ctx.fillStyle=$scope.csState.fillStyle;
		ctx.lineWidth=$scope.csState.lineWidth;
		setmousemove[$scope.tool](e);
		document.onmouseup=function(){
			canvas.onmousemove=null;
			current=ctx.getImageData(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
		}
	}




	





}])