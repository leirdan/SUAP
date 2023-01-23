import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Teacher from "App/Models/Teacher";

class TeachersController {
  public async index({ view, response }: HttpContextContract) {
    await Teacher.query()
      .select("*")
      .orderBy("last_name", "asc")
      .then((teachers) => {
        return view.render("/teachers/home", { teachers: teachers });
      })
      .catch((err) => {
        response.status(400).send(err);
      });
  }

  public async create({ view }: HttpContextContract) {
    return view.render("teachers/form_create");
  }

  public async store({ request }: HttpContextContract) {
    const newTeacher = request.only([
      "firstName",
      "lastName",
      "cpf",
      "graduation",
    ]);
    await Teacher.create(newTeacher)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }

  public async update({ params }: HttpContextContract) {
    const teacher = await Teacher.find(params.id);
    if (teacher) {
      // TODO: u need to code this with the view
    } else {
      console.log("this teacher doesn't exist!");
    }
  }

  public async delete({ params }: HttpContextContract) {
    const teacher = await Teacher.find(params.id);
    if (teacher) {
      teacher.delete();
    } else {
      console.log("this teacher doesn't exist!");
    }
  }
}

export default new TeachersController();
