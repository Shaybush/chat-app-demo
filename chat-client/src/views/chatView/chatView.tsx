import React, { FC, useEffect } from 'react';
import { io } from 'socket.io-client';
import ChatHeader from './components/chatHeader';
import ChatMessages from './components/chatMessages';
import ChatInput from './components/chatInput';
import styles from './chatView.module.css';

const ChatView: FC = () => {
	const socket = io('http://localhost:3001');

	useEffect(() => {
		socket.on('message', (e: string) => console.log(e));
	}, []);
	// socket.emit('send-message', 'hello world');
	return (
		<React.Fragment>
			<div className={styles.chatContainer}>
				{/* header - 10vh */}
				<ChatHeader />
				{/* messages - 80vh */}
				<ChatMessages />
				{/* text input - 10vh */}
				<ChatInput />
			</div>
		</React.Fragment>
	);
};

export default ChatView;
