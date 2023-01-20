import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "teachers";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").notNullable().primary();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.text("graduation").notNullable();
      table.integer("cpf").notNullable().unsigned();

      table.dateTime("created_at", { useTz: true });
      table.dateTime("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
