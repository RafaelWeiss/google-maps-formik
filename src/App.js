import React, { useState } from 'react';
import { Formik } from 'formik';
import GoogleMap from 'google-map-react';
import { Form, FormGroup, Row, Col, Label, Input, Button, Alert, Jumbotron } from 'reactstrap';
import './App.css';

const App = () => {
    const LATITUDE_DEFAULT = -27.5986393;
    const LONGITUDE_DEFAULT = -48.5187229;

    const [currentPosition, setCurrentPosition] = useState(null);

    const onMarkerDragEnd = (event, setFieldValue) => {
        setFieldValue('latitude', event.latLng.lat());
        setFieldValue('longitude', event.latLng.lng());
    };

    const handleFormSubmit = (formikValues) => {
        setCurrentPosition(formikValues);
    };

    const renderMarkers = (map, maps, latitude, longitude, setFieldValue) => {
        const marker = new maps.Marker({
            position: { lat: latitude, lng: longitude },
            draggable: true,
            map,
            title: 'GoogleMapsFormik'
        });
        marker.addListener('dragend', (event) => onMarkerDragEnd(event, setFieldValue));
    };

    return (
        <div className="App">
            <Formik
                initialValues={{ latitude: null, longitude: null }}
                onSubmit={(values) => {
                    handleFormSubmit(values);
                }}>
                {(props) => {
                    const { values, handleSubmit, setFieldValue } = props;

                    return (
                        <React.Fragment>
                            <Row>
                                <Col md={5}>
                                    <Jumbotron>
                                        <h1 className="display-1">GoogleMaps And Formik!</h1>
                                        <p className="lead">Select a position on the map and submit the formik form</p>
                                    </Jumbotron>
                                    <Form onSubmit={handleSubmit} inline>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Label for="latitude" className="mr-sm-2">
                                                Latitude:
                                            </Label>
                                            <Input type="text" name="latitude" id="latitude" value={values.latitude} disabled />
                                        </FormGroup>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Label for="logitude" className="mr-sm-2">
                                                Longitude:
                                            </Label>
                                            <Input type="text" name="logitude" id="logitude" value={values.longitude} disabled />
                                        </FormGroup>
                                        <Button type="submit" color="primary">
                                            Save
                                        </Button>
                                    </Form>
                                    <br />
                                    {currentPosition && currentPosition.latitude ? (
                                        <Alert color="success">
                                            Your current position is : [{currentPosition.latitude}, {currentPosition.longitude}]
                                        </Alert>
                                    ) : (
                                        <Alert color="warning">Selecione uma posição no mapa!</Alert>
                                    )}
                                </Col>
                                <Col md={7}>
                                    <FormGroup>
                                        <GoogleMap
                                            bootstrapURLKeys={{
                                                key: 'INSERT YOU GOOGLE MAPS KEY',
                                                libraries: ['places', 'geometry']
                                            }}
                                            yesIWantToUseGoogleMapApiInternals
                                            center={[
                                                values.latitude ? values.latitude : LATITUDE_DEFAULT,
                                                values.longitude ? values.longitude : LONGITUDE_DEFAULT
                                            ]}
                                            defaultZoom={11}
                                            options={{ scrollwheel: true, streetViewControl: true }}
                                            style={{
                                                position: 'relative',
                                                width: '100%',
                                                height: 800
                                            }}
                                            onGoogleApiLoaded={({ map, maps }) =>
                                                renderMarkers(map, maps, LATITUDE_DEFAULT, LONGITUDE_DEFAULT, setFieldValue)
                                            }
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </React.Fragment>
                    );
                }}
            </Formik>
        </div>
    );
};

export default App;
