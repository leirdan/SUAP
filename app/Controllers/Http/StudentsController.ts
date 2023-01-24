import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Course from "App/Models/Course";
import Student from "App/Models/Student";

class StudentsController {
  public async index({ view, response }: HttpContextContract) {
    const students = await Student.query()
      .select("*")
      .orderBy("id", "desc")
      .catch((err) => response.status(400).send(err));

    return view.render("students/home", { stds: students });
  }

  public async create({ view }: HttpContextContract) {
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

  public async edit({ params, view, response }: HttpContextContract) {
    const id = params.id;
    const student = await Student.find(id);
    if (student) {
      return view.render("students/form_edit", { student: student });
    } else {
      response.status(400).send("this student doesn't exist!");
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const studentUpdated = request.only([
      "firstName",
      "lastName",
      "cpf",
      "email",
    ]);
    await Student.query()
      .where("cpf", studentUpdated.cpf)
      .update(studentUpdated)
      .then(() => {
        response.redirect("/students");
      })
      .catch((err) => {
        response.status(400).send(err);
      });
  }

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

  public async enrollPage({ params, view }: HttpContextContract) {
    const id = params.id;
    const student = await Student.find(id);
    const courses = await Course.query()
      .select("*")
      .orderBy("title", "asc")
      .catch((err) => {
        console.log(err);
      });
    if (student) {
      return view.render("students/enroll_page", { student, courses });
    }
  }
  public async enroll({ params, request, response }: HttpContextContract) {
    const studentId = params.id;
    const courseId = request.only(["courseId"]);

    const student = await Student.find(studentId);
    const course = await Course.find(courseId.courseId);

    if (course && student) {
      course.related("students").attach([student.id]);
      course.save();
      response.redirect("/students");
    }
  }
}

export default new StudentsController();
