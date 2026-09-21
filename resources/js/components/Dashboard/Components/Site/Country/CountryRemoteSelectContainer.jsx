import { Select, Form } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSiteCountriesSelector } from "../../../../../redux/siteCountry/actions";

function CountryRemoteSelectContainer({
    fetchSiteCountriesSelector,
    data,
    loading,
    value,
    onChange,
}) {
    useEffect(() => {
        fetchSiteCountriesSelector();
    }, []);

    return (
        <Select
            value={value}
            onChange={onChange}
            loading={loading}
            showSearch
            placeholder="Select a country"
            optionFilterProp="name"
            filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
            }
        >
            {data.map((element) => (
                <Select.Option key={element.id} value={element.id}>
                    {element.value}
                </Select.Option>
            ))}
        </Select>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSiteCountriesSelector: (filters) =>
            dispatch(fetchSiteCountriesSelector(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.siteCountry.selector,
        loading: state.siteCountry.loading,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CountryRemoteSelectContainer);
