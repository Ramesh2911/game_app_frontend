import React from 'react';

//element
import { SVGICON } from '../../constant/theme';
import CardWidget from './Element/CardWidget';


//Import Components
const cardBlog = [
	// { svg: SVGICON.calander, number: '76', subtitle: 'Appointment', progress: '50%' },
	{ svg: SVGICON.heart, number: '124,551', subtitle: 'Total Users', progress: '80%' },
	{ svg: SVGICON.stetho, number: '442', subtitle: 'Total Game', progress: '38%' },
	{ svg: SVGICON.money, number: '$5,034', subtitle: 'Total Earning', progress: '70%' },
];

const Home = (props) => {

	return (
		<>
			<div className="form-head d-flex align-items-center mb-sm-4 mb-3">
				<div className="me-auto">
					<h2 className="text-black font-w600">Dashboard</h2>
				</div>
			</div>
			<div className="row">
				{cardBlog.map((item, index) => (
					<div className="col-xl-3 col-sm-6" key={index}>
						<CardWidget number={item.number} subtitle={item.subtitle} svg={item.svg} progress={item.progress} />
					</div>
				))}
			</div>
		</>
	);
};
export default Home;