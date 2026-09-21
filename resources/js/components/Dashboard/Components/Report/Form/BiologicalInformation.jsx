import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { Form, Row, Col, Input, Divider, Popover } from 'antd'
import TaxaLevelRemoteSelectContainer from '../../Ecosystem/Level/TaxaLevelRemoteSelectContainer';
import TaxaSpeciesStatusRemoteSelectContainer from '../../Ecosystem/SpeciesStatus/TaxaSpeciesStatusRemoteSelectContainer';
import TaxaPopulationStatusRemoteSelectContainer from '../../Ecosystem/PopulationStatus/TaxaPopulationStatusRemoteSelectContainer';
import TaxaAbundanceRemoteSelectContainer from '../../Ecosystem/Abundance/TaxaAbundanceRemoteSelectContainer';
import TaxaViabilityRemoteSelectContainer from '../../Ecosystem/Viability/TaxaViabilityRemoteSelectContainer';
import TaxaMaturityRemoteSelectContainer from '../../Ecosystem/Maturity/TaxaMaturityRemoteSelectContainer';
import TaxaNativeRegionRemoteSelectContainer from '../../Ecosystem/NativeRegion/TaxaNativeRegionRemoteSelectContainer';
import debounce from 'lodash/debounce';
import CustomTooltip from './CustomTooltip';
import Search from 'antd/es/transfer/search';

const requiredRule = { required: true };

const Delete = styled.img`
    cursor: pointer;
    width: 20px;
    transition: all .3s ease;

    &:hover {
        filter: brightness(.2);
    }
`;

const WormsOption = styled.p`
    cursor: pointer;
    padding: 5px;
    box-sizing: border-box;
    transition: background-color .3s ease;

    &:hover {
        background-color: rgba(0,0,0,.1);
    }
`;

const Subtitle = styled.h2`
    flex: 1;
`;



function BiologicalInformation({ name, handleDelete, length, form }) {
    const [speciesName, setSpeciesName] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [wormsContent, setWormsContent] = useState([])

    useEffect(() => {
        if (speciesName) {
            handleSearch();
        }

    }, [speciesName])

    const handleWormsApi = async (info) => {
        var url = "https://www.marinespecies.org/rest";

        const sources = await (await fetch(
            `${url}/AphiaSourcesByAphiaID/${info?.AphiaID}`
        )).json();

        var ref = undefined;
        sources.map((source) => {
            if (source.use == "basis of record") {
                ref = source.reference;
            }
        })
        console.log("taxas[" + name + "].identification");
        // form.setFieldsValue("taxas[" + name + "].identification", info.scientificname);
        updateFields({ authority: info.valid_authority, identification: info.scientificname, reference: info.reference, reference: ref })
        setWormsContent([])
    }


    const handleSearch = async () => {
        var url = "https://www.marinespecies.org/rest";

        const aphias = await (await fetch(
            `${url}/AphiaRecordsByName/${speciesName}`
        )).json();

        if (aphias) {
            if (aphias.length) {
                setWormsContent(aphias.slice(0, 5))
            }

        }
        setLoading(false);
    }

    const updateFields = (values) => {
        const taxas = form.getFieldValue('taxas')

        const updatedTaxas = taxas.map((taxa, key) => {
            if (key == name) {
                return {
                    ...taxa,
                    ...values
                }
            }
            return taxa;
        })
        form.setFieldsValue({ taxas: updatedTaxas })
    }

    const handleIdentificationChange = (e) => {
        setLoading(true);
        setSpeciesName(e);
    }

    const content = (
        <div>
            {wormsContent.map((element) => (
                <WormsOption key={element.AphiaID} onClick={() => handleWormsApi(element)}>
                    {element.rank}, {element.scientificname} ({element.valid_authority})
                </WormsOption>
            ))}
        </div>
    );

    return (
        <>
            <Row type="flex" style={{ marginBottom: "20px" }}>
                <Subtitle>Biological identification & samples information</Subtitle>
                {length > 1 && <Delete onClick={handleDelete} src="/images/icons/delete.svg" alt="delete" />}


            </Row>

            <Row type="flex" align='bottom' gutter={32}>
                <Col xs={24} md={8}>
                    <Form.Item label="Highest taxonomic level*" name={[name, 'level']} rules={[{ ...requiredRule, message: "'taxonomic level' is required" }]}>
                        <TaxaLevelRemoteSelectContainer />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Popover visible={wormsContent.length} content={content} title="Would you like to use existing information for any of the following species?">
                        <Form.Item label="Scientific name*" name={[name, 'identification']} rules={[{ ...requiredRule, message: "'scientific name' is required" }]}>
                            <Input.Search loading={loading} enterButton onSearch={handleIdentificationChange} placeholder='Identification based on the highest taxonomic level' />
                        </Form.Item>
                    </Popover>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="Authority" name={[name, 'authority']} rules={[{ required: false }]}>
                        <Input placeholder="Authority" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="Species Status" name={[name, 'species_status']}>
                        <TaxaSpeciesStatusRemoteSelectContainer />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="Year of the first record (if NIS or cryptogenic)" name={[name, 'year_first_report']} rules={[{ required: false }]}>
                        <Input placeholder="Year of the first record (if NIS or cryptogenic)" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="Reference" name={[name, 'reference']}>
                        <Input placeholder="Reference" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="Population Status" name={[name, 'population_status']}>
                        <TaxaPopulationStatusRemoteSelectContainer />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label={(
                        <>
                            <span>Abundance</span>
                            <CustomTooltip text="Categories of species abundance ranges to characterize the presence" />

                        </>)} name={[name, 'abundance']}>
                        <TaxaAbundanceRemoteSelectContainer />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="Viability*" name={[name, 'viability']} rules={[{ ...requiredRule, message: "'viability' is required" }]}>
                        <TaxaViabilityRemoteSelectContainer />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="Maturity stage*" name={[name, 'maturity']} rules={[{ ...requiredRule, message: "'maturity stages' are required" }]}>
                        <TaxaMaturityRemoteSelectContainer />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="Native region" name={[name, 'native_region']}>
                        <TaxaNativeRegionRemoteSelectContainer />
                    </Form.Item>
                </Col>

                <Col xs={12} md={12}>
                    <Form.Item label={(
                        <>
                            <span>AS-ISK score</span>
                            <CustomTooltip text="Aquatic Species Invasiveness Screening Kit score." />

                        </>)} name={[name, 'asisk_score']} rules={[{ required: false }]}>
                        <Input placeholder="Aquatic Species Invasiveness Screening Kit" />
                    </Form.Item>
                </Col>

                <Col xs={12} md={12}>
                    <Form.Item label={(
                        <>
                            <span>AS-ISK result</span>
                            <CustomTooltip text="Aquatic Species Invasiveness Screening Kit result" />

                        </>)} name={[name, 'asisk_result']} rules={[{ required: false }]}>
                        <Input placeholder="Aquatic Species Invasiveness Screening Kit" />
                    </Form.Item>
                </Col>
            </Row>
            <Divider />
        </>
    )
}

export default BiologicalInformation