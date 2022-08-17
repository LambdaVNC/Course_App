function Course(title, instructor, image) {
  this.title = title;
  this.instructor = instructor;
  this.image = image;
}

function UI() {}

UI.prototype.addToCourseList = function (course) {
  const list = document.getElementById("course-list");

  var html = `
  <tr>
        <td><img src="img/${course.image}"></td>
        <td>${course.title}</td>
        <td>${course.instructor}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
    </tr>
  `;

  list.innerHTML += html;
};

UI.prototype.showAlert = function (message, className) {
  var alert = `
        <div class="alert alert-${className}">
         ${message}
         </div>
    `;

  let row = document.querySelector(".row");

  row.insertAdjacentHTML("afterbegin", alert);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.clearControls = function () {
  let title = (document.getElementById("title").value = "");
  let instructor = (document.getElementById("instructor").value = "");
  let image = (document.getElementById("image").value = "");
};

UI.prototype.deleteCourse = function (element) {
  if (element.classList.contains("delete")) {
    element.parentElement.parentElement.remove();
  }
};

document.getElementById("new-course").addEventListener("submit", function (e) {
  let title = document.getElementById("title").value;
  let instructor = document.getElementById("instructor").value;
  let image = document.getElementById("image").value;

  // create course object
  const course = new Course(title, instructor, image);

  // create UI
  let ui = new UI();

  //   showAlert
  if (title === "" || instructor === "" || image === "") {
    ui.showAlert("Lütfen tüm alanları doldurunuz!", "warning");
  } else {
    // add to course list
    ui.addToCourseList(course);

    // clear controls
    ui.clearControls();
    ui.showAlert("the course has been added", "success");
  }

  e.preventDefault();
});

document.getElementById("course-list").addEventListener("click", function (e) {
  let ui = new UI();
  ui.deleteCourse(e.target);
  ui.showAlert("the course has been deleted!", "danger");
});
