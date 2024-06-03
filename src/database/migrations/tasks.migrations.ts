import { Sequelize } from 'sequelize/types'

export const addDateTimeColumnsToTasks = async (connection: Sequelize) => {
  return connection.query(`ALTER TABLE "TasksEntities"
            ADD COLUMN IF NOT EXISTS start_date timestamp with time zone;
        ALTER TABLE "TasksEntities"
            ADD COLUMN IF NOT EXISTS end_date timestamp with time zone;
    `)
}
