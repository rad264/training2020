function DrawBoard(ctx) {
  const canvasEl = document.getElementById("canvas");
  //const ctx = this.ctx;
  ctx.fillStyle= "#CDAA7D";
  ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  for (let i = 0; i < 15; i++) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(i*35 + 35.5,0 + 35.5);
    ctx.lineTo(i*35 + 35.5, 35*15);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0 + 35.5, i*35 + 35.5);
    ctx.lineTo(35*15, i*35 + 35.5);
    ctx.stroke();
    ctx.closePath();
  }
  ctx.fillStyle = "black";
  ctx.fillRect(35*3+32, 35*3+32, 6, 6);
  ctx.fillRect(35*11+32, 35*3+32, 6, 6);
  ctx.fillRect(35*7+32, 35*7+32, 6, 6);
  ctx.fillRect(35*3+32, 35*11+32, 6, 6);
  ctx.fillRect(35*11+32, 35*11+32, 6, 6);

  this.drawPiece = function(x, y, isWhite) {
    const gradient = ctx.createRadialGradient(y*35+35, x*35+35, 12, y*35+30, x*35+30, 20);
    if (isWhite) {
      gradient.addColorStop(0, "#fff");
      gradient.addColorStop(1, "#bbb");
    } else {
      gradient.addColorStop(0, "#0a0a0a");
      gradient.addColorStop(1, "#636766");
    }
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(y*35 + 35, x*35 + 35, 14, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
  }
}
  