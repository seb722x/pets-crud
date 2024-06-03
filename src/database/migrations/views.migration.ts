import { Sequelize } from 'sequelize/types'

export const createTsVectorViewForTasks = (connection: Sequelize) => {
  return connection.query(`DROP VIEW IF EXISTS tasks;
                CREATE VIEW tasks AS
                SELECT
                    id,
                    to_tsvector('english', name) as name,
                    cost
                FROM "TasksEntities"
    `)

  //SELECT id, name, cost FROM "tasks" WHERE name @@ to_tsquery('english', 'setup')
}
