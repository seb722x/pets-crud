import { Sequelize } from 'sequelize/types'

export const updateMilestoneKeytoUUID = (connection: Sequelize) => {
  return connection.query(`ALTER TABLE IF EXISTS public."MilestoneEntities"
   		 ALTER COLUMN id SET DEFAULT  gen_random_uuid();
     `)
}
