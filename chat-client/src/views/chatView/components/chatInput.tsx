import { FC } from 'react';

interface chatInputPropsModel {}

const ChatInput: FC<chatInputPropsModel> = ({}) => {
	return (
		<div className='chat-input p-2'>
			<div>
				<div className='flex rounded-md shadow-sm'>
					<input
						id='email'
						name='email'
						type='email'
						className='block w-full rounded-none rounded-l-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
					/>
					<button
						type='button'
						className='relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChatInput;
