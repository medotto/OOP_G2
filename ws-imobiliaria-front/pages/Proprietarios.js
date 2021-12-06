import React, { useEffect, useState } from "react";
import DynamicTable from "../components/GenericComponents/DynamicTable";
import { getOwners, editOwner, postOwner, deleteOwner } from "../services/ImobiliariaService";
import { useDispatch, useSelector } from "react-redux";
import * as DynamicTableActions from "../redux/actions/DynamicTableActions";
import { QuickSort } from "../services/General";

const Proprietarios = () => {
    const dispatch = useDispatch();
    const [owners, setOwners] = useState(null);
    const userSelector = useSelector((state) => state.UserReducer);
    const [refresh, setRefresh] = useState(false);

    const handleEdit = (updatedOwners) => {
        if (userSelector.token || localStorage.getItem("userCredentials")) {
            updatedOwners.forEach((updatedOwner) => {
                editOwner(
                    updatedOwner,
                    userSelector.token ||
                    JSON.parse(localStorage.getItem("userCredentials")).access_token
                )
            })
        }
    }
    const handleAdd = (newOwner) => {
        if (userSelector.token || localStorage.getItem("userCredentials")) {
            postOwner(
                newOwner,
                userSelector.token ||
                JSON.parse(localStorage.getItem("userCredentials")).access_token
            ).then(() => setRefresh(true));
        }
    }
    const handleDelete = (selectedOwners) => {
        if (userSelector.token || localStorage.getItem("userCredentials")) {
            selectedOwners.forEach((selectedOwner) => {
                deleteOwner(
                    selectedOwner.id,
                    userSelector.token ||
                    JSON.parse(localStorage.getItem("userCredentials")).access_token
                ).then(() => setRefresh(true))
            })
        }
    }

    useEffect(() => {
        if (userSelector.token || localStorage.getItem("userCredentials")) {
            getOwners(
                userSelector.token ||
                JSON.parse(localStorage.getItem("userCredentials")).access_token
            ).then((resp) => {
                if (resp)
                    setOwners(QuickSort(resp, 0, resp.length - 1, "id", "asc"));
            });
        }
    }, [])

    useEffect(() => {
        if (refresh && (userSelector.token || localStorage.getItem("userCredentials"))) {
            getOwners(
                userSelector.token ||
                JSON.parse(localStorage.getItem("userCredentials")).access_token
            ).then((resp) => {
                if (resp) {
                    dispatch(DynamicTableActions.SetInitialData(resp))
                    setOwners(resp);
                }
            });
            setRefresh(false)
        }
    }, [refresh])

    return (
        <div className="navbarSpace">
            {owners &&
                <DynamicTable
                    title="Proprietários"
                    data={owners}
                    putFunc={handleEdit}
                    postFunc={handleAdd}
                    deleteFunc={handleDelete} />
            }
        </div>
    );
};
export default Proprietarios;