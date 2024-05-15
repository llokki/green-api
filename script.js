document.addEventListener('DOMContentLoaded', function() {

  const apiUrl = "https://7103.api.greenapi.com";
  
  function performGetRequest(endpoint) {
    var idInstance = document.getElementById('idInstance').value;
    var apiTokenInstance = document.getElementById('ApiTokenInstance').value;
    var url = `${apiUrl}/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`;
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
    var url = `${apiUrl}/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`;
  
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
    performPostRequest('sendMessage', { chatId: phoneNumber + '@c.us', message: message });
  });
  
  document.getElementById('sendFileByUrl').addEventListener('click', () => {
    var fileUrl = document.getElementById('urlRequest').value;
    var phoneNumber = document.getElementById('phoneForFile').value;
    performPostRequest('sendFileByUrl', { chatId: phoneNumber + '@c.us', fileUrl: fileUrl });
  });
  
});