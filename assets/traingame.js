var config = {
    apiKey: "AIzaSyAWwbf7KtyoXm5wT7jkhLWiR6fXlYN2YNE",
    authDomain: "train-scheduler-a224b.firebaseapp.com",
    databaseURL: "https://train-scheduler-a224b.firebaseio.com",
    projectId: "train-scheduler-a224b",
    storageBucket: "train-scheduler-a224b.appspot.com",
    messagingSenderId: "989657063092"
};
firebase.initializeApp(config);



var format = "hh:mm"
var database = firebase.database();

database.ref('/users').on("child_added", function (snapshot) {
    arrivalDB = snapshot.val().arrivalUser;
    destinationDB = snapshot.val().destinationUser;
    frequencyDB = snapshot.val().frequencyUser;
    platformDB = snapshot.val().platformUser;
    trainnameDB = snapshot.val().trainNameUser;
    tminAwayDB = snapshot.val().minutesAway;
    tArrivalDB = snapshot.val().tArrival
    $(".destination").append(`<br><br>` + destinationDB)
    $(".train-name").append(`<br><br>` + trainnameDB)
    $(".platform").append(`<br><br>` + platformDB)
    $(".departure").append(`<br><br>&nbsp&nbsp` + tArrivalDB)
    $(".minutes").append(`<br><br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp` + tminAwayDB)
})



/*var Trains = []
var unclickedTrains = []
const searchTrain = gif => {
    $.get("https://transportapi.com/v3/uk/train/station/WAT///timetable.json?app_id=c50a71de&app_key=589821feff923209b1caab6838b53538&train_status=passenger").then(response => {
        for (let i = 0; i < response.departures.all.length; i++) {

            let destinationName = `${response.departures.all[i].destination_name}`;
            let trainName = `${response.departures.all[i].operator_name}`;
            let platform = `${response.departures.all[i].platform}`;
            let departureTime = `${response.departures.all[i].aimed_departure_time}`;
           
             $(".destination").append(


                '<br><br>' + destinationName

            )
            $(".train-name").append(
                '<br><br>' + trainName
            )
            $(".platform").append(
                '<br><br>' + platform
            )
            $(".departure").append(
                
                '<br><br>' + departureTime
            )
        }

    })
}
searchTrain()*/.
$(".submit").on("click", function (event) {
    let trainNameUser = $(".train-input").val().trim();
    let destinationUser = $(".destination-input").val().trim();
    let platformUser = $(".platform-input").val().trim();
    let arrivalUser = $(".arrival-input").val().trim();
    let frequencyUser = $(".frequency-input").val().trim();
    let formatted = moment(arrivalUser, format)
    var differenceTimes = moment().diff(formatted, "minutes");
    var tRemainder = differenceTimes % frequencyUser;
    tMinutes = frequencyUser - tRemainder;
    let minutesAway = tMinutes;
    tArrival = moment().add(tMinutes, "m").format("hh:mm A");

    database.ref('/users').push({
        trainNameUser: trainNameUser,
        destinationUser: destinationUser,
        platformUser: platformUser,
        arrivalUser: arrivalUser,
        frequencyUser: frequencyUser,
        tArrival: tArrival,
        minutesAway: minutesAway,

    })
    $(".train-input").val("");
    $(".destination-input").val("");
    $(".platform-input").val("");
    $(".arrival-input").val("");
    $(".frequency-input").val("");
    $(".minutes").val("");
})