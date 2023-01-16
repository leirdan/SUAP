import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "courses";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").unique().notNullable().primary();
      table.string("title").notNullable();
      table.integer("workload").notNullable().unsigned();
      table.string("classroom").notNullable();
      table.dateTime("created_at", { useTz: true });
      table.dateTime("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
