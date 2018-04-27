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
    
    trainName.text('')
    trainDestination.text('')
    firstTrain.text('')
    trainFrequency.text('')

})

database.ref().on('child_added', function(snapshot){
    let newRow = $('<tr>');

    nameCell = snapshot.val().name;
    destinationCell = snapshot.val().destination;
    firstTrainCell = snapshot.val().firstTrain;
    frequencyCell = snapshot.val().frequency;


    // let nextArrivalCell = moment(firstTrainCell.toString()).add(parseInt(frequencyCell), 'minutes');


    // Assumptions
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainCell, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequencyCell;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequencyCell - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



    
    let newRowContent = $(`<td id="train-name">${nameCell}</td><td id="destination">${destinationCell}</td><td id="frequency">${frequencyCell}</td><td id="next-train">${moment(nextTrain).format("hh:mm")}</td><td id="minutes-away">${tMinutesTillTrain}</td>`)

    newRow.append(newRowContent);
    $('.table').append(newRow);
})