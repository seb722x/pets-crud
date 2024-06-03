import { QueryInterface } from 'sequelize'

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.sequelize.query(`
    DROP FUNCTION IF EXISTS full_year_update;
    CREATE OR REPLACE FUNCTION full_year_update()
    RETURNS void LANGUAGE plpgsql AS $$
    BEGIN
      UPDATE "Offers" SET full_year = true
      WHERE (SELECT EXTRACT(DOY FROM end_date::timestamp)) - 
      (SELECT EXTRACT(DOY FROM start_date::timestamp)) > 360;
    END;$$;
  `)
}

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.sequelize.query('DROP FUNCTION IF EXISTS full_year_update;')
}
