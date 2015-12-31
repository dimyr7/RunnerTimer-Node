var fs = require('fs');


fs.readFile('./data.json', 'utf8', function(err, data){
	var input = JSON.parse(data);
	var numOfSegments = parseInt(input.distance / input.delta);
	if(input.speeds.size > numOfSegments){
		throw new Error("Too many speeds");
	}
	var minutes = 0.0;
	for(var i = 0; i < numOfSegments; i++){
		var speed;
		if(i >= input.speeds.size){
			speed = input.speed[input.speeds.size - 1];
		}
		else{
			speed = input.speeds[i];
		}

		var time = input.delta/ speed * 60;
		minutes += time;
	}

	console.log("It will take " + parseInt(minutes) + " minutes and " + parseInt(minutes%1.0*60) + " seconds to run " + input.distance + " miles.");

});
