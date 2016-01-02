var fs = require('fs');


fs.readFile('./data.json', 'utf8', function(err, data){
	var input = JSON.parse(data);
	var numOfSegments = parseInt(input.distance / input.delta);
	if(input.speeds.length> numOfSegments){
		throw new Error("Too many speeds");
	}
	var minutes = 0.0;
	var lastSpeed = input.speeds[input.speeds.length- 1];
	for(var i = 0; i < numOfSegments; i++){
		var speedlength;
		if(i >= input.speeds.length){
			speed = lastSpeed;
		}
		else{
			speed = input.speeds[i];
		}

		var time = input.delta/ speed * 60;
		minutes += time;
	}
	var remainder = input.distance % input.delta;
	minutes += remainder*lastSpeed;
	console.log("It will take " + parseInt(minutes) + " minutes and " + parseInt(minutes%1.0*60) + " seconds to run " + input.distance + " miles.");

});
