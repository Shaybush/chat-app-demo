import { FC, useRef } from 'react';

interface chatInputPropsModel<in T> {
	submitMessage: (msg: T) => void;
}

const ChatInput: FC<chatInputPropsModel<string>> = ({ submitMessage }) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	return (
		<div className='chat-input'>
			<hr className='pb-2' />
			<div>
				<div className='flex rounded-md shadow-sm px-2'>
					<input
						id='chat-input'
						ref={inputRef}
						type='text'
						className='block w-full rounded-none rounded-l-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
					/>
					<button
						onClick={() => submitMessage(inputRef.current?.value || '')}
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
