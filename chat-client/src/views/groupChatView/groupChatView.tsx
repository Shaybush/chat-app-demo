import React, { FC, useEffect } from 'react';
import { io } from 'socket.io-client';

const GroupChatView: FC = () => {
	const socket = io('http://localhost:3001');

	useEffect(() => {
		socket.on('nodeEvent', (e) => console.log(e));
	}, []);

	return (
		<React.Fragment>
			<div className='container'>
				<div className='w-100 border border-3 rounded-2 border-dark mx-auto col-md-6 mt-3'>
					<button
						onClick={() => {
							socket.emit('clientEvent', 'hello world');
						}}
					>
						Click me
					</button>
				</div>
			</div>
		</React.Fragment>
	);
};

export default GroupChatView;
