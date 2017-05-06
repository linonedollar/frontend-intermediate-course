var channelHTML = '';
var row = document.querySelector(".row");

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=20", false);
xhr.setRequestHeader('client-ID','4txreasawj2i2mgko04qtko6bnenfd');
xhr.send();
var channeldata = JSON.parse(xhr.responseText)

function showdata(){
	for(var i = 0; i < channeldata.streams.length; i++){
		channelHTML = '';
		channelHTML += '	<div class="channel-video">';
		channelHTML += '		<img src="'+channeldata.streams[i].preview.medium+'" alt=""></img>';
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
	var divNull = document.createElement('div');
	divNull.className = "col cover";
	row.append(divNull);
	row.append(divNull);
}


showdata();