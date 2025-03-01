document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('videoFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a video file first.');
        return;
    }

    const formData = new FormData();
    formData.append('video', file);

    // UI Updates: Show loading animation, hide button, reset result text
    document.getElementById('loading').style.display = 'block';
    document.getElementById('uploadButton').style.display = 'none';
    document.getElementById('result').innerText = '';

    console.log("Uploading file:", file.name); // Debugging Log

    fetch('http://127.0.0.1:5000/detect_deepfake', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log("Response Status:", response.status); // Debugging Log
        return response.json();  // Ensure JSON response
    })
    .then(data => {
        console.log("Server Response:", data); // Debugging Log

        if (data.result) {
            // Convert first letter to uppercase for display
            const formattedResult = data.result.charAt(0).toUpperCase() + data.result.slice(1);
            document.getElementById('result').innerText = `Detection Result: ${formattedResult}`;
        } else if (data.error) {
            document.getElementById('result').innerText = `Error: ${data.error}`;
        } else {
            document.getElementById('result').innerText = 'Unexpected response format.';
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        document.getElementById('result').innerText = 'Error: Could not connect to the server.';
    })
    .finally(() => {
        // Hide loading animation, show upload button again
        document.getElementById('loading').style.display = 'none';
        document.getElementById('uploadButton').style.display = 'block';
    });
});
