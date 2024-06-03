import { Sequelize } from 'sequelize/types'

export const updateCurrenciesAddExchangeRate = (connection: Sequelize) => {
  return connection.query(`ALTER TABLE "CurrencyEntities" 
       		ADD COLUMN IF NOT EXISTS rate real DEFAULT NULL;
		ALTER TABLE "CurrencyEntities" 
			DROP COLUMN IF EXISTS symbol;
		ALTER TABLE "CurrencyEntities"
			ADD COLUMN IF NOT EXISTS system_default boolean DEFAULT false;
     `)
}
