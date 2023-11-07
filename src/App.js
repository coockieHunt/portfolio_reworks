import React, { useState } from 'react';

// Import
import GlobalStyle, { Content, LoadingContainer } from './styles/global.style.jsx';
import { COLOR } from './config';
import HashLoader from "react-spinners/HashLoader";
import { Routes, Route, BrowserRouter} from "react-router-dom";


// Container
import { NavigationComponent } from './containers/Navigation/navigations.container';
import { FooterContainer } from './containers/Footer/footer.container';
import { AdminPanelContainer } from "./containers/AdminPanel/AdminPanel.container";

// Pages
import { HomePage } from './Pages/public/Home.page.jsx'
import { AdminLoginPage } from './Pages/admin/login.page.jsx';
import { PanelPage } from './Pages/admin/panel.page.jsx';
import { LogoutPage } from './Pages/admin/logout.page.jsx'

import { ProtectedRoute } from './Pages/admin/protectedRoute.jsx';

// Hook
import { ScroolToTop } from './components/Buttton/Button.component';

// Provider
import { AlertProvider } from './context/alert.context.jsx';
import { AuthProvider } from './context/auth.context.jsx';
import styled from 'styled-components';

//Navabar
const navigation = [
	['A propos', "catch"],
	['Competences', "benefit"],
	['Projets', "project"],
	['Contact', "contact"],
];

function App() {
	const [isLoading, setIsLoading] = useState(false);

	const Loader = () => {
		return (
			<LoadingContainer>
				<span>Chargement</span>
				<HashLoader
					color={COLOR.primary}
					loading={isLoading}
					size={"12em"}
					aria-label="Loading Spinner"
					data-testid="loader"
					className="loader"
				/>
			</LoadingContainer>
		);
	};

	const Container = styled.div`
		padding: 20px;
	`

	return (
		<BrowserRouter>
			{isLoading ? (
				<Loader />
			) : (
				<Content>
					<GlobalStyle />
					<AlertProvider>
						<Routes>
							<Route path="/" element={ //Main page client
								<>
									<NavigationComponent navConfig={navigation} />
									<HomePage />
								</>

							} />
							<Route path="/admin/*" element={ //admin panel main route
								<AuthProvider>
									<AdminPanelContainer>
										<Container>
											<Routes>
													<Route index element={
														<ProtectedRoute element={<PanelPage/>}/>
													} />
													<Route path="logout" element={
														<ProtectedRoute element={<LogoutPage/>}/>
													} />
													
													<Route path="login" element={<AdminLoginPage />} />
											</Routes>
										</Container>
									</AdminPanelContainer>
									
								</AuthProvider>
							} />
							<Route path="*" element={<span>404</span>} />
						</Routes>
						<FooterContainer />
					</AlertProvider>
					<ScroolToTop hide_position={400} />
				</Content>
			)}
		</BrowserRouter>
	);
}

export default App;
