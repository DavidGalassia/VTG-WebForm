// pages/api/forms/unform.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connect, Int, VarChar, config as SqlConfig, ConnectionPool } from "mssql";
import {verifyJwtFromCookies} from "../cookieManagement";


const config: SqlConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  database: process.env.DB_NAME as string,
  server: process.env.DB_SERVER as string,
  port: parseInt(process.env.DB_PORT ?? "1433", 10),
  options: {
    encrypt: true, 
    trustServerCertificate: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  let pool: ConnectionPool | null = null;

  try {
    pool = await connect(config);

    if (req.method === "POST") {
      const { talk } = req.body as {
        talk: string;
      };

      const email = verifyJwtFromCookies(req, res);
      const groupId = 11; // Obtener el ID del grupo seleccionado


      await pool.request()
        .input("id_grupo", Int, groupId)
        .input("correo", VarChar, email )
        .input("charla_info", VarChar, talk)
        .query(`
          INSERT INTO tvu (id_grupo, correo, charla_info)
          VALUES (@id_grupo, @correo, @charla_info)
        `);

      return res.status(200).json({ message: "Datos insertados con éxito" });
    } 

    // GET Metod 
    else if (req.method === "GET") {
      // Consulta para obtener todos los registros
      const result = await pool.request().query("SELECT * FROM persona");
      return res.status(200).json(result.recordset);
    } else {
      return res.status(405).json({ message: "Método no permitido" });
    }
  } 

  // Server Fail 
  catch (err) {
    console.error("Error en la conexión SQL:", err);
    return res.status(500).json({ error: "Error de servidor", details: err });
  } finally {
    // Cierra la conexión SQL
    if (pool) {
      pool.close();
    }
  }
}

