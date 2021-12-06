import React, { useEffect, useState } from "react";
import DynamicTable from "../components/GenericComponents/DynamicTable";
import { getAuditoria, editOwner, postOwner } from "../services/ImobiliariaService";
import { useDispatch, useSelector } from "react-redux";
import * as DynamicTableActions from "../redux/actions/DynamicTableActions";
import { QuickSort } from "../services/General";
import { phoneNumberFormatter } from "../services/General";

const formatAuditoria = (auditorias) => {
	return auditorias.map((auditoria, index) => {
		let auditoriaAux = {
			...auditoria,
			id: index + 1,
			"Id Imóvel": auditoria.id,
			proprietario: auditoria.proprietario?.nome,
			"e-mail proprietario": auditoria.proprietario?.email,
			"telefone proprietario": phoneNumberFormatter(auditoria.proprietario?.telefone),
			situacao: auditoria.situacao.situacao
		};
		delete auditoriaAux.imagemImovelDtoList;
		return auditoriaAux;
	})
}
const Auditoria = () => {
	const dispatch = useDispatch();
	const [auditoria, setAuditoria] = useState(null);
	const userSelector = useSelector((state) => state.UserReducer);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		if (userSelector.token || localStorage.getItem("userCredentials")) {
			getAuditoria(
				new URLSearchParams(window.location.search).get("id"),
				userSelector.token ||
				JSON.parse(localStorage.getItem("userCredentials")).access_token
			).then((resp) => {
				if (resp)
					setAuditoria(formatAuditoria(QuickSort(resp, 0, resp.length - 1, "dtAlteracao", "desc")));
			});
		}
	}, [])

	useEffect(() => {
		if (refresh && (userSelector.token || localStorage.getItem("userCredentials"))) {
			getAuditoria(
				new URLSearchParams(window.location.search).get("id"),
				userSelector.token ||
				JSON.parse(localStorage.getItem("userCredentials")).access_token
			).then((resp) => {
				if (resp) {
					dispatch(DynamicTableActions.SetInitialData(resp))
					setAuditoria(formatAuditoria(QuickSort(resp, 0, resp.length - 1, "dtAlteracao", "desc")));
				}
			});
			setRefresh(false)
		}
	}, [refresh])

	return (
		<div className="navbarSpace">
			{auditoria &&
				<DynamicTable
					title="Auditoria"
					data={auditoria} />
			}
		</div>
	);
};
export default Auditoria;