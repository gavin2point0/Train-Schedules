var config = {
    apiKey: "AIzaSyCW_UIOp2bU3yw7ZJdU6KxzzGDj9LNKwNU",
    authDomain: "classpractice-22c2d.firebaseapp.com",
    databaseURL: "https://classpractice-22c2d.firebaseio.com",
    projectId: "classpractice-22c2d",
    storageBucket: "classpractice-22c2d.appspot.com",
    messagingSenderId: "137209385054"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

$('.btn-primary').on('click', function(){
    event.preventDefault();

    let trainName = $('#train-name-input').val();
    let trainDestination = $('#destination-input').val();
    let firstTrain = $('#first-train-input').val();
    let trainFrequency = $('#frequency-input').val();

    database.ref().push({
        name: trainName,
        destination: trainDestination,
        firstTrain: firstTrain,
        frequency: trainFrequency
    })

})

database.ref().on('child_added', function(snapshot){
    let newRow = $('<tr>');

    nameCell = snapshot.val().name;
    destinationCell = snapshot.val().destination;
    firstTrainCell = snapshot.val().firstTrain;
    frequencyCell = snapshot.val().frequency;

    let newRowContent = $(`<td id="train-name">${nameCell}</td><td id="destination">${destinationCell}</td><td id="frequency">${frequencyCell}</td>`)

    console.log(snapshot);
    console.log(destinationCell);
    console.log(firstTrainCell);
    console.log(frequencyCell);

    newRow.append(newRowContent);
    $('.table').append(newRow);
})