import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "students";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").unique().notNullable().primary();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.integer("cpf").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.dateTime("created_at", { useTz: true });
      table.dateTime("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
