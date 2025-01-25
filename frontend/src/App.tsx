import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import theme from './theme';

// Pages
import SignIn from './pages/auth/SignIn';
import Dashboard from './pages/admin/Dashboard';
import DataTables from './pages/admin/DataTables';
import Profile from './pages/admin/Profile';
import UserTypeList from './pages/UserTypeList.js';
import UserTypeForm from './pages/UserTypeForm.js';
import YearMaster from './pages/admin/YearMaster.js';
import BeneficiaryType from './pages/admin/BeneficiaryType.js';
import District from './pages/admin/District.js';
import Category from './pages/admin/Category.js';
import Supplier from './pages/admin/Supplier.js';
import SupplierPayment from './pages/admin/SupplierPayment.js';
import ArticleOrder from './pages/admin/ArticleOrder.js';

// Components
import Layout from './components/layout/Layout';

function PrivateRouteWrapper({ children, path }: { children: React.ReactNode, path: string }) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/auth/sign-in" />;
    }

    return <Layout>{children}</Layout>;
}

function App() {
    return (
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/auth/sign-in" element={<SignIn />} />
                        <Route path="/login" element={<SignIn />} />
                        
                        <Route
                            path="/admin/default"
                            element={
                                <PrivateRouteWrapper path="/admin/default">
                                    <Dashboard />
                                </PrivateRouteWrapper>
                            }
                        />
                        
                        <Route
                            path="/admin/data-tables"
                            element={
                                <PrivateRouteWrapper path="/admin/data-tables">
                                    <DataTables />
                                </PrivateRouteWrapper>
                            }
                        />
                        
                        <Route
                            path="/admin/profile"
                            element={
                                <PrivateRouteWrapper path="/admin/profile">
                                    <Profile />
                                </PrivateRouteWrapper>
                            }
                        />
                        
                        <Route
                            path="/admin/user-types"
                            element={
                                <PrivateRouteWrapper path="/admin/user-types">
                                    <UserTypeList />
                                </PrivateRouteWrapper>
                            }
                        />
                        <Route
                            path="/admin/user-types/create"
                            element={
                                <PrivateRouteWrapper path="/admin/user-types/create">
                                    <UserTypeForm />
                                </PrivateRouteWrapper>
                            }
                        />
                        
                        <Route
                            path="/admin/master-pages"
                            element={
                                <PrivateRouteWrapper path="/admin/master-pages">
                                    <Dashboard />
                                </PrivateRouteWrapper>
                            }
                        />
                        <Route path="/admin/year-master" element={<PrivateRouteWrapper path="/admin/year-master"><YearMaster /></PrivateRouteWrapper>} />
                        <Route path="/admin/beneficiary-type" element={<PrivateRouteWrapper path="/admin/beneficiary-type"><BeneficiaryType /></PrivateRouteWrapper>} />
                        <Route path="/admin/district" element={<PrivateRouteWrapper path="/admin/district"><District /></PrivateRouteWrapper>} />
                        <Route path="/admin/category" element={<PrivateRouteWrapper path="/admin/category"><Category /></PrivateRouteWrapper>} />
                        <Route path="/admin/supplier" element={<PrivateRouteWrapper path="/admin/supplier"><Supplier /></PrivateRouteWrapper>} />
                        <Route path="/admin/supplier-payment" element={<PrivateRouteWrapper path="/admin/supplier-payment"><SupplierPayment /></PrivateRouteWrapper>} />
                        <Route path="/admin/article-order" element={<PrivateRouteWrapper path="/admin/article-order"><ArticleOrder /></PrivateRouteWrapper>} />
                        
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRouteWrapper path="/dashboard">
                                    <Dashboard />
                                </PrivateRouteWrapper>
                            }
                        />

                        <Route
                            path="/"
                            element={<Navigate to="/auth/sign-in" replace />}
                        />
                    </Routes>
                </Router>
            </AuthProvider>
        </ChakraProvider>
    );
}

export default App;
