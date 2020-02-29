// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBqb9rA1e9tT3uCObNH25CzqPXGGulVbGM",
    authDomain: "flubclub-rubhub.firebaseapp.com",
    databaseURL: "https://flubclub-rubhub.firebaseio.com",
    projectId: "flubclub-rubhub",
    storageBucket: "flubclub-rubhub.appspot.com",
    messagingSenderId: "563265812210",
    appId: "1:563265812210:web:1434b64f9dc816096f026b",
    measurementId: "G-GW6DJGRPD4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database()


let memberDB = []
database.ref().on("child_added", function (snapshot) {
    memberDB.push(snapshot.val().email)
    $(".subList").append("<li class='subs'>" + snapshot.val().email + "</li>")
})

$("#sendButton").on("click", function () {
    // let emailImg = $("fileinput").val()
    let emailContents = $("#textarea").val()
    $(".inputDiv").addClass("hide")
    $(".sendingDiv").removeClass("hide")

    let messageNum = 1
    let messageTotal = memberDB.length

    for (let i = 0; i < memberDB.length; i++) {
        let member = memberDB[i]
        var templateParams = {
            member: member,
            emailContents: emailContents
        }

        emailjs.send('default_service', 'template_b4MmI7CD', templateParams)
            .then(function (response) {
                console.log('Sucessful message send!')
                $("#currentSend").html(messageNum)
                $("#totalSend").html(messageTotal)
                messageNum++
            }, function (error) {
                alert('FAILED...', error)
                $(".errorDiv").removeClass("hide")
            });
    }
})