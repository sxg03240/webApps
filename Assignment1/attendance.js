"use strict;"

let classStudents = 0
slideShow()

function slideShow() {
    var images = document.getElementsByClassName("students")
    for (let i = 0; i < images.length; i++) {
        images[i].style.display = "none"
    }
    classStudents++
    if (classStudents > images.length) {
        classStudents = 1
    }
    images[classStudents - 1].style.display = "block"
    setTimeout(slideShow, 1000)
}

$(document).ready(function () {
    $("td").click(function () {
        $(this).toggleClass("checked")
        var absentees = []
        $("td").each(function () {
            if ($(this).hasClass("checked"))
                absentees++
        });
        var studentsAbsent = document.getElementById("noOfAbsentees")
        studentsAbsent.innerHTML = absentees
    })
})
