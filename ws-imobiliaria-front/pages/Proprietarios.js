import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import DynamicTable from "../components/GenericComponents/DynamicTable";
import Grid from "@material-ui/core/Grid";
import { getOwners, editOwner, postOwner } from "../services/ImobiliariaService";
import { useDispatch, useSelector } from "react-redux";
import * as DynamicTableActions from "../redux/actions/DynamicTableActions";

const Proprietarios = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [owners, setOwners] = useState(null);
    const userSelector = useSelector((state) => state.UserReducer);
    const [refresh, setRefresh] = useState(false);

    const handleEdit = (updatedOwners) => {
        if (userSelector.token || sessionStorage.getItem("userCredentials")) {
            updatedOwners.forEach((updatedOwner) => {
                editOwner(
                    updatedOwner,
                    userSelector.token ||
                    JSON.parse(sessionStorage.getItem("userCredentials")).access_token
                )
            })
        }
    }
    const handleAdd = (newOwner) => {
        if (userSelector.token || sessionStorage.getItem("userCredentials")) {
            postOwner(
                newOwner,
                userSelector.token ||
                JSON.parse(sessionStorage.getItem("userCredentials")).access_token
            ).then(() => setRefresh(true));
        }
    }
    useEffect(() => {
        if (userSelector.token || sessionStorage.getItem("userCredentials")) {
            getOwners(
                userSelector.token ||
                JSON.parse(sessionStorage.getItem("userCredentials")).access_token
            ).then((resp) => {
                if (resp)
                    setOwners(resp);
            });
        }
    }, [])

    useEffect(() => {
        if (refresh && (userSelector.token || sessionStorage.getItem("userCredentials"))) {
            getOwners(
                userSelector.token ||
                JSON.parse(sessionStorage.getItem("userCredentials")).access_token
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
                    postFunc={handleAdd} />
            }
        </div>
    );
};
export default Proprietarios;