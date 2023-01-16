import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "students_courses";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.integer("student_id").unsigned().references("students.id");
      table.integer("course_id").unsigned().references("courses.id");
      table.unique(["student_id", "course_id"]);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
