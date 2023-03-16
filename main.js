import * as JsStore from 'jsstore';
import SqlWeb from "sqlweb";

document.addEventListener("DOMContentLoaded", async ()=>{

	let el_dbname = document.querySelector(".txtDbName")
	let el_query = document.querySelector(".txtSQLQuery")
	let el_btn = document.querySelector(".btnExecQuery")


	el_btn.onclick = async (evt) => {
		evt.preventDefault()

		console.log("el_dbname: "+el_dbname.value)
		console.log("el_query: "+el_query.value)

		try {
			let connection = new JsStore.Connection()
			connection.addPlugin(SqlWeb);

			//let ret = await connection.$sql.run(`create db ${el_dbname.value}`)
			let dbName = el_dbname.value
			let tblUsers = {
				name: 'Users',
				columns: {
					// Here "Id" is name of column 
					ID:{ primaryKey: true, autoIncrement: true },
					Name:  { notNull: true, dataType: "string" },
					Surname:  { notNull: true, dataType: "string" },
					Gender : { notNull: true, dataType: "string" },
					Age :  { notNull: true, dataType: "number" }, 
				}
			};
			let database = {
				name: dbName,
				tables: [tblUsers]
			}
			
			let isDbCreated = await connection.initDb(database);

			let value = {
				Name: 'Ivan',
				Surname: 'Prez',
				Gender: 'Male',
				Age: 50
			}
			
			let insertCount = await connection.insert({
				into: 'Users',
				values: [value]
			});

			console.log(insertCount)
		}
		catch (Ex) {
			console.error(Ex)
		}
		
	}
})