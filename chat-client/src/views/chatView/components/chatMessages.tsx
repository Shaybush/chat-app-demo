import { FC } from 'react';
import { messageProps } from '../chatView';

interface chatMessagesPropsModel {
	messages: messageProps[];
}

const ChatMessages: FC<chatMessagesPropsModel> = ({ messages }) => {
	if (!messages.length) return <div>Chat empty</div>;
	return (
		<div className='chatMessages overflow-y-auto bg-gray-100 flex flex-col max-w-full'>
			{messages.map((message) => (
				<div className='text-balance' key={message.key}>
					{message.message}
				</div>
			))}
		</div>
	);
};

export default ChatMessages;
