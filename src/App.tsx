import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/hooks/useLanguage";
import CookieBanner from "@/components/CookieBanner";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import DashboardHome from "./pages/admin/DashboardHome.tsx";
import InquiriesPage from "./pages/admin/InquiriesPage.tsx";
import RoomsPage from "./pages/admin/RoomsPage.tsx";
import DiningPage from "./pages/admin/DiningPage.tsx";
import EventsPage from "./pages/admin/EventsPage.tsx";
import ContentEditorPage from "./pages/admin/ContentEditorPage.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "offlineFirst",
      refetchOnReconnect: true,
      retry: (_, error: any) => {
        if (!navigator.onLine) return false;
        return error?.status !== 404;
      },
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="inquiries" element={<InquiriesPage />} />
                <Route path="rooms" element={<RoomsPage />} />
                <Route path="dining" element={<DiningPage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="content" element={<ContentEditorPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CookieBanner />
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
