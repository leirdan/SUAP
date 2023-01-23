import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Teacher from "App/Models/Teacher";

class TeachersController {
  public async index({ view, response }: HttpContextContract) {
    const teachers = await Teacher.query()
      .select("*")
      .orderBy("last_name", "asc")
      .catch((err) => {
        response.status(400).send(err);
      });
    return view.render("teachers/home", { teachers: teachers });
  }

  public async create({ view }: HttpContextContract) {
    return view.render("teachers/form_create");
  }

  public async store({ request, response }: HttpContextContract) {
    const newTeacher = request.only([
      "firstName",
      "lastName",
      "cpf",
      "graduation",
    ]);
    await Teacher.create(newTeacher)
      .then(() => {
        response.redirect("/teachers");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public async edit({ view, params, response }: HttpContextContract) {
    const id = params.id;
    const teacher = await Teacher.find(id);
    if (teacher) {
      return view.render("teachers/form_edit", { teacher: teacher });
    } else {
      response.status(400).send("this teacher doesn't exist!");
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const teacherUpdated = request.only([
      "firstName",
      "lastName",
      "cpf",
      "graduation",
    ]);
    await Teacher.query()
      .where("cpf", teacherUpdated.cpf)
      .update(teacherUpdated)
      .then(() => {
        response.redirect("/teachers");
      })
      .catch((err) => {
        response.status(400).send(err);
      });
  }

  public async delete({ params, response }: HttpContextContract) {
    const teacher = await Teacher.find(params.id);
    if (teacher) {
      teacher.delete();
      response.redirect("/teachers");
    } else {
      console.log("this teacher doesn't exist!");
    }
  }
}

export default new TeachersController();
