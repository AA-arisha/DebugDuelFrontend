import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import api from '../../services/api';

export const downloadTeamsPDF = async () => {
  try {
    const res = await api.get('/admin/teams/download');
    const data = res.data;

    if (!data || data.length === 0) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Teams Report', 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [['Team Name', 'Leader Name', 'Leader Email', 'Password']],
      body: data.map((team) => [
        team.teamName,
        team.leaderName,
        team.leaderEmail,
        team.leaderPassword,
      ]),
      theme: 'grid',
      headStyles: { fillColor: [255, 122, 0] },
      styles: { fontSize: 12 },
      columnStyles: {
        0: { cellWidth: 40 }, // Team Name
        1: { cellWidth: 50 }, // Leader Name
        2: { cellWidth: 60 }, // Leader Email
        3: { cellWidth: 40 }, // Password
      },
    });

    doc.save('teams_report.pdf');
  } catch (err) {
    console.error('❌ PDF download failed:', err);
    alert('Failed to download PDF');
  }
};
