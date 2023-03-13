import "@/styles/global.css";
import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/Sidebar";

interface IProps extends React.PropsWithChildren {}

export default function DashboardRootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <head />

      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center p-4">
          <Sidebar />
          {children}
        </GlassPane>

        <div id="modal"></div>
      </body>
    </html>
  );
}
