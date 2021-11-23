import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import PropertySearchComponent from "../components/PropertySearch";
import DoRequest from "../services/ReqService";
import { useDispatch, useSelector } from "react-redux";
import { QuickSort } from "../services/General";
import * as FilterActions from "../redux/actions/FilterActions";
import * as PropertyActions from "../redux/actions/PropertyActions";

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
        if (userSelector.token || sessionStorage.getItem("userCredentials")) {
            const getProperties = async () => {
                return await DoRequest(
                    "IMOBILIARIA",
                    "imoveis",
                    {},
                    "GET",
                    true,
                    {},
                    userSelector.token || JSON.parse(sessionStorage.getItem("userCredentials")).access_token
                );
            }
            getProperties()
                .then((resp) => {
                    setProperties(resp);
                    setInitialProperties(resp);
                    setMaxMinPrices(resp);
                });
        }
    }, [userSelector.token])

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