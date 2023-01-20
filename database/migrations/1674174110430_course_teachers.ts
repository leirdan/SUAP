import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "courses";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("teacher_id").unsigned().references("teachers.id");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("teacher_id");
    });
  }
}
