import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoaderSpinnerCircle from './shared/components/loaderSpinnerCircle';

const AppRoutes = () => {
	const GroupChatView = React.lazy(() => import('./views/groupChatView'));

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
					<Route path='/' element={<GroupChatView />} />
				</Routes>
			</Router>
		</Suspense>
	);
};

export default AppRoutes;
