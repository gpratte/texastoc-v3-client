import React from 'react'
import './GamePlayers.css'
import leagueStore from '../../league/leagueStore'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SeatingPlayerAtTable from './SeatingPlayerAtTable'
import SeatingSeatsPerTable from './SeatingSeatsPerTable'
import {TOGGLE_CONFIGURE_SEATING} from '../gameActions'
import {seating} from "../gameClient";
import _ from 'lodash';

const fiveTables = [1, 2, 3, 4, 5]

class SeatingConfig extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gamePlayers: props.game.data.gamePlayers,
      seating: Object.assign({}, props.game.data.seating,
        {numSeatsPerTable: props.game.data.seating.numSeatsPerTable ? [...props.game.data.seating.numSeatsPerTable] : [10]},
        {tableRequests: props.game.data.seating.tableRequests ? [...props.game.data.seating.tableRequests] : []})
    };

    this.handleChangeSeatsPerTables = this.handleChangeSeatsPerTables.bind(this);
    this.handleAddAnotherRequest = this.handleAddAnotherRequest.bind(this);
    this.handlePlayerRequesting = this.handlePlayerRequesting.bind(this);
    this.handleTableRequesting = this.handleTableRequesting.bind(this);
  }


  renderNumberOfTables() {
    return fiveTables.map((num) => {
      return (
        <option key={num} value={num}>{num}</option>
      )
    })
  }

  handleChangeNumTables(e) {
    const newNumSeatsPerTable = [...this.state.seating.numSeatsPerTable];
    const newNumTables = parseInt('' + e.target.value);
    let delta = newNumTables - this.state.seating.numSeatsPerTable.length;
    let deltaPositive = true;
    if (delta < 0) {
      deltaPositive = false;
      delta = Math.abs(delta);
    }
    for (let i = 0; i < delta; ++i) {
      if (deltaPositive) {
        newNumSeatsPerTable.push(10);
      } else {
        newNumSeatsPerTable.pop();
      }
    }
    const newSeating = (Object.assign({}, this.state.seating,
      {numSeatsPerTable: newNumSeatsPerTable}))
    this.setState({seating: newSeating})
  }

  handleChangeSeatsPerTables(e, tableNum) {
    const numSeats = parseInt('' + e.target.value);
    const newNumSeatsPerTable = [...this.state.seating.numSeatsPerTable];
    newNumSeatsPerTable[tableNum] = numSeats;
    const newSeating = (Object.assign({}, this.state.seating,
      {numSeatsPerTable: newNumSeatsPerTable}))
    this.setState({seating: newSeating})
  }

  handleAddAnotherRequest() {
    const tableRequests = [...this.state.seating.tableRequests];
    tableRequests.push({gamePlayerId: null, tableNum: 1});
    const newSeating = (Object.assign({}, this.state.seating,
      {tableRequests: tableRequests}))
    this.setState({seating: newSeating})
  }

  handlePlayerRequesting(e, requestNum) {
    const tableRequests = [...this.state.seating.tableRequests];
    tableRequests[requestNum].gamePlayerId = parseInt('' + e.target.value);
    const newSeating = (Object.assign({}, this.state.seating,
      {tableRequests: tableRequests}))
    this.setState({seating: newSeating})
  }

  handleTableRequesting(e, requestNum) {
    const tableRequests = [...this.state.seating.tableRequests];
    tableRequests[requestNum].tableNum = parseInt('' + e.target.value);
    const newSeating = (Object.assign({}, this.state.seating,
      {tableRequests: tableRequests}))
    this.setState({seating: newSeating})
  }

  requestSeating = (e) => {
    e.preventDefault();
    let tableRequests = []
    _.forEach(this.state.seating.tableRequests, function(tableRequest) {
      if (tableRequest.gamePlayerId) {
        tableRequests.push(tableRequest);
      }
    })

    seating(this.state.seating.numSeatsPerTable, tableRequests);
    leagueStore.dispatch({type: TOGGLE_CONFIGURE_SEATING, show: false})
  }

  render() {
    const game = this.props.game;
    return (
      <div>
        <Modal show={game.showConfigureSeating}
               backdrop={'static'}
               onHide={() => leagueStore.dispatch({type: TOGGLE_CONFIGURE_SEATING, show: false})}>
          <Modal.Body>
            <Form onSubmit={this.requestSeating}>
              <Form.Group as={Row} className="align-items-center">
                <Form.Label>&nbsp;&nbsp;Number of Tables</Form.Label>
                <Col>
                  <Form.Control as="select"
                                defaultValue={this.state.seating.numSeatsPerTable.length}
                                id="tablesId"
                                onChange={(e) => this.handleChangeNumTables(e)}>
                    {this.renderNumberOfTables()}
                  </Form.Control>
                </Col>
              </Form.Group>

              <SeatingSeatsPerTable seating={this.state.seating}
                                    handleChangeSeatsPerTables={this.handleChangeSeatsPerTables}/>

              <SeatingPlayerAtTable gamePlayers={game.data.players}
                                    seating={this.state.seating}
                                    handleAddAnotherRequest={this.handleAddAnotherRequest}
                                    handlePlayerRequesting={this.handlePlayerRequesting}
                                    handleTableRequesting={this.handleTableRequesting}/>

              <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                  leagueStore.dispatch({type: TOGGLE_CONFIGURE_SEATING, show: false})
                }}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Seat The Players
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default SeatingConfig
