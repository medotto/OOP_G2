import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import PropertyCard from "../components/PropertyCard";
import PropertySearchComponent from "../components/PropertySearch";
import { Grid } from "@material-ui/core";
import DoRequest from "../services/ReqService";
import { useSelector } from "react-redux";

const PropertySearch = () => {
    const [properties, setProperties] = useState(null);
    const [initialProperties, setInitialProperties] = useState(null);
    const filterInfo = useSelector((state) => state.FilterReducer);

    useEffect(() => {
        if (properties)
            setProperties(initialProperties.filter((property) =>
                filterInfo.status.withPhotos ? filterInfo?.filters?.withPhotos(property) : true
            ));
        console.log(filterInfo.status.withPhotos)

    }, [filterInfo])
    useEffect(() => {
        const getProperties = async () => {
            return await DoRequest(
                "imoveis",
                {},
                "GET",
                false
            );
        }
        getProperties()
            .then((resp) => {
                setProperties(resp);
                setInitialProperties(resp);
            });
    }, [])

    return (
        <PropertySearchComponent >
            {properties && properties.map((property, index) => <PropertyCard key={index} data={property} />)}
        </PropertySearchComponent>
    );
};
export default PropertySearch;