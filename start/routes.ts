import Route from "@ioc:Adonis/Core/Route";
import CoursesController from "App/Controllers/Http/CoursesController";
import StudentsController from "App/Controllers/Http/StudentsController";
import TeachersController from "App/Controllers/Http/TeachersController";

Route.get("/", async ({ view }) => {
  return view.render("homepage");
});

Route.group(() => {
  Route.get("/", StudentsController.index);
  Route.get("/create", StudentsController.create);
  Route.post("/store", StudentsController.store);
  Route.get("/edit/:id", StudentsController.edit);
  Route.post("/update", StudentsController.update);
  Route.get("/delete/:id", StudentsController.delete);
  Route.get("/enrollment/:id", StudentsController.enrollPage);
  Route.post("/enroll/:id", StudentsController.enroll);
}).prefix("/students");

Route.group(() => {
  Route.get("/", CoursesController.index);
  Route.get("/create", CoursesController.create);
  Route.post("/store", CoursesController.store);
  Route.get("/edit/:id", CoursesController.edit);
  Route.post("/update", CoursesController.update);
  Route.get("/delete/:id", CoursesController.delete);
}).prefix("/courses");

Route.group(() => {
  Route.get("/", TeachersController.index);
  Route.get("/create", TeachersController.create);
  Route.post("/store", TeachersController.store);
  Route.get("/edit/:id", TeachersController.edit);
  Route.post("/update", TeachersController.update);
  Route.get("/delete/:id", TeachersController.delete);
}).prefix("/teachers");
