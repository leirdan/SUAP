import Route from "@ioc:Adonis/Core/Route";
import CoursesController from "App/Controllers/Http/CoursesController";
import StudentsController from "App/Controllers/Http/StudentsController";

Route.get("/", async ({ view }) => {
  return view.render("welcome");
});

Route.group(() => {
  Route.get("/", StudentsController.index);
  Route.get("/:id", StudentsController.findOne);
  Route.post("/store", StudentsController.store);
  Route.delete("/delete/:id", StudentsController.destroy);
}).prefix("/students");

Route.group(() => {
  Route.get("/", CoursesController.index);
  Route.post("/store", CoursesController.store);
  Route.delete("/delete/:id", CoursesController.delete);
}).prefix("/courses");
