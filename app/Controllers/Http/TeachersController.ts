import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Teacher from "App/Models/Teacher";

class TeachersController {
  public async index({ response }: HttpContextContract) {
    await Teacher.query()
      .select("*")
      .orderBy("first_name", "desc")
      .then((teachers) => {
        response.status(200).json(teachers);
      })
      .catch((err) => {
        response.status(400).send(err);
      });
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
