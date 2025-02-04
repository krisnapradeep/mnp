import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import theme from './theme';

// Pages
import SignIn from './pages/auth/SignIn';
import Dashboard from './pages/admin/Dashboard';
import DataTables from './pages/admin/DataTables';
import Profile from './pages/admin/Profile';
import UserTypeList from './pages/master/UserTypeList';
import UserTypeForm from './pages/UserTypeForm.js';
import YearMaster from './pages/admin/YearMaster';
import BeneficiaryType from './pages/admin/BeneficiaryType';
import District from './pages/admin/District';
import Category from './pages/admin/Category';
import Supplier from './pages/admin/Supplier';
import SupplierPayment from './pages/admin/SupplierPayment';
import ArticleOrder from './pages/admin/ArticleOrder';
import BeneficiaryList from './pages/transaction/BeneficiaryList';

// Components
import Layout from './components/layout/Layout';

function PrivateRouteWrapper({ children }: { children: React.ReactNode }) {
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
                                <PrivateRouteWrapper>
                                    <Dashboard />
                                </PrivateRouteWrapper>
                            }
                        />
                        
                        <Route
                            path="/admin/data-tables"
                            element={
                                <PrivateRouteWrapper>
                                    <DataTables />
                                </PrivateRouteWrapper>
                            }
                        />
                        
                        <Route
                            path="/admin/profile"
                            element={
                                <PrivateRouteWrapper>
                                    <Profile />
                                </PrivateRouteWrapper>
                            }
                        />
                        
                        <Route
                            path="/admin/user-types"
                            element={
                                <PrivateRouteWrapper>
                                    <UserTypeList />
                                </PrivateRouteWrapper>
                            }
                        />
                        <Route
                            path="/admin/user-types/create"
                            element={
                                <PrivateRouteWrapper>
                                    <UserTypeForm />
                                </PrivateRouteWrapper>
                            }
                        />
                        
                        <Route
                            path="/admin/master-pages"
                            element={
                                <PrivateRouteWrapper>
                                    <Dashboard />
                                </PrivateRouteWrapper>
                            }
                        />
                        <Route path="/admin/year-master" element={<PrivateRouteWrapper><YearMaster /></PrivateRouteWrapper>} />
                        <Route path="/admin/beneficiary-type" element={<PrivateRouteWrapper><BeneficiaryType /></PrivateRouteWrapper>} />
                        <Route path="/admin/district" element={<PrivateRouteWrapper><District /></PrivateRouteWrapper>} />
                        <Route path="/admin/category" element={<PrivateRouteWrapper><Category /></PrivateRouteWrapper>} />
                        <Route path="/admin/supplier" element={<PrivateRouteWrapper><Supplier /></PrivateRouteWrapper>} />
                        <Route path="/admin/supplier-payment" element={<PrivateRouteWrapper><SupplierPayment /></PrivateRouteWrapper>} />
                        <Route path="/admin/article-order" element={<PrivateRouteWrapper><ArticleOrder /></PrivateRouteWrapper>} />
                        
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRouteWrapper>
                                    <Dashboard />
                                </PrivateRouteWrapper>
                            }
                        />
                        <Route path="/master/user-types" element={<PrivateRouteWrapper><UserTypeList /></PrivateRouteWrapper>} />
                        <Route path="/transaction/beneficiary-list" element={<PrivateRouteWrapper><BeneficiaryList /></PrivateRouteWrapper>} />
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
