/*

- Copy your game project code into this file
- for the p5.Sound library look here https://p5js.org/reference/#/libraries/p5.sound
- for finding cool sounds perhaps look here
https://freesound.org/


*/



var sample;
var isReady;
var amplitude;
var fft;

function preload()
{
    soundFormats('mp3','wav');
    
    isReady = false;
    
    //load your sounds here
    sample = loadSound('assets/yee-king_track.mp3', soundInit);
    sample.setVolume(0.4);
    
    
}

function soundInit()
{
    isReady = true;
}


function setup()
{
	createCanvas(1024, 576);
    textAlign(CENTER);
    textSize(32);
    
    amplitude = new p5.Amplitude();
	fft = new p5.FFT();

}

function draw()
{
    background(0);
    fill(255);
    noStroke();
    
    if(isReady && !sample.isPlaying())
    {
        text("Press any key to play sound", width/2, height/2);   
    }
    else if(sample.isPlaying())
    {
        var d = map (amplitude.getLevel(), 0, 0.15, 50,250);
        
        ellipse(width/2, height/2, d);
        
        var freqs = fft.analyze();
		console.log(freqs);
		
		stroke(50,200,50);
		
		for(var i = 0; i < freqs.length; i++)
		{
			line(i,height,i, height - freqs[i] * 2);
		}
		
		var energy = fft.getEnergy('bass');
		
		noStroke();
		fill(255,0,0);
		ellipse(width/4,height/2, 50 + energy);
		
		var high_energy = fft.getEnergy('highMid');
		
		noStroke();
		fill(0,0,255);
		ellipse(width*3/4,height/2, 50 + high_energy);
    }
}


function keyPressed()
{
    //sample.play();
    
    if(isReady && !sample.isPlaying())
    {
        sample.loop();
    }
    else if(sample.isPlaying())
    {
        sample.pause();
    }

}
