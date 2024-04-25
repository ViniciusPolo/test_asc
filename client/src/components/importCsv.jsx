import { React, useState } from "react";
import Papa from "papaparse";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";

export default function ImportCsv() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [dados, setDados] = useState([]);
	const [telefone, setTelefone] = useState([]);

	const lerDadosArquivo = (e) => {
		const arquivo = e.target.files[0];

		if (arquivo) {
			const reader = new FileReader();
			reader.onload = (event) => {
				const conteudoArquivo = event.target.result;

				const regexTelefone = /(\+\d{2})?\(?\d{2}\)?\s?\d{4,5}-?\d{4}/g;

				const matchRegex = conteudoArquivo.match(regexTelefone);

				// if (matchRegex) {
				//   console.log("Números de telefone encontrados:", matchRegex.length);
				// } else {
				//   console.log("Nenhum número de telefone encontrado.");
				// }

				Papa.parse(conteudoArquivo, {
					header: true,
					dynamicTyping: true,
					skipEmptyLines: true,
					delimitersToGuess: [
						",",
						"\t",
						"|",
						";",
						Papa.RECORD_SEP,
						Papa.UNIT_SEP,
					],
					skipFirstNLines: 0,
					complete: (result) => {
						const numerosTelefones = matchRegex.map((numero) =>
							numero.replace(/\D/g, "")
						);
						console.log("Números de telefone encontrados:", numerosTelefones);
						setTelefone(numerosTelefones);
						if (matchRegex.length < result.data.length) {
							console.log("Algo errado com um ou mais telefones");
							alert(
								"Um ou mais mais contatos estão sem o número de telefone, não serão Salvos. Verifique seu documento importado."
							);
							//return
						}
            console.log(result.data)
						setDados(result.data);
					},
					error: (error) => {
						console.error("Erro ao analisar o arquivo", error);
					},
				});
			};
			reader.readAsText(arquivo);
		}
	};

	const alteraCampanha = (index, event) => {
		const novaCampanha = event.target.value;
		const dadosAtualizados = [...dados];
		dadosAtualizados[index].campanha = novaCampanha;
		setDados(dadosAtualizados);
	};

	const salvar = async () => {
    setIsLoading(true);
		const dadosComNumeros = dados.map((item, index) => {
			if (!item.Campanha && !item.campanha) {
				alert(`Preencha uma campanha para ${item.Nome || item.nome} ${item.Sobrenome || item.sobrenome}`)
				return null
			}
			// Substituir telefones pelos números correspondentes
			return {
				...item,
				Telefone: parseInt(telefone[index]),
			};
		});

		if (dadosComNumeros.some(item => item === null)) {
      setIsLoading(false);
      return; // Interrompe a execução da função
    }

		setDados(dadosComNumeros);
		try {
			await api
				.post(`/contatos/incluir`, {
					...dadosComNumeros,
				})
				.then((response) => {
					alert("Contato Salvo com sucesso com sucesso!");
					navigate("/");
				})
				.catch((e) => {
					alert("Contato não salvo");
					navigate("/");
				});
		} catch (error) {
			console.error("erro api", error);
		}
		setIsLoading(false);
	};

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<form onSubmit={salvar}>
						<div className="form-group m-3">
							<label htmlFor="exampleFormControlFile1">Escolha o CSV</label>
							<br />
							<input
								type="file"
								className="form-control-file"
								id="exampleFormControlFile1"
								accept=".csv"
								onChange={lerDadosArquivo}
							/>
						</div>
						<button
							type="button"
							class="btn btn-primary m-3 mt-1"
							disabled={!dados.length}
							onClick={salvar}
						>
							Salvar
						</button>
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
									<td scope="row">{row.Nome || row.nome}</td>
									<td>{row.Sobrenome || row.sobrenome}</td>
									<td>{row.Email || row.email}</td>
									<td>{row.Telefone || row.telefone}</td>
									<td>{row.Endereco || row.endereco}</td>
									<td>{row.Cidade || row.cidade}</td>
									<td>{row.CEP || row.cep}</td>
									<td>{row.DataDeNascimento || row.data_nascimento}</td>
									<td>
										<input
											type="text"
											className="form-control"
                      placeholder={row.campanha || "Informe a campanha"}
											onBlur={(event) => alteraCampanha(index, event)}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			)}
		</>
	);
}
