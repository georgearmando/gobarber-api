import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddAvatarFieldToUsers1600183841139 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      //Aqui estamos a adicionar uma acoluna a tabelea users
      await queryRunner.addColumn(
        'users',
        new TableColumn({
          name: 'avatar',
          type: 'varchar',
          isNullable: true,
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('users','avatar');
    }

}

// Depois de criar a migration, devemos actualiza-la na BD 'migration:run'
