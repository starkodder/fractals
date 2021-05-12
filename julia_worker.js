  function generateJulia(data)
  {
    var xStart = data.xStart;
    var xEnd   = data.xEnd;
    var yStart = data.yStart;
    var yEnd   = data.yEnd;
    var totalWidth  = data.totalWidth;
    var totalHeight = data.totalHeight;
    var maxIteration = data.maxIteration;
    var cRe = -0.7;
    var cIm = 0.27015;
    var step = 1;

    for (var x = 0; x < totalWidth; x+=step)
      for (var y = 0; y < totalHeight; y+=step)
      {
        var newRe = ((x/totalWidth)*(xEnd-xStart))+xStart;
        var newIm = ((y/totalHeight)*(yEnd-yStart))+yStart;

        var oldRe = 0;
        var oldIm = 0;
        var iteration = 0;
        while (((newRe * newRe + newIm * newIm) < 4)  &&  
               (iteration < maxIteration))
        {
          oldRe = newRe;
          oldIm = newIm;
          newRe = oldRe * oldRe - oldIm * oldIm + cRe;
          newIm = 2 * oldRe * oldIm + cIm;
          iteration++;
        } 
        var red   = (iteration%150)*(iteration != maxIteration);
        var green = (iteration%150)*(iteration != maxIteration);
        var blue  = (iteration%250)*(iteration != maxIteration);

        self.postMessage({'rectangleX': x,
              'rectangleY' : y,
              'rectangleColor' : "rgb("+red+","+green+","+blue+")"});
      }

    self.postMessage({'finished': 'true'});
  }

  self.onmessage = function(e) 
  {
    generateJulia(e.data);
  }