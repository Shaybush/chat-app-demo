import { FC } from 'react';
import { IMessageModel } from '../chatView';

interface chatMessagesPropsModel {
	messages: IMessageModel[];
}

const ChatMessages: FC<chatMessagesPropsModel> = ({ messages }) => {
	return (
		<div className='overflow-y-auto bg-gray-100'>
			{messages.map((message) => (
				<p key={message.key}>{message.message}</p>
			))}
		</div>
	);
};

export default ChatMessages;
