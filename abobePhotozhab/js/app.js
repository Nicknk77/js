
const canvas = document.getElementById('canv');
const container = document.getElementById('app');
const ctx = canvas.getContext('2d');
let tool = null;
const color = document.querySelector('#color');
const range = document.querySelector('#range');
let draw = false;

canvas.addEventListener('mousedown', (e) => {
    if(tool) {
        if (tool == 'pencil') {
            drawPencil(e);
        } else if (tool == 'fill') {
            fill(e);
        } else if (tool == 'eraser') {
            eraser(e);
        } else if (tool == 'heart-rate') {
            drawRate(e);
        } else if (tool == 'circle') {
            drawCircle(e)
        } else if (tool == 'clearCnv') {
            clearCanvas(e)
        }
    }
});
container.addEventListener('mousemove', (e) => {
    if (e.target.getAttribute('name') != 'canv') stopDraw();
});
canvas.addEventListener('mousemove', (e) => {
    switch (tool) {
        case 'pencil':
            if (draw == true) {
                x = e.offsetX;
                y = e.offsetY;
                ctx.lineTo(x, y);
                // ctx.closePath();
                ctx.stroke();
            }
            break;
        case 'eraser':
            if (draw == true) {
                x = e.offsetX;
                y = e.offsetY;
                let w = range.value;
                ctx.clearRect(x, y, w, w);
                }
            break;
        default:
            break;
    }
});
canvas.addEventListener('mouseup', stopDraw);

document.querySelector('#tools').addEventListener('click', buttons);

function buttons(e) {
    if (e.target.dataset.tool == 'pencil' || e.target.parentNode.dataset.tool == 'pencil') {
        tool = 'pencil';
    }else if (e.target.dataset.tool == 'fill' || e.target.parentNode.dataset.tool == 'fill') {
        tool = 'fill';
    }else if (e.target.dataset.tool == 'eraser' || e.target.parentNode.dataset.tool == 'eraser') {
        tool = 'eraser';
    }else if (e.target.dataset.tool == 'heart-rate' || e.target.parentNode.dataset.tool == 'heart-rate') {
        tool = 'heart-rate';
    }else if (e.target.dataset.tool == 'circle' || e.target.parentNode.dataset.tool == 'circle') {
        tool = 'circle';
    }else if (e.target.dataset.tool == 'clearCnv' || e.target.parentNode.dataset.tool == 'clearCnv') {
        tool = 'clearCnv';
        clearCanvas(e)
    }else if (e.target.dataset.save == 'save' || e.target.parentNode.dataset.save == 'save') {
        let img = new Image();
        let src = canvas.toDataURL();
        let a = document.createElement('a');
        a.setAttribute('href', src);
        a.setAttribute('download', 'image_');
        a.click();
    }
}

function stopDraw(e) {
    if (draw == true) {
        ctx.closePath();
        draw = false;
    }
}

function drawPencil(e) {
    ctx.strokeStyle = color.value;
    let x = e.offsetX;
    let y = e.offsetY;
    ctx.lineWidth = range.value;
    ctx.lineCap = 'round';
    draw = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
}
function fill(e) {
    ctx.fillStyle = color.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function drawCircle(e) {
    let w = range.value;
    let x = e.offsetX;
    let y = e.offsetY;
    ctx.strokeStyle = color.value;
    ctx.lineWidth = w/2;
    ctx.beginPath();
    ctx.arc(x, y, w*1.3, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
}
function eraser(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    draw = true;
    ctx.moveTo(x, y);

}
function drawRate(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    let b = range.value;
    ctx.strokeStyle = color.value;
    ctx.lineWidth = range.value/3;
    ctx.lineJoin = 'miter';
    ctx.miterLimit = 10;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let i = 1; i <=24; i++) {
        let dy = i%2==0 ? b : -b ;
        ctx.lineTo(x+i*2*b, y+5*dy)
    }
    ctx.stroke();
}
function clearCanvas() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
}