import { Migration } from '@mikro-orm/migrations';

export class Migration20210103142243 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "dojo" ("id" serial primary key, "created_at" jsonb not null, "updated_at" jsonb not null, "title" text not null);');
  }

}
