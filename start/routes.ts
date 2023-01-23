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
  Route.get("/delete/:id", StudentsController.delete);
}).prefix("/students");

Route.group(() => {
  Route.get("/", CoursesController.index);
  Route.get("/create", CoursesController.create);
  Route.post("/store", CoursesController.store);
  Route.get("/delete/:id", CoursesController.delete);
  Route.post("/enroll/:id", CoursesController.enroll);
}).prefix("/courses");

Route.group(() => {
  Route.get("/", TeachersController.index);
  Route.get("/create", TeachersController.create);
  Route.post("/store", TeachersController.store);
  Route.get("/edit/:id", TeachersController.edit);
  Route.post("/update", TeachersController.update);
  Route.get("/delete/:id", TeachersController.delete);
}).prefix("/teachers");
