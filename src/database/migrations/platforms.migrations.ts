import { Sequelize } from 'sequelize/types'

/* Make platforms to be global by default */
export const upgradePlatformsTable = async (connection: Sequelize) => {
  return connection.query(`ALTER TABLE "PlatformEntities" 
            DROP COLUMN IF EXISTS project_id;
        ALTER TABLE "PlatformEntities"
            ADD COLUMN IF NOT EXISTS user_id VARCHAR(255);`)
}

export const addPlatformsGlobalField = async (connection: Sequelize) => {
  return connection.query(`ALTER TABLE "PlatformEntities" 
                            ADD COLUMN IF NOT EXISTS is_global BOOLEAN DEFAULT true;
                            ALTER TABLE "PlatformEntities"
                            ADD COLUMN IF NOT EXISTS project_id VARCHAR(255) 
                            `)
}
