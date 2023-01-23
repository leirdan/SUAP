import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Student from "./Student";
import Teacher from "./Teacher";

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  protected id: number;

  @column()
  public title: string;

  @column()
  public workload: number;

  @column()
  public classroom: string;

  @column()
  protected teacherId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @manyToMany(() => Student, { pivotTable: "students_courses" })
  public students: ManyToMany<typeof Student>;

  @belongsTo(() => Teacher)
  public teacher: BelongsTo<typeof Teacher>;
}
