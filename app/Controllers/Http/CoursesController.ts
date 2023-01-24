import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Course from "App/Models/Course";
import Teacher from "App/Models/Teacher";

class CoursesController {
  public async index({ view, response }: HttpContextContract) {
    const courses = await Course.query()
      .select("*")
      .orderBy("title", "asc")
      .catch((err) => {
        response.status(400).send(err);
      });
    return view.render("courses/home", { courses: courses });
  }

  public async create({ view }: HttpContextContract) {
    const teachers = await Teacher.query()
      .select("*")
      .from("teachers")
      .orderBy("firstName", "asc");
    return view.render("courses/form_create", { teachers: teachers });
  }

  public async store({ request, response }: HttpContextContract) {
    const newCourse = request.only([
      "title",
      "workload",
      "classroom",
      "teacherId",
    ]);
    try {
      await Course.create(newCourse);
      response.redirect("/courses");
    } catch (err) {
      response.status(400).send(err);
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    const id = params.id;
    try {
      await Course.query()
        .select("*")
        .where("id", id)
        .whereNotNull("id")
        .delete();
      response.redirect("/courses");
    } catch (err) {
      response.status(400).send(err);
    }
  }
}
export default new CoursesController();
