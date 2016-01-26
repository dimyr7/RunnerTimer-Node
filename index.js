var fs = require('fs');


fs.readFile('./data.json', 'utf8', function(err, data){
	var input = JSON.parse(data);
	var numOfSegments = parseInt(input.distance / input.delta);
	var remainderFlag = (input.distance % input.delta > 0);

	if(input.speeds.length > numOfSegments+1){
		throw new Error("Too many speeds");
	}
	else if(input.speeds.length > numOfSegments && !remainderFlag){
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

		console.log("segment " + i + " of length " + input.delta.toFixed(2) + " was ran in " + (time*60).toFixed(2) + " seconds with a speed of " + speed);
	}
	var remainder = input.distance % input.delta;
	var remainderMin = remainder / lastSpeed * 60;
	minutes += remainderMin;
	console.log("final segment  of length " + remainder.toFixed(2) + " was ran in " + (remainderMin*60).toFixed(2) + " seconds with a speed of " + lastSpeed);
	console.log("It will take " + parseInt(minutes) + " minutes and " + parseInt(minutes%1.0*60) + " seconds to run " + input.distance + " miles.");

});
