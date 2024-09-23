import React, { FC } from 'react';
import { io } from 'socket.io-client';

const GroupChatView: FC = () => {
	const socket = io('http://localhost:3001');

	return (
		<React.Fragment>
			<div className='container'>
				<div className='w-100 border border-3 rounded-2 border-dark mx-auto col-md-6 mt-3'>Hello</div>
			</div>
		</React.Fragment>
	);
};

export default GroupChatView;
