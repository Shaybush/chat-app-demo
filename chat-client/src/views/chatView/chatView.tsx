import React, { FC, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ChatHeader from './components/chatHeader';
import ChatMessages from './components/chatMessages';
import ChatInput from './components/chatInput';
import styles from './chatView.module.css';

const ChatView: FC = () => {
	const [messages, setMessages] = useState<messageProps[]>([]);
	const socket = io('http://localhost:3001');

	useEffect(() => {
		socket.on('message', (message: string): void => {
			setMessages((prev) => {
				return [...prev, { message, key: crypto.randomUUID() }];
			});
		});
	}, []);

	const submitMessage = (message: string): void => {
		console.log(message);
		socket.emit('send-message', message);
	};

	return (
		<React.Fragment>
			<div className={styles.chatContainer}>
				{/* header - 10vh */}
				<ChatHeader />
				{/* messages - 80vh */}
				<ChatMessages messages={messages} />
				{/* text input - 10vh */}
				<ChatInput submitMessage={submitMessage} />
			</div>
		</React.Fragment>
	);
};

export interface messageProps {
	message: string;
	key: string;
}

export default ChatView;
