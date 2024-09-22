const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let img = new Image();

// Load default or user-selected image
document.getElementById('image-picker').addEventListener('change', function (e) {
    const reader = new FileReader();
    reader.onload = function (event) {
        img.src = event.target.result;
        img.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    };
    reader.readAsDataURL(e.target.files[0]);
});

// Handle text input and options
document.getElementById("add-text").addEventListener("click", function() {
    const text = document.getElementById("text-input").value;
    const font = document.getElementById("font-picker").value;
    const color = document.getElementById("color-picker").value;

    // Customize text style
    ctx.font = `40px ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";

    // Wrap text and position it
    const wrappedText = wrapText(ctx, text, canvas.width - 40); // 40 is the padding
    const textY = canvas.height / 2; // Center vertically

    wrappedText.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, textY + (index * 50)); // Adjust line spacing
    });
});

// Function to wrap text
function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';

    words.forEach((word) => {
        const testLine = currentLine + word + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word + ' ';
        } else {
            currentLine = testLine;
        }
    });
    
    if (currentLine) {
        lines.push(currentLine);
    }

    return lines;
}

// Download the final image with text
document.getElementById("download").addEventListener("click", function() {
    const link = document.createElement('a');
    link.download = 'image_with_text.png';
    link.href = canvas.toDataURL();
    link.click();
});
