import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import PropertySearchComponent from "../components/PropertySearch";
import DoRequest from "../services/ReqService";
import { useDispatch, useSelector } from "react-redux";
import { QuickSort } from "../services/General";
import * as FilterActions from "../redux/actions/FilterActions";
import * as PropertyActions from "../redux/actions/PropertyActions";

const mockProperties = [
    {
        "id": 1,
        "endereco": "Rua Teste 1234",
        "bairro": "Bairro Teste 1234",
        "cidade": "Cidade Teste 1234",
        "pais": "País teste 1234",
        "preco": 150015.0,
        "owner": "Paulo Pires de Avila",
        "situacao": {
            "id": 1,
            "situacao": "C"
        },
        "proprietario": {
            "id": 1,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "11/11/2021 14:15:23",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 2,
        "endereco": "Rua Teste 1234",
        "bairro": "Bairro Teste 1234",
        "cidade": "Cidade Teste 1234",
        "pais": "País teste 1234",
        "preco": 150014.0,
        "owner": "Paulo Pires de Avila",
        "situacao": {
            "id": 1,
            "situacao": "C"
        },
        "proprietario": {
            "id": 2,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "11/11/2021 14:16:49",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 3,
        "endereco": "Rua Teste 1234",
        "bairro": "Bairro Teste 1234",
        "cidade": "Cidade Teste 1234",
        "pais": "País teste 1234",
        "preco": 150013.0,
        "owner": "Paulo Pires de Avila",
        "situacao": {
            "id": 1,
            "situacao": "C"
        },
        "proprietario": {
            "id": 3,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "11/11/2021 14:20:24",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 4,
        "endereco": "Rua Teste 1234",
        "bairro": "Bairro Teste 1234",
        "cidade": "Cidade Teste 1234",
        "pais": "País teste 1234",
        "preco": 150012.0,
        "owner": "Paulo Pires de Avila",
        "situacao": {
            "id": 1,
            "situacao": "C"
        },
        "proprietario": {
            "id": 4,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "11/11/2021 14:21:04",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 5,
        "endereco": "Rua Teste 1234",
        "bairro": "Bairro Teste 1234",
        "cidade": "Cidade Teste 1234",
        "pais": "País teste 1234",
        "preco": 150011.0,
        "owner": "Paulo Pires de Avila",
        "situacao": {
            "id": 1,
            "situacao": "C"
        },
        "proprietario": {
            "id": 1,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "11/11/2021 14:23:27",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 6,
        "endereco": "Rua Teste 1234",
        "bairro": "Bairro Teste 1234",
        "cidade": "Cidade Teste 1234",
        "pais": "País teste 1234",
        "preco": 150010.0,
        "owner": "Paulo Pires de Avila",
        "situacao": {
            "id": 1,
            "situacao": "C"
        },
        "proprietario": {
            "id": 1,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "11/11/2021 14:24:51",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 7,
        "endereco": "Rua Teste 1234",
        "bairro": "Bairro Teste 1234",
        "cidade": "Cidade Teste 1234",
        "pais": "País teste 1234",
        "preco": 150009.0,
        "owner": "Paulo Pires de Avila",
        "situacao": {
            "id": 1,
            "situacao": "C"
        },
        "proprietario": {
            "id": 1,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "11/11/2021 14:24:56",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 8,
        "endereco": "Rua Teste 1234",
        "bairro": "Bairro Teste 1234",
        "cidade": "Cidade Teste 1234",
        "pais": "País teste 1234",
        "preco": 150008.0,
        "owner": "Paulo Pires de Avila",
        "situacao": {
            "id": 1,
            "situacao": "C"
        },
        "proprietario": {
            "id": 1,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "11/11/2021 14:25:16",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 9,
        "endereco": "Rua Teste 1234",
        "bairro": "Bairro Teste 1234",
        "cidade": "Cidade Teste 1234",
        "pais": "País teste 1234",
        "preco": 150007.0,
        "owner": "Paulo Pires de Avila",
        "situacao": {
            "id": 1,
            "situacao": "C"
        },
        "proprietario": {
            "id": 1,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "11/11/2021 14:26:49",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 10,
        "endereco": "Protásio Alves, 155",
        "bairro": "Bela Vista",
        "cidade": "Nova Hartz",
        "pais": "Brasil",
        "preco": 150006.0,
        "owner": "321",
        "situacao": {
            "id": 2,
            "situacao": "A"
        },
        "proprietario": {
            "id": 5,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "11/11/2021 15:16:09",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 11,
        "endereco": "Protásio Alves, 155",
        "bairro": "Bela Vista",
        "cidade": "Nova Hartz",
        "pais": "Brasil",
        "preco": 150005.0,
        "owner": "321",
        "situacao": {
            "id": 2,
            "situacao": "A"
        },
        "proprietario": {
            "id": 5,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "11/11/2021 21:09:37",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 12,
        "endereco": "Protásio Alves, 155",
        "bairro": "Bela Vista",
        "cidade": "Nova Hartz",
        "pais": "Brasil",
        "preco": 150004.0,
        "owner": "321",
        "situacao": {
            "id": 2,
            "situacao": "A"
        },
        "proprietario": {
            "id": 5,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "11/11/2021 21:11:09",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 13,
        "endereco": "Protásio Alves, 155",
        "bairro": "Bela Vista",
        "cidade": "Nova Hartz",
        "pais": "Brasil",
        "preco": 150003.0,
        "owner": "321",
        "situacao": {
            "id": 2,
            "situacao": "A"
        },
        "proprietario": {
            "id": 5,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "11/11/2021 21:12:28",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 14,
        "endereco": "Protásio Alves, 155",
        "bairro": "Bela Vista",
        "cidade": "Nova Hartz",
        "pais": "Brasil",
        "preco": 150002.0,
        "owner": "321",
        "situacao": {
            "id": 2,
            "situacao": "A"
        },
        "proprietario": {
            "id": 5,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [
            {
                "id": 1,
                "idImovel": 14,
                "imagemBase64": "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"
            }
        ],
        "dtCadastro": "11/11/2021 21:13:34",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 15,
        "endereco": "Protásio Alves, 155",
        "bairro": "Bela Vista",
        "cidade": "Nova Hartz",
        "pais": "Brasil",
        "preco": 150001.0,
        "owner": "321",
        "situacao": {
            "id": 2,
            "situacao": "A"
        },
        "proprietario": {
            "id": 5,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "15/11/2021 22:08:35",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 16,
        "endereco": "Protásio Alves, 155",
        "bairro": "Bela Vista",
        "cidade": "Nova Hartz",
        "pais": "Brasil",
        "preco": 150000.0,
        "owner": "321",
        "situacao": {
            "id": 2,
            "situacao": "A"
        },
        "proprietario": {
            "id": 5,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "17/11/2021 22:49:29",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 17,
        "endereco": "Protásio Alves, 155",
        "bairro": "Bela Vista",
        "cidade": "Nova Hartz",
        "pais": "Brasil",
        "preco": 150000.0,
        "owner": "321",
        "situacao": {
            "id": 2,
            "situacao": "A"
        },
        "proprietario": {
            "id": 5,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "17/11/2021 22:49:45",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 18,
        "endereco": "Protásio Alves, 155",
        "bairro": "Bela Vista",
        "cidade": "Nova Hartz",
        "pais": "Brasil",
        "preco": 150000.0,
        "owner": "321",
        "situacao": {
            "id": 2,
            "situacao": "A"
        },
        "proprietario": {
            "id": 5,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "17/11/2021 22:55:39",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 19,
        "endereco": "Protásio Alves, 155",
        "bairro": "Bela Vista",
        "cidade": "Nova Hartz",
        "pais": "Brasil",
        "preco": 150000.0,
        "owner": "321",
        "situacao": {
            "id": 2,
            "situacao": "A"
        },
        "proprietario": {
            "id": 5,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "17/11/2021 22:57:20",
        "dtAlteracao": null,
        "flInativo": null
    },
    {
        "id": 20,
        "endereco": "Protásio Alves, 155",
        "bairro": "Bela Vista",
        "cidade": "Nova Hartz",
        "pais": "Brasil",
        "preco": 150000.0,
        "owner": "321",
        "situacao": {
            "id": 2,
            "situacao": "A"
        },
        "proprietario": {
            "id": 5,
            "nome": "aaaaaa",
            "email": "aaa@gmail.com",
            "telefone": "51999999999"
        },
        "flFinanciado": "S",
        "flProprietario": "S",
        "flNegociacao": "S",
        "imagemImovelDtoList": [],
        "dtCadastro": "17/11/2021 22:59:47",
        "dtAlteracao": null,
        "flInativo": null
    }
];

const PropertySearch = () => {
    const dispatch = useDispatch();
    const [properties, setProperties] = useState(null);
    const [initialProperties, setInitialProperties] = useState(null);
    const filterInfo = useSelector((state) => state.FilterReducer);
    const propertySelector = useSelector((state) => state.PropertyReducer);

    const onClickFunction = (property) => {
        dispatch(PropertyActions.SetActiveProperty((propertySelector.activeProperty === property) ? null : property));
    }

    const setMaxMinPrices = (resp) => {
        let minValue = resp[0].preco;
        let maxValue = resp[resp.length - 1].preco;
        if (minValue > maxValue) {
            let aux = minValue;
            minValue = maxValue;
            maxValue = aux;
        }
        dispatch(FilterActions.SetPriceRange({ min: minValue, max: maxValue }));
    }

    useEffect(() => {
        if (initialProperties) {
            let min = filterInfo.priceRange.min;
            let max = filterInfo.priceRange.max;

            setProperties(initialProperties.filter((property) =>
                filterInfo.status.withPhotos ? filterInfo?.filters?.withPhotos(property) : true
                    && filterInfo.status.withPriceRange ? filterInfo.filters.withPriceRange(property, min, max) : true
            ));
        }
    }, [initialProperties, filterInfo])

    useEffect(() => {
        const getProperties = async () => {
            // return await DoRequest(
            //     "imoveis",
            //     {},
            //     "GET",
            //     false
            // );
            return mockProperties;
        }
        getProperties()
            .then((resp) => {
                setProperties(resp);
                setInitialProperties(resp);
                setMaxMinPrices(resp);
            });
    }, [])

    useEffect(() => {
        if (initialProperties)
            setInitialProperties(QuickSort(initialProperties, 0, initialProperties.length - 1, filterInfo.orderBy.field, filterInfo.orderBy.orientation));
    }, [initialProperties, filterInfo.orderBy.field])

    useEffect(() => {
        if (initialProperties) {
            let temp = initialProperties.slice();
            setInitialProperties(temp.reverse());
        }
    }, [filterInfo.orderBy.orientation])

    return (
        <PropertySearchComponent >
            {properties && properties.map((property, index) =>
                <PropertyCard
                    key={index}
                    data={property}
                    onClickFunction={() => onClickFunction(property)}
                />)}
        </PropertySearchComponent>
    );
};
export default PropertySearch;