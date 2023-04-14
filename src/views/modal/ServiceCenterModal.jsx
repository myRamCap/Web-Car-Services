import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Autocomplete, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import Province from '../../data/JSON/refProvince.json'
import City from '../../data/JSON/refCityMun.json'
import Barangay from '../../data/JSON/refBrgy.json'


export default function ServiceCenterModal(props) {
  const [country, setCountry] = useState('Philippines')
  const [municipality, setMunicipality] = useState([])
  const [brgy, setBrgy] = useState([])
  const [valCityMun, setValCityMun] = useState(null);
  const [valBrgy, setValBrgy] = useState(null);

  const handleChangeProvince = (event, newValue) => {
    const filterCity = City.RECORDS.filter((data) => data.provCode === newValue.provCode)
    setMunicipality(filterCity)
    setValCityMun(null);
    setValBrgy(null);
  }

  const handleChangeMunicipality = (event, newValue) => {
    setValCityMun(newValue);
    const filterBrgy = Barangay.RECORDS.filter((data) => data.citymunCode === newValue.citymunCode)
    setBrgy(filterBrgy) 
    setValBrgy(null);
  }

  const handleChangeBrgy = (event, newValue) => {
    setValBrgy(newValue)
  }
 
  const optionsProvince = Province.RECORDS.map((option) => {
    const firstLetter = option.provDesc[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const optionsCityMun = municipality.map((option) => {
    const firstLetter = option.citymunDesc[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const optionsBarangay = brgy.map((option) => {
    const firstLetter = option.brgyDesc[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const onSubmit = (ev) => {
    alert('randy')
    ev.preventDefault()
    // setValBrgy(null);
    // setValCityMun(null);
   
  }

  useEffect(() => {
    if (props.show == false) {
      setValBrgy(null);
      setValCityMun(null);
    }
  })

 
 
 

  return (
    <div id="servicesModal">
        <Modal show={props.show} onHide={props.close} backdrop="static" size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Service Center</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-main">
            <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    name="position"
                    defaultValue="top">
                    <FormControlLabel value="delearship" control={<Radio />} label="DEALERSHIP"/>
                    <FormControlLabel value="nondelearship" control={<Radio />} label="NON-DEALERSHIP"/>
                  </RadioGroup>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <TextField type="text" id="name" label="Name" variant="outlined" fullWidth/>
                </Col>

                <Col xs={12} md={6}> 
                  <TextField type="text" id="country" label="Country" variant="outlined" value={country} disabled fullWidth/>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <TextField type="text" id="street" label="House Number / Street" variant="outlined" fullWidth/>
                </Col>

                <Col xs={12} md={6}> 
                  <Autocomplete
                    id="Province"
                    disableClearable
                    options={optionsProvince.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    onChange={handleChangeProvince}
                    getOptionLabel={(options) => options.provDesc }  
                    isOptionEqualToValue={(option, value) => option.provDesc === value.provDesc}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Province"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                        />
                    )}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <Autocomplete
                    id="free-solo-2-demo"
                    disableClearable
                    onChange={handleChangeMunicipality}
                    options={optionsCityMun.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    value={valCityMun ? valCityMun : null}
                    getOptionLabel={(options) => (options ? options.citymunDesc : null) }  
                    isOptionEqualToValue={(option, value) => option.citymunDesc === value.citymunDesc}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Municipality"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                      />
                    )}
                  />
                </Col>

                <Col xs={12} md={6}> 
                  <Autocomplete
                    id="free-solo-2-demo"
                    disableClearable
                    onChange={handleChangeBrgy}
                    options={optionsBarangay.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    value={valBrgy}
                    getOptionLabel={(options) => options.brgyDesc}
                    isOptionEqualToValue={(option, value) => option.brgyDesc === value.brgyDesc}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Barangay"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                      />
                    )}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <TextField type="text" id="longitude" label="Longitude" variant="outlined" fullWidth/>
                </Col>
                <Col xs={12} md={6}> 
                  <TextField type="text" id="latitude" label="Latitude" variant="outlined" fullWidth/>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <TextField type="text" id="branchManager" label="Branch Manager" variant="outlined" fullWidth/>
                </Col>
                <Col xs={12} md={6}> 
                    {/* <Input type="file" id="image" /> */}
                    <input accept=".jpg, .jpeg, .png" className="fileUpload" name="arquivo" id="arquivo" type="file" />

                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row >
                <Col xs={12} md={12}>
                  <Button variant="success"  type="submit">Save Changes</Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
            </Modal.Body>
        </Modal>
    </div>
  )
}
