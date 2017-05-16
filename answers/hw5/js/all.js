var channelHTML = '';
var row = document.querySelector(".row");
var offset = 0;

function GetData(callback){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=21&offset="+offset, true);
	xhr.setRequestHeader('client-ID','4txreasawj2i2mgko04qtko6bnenfd');
	xhr.onreadystatechange = function(){
  		if(xhr.readyState==4 && xhr.status==200){
			var data = JSON.parse(xhr.responseText);
			callback(data);
		}
	}
	xhr.send();
}

GetData(function(data) {
	ShowData(data);
});


function ShowData(channeldata){

	for(var i = 0; i < channeldata.streams.length; i++){
		channelHTML = '';
		channelHTML += '	<div class="channel-video">';
		channelHTML += '		<a href="'+channeldata.streams[i].channel.url+'" target="_blank"><img data-src="'+channeldata.streams[i].preview.medium+'" alt=""></img></a>';
		channelHTML += '	</div>';
		channelHTML += '	<div class="channel-info">';
		channelHTML += '		<div class="avatar">';
		channelHTML += '			<img src="'+channeldata.streams[i].channel.logo+'" alt=""></img>';
		channelHTML += '		</div>';
		channelHTML += '		<div class="intro">';
		channelHTML += '			<div class="channel_name">'+channeldata.streams[i].channel.status+'</div>';
		channelHTML += '			<div class="owner_name">'+channeldata.streams[i].channel.name+'</div>';
		channelHTML += '		</div>';
		channelHTML += '	</div>';
		var div = document.createElement("div");
		div.className = "col";
		div.innerHTML = channelHTML;
		row.append(div);
	}

	//var divNull1 = document.createElement('div');
	//divNull1.className = "col cover";
	//var divNull2 = document.createElement('div');
	//divNull2.className = "col cover";
	//row.append(divNull1);
	//row.append(divNull2);
	LoadImg();
}

function LoadImg(){
	[].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
		img.src = img.dataset.src;
		img.onload = function() {
			img.removeAttribute('data-src');
		};
	});
}


//code來源
//https://codedump.io/share/PQ7drQ5rPhUQ/1/how-to-do-infinite-scrolling-with-javascript-only-without-jquery

function getScrollXY(){
    var scrOfX = 0, scrOfY = 0;
    if( typeof( window.pageYOffset ) == 'number' ){
        scrOfY = window.pageYOffset;
        scrOfX = window.pageXOffset;
    }else if(document.body && ( document.body.scrollLeft || document.body.scrollTop )){
        scrOfY = document.body.scrollTop;
        scrOfX = document.body.scrollLeft;
    }else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)){
        scrOfY = document.documentElement.scrollTop;
        scrOfX = document.documentElement.scrollLeft;
    }
    return [ scrOfX, scrOfY ];
}

function getDocHeight(){
    return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
}

document.addEventListener("scroll", function(event){
    if (getDocHeight() <= getScrollXY()[1] + window.innerHeight)
    {
		offset += 21;
		GetData(function(data){
			ShowData(data);
		});
    }
});