import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Student from "App/Models/Student";

class StudentsController {
  public async index({ view, response }: HttpContextContract) {
    const students = await Student.query()
      .select("*")
      .orderBy("id", "desc")
      .catch((err) => response.status(400).send(err));
    return view.render("students/home", { stds: students });
  }

  public async findOne({ params, response }: HttpContextContract) {
    const id = params.id;
    await Student.find(id)
      .then((std) => {
        response.status(200).json(std);
      })
      .catch((err) => console.error(err));
  }

  public async create({ view }: HttpContextContract): Promise<String> {
    return view.render("students/form_create");
  }
  public async store({ request, response }: HttpContextContract) {
    const newStd = request.only([
      "firstName",
      "lastName",
      "cpf",
      "email",
      "password",
    ]);
    try {
      await Student.create(newStd).then(() => {
        response.redirect("/students");
      });
    } catch (err) {
      response.status(400).send(err);
    }
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async delete({ params, response }: HttpContextContract) {
    const id = params.id;
    try {
      const std = await Student.find(id);
      if (std) {
        await std.delete().then(() => {
          response.redirect("/students");
        });
      }
    } catch (err) {
      response
        .status(400)
        .send("it doesn't exist a student with this id: " + err);
    }
  }
}

export default new StudentsController();
