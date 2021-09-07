import React, { useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


const createData = (date, maxTemp, minTemp, img, hourly) => {
	return {
		date,
		maxTemp,
		minTemp,
		img,
		hourly
	}	
}

const createRows = (forecast) => {
	var rows = []
	for (let day of forecast) {
		rows.push(createData(day.date, day.day.maxtemp_f, day.day.mintemp_f, day.day.condition.icon, day.hour))
	}
	return rows
}

const formatDate = (date) => {
	return moment(date).format("dddd")
}

const Row = (props) => {

	const { row } = props
	const [open, setOpen] = useState(false)

	return (
		<React.Fragment>
			<TableRow>
				<StyledTableCell align="left">
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <StyledKeyboardArrowUpIcon /> : <StyledKeyboardArrowDownIcon />}
          </IconButton>
				</StyledTableCell>
				<StyledTableCell align="left"> {formatDate(row.date)} </StyledTableCell>
				<StyledTableCell align="left"> <Image src={row.img} /> </StyledTableCell>
				<StyledTableCell align="center"> {Math.round(row.maxTemp)}&deg; </StyledTableCell>
				<StyledTableCell align="center"> {Math.round(row.minTemp)}&deg; </StyledTableCell>
			</TableRow>
			<TableRow>
				<TableCell colSpan={5} style={{borderBottom:"none"}}>
					<Collapse in={open} timeout="auto" unmontOnExit>
						<Title>
							<Typography variant='h6' gutterBottom component="div">Hourly Forecast</Typography>
						</Title>
						<TableContainer>
							<Table size="small">
								<TableHead>
									<TableRow>
										<StyledTableCellHeader>12AM</StyledTableCellHeader>
										<StyledTableCellHeader>1AM</StyledTableCellHeader>
										<StyledTableCellHeader>2AM</StyledTableCellHeader>
										<StyledTableCellHeader>3AM</StyledTableCellHeader>
										<StyledTableCellHeader>4AM</StyledTableCellHeader>
										<StyledTableCellHeader>5AM</StyledTableCellHeader>
										<StyledTableCellHeader>6AM</StyledTableCellHeader>
										<StyledTableCellHeader>7AM</StyledTableCellHeader>
										<StyledTableCellHeader>8AM</StyledTableCellHeader>
										<StyledTableCellHeader>9AM</StyledTableCellHeader>
										<StyledTableCellHeader>10AM</StyledTableCellHeader>
										<StyledTableCellHeader>11AM</StyledTableCellHeader>
										<StyledTableCellHeader>12PM</StyledTableCellHeader>
										<StyledTableCellHeader>1PM</StyledTableCellHeader>
										<StyledTableCellHeader>2PM</StyledTableCellHeader>
										<StyledTableCellHeader>3PM</StyledTableCellHeader>
										<StyledTableCellHeader>4PM</StyledTableCellHeader>
										<StyledTableCellHeader>5PM</StyledTableCellHeader>
										<StyledTableCellHeader>6PM</StyledTableCellHeader>
										<StyledTableCellHeader>7PM</StyledTableCellHeader>
										<StyledTableCellHeader>8PM</StyledTableCellHeader>
										<StyledTableCellHeader>9PM</StyledTableCellHeader>
										<StyledTableCellHeader>10PM</StyledTableCellHeader>
										<StyledTableCellHeader>11PM</StyledTableCellHeader>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.hourly.map((hour) => (
											<TableCell key={hour.condition.time} compnent="th" scope="row" style={{borderBottom:"none"}} >
												{<Image src={hour.condition.icon} />}
											</TableCell>
									))}
								</TableBody>
						</Table>
						</TableContainer>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	)
}

const Forecast = (props) => {

	const { forecast } = props
	
	const rows = createRows(forecast)

	return (
		<Container>
			<CardContent>
				<Header>
					<Typography variant='h6'>3-Day Forecast</Typography>
				</Header>
				<TableContainer>
					<Table size="small">
						<TableHead>
							<TableRow>
								<StyledTableCellHeader align="left"></StyledTableCellHeader>
								<StyledTableCellHeader align="left">Day</StyledTableCellHeader>
								<StyledTableCellHeader align="left"></StyledTableCellHeader>
								<StyledTableCellHeader align="center">High</StyledTableCellHeader>
								<StyledTableCellHeader align="center">Low</StyledTableCellHeader>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<Row key={row.date} row={row} />
							))}
						</TableBody>
					</Table>
					</TableContainer>
			</CardContent>
		</Container>
	)
}

const Container = styled(Card)`
	&& {
		padding-left: 12px;
		padding-right: 12px;
		margin-top: 36px;
		margin-left: 10%;
		margin-right: 10%;
		border-radius: 20px;
		margin-bottom: 20px;
		color: #BCCCDC;
		background-color: #243B53;
	}
`

const StyledTableCell = styled(TableCell)`
	&& {
		color: #BCCCDC;
	}
`

const StyledTableCellHeader = styled(TableCell)`
	&& {
		border-bottom: none;
		font-weight: 700;
		color: #BCCCDC;
	}
`

const Image = styled.img`
	width: 28px;
`

const Header = styled.div`
	display: flex;
	justify-content: space-between;
`

const Title = styled.div`
	&& {
		color: #BCCCDC;
	}
`

const StyledKeyboardArrowDownIcon = styled(KeyboardArrowDownIcon)`
	&& {
		color: #BCCCDC;
	}
`

const StyledKeyboardArrowUpIcon = styled(KeyboardArrowUpIcon)`
	&& {
		color: #BCCCDC;
	}
`

export default Forecast