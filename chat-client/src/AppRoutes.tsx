import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoaderSpinnerCircle from './shared/components/loaderSpinnerCircle';

const AppRoutes = () => {
	const ChatView = React.lazy(() => import('./views/chatView'));

	return (
		<Suspense
			fallback={
				<div className='w-100 h-screen flex items-center justify-center'>
					<LoaderSpinnerCircle />
				</div>
			}
		>
			<Router>
				<Routes>
					<Route path='/' element={<ChatView />} />
				</Routes>
			</Router>
		</Suspense>
	);
};

export default AppRoutes;
