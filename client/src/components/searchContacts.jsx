import { React, useState } from "react";
import api from "../services/api";
import Loading from "./loading";
import { CSVLink, CSVDownload } from "react-csv";

export default function SearchContacts() {
	const [isLoading, setIsLoading] = useState(false);
	const [dados, setDados] = useState([]);
	const [nome, setNome] = useState("");
	const [sobrenome, setSobrenome] = useState("");
	const [cidade, setCidade] = useState("");
	const [campanha, setCampanha] = useState("");

	const handleChange = (event) => {
		const id = event.target.id;
		switch (id) {
			case "nome":
				setNome(event.target.value);
				break;
			case "sobrenome":
				setSobrenome(event.target.value);
				break;
			case "cidade":
				setCidade(event.target.value);
				break;
			case "campanha":
				setCampanha(event.target.value);
				break;
			default:
				break;
		}
	};

	const buscar = async () => {
		setIsLoading(true);
		const parametros = {
			nome: nome,
			sobrenome: sobrenome,
			cidade: cidade,
			campanha: campanha,
		};

		const buildQueryString = (params) => {
			return Object.keys(params)
				.filter((key) => params[key])
				.map(
					(key) =>
						`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
				)
				.join("&");
		};

		const queryString = buildQueryString(parametros);
		try {
			await api
				.get(`/contatos/busca-por?${queryString}`)
				.then((response) => response.data)
				.then((data) => {
					setDados(data);
				})
				.catch((e) => {
					alert("Contatos não encontrados" + e);
				});
		} catch (error) {
			console.error("erro api", error);
		}
		setIsLoading(false);
	};

	const formatarTelefone = (telefone) => {

		if (!telefone) return "";

		const telefoneStr = telefone.toString();
		if (telefoneStr.length > 10)
			return `(${telefoneStr.substring(0, 2)}) ${telefoneStr.substring(
				2,
				7
			)}-${telefoneStr.substring(7)}`;
		else
			return `(${telefoneStr.substring(0, 2)}) ${telefoneStr.substring(
				2,
				6
			)}-${telefoneStr.substring(6)}`;
	};

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<form onSubmit={buscar}>
						<div className="container">
							<div className="row">
								<div className="form-group col-6 mb-3">
									<label htmlFor="nome">Nome</label>
									<br />
									<input
										type="text"
										className="form-control"
										placeholder="Busque pelo nome"
										id="nome"
										value={nome}
										onChange={handleChange}
									/>
								</div>
								<div className="form-group col-6 mb-3">
									<label htmlFor="sobrenome">SobreNome</label>
									<br />
									<input
										type="text"
										className="form-control"
										placeholder="Busque pelo sobrenome"
										id="sobrenome"
										value={sobrenome}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className="row">
								<div className="form-group col-6 mb-3">
									<label htmlFor="cidade">Cidade</label>
									<br />
									<input
										type="text"
										className="form-control"
										placeholder="Busque pela cidade"
										id="cidade"
										value={cidade}
										onChange={handleChange}
									/>
								</div>
								<div className="form-group col-6 mb-3">
									<label htmlFor="campanha">Campnaha</label>
									<br />
									<input
										type="text"
										className="form-control"
										placeholder="Busque pela campanha"
										id="campanha"
										value={campanha}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className="row">
								<button
									type="button"
									class="btn btn-primary m-3 mt-1"
									onClick={buscar}
								>
									Buscar Contatos
								</button>
							</div>
						</div>
					</form>
					<table className="table table-striped">
						<thead>
							<tr>
								<th scope="col">Nome</th>
								<th scope="col">Sobrenome</th>
								<th scope="col">Email</th>
								<th scope="col">Telefone</th>
								<th scope="col">Endereço</th>
								<th scope="col">Cidade</th>
								<th scope="col">CEP</th>
								<th scope="col">Data de Nascimento</th>
								<th scope="col">Campanha</th>
							</tr>
						</thead>
						<tbody>
							{dados.map((row, index) => (
								<tr key={index}>
									<td scope="row">{row.nome}</td>
									<td>{row.sobrenome}</td>
									<td>{row.email}</td>
									<td>{formatarTelefone(row.telefone)}</td>
									<td>{row.endereco}</td>
									<td>{row.cidade}</td>
									<td>{row.cep}</td>
									<td>{row.data_nascimento}</td>
									<td>{row.campanha}</td>
								</tr>
							))}
						</tbody>
					</table>
          <div className="container">
          <CSVLink data={dados}>
            <div className="row">
                <button
                      type="button"
                      class="btn btn-primary m-3 mt-1"
                >
                Exportar CSV
                </button>
            </div>
          </CSVLink>
          </div>
				</>
			)}
		</>
	);
}
