import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import PropertySearchComponent from "../components/PropertySearch";
import { useDispatch, useSelector } from "react-redux";
import { QuickSort } from "../services/General";
import * as FilterActions from "../redux/actions/FilterActions";
import * as PropertyActions from "../redux/actions/PropertyActions";
import { getAllProperties, getPropertiesByOwner } from "../services/ImobiliariaService";
import firebase from "firebase";
import { searchUser } from "../services/UserService";

const isAdmin = (roles) => {
    return roles.filter((role) => role.id === 1).length > 0;
}

const PropertySearch = () => {
    const dispatch = useDispatch();
    const [properties, setProperties] = useState(null);
    const [initialProperties, setInitialProperties] = useState(null);
    const filterInfo = useSelector((state) => state.FilterReducer);
    const propertySelector = useSelector((state) => state.PropertyReducer);
    const userSelector = useSelector((state) => state.UserReducer);
    const [isLogged, setIsLogged] = useState(false);
    const [isAdm, setIsAdm] = useState(false);

    const onClickFunction = (property) => {
        dispatch(PropertyActions.SetActiveProperty((propertySelector.activeProperty === property) ? null : property));
    }

    const setMaxMinPrices = (resp) => {
        if (resp.length > 0) {
            let minValue = resp[0].preco;
            let maxValue = resp[resp.length - 1].preco;
            if (minValue > maxValue) {
                let aux = minValue;
                minValue = maxValue;
                maxValue = aux;
            }
            dispatch(FilterActions.SetPriceRange({
                ...filterInfo.priceRange,
                defaultMin: minValue,
                defaultMax: maxValue
            }));
        }
    }

    useEffect(() => {
        if (initialProperties) {
            let min = filterInfo.priceRange.min;
            let max = filterInfo.priceRange.max;
            let filteredProperties = initialProperties.filter((property) =>
                filterInfo.status.withPhotos ? filterInfo?.filters?.withPhotos(property) : true
                    && filterInfo.status.withPriceRange ? filterInfo.filters.withPriceRange(property, min, max) : true
            );
            setProperties(QuickSort(filteredProperties, 0, filteredProperties.length - 1, filterInfo.orderBy.field, filterInfo.orderBy.orientation));
        }
    }, [filterInfo])

    useEffect(() => {
        if (isLogged) {
            let localStorageValues = JSON.parse(localStorage.getItem("userCredentials"))
            if (!isAdm) {
                getPropertiesByOwner(
                    userSelector.token || localStorageValues.access_token,
                    localStorageValues.email
                )
                    .then((resp) => {
                        setProperties(resp);
                        setInitialProperties(resp);
                        setMaxMinPrices(resp);
                    });
            }
            else {
                getAllProperties()
                    .then((resp) => {
                        setProperties(resp);
                        setInitialProperties(resp);
                        setMaxMinPrices(resp);
                    });
            }
        }
    }, [isLogged, isAdm])

    useEffect(() => {
        if (propertySelector.refreshProperties && isLogged) {
            if (!isAdm) {
                let localStorageValues = JSON.parse(localStorage.getItem("userCredentials"))
                getPropertiesByOwner(
                    userSelector.token || localStorageValues.access_token,
                    localStorageValues.email
                )
                    .then((resp) => {
                        setProperties(resp);
                        setMaxMinPrices(resp);
                    });
                dispatch(PropertyActions.RefreshProperties(false));
            }
            else {
                getAllProperties()
                    .then((resp) => {
                        setProperties(resp);
                        setMaxMinPrices(QuickSort(resp, 0, resp.length - 1, "preco", "asc"));
                    });
                dispatch(PropertyActions.RefreshProperties(false));
            }

        }
    }, [propertySelector.refreshProperties])

    useEffect(() => {
        setIsLogged(userSelector.token || localStorage.getItem("userCredentials"));
    }, [])

    useEffect(() => {
        if (isLogged)
            searchUser(JSON.parse(localStorage.getItem("userCredentials")).email)
                .then((resp) => {
                    if (resp)
                        setIsAdm(isAdmin(resp.roleList))
                })
    }, [isLogged])

    useEffect(() => {
        console.log(isAdm)
    }, [isAdm])

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