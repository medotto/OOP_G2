import React, { useEffect, useState } from "react";
import DynamicTable from "../components/GenericComponents/DynamicTable";
import { useDispatch, useSelector } from "react-redux";
import * as DynamicTableActions from "../redux/actions/DynamicTableActions";
import { QuickSort } from "../services/General";
import firebase from "firebase";
import { getAllUsers, updateUser } from "../services/UserService";

const formatUsers = (users) => {
    let result = users.map((user) => {
        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            cargo: (user.roleList[0]) ? user.roleList[0].name : "Cadastrador",
            stAtivo: user.stAtivo === "S"
        };
    });
    result = result.filter((user) => !user.stAtivo);
    return result;
}

const Proprietarios = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState(null);
    const [formattedUsers, setFormattedUsers] = useState(null);
    const userSelector = useSelector((state) => state.UserReducer);
    const [refresh, setRefresh] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    const handleEdit = (approvedUsers) => {
        if (isLogged) {
            approvedUsers.forEach((approvedUser) => {
                let idRole = 0;
                switch (approvedUser.cargo?.toUpperCase()) {
                    case "ADMIN": idRole = 1; break;
                    case "APROVADOR": idRole = 2; break;
                    case "CADASTRADOR": idRole = 3; break;
                    default: idRole = 3; break;
                }
                let adjustedRegistry = {
                    ...approvedUser,
                    stAtivo: (approvedUser.stAtivo) ? "S" : "N",
                    roleList: [{ id: idRole }],
                    password: users.find((user) => user.id === approvedUser.id).password
                };
                delete adjustedRegistry.cargo;
                updateUser(
                    adjustedRegistry,
                    userSelector.token ||
                    JSON.parse(localStorage.getItem("userCredentials")).access_token
                ).then(() => setRefresh(true))
            })
        }
    }

    useEffect(() => {
        setIsLogged(
            !!firebase.auth().currentUser || !!localStorage.getItem("userCredentials")
        );
    }, []);

    useEffect(() => {
        if (isLogged) {
            getAllUsers().then((resp) => {
                let result = resp;
                setUsers(result);
                setFormattedUsers(formatUsers(result));
            });
        }
    }, [isLogged])

    useEffect(() => {
        if (refresh && isLogged) {
            getAllUsers().then((resp) => {
                if (resp) {
                    let result = resp;
                    setUsers(result);
                    setFormattedUsers(formatUsers(result));
                }
            });
            setRefresh(false)
        }
    }, [refresh])

    return (
        <div className="navbarSpace">
            {formattedUsers &&
                <DynamicTable
                    title="Aprovar novos usuários"
                    data={formattedUsers}
                    putFunc={handleEdit} />
            }
        </div>
    );
};
export default Proprietarios;