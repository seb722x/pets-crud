import { Sequelize } from 'sequelize/types'

export const recreateKanbanTable = async (connection: Sequelize) => {
  return connection.query(`DROP TABLE "KanbanEntities"; 
        CREATE TABLE IF NOT EXISTS "KanbanEntities" (
            "project_id" VARCHAR(255) NOT NULL, 
            "board_id" VARCHAR(255), 
            "board_name" VARCHAR(255) NOT NULL, 
            "order" INTEGER DEFAULT 1, 
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
            "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
            "is_default" BOOLEAN NOT NULL DEFAULT false,
            "description" VARCHAR(255),
            PRIMARY KEY ("board_id")
        );`)
}

export const createKanbanBoardOrder = async (connection: Sequelize) => {
  return connection.query(`CREATE OR REPLACE FUNCTION count_boards(iproject_id varchar) RETURNS int LANGUAGE SQL AS
    $$ SELECT COUNT(board_id) FROM public."KanbanEntities" WHERE project_id = iproject_id; $$;`)
}

export const addDefaultColumn = async (connection: Sequelize) => {
  return connection.query(
    `ALTER TABLE "KanbanEntities" ADD COLUMN IF NOT EXISTS is_default BOOLEAN NOT NULL DEFAULT false;`,
  )
}
