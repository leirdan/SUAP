import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Student from "App/Models/Student";

class StudentsController {
  public async index({ response }: HttpContextContract) {
    await Student.query()
      .select()
      .orderBy("first_name", "asc")
      .then((std) => {
        response.status(200).json(std);
      })
      .catch((err) => console.error(err));
  }

  public async findOne({ params, response }: HttpContextContract) {
    const id = params.id;
    await Student.find(id)
      .then((std) => {
        response.status(200).json(std);
      })
      .catch((err) => console.error(err));
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const newStd = request.only([
      "first_name",
      "last_name",
      "cpf",
      "email",
      "password",
    ]);
    try {
      await Student.create(newStd).then((std) => {
        response.status(200).json(std);
      });
    } catch (err) {
      response.status(400).send(err);
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ params, response }: HttpContextContract) {
    const id = params.id;
    try {
      const std = await Student.find(id);
      await std?.delete().then(() => {
        response.status(200).send("deleted it!");
      });
    } catch (err) {
      console.log("it doesn't exist a student with this id: " + err);
    }
  }
}

export default new StudentsController();
