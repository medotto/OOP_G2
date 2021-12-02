import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import PropertySearchComponent from "../components/PropertySearch";
import { useDispatch, useSelector } from "react-redux";
import { QuickSort } from "../services/General";
import * as FilterActions from "../redux/actions/FilterActions";
import * as PropertyActions from "../redux/actions/PropertyActions";
import { getAllProperties, getPropertiesByOwner } from "../services/ImobiliariaService";

const PropertySearch = () => {
    const dispatch = useDispatch();
    const [properties, setProperties] = useState(null);
    const [initialProperties, setInitialProperties] = useState(null);
    const filterInfo = useSelector((state) => state.FilterReducer);
    const propertySelector = useSelector((state) => state.PropertyReducer);
    const userSelector = useSelector((state) => state.UserReducer);

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
            dispatch(FilterActions.SetPriceRange({ min: minValue, max: maxValue }));
        }
    }

    useEffect(() => {
        console.log(properties);
    }, [properties])

    useEffect(() => {
        if (initialProperties) {
            let min = filterInfo.priceRange.min;
            let max = filterInfo.priceRange.max;
            setProperties(initialProperties.filter((property) =>
                filterInfo.status.withPhotos ? filterInfo?.filters?.withPhotos(property) : true
                    && filterInfo.status.withPriceRange ? filterInfo.filters.withPriceRange(property, min, max) : true
            ));
        }
    }, [filterInfo])

    useEffect(() => {
        if (userSelector.token || localStorage.getItem("userCredentials")) {
            let localStorageValues = JSON.parse(localStorage.getItem("userCredentials"))
            getPropertiesByOwner(
                userSelector.token || localStorageValues.access_token,
                localStorageValues.email
            )
                .then((resp) => {
                    console.log("enter 1")
                    setProperties(resp);
                    setInitialProperties(resp);
                    setMaxMinPrices(resp);
                });
        }
        else {
            getAllProperties()
                .then((resp) => {
                    console.log("enter 2")
                    setProperties(resp);
                    setInitialProperties(resp);
                    setMaxMinPrices(resp);
                });
        }
    }, [userSelector.token])

    useEffect(() => {
        if (propertySelector.refreshProperties && (userSelector.token || localStorage.getItem("userCredentials"))) {
            let localStorageValues = JSON.parse(localStorage.getItem("userCredentials"))
            getPropertiesByOwner(
                userSelector.token || localStorageValues.access_token,
                localStorageValues.email
            )
                .then((resp) => {
                    setProperties(resp);
                    setInitialProperties(resp);
                    setMaxMinPrices(resp);
                });
            dispatch(PropertyActions.RefreshProperties(false));
        }
        else {
            getAllProperties()
                .then((resp) => {
                    setProperties(resp);
                    setInitialProperties(resp);
                    setMaxMinPrices(resp);
                });
            dispatch(PropertyActions.RefreshProperties(false));
        }
    }, [propertySelector.refreshProperties])

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