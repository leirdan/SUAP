import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Course from "./Course";

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  protected id: number;

  @column()
  public firstName: string;

  @column()
  public lastName: string;

  @column()
  protected cpf: number;

  @column()
  public email: string;

  @column()
  private password: string;

  public getPassword(): string {
    return this.password;
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @manyToMany(() => Course, { pivotTable: "students_courses" })
  public courses: ManyToMany<typeof Course>;
}
