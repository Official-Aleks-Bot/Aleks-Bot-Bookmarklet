javascript:(function () {
    const centerX = (window.innerWidth / 2) - 250;
    const centerY = (window.innerHeight / 2) - 250;
    let isVisible = true;

    const mainSquare = document.createElement('div');
    mainSquare.style.width = '500px';
    mainSquare.style.height = '500px';
    mainSquare.style.backgroundColor = 'rgb(193, 207, 212)';
    mainSquare.style.position = 'fixed';
    mainSquare.style.left = centerX + 'px';
    mainSquare.style.top = centerY + 'px';
    mainSquare.style.zIndex = '9999';
    mainSquare.style.borderRadius = '20px';

    const redSquare = document.createElement('div');
    redSquare.style.width = '500px';
    redSquare.style.height = '40px';
    redSquare.style.backgroundColor = 'red';
    redSquare.style.position = 'fixed';
    redSquare.style.left = centerX + 'px';
    redSquare.style.top = centerY + 'px';
    redSquare.style.zIndex = '9999';
    redSquare.style.borderRadius = '20px';

    const closeButton = document.createElement('button');
    closeButton.innerText = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.right = '10px';
    closeButton.style.top = '8px';
    closeButton.style.zIndex = '9999';
    closeButton.style.border = 'none';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.fontSize = '20px';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(redSquare);
        document.body.removeChild(mainSquare);
    });
    redSquare.appendChild(closeButton);

    const logoImage = document.createElement('img');
    logoImage.src = 'https://static.aleks.com/aleks/gif/smr/ALEKS_logo.hcache:20.svg';
    logoImage.style.position = 'absolute';
    logoImage.style.width = '100px';
    logoImage.style.left = '10px';
    logoImage.style.top = '10px';
    redSquare.appendChild(logoImage);
    document.body.appendChild(mainSquare);
    document.body.appendChild(redSquare);

    function copyToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    }

    for (let i = 1; i <= 3; i++) {
        const button = document.createElement('button');
        button.style.position = 'absolute';
        button.style.left = '50%';
        button.style.top = `${70 + 50 * (i - 1)}px`;
        button.style.transform = 'translateX(-50%)';
        button.style.border = 'none';
        button.style.backgroundColor = '#0073e6';
        button.style.color = 'white';
        button.style.padding = '10px 20px';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';

        mainSquare.appendChild(button);

        if (i === 1) {
            button.innerText = 'Display Text';
            button.addEventListener('click', () => {
                const algoPromptText = document.getElementById('algoPrompt');
                const textBox = document.querySelector('input[type="text"]');
                if (algoPromptText && textBox) {
                    textBox.value = algoPromptText.textContent;
                    copyToClipboard(algoPromptText.textContent);
                }
            });

        } else if (i === 2) {
            button.innerText = 'Bot On';
            button.addEventListener('click', () => {
                
            });

        } else if (i === 3) {
            button.innerText = 'Explanation';
            button.addEventListener('click', () => {
                const targetButton = document.getElementById('smt_bottomnav_button_input_requestExplain');
                if (targetButton) {
                    targetButton.click();
                }
            });
        } else {
            button.innerText = `Button ${i}`;
        }
    }

    const textBox = document.createElement('input');
    textBox.type = 'text';
    textBox.style.width = '492px';
    textBox.style.height = '30px';
    textBox.style.position = 'absolute';
    textBox.style.bottom = '0';
    textBox.style.borderRadius = "20px";
    mainSquare.appendChild(textBox);

    const toggleVisibilityLabel = document.createElement('label');
    toggleVisibilityLabel.innerText = "Click 'w' to toggle visibility";
    toggleVisibilityLabel.style.position = 'absolute';
    toggleVisibilityLabel.style.left = '50%';
    toggleVisibilityLabel.style.transform = 'translateX(-50%)';
    toggleVisibilityLabel.style.bottom = '40px';
    mainSquare.appendChild(toggleVisibilityLabel);

    let isDragging = false;
    let offsetX, offsetY;

    document.addEventListener('keydown', (event) => {
        if (event.key === 'w') {
            isVisible = !isVisible;
            mainSquare.style.display = isVisible ? 'block' : 'none';
            redSquare.style.display = isVisible ? 'block' : 'none';
        }
    });

    redSquare.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - redSquare.getBoundingClientRect().left;
        offsetY = e.clientY - redSquare.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            mainSquare.style.left = (e.clientX - offsetX) + 'px';
            mainSquare.style.top = (e.clientY - offsetY) + 'px';
            redSquare.style.left = (e.clientX - offsetX) + 'px';
            redSquare.style.top = (e.clientY - offsetY) + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
})();
