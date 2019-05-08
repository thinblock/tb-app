let Dashboard: any = null;

// if (false) {
//   const {MobileDashboard} = require('./Mobile');
//   Dashboard = MobileDashboard as any;
// } else {
const {DesktopDashboard} = require('./Desktop');
Dashboard = DesktopDashboard as any;
// }

export { Dashboard };
