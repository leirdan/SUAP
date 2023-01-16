import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  protected id: number;

  @column()
  public title: string;

  @column()
  public workload: number;

  @column()
  public classroom: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
