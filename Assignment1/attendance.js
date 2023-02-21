"use strict;";

const rows =
  ".firstRow , .secondRow , .thirdRow, .fourthRow, .fifthRow, .sixthRow, .seventhRow, .eightRow";
let classStudents = 0;
slideShow();

function slideShow() {
  var images = document.getElementsByClassName("students");
  for (let i = 0; i < images.length; i++) {
    images[i].style.display = "none";
  }
  classStudents++;
  if (classStudents > images.length) {
    classStudents = 1;
  }
  images[classStudents - 1].style.display = "block";
  setTimeout(slideShow, 1000);
}

$(document).ready(function () {
  $(rows).click(function () {
    $(this).toggleClass("checked");
    var absentees = [];
    $(rows).each(function () {
      if ($(this).hasClass("checked")) absentees++;
    });
    var studentsAbsent = document.getElementById("noOfAbsentees");
    studentsAbsent.innerHTML = absentees;
  });
});
