import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Course from "App/Models/Course";
import Student from "App/Models/Student";

class CoursesController {
  public async index({ view, response }: HttpContextContract) {
    await Course.query()
      .select("*")
      .orderBy("title", "asc")
      .then((courses) => {
        return view.render("courses/home", { courses: courses });
      })
      .catch((err) => {
        response.status(400).send(err);
      });
  }

  public async store({ request, response }: HttpContextContract) {
    const newCourse = request.only(["title", "workload", "classroom"]);
    try {
      await Course.create(newCourse).then(() => {
        response.status(200).send("created a new course!");
      });
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
      response.status(200).send("deleted it!");
    } catch (err) {
      response.status(400).send(err);
    }
  }

  public async enroll({ params, request, response }: HttpContextContract) {
    const std = await Student.find(request.only(["student_id"]));
    const course = await Course.find(params.id);
    // TODO later: finish and make it store the relationship in pivot table pls
    if (std && course) {
      await course.related("students").attach([std.id]);
      course
        .save()
        .then(() => {
          response
            .status(200)
            .send(
              `the student ${std.firstName} had just enrolled to the ${course.title} course!`
            );
        })
        .catch((err) => {
          response.status(404).send("didn't found a course. " + err);
        });
    }
  }
}
export default new CoursesController();
