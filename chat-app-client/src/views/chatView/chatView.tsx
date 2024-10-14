import React, { FC, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ChatHeader from './components/chatHeader';
import ChatMessages from './components/chatMessages';
import ChatInput from './components/chatInput';
import styles from './chatView.module.css';

const ChatView: FC = () => {
	const [messages, setMessages] = useState<IMessageModel[]>([]);
	const socket = io('http://localhost:3001');
	useEffect(() => {
		debugger;
		socket.on('message', (message: string) => {
			setMessages((prev) => [...prev, { message, key: crypto.randomUUID() }]);
		});
	}, []);

	const submitMessage = (message: string): void => {
		socket.emit('send-message', message);
	};

	return (
		<React.Fragment>
			<div className={styles.chatContainer}>
				{/* header */}
				<ChatHeader />
				{/* messages */}
				<ChatMessages messages={messages} />
				{/* text input */}
				<ChatInput submitMessage={submitMessage} />
			</div>
		</React.Fragment>
	);
};

export interface IMessageModel {
	message: string;
	key: string;
}

export default ChatView;
