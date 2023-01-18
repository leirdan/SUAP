import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Student from "App/Models/Student";

export default class StudentsController {
  public async index({}: HttpContextContract) {
    await Student.query()
      .select()
      .orderBy("first_name", "asc")
      .then((std) => {
        console.table(std);
      })
      .catch((err) => console.error(err));
  }

  public async findOne({ params }: HttpContextContract) {
    const id = params.id;
    await Student.find(id)
      .then((std) => {
        console.table(std);
      })
      .catch((err) => console.error(err));
  }

  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const newStd = request.body;
    await Database.insertQuery()
      .table("students")
      .insert(newStd)
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ params }: HttpContextContract) {
    const id = params.id;
    try {
      const std = await Student.find(id);
      await std?.delete();
    } catch (err) {
      console.log("it doesn't exist a student with this id: " + err);
    }
  }
}
