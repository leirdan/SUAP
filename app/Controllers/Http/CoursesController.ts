import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Course from "App/Models/Course";

class CoursesController {
  public async index({ response }: HttpContextContract) {
    await Course.query()
      .select()
      .orderBy("title", "asc")
      .then((courses) => {
        response.status(200).json(courses);
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
    const course = await Course.find(id);
    try {
      await course?.delete();
      response.status(200).send("deleted it!");
    } catch (err) {
      response.status(400).send(err);
    }
  }
}

export default new CoursesController();
