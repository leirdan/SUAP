import Route from "@ioc:Adonis/Core/Route";
import CoursesController from "App/Controllers/Http/CoursesController";
import StudentsController from "App/Controllers/Http/StudentsController";
import TeachersController from "App/Controllers/Http/TeachersController";

Route.get("/", async ({ view }) => {
  return view.render("homepage");
});

Route.group(() => {
  Route.get("/", StudentsController.index);
  Route.get("/:id", StudentsController.findOne);
  Route.get("/create", StudentsController.create);
  Route.post("/store", StudentsController.store);
  Route.get("/delete/:id", StudentsController.delete);
}).prefix("/students");

Route.group(() => {
  Route.get("/", CoursesController.index);
  Route.post("/store", CoursesController.store);
  Route.delete("/delete/:id", CoursesController.delete);
  Route.post("/enroll/:id", CoursesController.enroll);
}).prefix("/courses");

Route.group(() => {
  Route.get("/", TeachersController.index);
  Route.post("/store", TeachersController.store);
  Route.get("/update", TeachersController.update);
  Route.delete("/delete/:id", TeachersController.delete);
}).prefix("/teachers");
