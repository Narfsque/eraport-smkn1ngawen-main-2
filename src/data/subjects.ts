// Data Mata Pelajaran SMK Negeri 1 Ngawen

export interface Subject {
  id: string;
  kode: string;
  nama: string;
  kategori: "Umum" | "Produktif" | "Muatan Lokal";
  jurusan: string[]; // Jurusan yang mempelajari mata pelajaran ini
  kkm: number; // Kriteria Ketuntasan Minimal
}

// Mata Pelajaran Umum (semua jurusan)
export const subjectsUmum: Subject[] = [
  { id: "MP001", kode: "PAI", nama: "Pendidikan Agama Islam", kategori: "Umum", jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"], kkm: 75 },
  { id: "MP002", kode: "PPKn", nama: "Pendidikan Pancasila dan Kewarganegaraan", kategori: "Umum", jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"], kkm: 75 },
  { id: "MP003", kode: "BIN", nama: "Bahasa Indonesia", kategori: "Umum", jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"], kkm: 75 },
  { id: "MP004", kode: "MTK", nama: "Matematika", kategori: "Umum", jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"], kkm: 70 },
  { id: "MP005", kode: "BIG", nama: "Bahasa Inggris", kategori: "Umum", jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"], kkm: 70 },
  { id: "MP006", kode: "INF", nama: "Informatika", kategori: "Umum", jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"], kkm: 70 },
  { id: "MP007", kode: "PJOK", nama: "Pendidikan Jasmani, Olahraga dan Kesehatan", kategori: "Umum", jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"], kkm: 75 },
  { id: "MP008", kode: "SBD", nama: "Seni Budaya", kategori: "Umum", jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"], kkm: 75 },
  { id: "MP009", kode: "SJI", nama: "Sejarah Indonesia", kategori: "Umum", jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"], kkm: 75 },
  { id: "MP010", kode: "BK", nama: "Bimbingan Konseling", kategori: "Umum", jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"], kkm: 75 },
];

// Mata Pelajaran Produktif DPIB
export const subjectsDPIB: Subject[] = [
  { id: "DPIB001", kode: "GT", nama: "Gambar Teknik", kategori: "Produktif", jurusan: ["DPIB"], kkm: 75 },
  { id: "DPIB002", kode: "DPK-DPIB", nama: "Dasar Program Keahlian DPIB", kategori: "Produktif", jurusan: ["DPIB"], kkm: 75 },
  { id: "DPIB003", kode: "KB", nama: "Konstruksi Bangunan", kategori: "Produktif", jurusan: ["DPIB"], kkm: 75 },
  { id: "DPIB004", kode: "CAD", nama: "CAD/CAM", kategori: "Produktif", jurusan: ["DPIB"], kkm: 75 },
  { id: "DPIB005", kode: "EBK", nama: "Estimasi Biaya Konstruksi", kategori: "Produktif", jurusan: ["DPIB"], kkm: 75 },
  { id: "DPIB006", kode: "MDB", nama: "Menggambar Desain Bangunan", kategori: "Produktif", jurusan: ["DPIB"], kkm: 75 },
  { id: "DPIB007", kode: "SPK", nama: "Statika dan Perhitungan Konstruksi", kategori: "Produktif", jurusan: ["DPIB"], kkm: 70 },
];

// Mata Pelajaran Produktif TAB
export const subjectsTAB: Subject[] = [
  { id: "TAB001", kode: "DPK-TAB", nama: "Dasar Program Keahlian TAB", kategori: "Produktif", jurusan: ["TAB"], kkm: 75 },
  { id: "TAB002", kode: "TAB", nama: "Teknik Alat Berat", kategori: "Produktif", jurusan: ["TAB"], kkm: 75 },
  { id: "TAB003", kode: "SH", nama: "Sistem Hidrolik", kategori: "Produktif", jurusan: ["TAB"], kkm: 75 },
  { id: "TAB004", kode: "MAB", nama: "Motor Alat Berat", kategori: "Produktif", jurusan: ["TAB"], kkm: 75 },
  { id: "TAB005", kode: "SAB", nama: "Sistem Alat Berat", kategori: "Produktif", jurusan: ["TAB"], kkm: 75 },
  { id: "TAB006", kode: "PWA", nama: "Perawatan Alat Berat", kategori: "Produktif", jurusan: ["TAB"], kkm: 75 },
];

// Mata Pelajaran Produktif TB
export const subjectsTB: Subject[] = [
  { id: "TB001", kode: "DPK-TB", nama: "Dasar Program Keahlian TB", kategori: "Produktif", jurusan: ["TB"], kkm: 75 },
  { id: "TB002", kode: "DB", nama: "Desain Busana", kategori: "Produktif", jurusan: ["TB"], kkm: 75 },
  { id: "TB003", kode: "PP", nama: "Pembuatan Pola", kategori: "Produktif", jurusan: ["TB"], kkm: 75 },
  { id: "TB004", kode: "MPB", nama: "Menjahit dan Pembuatan Busana", kategori: "Produktif", jurusan: ["TB"], kkm: 75 },
  { id: "TB005", kode: "TB", nama: "Teknologi Busana", kategori: "Produktif", jurusan: ["TB"], kkm: 75 },
  { id: "TB006", kode: "KWB", nama: "Kewirausahaan Busana", kategori: "Produktif", jurusan: ["TB"], kkm: 75 },
];

// Mata Pelajaran Produktif TKJ
export const subjectsTKJ: Subject[] = [
  { id: "TKJ001", kode: "DPK-TKJ", nama: "Dasar Program Keahlian TKJ", kategori: "Produktif", jurusan: ["TKJ"], kkm: 75 },
  { id: "TKJ002", kode: "JK", nama: "Jaringan Komputer", kategori: "Produktif", jurusan: ["TKJ"], kkm: 75 },
  { id: "TKJ003", kode: "AS", nama: "Administrasi Server", kategori: "Produktif", jurusan: ["TKJ"], kkm: 75 },
  { id: "TKJ004", kode: "PW", nama: "Pemrograman Web", kategori: "Produktif", jurusan: ["TKJ"], kkm: 75 },
  { id: "TKJ005", kode: "BD", nama: "Basis Data", kategori: "Produktif", jurusan: ["TKJ"], kkm: 75 },
  { id: "TKJ006", kode: "KJ", nama: "Keamanan Jaringan", kategori: "Produktif", jurusan: ["TKJ"], kkm: 75 },
];

// Mata Pelajaran Produktif TKR
export const subjectsTKR: Subject[] = [
  { id: "TKR001", kode: "DPK-TKR", nama: "Dasar Program Keahlian TKR", kategori: "Produktif", jurusan: ["TKR"], kkm: 75 },
  { id: "TKR002", kode: "MO", nama: "Motor Otomotif", kategori: "Produktif", jurusan: ["TKR"], kkm: 75 },
  { id: "TKR003", kode: "KK", nama: "Kelistrikan Kendaraan", kategori: "Produktif", jurusan: ["TKR"], kkm: 75 },
  { id: "TKR004", kode: "CPT", nama: "Chasis dan Pemindah Tenaga", kategori: "Produktif", jurusan: ["TKR"], kkm: 75 },
  { id: "TKR005", kode: "PBK", nama: "Perawatan Berkala Kendaraan", kategori: "Produktif", jurusan: ["TKR"], kkm: 75 },
  { id: "TKR006", kode: "SPM", nama: "Sepeda Motor", kategori: "Produktif", jurusan: ["TKR"], kkm: 75 },
];

// Muatan Lokal
export const subjectsMulok: Subject[] = [
  { id: "ML001", kode: "BJW", nama: "Bahasa Jawa", kategori: "Muatan Lokal", jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"], kkm: 75 },
  { id: "ML002", kode: "PLH", nama: "Pendidikan Lingkungan Hidup", kategori: "Muatan Lokal", jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"], kkm: 75 },
];

// Export semua mata pelajaran
export const allSubjects: Subject[] = [
  ...subjectsUmum,
  ...subjectsDPIB,
  ...subjectsTAB,
  ...subjectsTB,
  ...subjectsTKJ,
  ...subjectsTKR,
  ...subjectsMulok,
];

// Helper function untuk mendapatkan mata pelajaran berdasarkan jurusan
export const getSubjectsByJurusan = (jurusan: string) => {
  return allSubjects.filter(s => s.jurusan.includes(jurusan));
};

// Helper function untuk mendapatkan mata pelajaran berdasarkan kategori
export const getSubjectsByKategori = (kategori: "Umum" | "Produktif" | "Muatan Lokal") => {
  return allSubjects.filter(s => s.kategori === kategori);
};
