document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = "https://mysite.com/webhook/green-api/";

    function performGetRequest(endpoint) {
        var idInstance = document.getElementById('idInstance').value;
        var apiTokenInstance = document.getElementById('ApiTokenInstance').value; 
        var url = `${apiUrl}waInstance${idInstance}/${endpoint}/${apiTokenInstance}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.getElementById('serverResponse').value = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                console.error('Ошибка:', error);
                document.getElementById('serverResponse').value = 'Ошибка: ' + error;
            });
    }

    function performPostRequest(endpoint, bodyData) {
        var idInstance = document.getElementById('idInstance').value;
        var apiTokenInstance = document.getElementById('ApiTokenInstance').value;
        var url = `${apiUrl}waInstance${idInstance}/${endpoint}/${apiTokenInstance}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById('serverResponse').value = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                console.error('Ошибка:', error);
                document.getElementById('serverResponse').value = 'Ошибка: ' + error;
            });
    }

    document.getElementById('getSettings').addEventListener('click', () => performGetRequest('getSettings'));
    document.getElementById('getStateInstance').addEventListener('click', () => performGetRequest('getStateInstance'));
    document.getElementById('sendMessage').addEventListener('click', () => {
        var message = document.getElementById('messageText').value;
        var phoneNumber = document.getElementById('phoneForMessage').value;
        performPostRequest('sendMessage', { phone: phoneNumber, message: message });
    });
    document.getElementById('sendFileByUrl').addEventListener('click', () => {
        var fileUrl = document.getElementById('urlRequest').value;
        var phoneNumber = document.getElementById('phoneForFile').value;
        performPostRequest('sendFileByUrl', { phone: phoneNumber, fileUrl: fileUrl });
    });

    const phoneInput = document.getElementById('phoneForMessage');

    phoneInput.addEventListener('input', function() {
        let cursorPosition = phoneInput.selectionStart - 1;
        let currentValue = phoneInput.value.replace(/[^\d]/g, '');
        let formattedValue = '+7(';

        if (currentValue.startsWith('7')) {
            currentValue = currentValue.slice(1);
        }
        if (cursorPosition < 3) {
            cursorPosition = 3;
        }

        if (currentValue.length > 0) {
            formattedValue += currentValue.substring(0, 3);
        }
        if (currentValue.length >= 3) {
            formattedValue += ')';
            if (currentValue.length > 3) {
                formattedValue += ' ' + currentValue.substring(3, 6);
            }
            if (currentValue.length > 6) {
                formattedValue += '-' + currentValue.substring(6, 8);
            }
            if (currentValue.length > 8) {
                formattedValue += '-' + currentValue.substring(8);
            }
        }

        phoneInput.value = formattedValue;

        if (cursorPosition === 4) {
            cursorPosition = 6;
        }
        if (cursorPosition > formattedValue.length) {
            cursorPosition = formattedValue.length;
        }

        phoneInput.setSelectionRange(cursorPosition, cursorPosition);
    });
});