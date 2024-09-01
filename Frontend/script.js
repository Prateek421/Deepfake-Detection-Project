document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('videoFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a video file first.');
        return;
    }

    // Create a thumbnail
    const videoElement = document.createElement('video');
    videoElement.src = URL.createObjectURL(file);
    videoElement.addEventListener('loadeddata', () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth / 2;
        canvas.height = videoElement.videoHeight / 2;
        const context = canvas.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const thumbnailUrl = canvas.toDataURL();
        
        document.getElementById('thumbnail').src = thumbnailUrl;
        document.getElementById('thumbnail').style.display = 'block';
    });

    const formData = new FormData();
    formData.append('video', file);

    // Show loading bar, hide upload button, and display thumbnail
    document.getElementById('loading').style.display = 'block';
    document.getElementById('uploadButton').style.display = 'none';
    document.getElementById('thumbnail').style.display = 'block';
    document.getElementById('result').innerText = '';

    fetch('http://127.0.0.1:5000/detect_deepfake', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log('Response status:', response.status); // Debugging
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); });
        }
        return response.json();  // Expecting a JSON response from the server
    })
    .then(data => {
        console.log('Response data:', data); // Debugging
        if (data.result === 'fake' || data.result === 'real') {
            const capitalizedResult = data.result.charAt(0).toUpperCase() + data.result.slice(1);
            document.getElementById('result').innerText = `Detection Result: ${capitalizedResult}`;
        } else if (data.error) {
            document.getElementById('result').innerText = `Error: ${data.error}`;
        } else {
            document.getElementById('result').innerText = 'Unexpected response format.';
        }
    })
    .catch(error => {
        console.error('There was an error!', error);
        document.getElementById('result').innerText = 'Error occurred while detecting deepfake.';
    })
    .finally(() => {
        // Hide loading bar, hide thumbnail, and remove upload button
        document.getElementById('loading').style.display = 'none';
        document.getElementById('thumbnail').style.display = 'none';
        document.getElementById('uploadButton').style.display = 'none';
    });
});
